// Unit tests for the edge Worker's API handlers and their helpers (zero
// dependencies). Run from the repo root:  node --test cloudflare/worker.test.mjs
// Outbound calls (Turnstile siteverify, Slack, Notion, Resend) are stubbed
// through globalThis.fetch - nothing leaves the machine.
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import worker, {
  bannerHtml,
  buildCsp,
  bookingEmbedUrl,
  CONTACT_TURNSTILE,
  contactSlackMessage,
  GTM_CONTAINER_ID,
  handleBannerLead,
  handleContactRequest,
  handleHelpRequest,
  HELP_TURNSTILE,
  helpSlackMessage,
  parseContact,
  parseHelp,
  rateLimitIpKey,
} from './worker.js';

// Resend Contacts API (global contacts + segments) - the legacy
// /audiences/{id}/contacts endpoint must never be called any more.
const RESEND_CONTACTS = 'https://api.resend.com/contacts';
// What POST /contacts answers (recorded in the official SDK's API traffic).
const CONTACT_ID = 'c0ffee00-0000-4000-8000-000000000001';
const membershipUrl = (who, segment) =>
  `${RESEND_CONTACTS}/${encodeURIComponent(who)}/segments/${encodeURIComponent(segment)}`;
const resendCreate = () => calls.find((c) => c.url === RESEND_CONTACTS);
const noLegacyAudienceCalls = () =>
  assert.ok(!calls.some((c) => c.url.includes('/audiences/')), 'no legacy /audiences/ endpoint');
import { NOTION_COLUMNS, NOTION_VERSION, notionLeadPage, notionParent, warsawDateTime } from './notion.js';
import { MAIL_COPY, renderHelpConfirmation, renderLeadConfirmation } from './confirmation-email.js';

const SLACK = 'https://hooks.slack.com/services/T000/B000/LEADS';
const SLACK_HELP = 'https://hooks.slack.com/services/T000/B000/HELP';
const SCHEDULE = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0test';
const DATA_SOURCE = '0123456789abcdef0123456789abcdef';
const VALID = {
  name: '  Jan   Kowalski ',
  email: 'jan@example.com',
  phone: '+48 600 100 200',
  company: '  Acme  Sp. z o.o. ',
  size: '121-300',
  message: 'Two domains,\r\n\r\n\r\n\r\nthree languages.',
  topic: 'pricing',
  locale: 'pl',
  marketing: true,
  'cf-turnstile-response': 'token-ok',
};
const HELP = {
  name: 'Anna Nowak',
  email: 'anna@example.org',
  phone: '',
  urgency: 'high',
  message: 'Signatures stopped applying for the sales team.',
  locale: 'de',
  from: '/de/docs/templates',
  'cf-turnstile-response': 'token-ok',
};
// What siteverify answers for a token solved on signature.cat in each mode.
const VERIFIED = { success: true, hostname: 'signature.cat', ...CONTACT_TURNSTILE };
const VERIFIED_HELP = { success: true, hostname: 'signature.cat', ...HELP_TURNSTILE };
// Forbidden "AI-tell" typography (DESIGN_SYSTEM.md): dashes, invisible and
// bidi characters, typographic double quotes.
const FORBIDDEN =
  /[\u2012\u2013\u2014\u2015\u200B\u200C\u200D\u2060\uFEFF\u00A0\u202F\u00AD\u200E\u200F\u00AB\u00BB\u201C\u201D\u201E\u201F]/;

let calls;
let replies;
const realFetch = globalThis.fetch;
beforeEach(() => {
  calls = [];
  replies = {};
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init });
    const host = new URL(url).hostname;
    const reply = replies[url] || replies[host];
    if (reply instanceof Error) throw reply;
    if (reply) return reply(url, init);
    if (host === 'challenges.cloudflare.com') return Response.json(VERIFIED);
    if (host === 'api.notion.com') return Response.json({ object: 'page', id: 'page-1' });
    if (url === RESEND_CONTACTS) return Response.json({ object: 'contact', id: CONTACT_ID }, { status: 201 });
    if (host === 'api.resend.com') return Response.json({ id: 'email-1' });
    return new Response('ok', { status: 200 });
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = (body, path = '/api/contact-requests', headers = {}) =>
  new Request(`https://signature.cat${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.7', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
const postHelp = (body) => post(body, '/api/help-requests');
const hosts = () => calls.map((c) => new URL(c.url).hostname);
const urls = () => calls.map((c) => c.url);
const jsonOf = (call) => JSON.parse(call.init.body);
const env = (extra = {}) => ({ SLACK_WEBHOOK_URL: SLACK, TURNSTILE_SECRET: 's3cret', ...extra });
const full = (extra = {}) =>
  env({
    NOTION_TOKEN: 'ntn_x',
    NOTION_DATA_SOURCE_ID: DATA_SOURCE,
    RESEND_API_KEY: 're_full',
    RESEND_AUDIENCE_ID: 'aud-1',
    ...extra,
  });
const helpEnv = (extra = {}) => ({ SLACK_HELP_WEBHOOK_URL: SLACK_HELP, TURNSTILE_SECRET: 's3cret', ...extra });
const quietErrors = async (fn) => {
  const orig = console.error;
  const lines = [];
  console.error = (...a) => lines.push(a.join(' '));
  try {
    await fn();
  } finally {
    console.error = orig;
  }
  return lines.join('\n');
};

// ---- parseContact / parseHelp ------------------------------------------------------
test('parseContact normalizes a valid lead (with company)', () => {
  assert.deepEqual(parseContact(VALID), {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '+48 600 100 200',
    company: 'Acme Sp. z o.o.',
    size: '121-300',
    message: 'Two domains,\n\nthree languages.',
    topic: 'pricing',
    locale: 'pl',
    marketing: true,
  });
});

test('parseContact rejects invalid fields', () => {
  for (const bad of [
    { name: 'J' },
    { name: 'x'.repeat(121) },
    { email: 'not-an-email' },
    { email: `${'a'.repeat(250)}@example.com` },
    { phone: '12345' },
    { phone: '' },
    { phone: '+48 600 100 200 ext 4' },
    { company: '' },
    { company: '   ' },
    { company: 'x'.repeat(121) },
    { company: undefined },
    { size: '10-20' },
    { size: undefined },
    { message: 'x'.repeat(2001) },
  ]) {
    assert.equal(parseContact({ ...VALID, ...bad }), null, JSON.stringify(bad));
  }
  assert.equal(parseContact(null), null);
});

test('parseContact falls back to safe topic/locale and strict opt-in', () => {
  const lead = parseContact({ ...VALID, topic: ['call'], locale: 'es', marketing: 'true' });
  assert.equal(lead.topic, 'general');
  assert.equal(lead.locale, 'en');
  assert.equal(lead.marketing, false);
  assert.equal(parseContact({ ...VALID, topic: 'toString' }).topic, 'general');
  assert.equal(parseContact({ ...VALID, topic: 'help' }).topic, 'general'); // help is its own endpoint
  assert.equal(parseContact({ ...VALID, message: undefined }).message, '');
});

test('parseHelp: urgency + description required, phone optional, docs referrer allowlisted', () => {
  assert.deepEqual(parseHelp(HELP), {
    name: 'Anna Nowak',
    email: 'anna@example.org',
    phone: '',
    urgency: 'high',
    message: 'Signatures stopped applying for the sales team.',
    from: '/de/docs/templates',
    locale: 'de',
  });
  assert.equal(parseHelp({ ...HELP, phone: '+49 30 1234567' }).phone, '+49 30 1234567');
  for (const bad of [
    { urgency: 'urgent' },
    { urgency: undefined },
    { message: 'too short' },
    { message: 'x'.repeat(2001) },
    { phone: '123' },
    { name: 'A' },
    { email: 'nope' },
  ]) {
    assert.equal(parseHelp({ ...HELP, ...bad }), null, JSON.stringify(bad));
  }
  for (const from of ['https://evil.example/docs', '/docs/../admin', '/xx/docs/a', '/form', '/docs/a?b=c']) {
    assert.equal(parseHelp({ ...HELP, from }).from, '', from);
  }
  assert.equal(parseHelp({ ...HELP, from: '/docs' }).from, '/docs');
});

// ---- bookingEmbedUrl ---------------------------------------------------------------
test('bookingEmbedUrl accepts only Google Calendar appointment pages', () => {
  assert.equal(bookingEmbedUrl(SCHEDULE), `${SCHEDULE}?gv=true`);
  assert.equal(bookingEmbedUrl(` ${SCHEDULE}?gv=true `), `${SCHEDULE}?gv=true`);
  for (const bad of [
    undefined,
    '',
    'not a url',
    `<iframe src="${SCHEDULE}?gv=true"></iframe>`, // a pasted embed snippet is not a URL
    'http://calendar.google.com/calendar/appointments/schedules/x',
    'https://calendar.app.google/abc',
    'https://evil.example/calendar/appointments/schedules/x',
    'https://calendar.google.com/calendar/embed?src=x',
  ]) {
    assert.equal(bookingEmbedUrl(bad), '', String(bad));
  }
});

// ---- Slack messages ----------------------------------------------------------------
test('contactSlackMessage: company field, escaping, message cap, Notion note', () => {
  const lead = parseContact({ ...VALID, company: 'Evil <!channel> & Co', message: '&'.repeat(2000) });
  const msg = contactSlackMessage(lead, { booking: true, notion: { status: 'created' } });
  const text = JSON.stringify(msg);
  assert.ok(!text.includes('<!channel>'));
  assert.ok(text.includes('Evil &lt;!channel&gt; &amp; Co'));
  assert.equal(msg.blocks[0].text.text, 'New contact request: Custom pricing');
  assert.deepEqual(
    msg.blocks[1].fields.map((f) => f.text.split('\n')[0]),
    ['*Name*', '*Company*', '*Email*', '*Phone*', '*Organization size*', '*Topic*', '*Language*'],
  );
  assert.ok(msg.blocks[2].text.text.length <= 3000);
  assert.match(msg.blocks.at(-1).elements[0].text, /Marketing opt-in: yes \| Booking calendar shown: yes \| Notion: row added/);
  const failed = contactSlackMessage(lead, { notion: { status: 'failed', detail: 'HTTP 400 validation_error' } });
  assert.match(failed.blocks.at(-1).elements[0].text, /Notion: :warning: FAILED \(HTTP 400 validation_error\)/);
  assert.match(contactSlackMessage(lead).blocks.at(-1).elements[0].text, /Notion: not configured/);
  assert.equal(msg.unfurl_links, false);
});

test('helpSlackMessage: urgency header, optional phone, docs page, escaping', () => {
  const req = parseHelp({ ...HELP, name: 'Eve <@U123>', urgency: 'critical' });
  const msg = helpSlackMessage(req);
  assert.equal(msg.blocks[0].text.text, ':red_circle: Help request: Critical');
  assert.equal(msg.blocks[0].text.emoji, true);
  const fields = Object.fromEntries(msg.blocks[1].fields.map((f) => f.text.split('\n')));
  assert.equal(fields['*Phone*'], '-');
  assert.equal(fields['*Docs page*'], 'signature.cat/de/docs/templates');
  assert.equal(fields['*Name*'], 'Eve &lt;@U123&gt;');
  assert.match(msg.blocks[2].text.text, /^\*Problem\*\n/);
  assert.ok(!JSON.stringify(msg).includes('<@U123>'));
});

// ---- Notion ------------------------------------------------------------------------
test('notionParent prefers the data source id and ignores junk', () => {
  assert.deepEqual(notionParent({ NOTION_DATA_SOURCE_ID: DATA_SOURCE, NOTION_DATABASE_ID: 'f'.repeat(32) }), {
    type: 'data_source_id',
    data_source_id: DATA_SOURCE,
  });
  assert.deepEqual(notionParent({ NOTION_DATABASE_ID: '248104cd-477e-80fd-b757-e945d38000bd' }), {
    type: 'database_id',
    database_id: '248104cd477e80fdb757e945d38000bd',
  });
  assert.equal(notionParent({ NOTION_DATABASE_ID: 'https://notion.so/x' }), null);
  assert.equal(notionParent({}), null);
});

test('notionLeadPage maps every column with the right property type', () => {
  const lead = parseContact(VALID);
  const page = notionLeadPage(lead, { type: 'data_source_id', data_source_id: DATA_SOURCE }, new Date('2026-09-27T12:05:09Z'));
  const p = page.properties;
  assert.deepEqual(p[NOTION_COLUMNS.client], { title: [{ type: 'text', text: { content: 'Acme Sp. z o.o.' } }] });
  assert.deepEqual(p[NOTION_COLUMNS.info], { rich_text: [{ type: 'text', text: { content: 'Two domains,\n\nthree languages.' } }] });
  assert.deepEqual(p[NOTION_COLUMNS.channel], { multi_select: [{ name: 'Formularz' }] });
  assert.deepEqual(p[NOTION_COLUMNS.phone], { phone_number: '+48 600 100 200' });
  assert.deepEqual(p[NOTION_COLUMNS.email], { email: 'jan@example.com' });
  assert.deepEqual(p[NOTION_COLUMNS.size], { multi_select: [{ name: '121-300' }] });
  assert.deepEqual(p[NOTION_COLUMNS.contact], { rich_text: [{ type: 'text', text: { content: 'Jan Kowalski' } }] });
  assert.deepEqual(p[NOTION_COLUMNS.status], { multi_select: [{ name: 'nowy' }] });
  assert.deepEqual(p[NOTION_COLUMNS.date], { date: { start: '2026-09-27T14:05:09', time_zone: 'Europe/Warsaw' } });
  assert.deepEqual(p[NOTION_COLUMNS.language], { rich_text: [{ type: 'text', text: { content: 'PL' } }] });
  assert.deepEqual(Object.values(NOTION_COLUMNS), ['Klient', 'Info', 'Kanał', 'Phone', 'Email', 'Wielkość - osoby', 'Kontakt', 'Status', 'Data', 'Język']);
  // empty description = no Info property (Notion rejects empty strings)
  const bare = notionLeadPage({ ...lead, message: '' }, null);
  assert.equal(bare.properties[NOTION_COLUMNS.info], undefined);
  // an email over Notion's 100-character cap moves into Info instead of failing the row
  const long = `${'a'.repeat(95)}@example.com`;
  const moved = notionLeadPage({ ...lead, email: long, message: '' }, null).properties;
  assert.equal(moved[NOTION_COLUMNS.email], undefined);
  assert.equal(moved[NOTION_COLUMNS.info].rich_text[0].text.content, `Email: ${long}`);
});

test('warsawDateTime follows Warsaw time across DST', () => {
  assert.equal(warsawDateTime(new Date('2026-09-27T12:05:09Z')), '2026-09-27T14:05:09'); // CEST
  assert.equal(warsawDateTime(new Date('2026-01-10T23:30:00Z')), '2026-01-11T00:30:00'); // CET, next day
});

// ---- handleContactRequest (lead mode) ------------------------------------------------
test('lead: happy path - Notion row, Slack, marketing segment (opt-in), confirmation email, booking', async () => {
  const pending = [];
  // record the timeout of every signal the Worker creates
  const timeouts = new WeakMap();
  const realTimeout = AbortSignal.timeout;
  AbortSignal.timeout = (ms) => {
    const signal = realTimeout.call(AbortSignal, ms);
    timeouts.set(signal, ms);
    return signal;
  };
  let res;
  try {
    res = await handleContactRequest(post(VALID), full({ BOOKING_URL: SCHEDULE }), {
      waitUntil: (p) => pending.push(p),
    });
    await Promise.all(pending);
  } finally {
    AbortSignal.timeout = realTimeout;
  }
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, booking: `${SCHEDULE}?gv=true` });
  assert.deepEqual(hosts(), ['challenges.cloudflare.com', 'api.notion.com', 'hooks.slack.com', 'api.resend.com', 'api.resend.com', 'api.resend.com']);
  // Notion: insert-only create in the configured data source
  const notion = calls[1];
  assert.equal(notion.url, 'https://api.notion.com/v1/pages');
  assert.equal(notion.init.headers['Notion-Version'], NOTION_VERSION);
  assert.equal(notion.init.headers.Authorization, 'Bearer ntn_x');
  assert.ok(notion.init.headers['User-Agent']);
  assert.deepEqual(jsonOf(notion).parent, { type: 'data_source_id', data_source_id: DATA_SOURCE });
  // Slack says the Notion row landed
  assert.equal(calls[2].url, SLACK);
  assert.match(jsonOf(calls[2]).blocks.at(-1).elements[0].text, /Notion: row added/);
  // marketing contact: created inside the segment, then the membership made
  // explicit; plus the confirmation (every call carries a User-Agent - Resend
  // requires one)
  noLegacyAudienceCalls();
  const create = resendCreate();
  assert.equal(create.init.method, 'POST');
  assert.deepEqual(jsonOf(create), {
    email: 'jan@example.com',
    first_name: 'Jan',
    last_name: 'Kowalski',
    unsubscribed: false,
    segments: [{ id: 'aud-1' }],
  });
  // membership by the contact id from the create answer: the address never
  // appears in a URL
  const member = calls.find((c) => c.url === membershipUrl(CONTACT_ID, 'aud-1'));
  assert.ok(member, 'segment membership call by contact id');
  assert.ok(!urls().some((u) => u.includes(encodeURIComponent('jan@example.com')) || u.includes('jan@example.com')));
  assert.equal(member.init.method, 'POST');
  assert.equal(member.init.body, undefined, 'membership call has no body');
  assert.equal(member.init.headers['Content-Type'], undefined, 'no body, no Content-Type');
  assert.equal(create.init.headers['Content-Type'], 'application/json');
  assert.ok(calls.indexOf(create) < calls.indexOf(member), 'membership after the create');
  for (const c of [create, member]) {
    assert.equal(c.init.headers.Authorization, 'Bearer re_full');
    assert.ok(c.init.headers['User-Agent']);
    assert.equal(timeouts.get(c.init.signal), 8000, 'an 8 s timeout on both Resend calls');
  }
  const email = calls.find((c) => c.url === 'https://api.resend.com/emails');
  const mail = jsonOf(email);
  assert.equal(mail.from, 'SignatureCat <contact@signature.cat>');
  assert.deepEqual(mail.to, ['jan@example.com']);
  assert.equal(mail.subject, MAIL_COPY.pl.lead.subject);
  assert.ok(mail.html.includes('Acme Sp. z o.o.') && mail.text.includes('Acme Sp. z o.o.'));
  assert.ok(mail.html.includes(SCHEDULE) && !mail.html.includes('gv=true'), 'email links the booking page without the embed flag');
  assert.deepEqual(mail.tags, [
    { name: 'category', value: 'contact_confirmation' },
    { name: 'locale', value: 'pl' },
  ]);
  assert.ok(email.init.headers['User-Agent']);
});

test('lead: no opt-in = no audience call, confirmation still sent; RESEND_SEND_API_KEY preferred', async () => {
  const res = await handleContactRequest(post({ ...VALID, marketing: false }), full({ RESEND_SEND_API_KEY: 're_send' }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  const resend = calls.filter((c) => c.url.startsWith('https://api.resend.com/'));
  assert.deepEqual(resend.map((c) => c.url), ['https://api.resend.com/emails']);
  assert.equal(resend[0].init.headers.Authorization, 'Bearer re_send');
});

test('lead: Resend failures never fail the request; no membership call after a failed create', async () => {
  replies['api.resend.com'] = () => new Response(JSON.stringify({ name: 'validation_error' }), { status: 422 });
  let res;
  const logs = await quietErrors(async () => {
    res = await handleContactRequest(post(VALID), full({ RESEND_CONTACT_AUDIENCE_ID: 'aud-2' }));
  });
  assert.equal(res.status, 200);
  assert.deepEqual(jsonOf(resendCreate()).segments, [{ id: 'aud-2' }]);
  assert.ok(!urls().some((u) => u.includes('/segments/')), 'no membership call when the create failed');
  assert.match(logs, /Resend contact answered 422/);
  assert.match(logs, /confirmation email HTTP 422 validation_error/);
  noLegacyAudienceCalls();
});

test('marketing segment: *_SEGMENT_ID names win, the legacy *_AUDIENCE_ID names still work', async () => {
  const leadSegment = async (extra) => {
    calls = [];
    assert.equal((await handleContactRequest(post(VALID), full(extra))).status, 200);
    return jsonOf(resendCreate()).segments[0].id;
  };
  assert.equal(await leadSegment({}), 'aud-1', 'legacy RESEND_AUDIENCE_ID');
  assert.equal(await leadSegment({ RESEND_SEGMENT_ID: 'seg-1' }), 'seg-1');
  assert.equal(await leadSegment({ RESEND_SEGMENT_ID: 'seg-1', RESEND_CONTACT_AUDIENCE_ID: 'aud-2' }), 'aud-2', 'form-specific beats shared');
  assert.equal(
    await leadSegment({ RESEND_SEGMENT_ID: 'seg-1', RESEND_CONTACT_AUDIENCE_ID: 'aud-2', RESEND_CONTACT_SEGMENT_ID: 'seg-2' }),
    'seg-2',
  );
  assert.equal(await leadSegment({ RESEND_AUDIENCE_ID: '', RESEND_SEGMENT_ID: 'seg-1' }), 'seg-1', 'new name alone is enough');
  calls = [];
  const unconfigured = await handleContactRequest(post(VALID), full({ RESEND_AUDIENCE_ID: '' }));
  assert.equal(unconfigured.status, 200);
  assert.ok(!resendCreate(), 'no segment configured = no marketing contact');
  const bannerLead = (extra) =>
    handleBannerLead(
      new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify({ email: 'a@b.co', consent: true }) }),
      { RESEND_API_KEY: 'k', ...extra },
    );
  for (const [extra, expected] of [
    [{ RESEND_AUDIENCE_ID: 'aud-1' }, 'aud-1'],
    [{ RESEND_AUDIENCE_ID: 'aud-1', RESEND_SEGMENT_ID: 'seg-1' }, 'seg-1'],
    [{ RESEND_SEGMENT_ID: 'seg-1', RESEND_CONTACT_SEGMENT_ID: 'seg-2' }, 'seg-1'],
  ]) {
    calls = [];
    assert.equal((await bannerLead(extra)).status, 200);
    assert.equal(jsonOf(resendCreate()).segments[0].id, expected, JSON.stringify(extra));
  }
  const noSegment = await bannerLead({ RESEND_CONTACT_SEGMENT_ID: 'seg-2' });
  assert.deepEqual([noSegment.status, (await noSegment.json()).error], [503, 'lead_capture_unconfigured'], 'the banner gate never uses the form segment');
});

test('marketing contact: names only when present; without an id in the create answer the membership goes by the encoded address', async () => {
  replies[RESEND_CONTACTS] = () => new Response('{}', { status: 201 });
  await handleContactRequest(post({ ...VALID, name: 'Madonna', email: 'jan+news@example.com' }), full({ RESEND_SEGMENT_ID: 'seg/1?x' }));
  assert.deepEqual(jsonOf(resendCreate()), { email: 'jan+news@example.com', first_name: 'Madonna', unsubscribed: false, segments: [{ id: 'seg/1?x' }] });
  assert.ok(urls().includes('https://api.resend.com/contacts/jan%2Bnews%40example.com/segments/seg%2F1%3Fx'));
  // a malformed (lone surrogate) address cannot even be put in a URL: the
  // stored contact still counts, the membership is logged as unreachable
  calls = [];
  const odd = `a${String.fromCharCode(0xd800)}@b.co`;
  let res;
  const logs = await quietErrors(async () => {
    res = await handleBannerLead(
      new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify({ email: odd, consent: true }) }),
      { RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' },
    );
  });
  assert.equal(res.status, 200);
  assert.deepEqual(urls(), [RESEND_CONTACTS]);
  assert.match(logs, /banner gate: Resend segment membership unreachable/);
});

test('marketing contact: a failed membership call is logged (label + error name, never the address), never fatal', async () => {
  replies[membershipUrl(CONTACT_ID, 'aud-1')] = () =>
    Response.json({ statusCode: 404, name: 'not_found', message: 'Contact jan@example.com not found' }, { status: 404 });
  let res;
  let logs = await quietErrors(async () => {
    res = await handleContactRequest(post(VALID), full());
  });
  assert.equal(res.status, 200);
  assert.match(logs, /contact form: Resend segment membership HTTP 404 not_found/);
  assert.doesNotMatch(logs, /jan@example\.com/, 'the address never reaches the logs');
  assert.doesNotMatch(logs, /Resend contact answered/, 'the create itself succeeded');
  // banner gate: the create decides the answer, the membership call does not
  replies = { [membershipUrl(CONTACT_ID, 'aud-1')]: new TypeError('network down') };
  logs = await quietErrors(async () => {
    res = await handleBannerLead(
      new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify({ email: 'a@b.co', consent: true }) }),
      { RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' },
    );
  });
  assert.equal(res.status, 200);
  assert.match(logs, /banner gate: Resend segment membership unreachable/);
  // a failed create is logged with its error name on the banner gate too
  replies = { [RESEND_CONTACTS]: () => Response.json({ name: 'restricted_api_key', message: 'x' }, { status: 401 }) };
  logs = await quietErrors(async () => {
    res = await handleBannerLead(
      new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify({ email: 'a@b.co', consent: true }) }),
      { RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' },
    );
  });
  assert.deepEqual([res.status, (await res.json()).error], [502, 'lead_capture_failed']);
  assert.match(logs, /banner gate: Resend contact answered 401 restricted_api_key/);
});

test('marketing contact: both paths wait for the membership call before they finish', async () => {
  let settled = false;
  replies[membershipUrl(CONTACT_ID, 'aud-1')] = async () => {
    await new Promise((r) => setTimeout(r, 5));
    settled = true;
    return Response.json({ id: 'aud-1' });
  };
  const banner = await handleBannerLead(
    new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify({ email: 'a@b.co', consent: true }) }),
    { RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' },
  );
  assert.equal(banner.status, 200);
  assert.equal(settled, true, 'banner gate: membership finished before the answer');
  settled = false;
  const pending = [];
  await handleContactRequest(post(VALID), full(), { waitUntil: (p) => pending.push(p) });
  await Promise.all(pending);
  assert.equal(settled, true, 'contact form: membership is part of the waitUntil work');
});

test('lead: Notion failure is flagged in Slack but the lead is still delivered', async () => {
  replies['api.notion.com'] = () =>
    Response.json({ object: 'error', status: 400, code: 'validation_error', message: 'Kanał is not a property that exists.' }, { status: 400 });
  let res;
  const logs = await quietErrors(async () => {
    res = await handleContactRequest(post(VALID), full());
  });
  assert.equal(res.status, 200);
  const slack = jsonOf(calls.find((c) => c.url === SLACK));
  assert.match(slack.blocks.at(-1).elements[0].text, /Notion: :warning: FAILED \(HTTP 400 validation_error\)/);
  assert.match(logs, /Kanał is not a property that exists/);
});

test('lead: delivered when Slack OR Notion accepted it', async () => {
  replies[SLACK] = () => new Response('invalid_blocks', { status: 400 });
  await quietErrors(async () => {
    const onlyNotion = await handleContactRequest(post(VALID), full());
    assert.equal(onlyNotion.status, 200, 'Notion kept the lead');
  });
  replies['api.notion.com'] = () => new Response('down', { status: 503 });
  await quietErrors(async () => {
    calls = [];
    const none = await handleContactRequest(post(VALID), full());
    assert.deepEqual([none.status, (await none.json()).error], [502, 'contact_delivery_failed']);
    assert.ok(!hosts().includes('api.resend.com'), 'no confirmation for an undelivered request');
  });
  // Notion alone (no Slack configured) is a valid setup
  replies = {};
  calls = [];
  const notionOnly = await handleContactRequest(post(VALID), full({ SLACK_WEBHOOK_URL: '' }));
  assert.equal(notionOnly.status, 200);
  assert.ok(!hosts().includes('hooks.slack.com'));
  // neither configured
  const unconfigured = await handleContactRequest(post(VALID), env({ SLACK_WEBHOOK_URL: '' }));
  assert.deepEqual([unconfigured.status, (await unconfigured.json()).error], [503, 'contact_unconfigured']);
  // Slack unreachable, Notion off
  replies[SLACK] = new TypeError('network down');
  await quietErrors(async () => {
    assert.equal((await handleContactRequest(post(VALID), env())).status, 502);
  });
});

test('lead: request errors are rejected before anything is forwarded', async () => {
  const get = new Request('https://signature.cat/api/contact-requests');
  assert.equal((await handleContactRequest(get, env())).status, 405);
  assert.equal((await handleContactRequest(post('{nope'), env())).status, 400);
  const invalid = await handleContactRequest(post({ ...VALID, company: '' }), env());
  assert.deepEqual([invalid.status, (await invalid.json()).error], [400, 'invalid_payload']);
  const big = await handleContactRequest(post({ ...VALID, message: 'x'.repeat(20000) }), env());
  assert.equal(big.status, 413);
  assert.deepEqual(calls, []);
});

test('lead: a verified Turnstile token is required (fail closed, bound, capped)', async () => {
  const { 'cf-turnstile-response': _drop, ...noToken } = VALID;
  const missing = await handleContactRequest(post(noToken), full());
  assert.deepEqual([missing.status, (await missing.json()).error], [403, 'turnstile_required']);

  replies['challenges.cloudflare.com'] = () => Response.json({ success: false, 'error-codes': ['invalid-input-response'] });
  const failed = await handleContactRequest(post(VALID), full());
  assert.deepEqual([failed.status, (await failed.json()).error], [403, 'turnstile_failed']);

  replies['challenges.cloudflare.com'] = new TypeError('network down');
  const down = await handleContactRequest(post(VALID), full());
  assert.deepEqual([down.status, (await down.json()).error], [503, 'turnstile_unavailable']);

  for (const wrong of [{ hostname: 'localhost' }, { hostname: undefined }, { action: 'x' }, { cdata: undefined }, { cdata: 'help-form' }]) {
    replies['challenges.cloudflare.com'] = () => Response.json({ ...VERIFIED, ...wrong });
    const res = await handleContactRequest(post(VALID), full());
    assert.deepEqual([res.status, (await res.json()).error], [403, 'turnstile_mismatch'], JSON.stringify(wrong));
  }
  assert.deepEqual(hosts().filter((h) => h !== 'challenges.cloudflare.com'), [], 'nothing forwarded without a passed check');

  calls = [];
  const huge = await handleContactRequest(post({ ...VALID, 'cf-turnstile-response': 'x'.repeat(2049) }), full());
  assert.deepEqual([huge.status, (await huge.json()).error], [403, 'turnstile_invalid']);
  for (const body of [VALID, noToken]) {
    const res = await handleContactRequest(post(body), full({ TURNSTILE_SECRET: undefined }));
    assert.deepEqual([res.status, (await res.json()).error], [503, 'turnstile_unconfigured']);
  }
  assert.deepEqual(calls, []);
});

test('lead + help: per-IP rate limit via the CONTACT_RL binding', async () => {
  const keys = [];
  const limiter = (success) => ({ limit: async ({ key }) => (keys.push(key), { success }) });
  const blocked = await handleContactRequest(post(VALID), full({ CONTACT_RL: limiter(false) }));
  assert.deepEqual([blocked.status, (await blocked.json()).error], [429, 'rate_limited']);
  const blockedHelp = await handleHelpRequest(postHelp(HELP), helpEnv({ CONTACT_RL: limiter(false) }));
  assert.equal(blockedHelp.status, 429);
  assert.deepEqual(calls, [], 'no siteverify, no Slack, no email when limited');
  assert.deepEqual(keys, ['contact:203.0.113.7', 'help:203.0.113.7']);
  // a limiter error never blocks a visitor
  const broken = { limit: async () => { throw new Error('boom'); } };
  assert.equal((await handleContactRequest(post(VALID), env({ CONTACT_RL: broken }))).status, 200);
});

// ---- handleHelpRequest (help mode) ----------------------------------------------------
test('help: own Slack channel, confirmation email, never Notion or the audience', async () => {
  replies['challenges.cloudflare.com'] = () => Response.json(VERIFIED_HELP);
  const pending = [];
  const res = await handleHelpRequest(
    postHelp(HELP),
    helpEnv({
      SLACK_WEBHOOK_URL: SLACK,
      NOTION_TOKEN: 'ntn_x',
      NOTION_DATA_SOURCE_ID: DATA_SOURCE,
      RESEND_API_KEY: 're_full',
      RESEND_AUDIENCE_ID: 'aud-1',
      BOOKING_URL: SCHEDULE,
    }),
    { waitUntil: (p) => pending.push(p) },
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true }, 'no booking step for help requests');
  await Promise.all(pending);
  assert.deepEqual(urls(), [
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    SLACK_HELP,
    'https://api.resend.com/emails',
  ]);
  const slack = jsonOf(calls[1]);
  assert.equal(slack.blocks[0].text.text, ':large_orange_circle: Help request: High');
  const mail = jsonOf(calls[2]);
  assert.equal(mail.subject, MAIL_COPY.de.help.subject);
  assert.deepEqual(mail.to, ['anna@example.org']);
  assert.equal(mail.tags[0].value, 'help_confirmation');
});

test('help: token bound to the help cData, separate webhook required', async () => {
  // a lead-form token (cData contact-form) is not accepted here
  const wrong = await handleHelpRequest(postHelp(HELP), helpEnv());
  assert.deepEqual([wrong.status, (await wrong.json()).error], [403, 'turnstile_mismatch']);
  replies['challenges.cloudflare.com'] = () => Response.json(VERIFIED_HELP);
  const unconfigured = await handleHelpRequest(postHelp(HELP), helpEnv({ SLACK_HELP_WEBHOOK_URL: '', SLACK_WEBHOOK_URL: SLACK }));
  assert.deepEqual([unconfigured.status, (await unconfigured.json()).error], [503, 'help_unconfigured']);
  assert.ok(!urls().includes(SLACK), 'never falls back to the leads channel');
  replies[SLACK_HELP] = () => new Response('no', { status: 500 });
  await quietErrors(async () => {
    const failed = await handleHelpRequest(postHelp(HELP), helpEnv({ RESEND_API_KEY: 're_full' }));
    assert.deepEqual([failed.status, (await failed.json()).error], [502, 'help_delivery_failed']);
  });
  assert.ok(!hosts().includes('api.resend.com'), 'no confirmation for an undelivered request');
  const invalid = await handleHelpRequest(postHelp({ ...HELP, urgency: 'x' }), helpEnv());
  assert.equal(invalid.status, 400);
  const noSecret = await handleHelpRequest(postHelp(HELP), helpEnv({ TURNSTILE_SECRET: undefined }));
  assert.deepEqual([noSecret.status, (await noSecret.json()).error], [503, 'turnstile_unconfigured']);
});

// ---- confirmation emails ---------------------------------------------------------------
const leadFixture = (locale, extra = {}) => ({ ...parseContact({ ...VALID, locale }), ...extra });
const helpFixture = (locale, extra = {}) => ({ ...parseHelp({ ...HELP, locale }), ...extra });

test('confirmation emails: structure and localization in all 4 locales', () => {
  for (const locale of ['en', 'pl', 'de', 'fr']) {
    for (const [kind, mail] of [
      ['lead', renderLeadConfirmation(leadFixture(locale), { booking: `${SCHEDULE}?gv=true`, year: 2026 })],
      ['help', renderHelpConfirmation(helpFixture(locale), { year: 2026 })],
    ]) {
      const copy = MAIL_COPY[locale];
      assert.equal(mail.subject, copy[kind].subject);
      assert.ok(mail.html.startsWith('<!DOCTYPE html'), `${locale} ${kind}`);
      assert.ok(mail.html.includes(`<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="${locale}" dir="ltr">`));
      assert.ok(mail.html.includes(`role="article" aria-roledescription="email"`) && mail.html.includes(`lang="${locale}" dir="ltr" style="font-size:max(16px,1rem)"`));
      assert.equal((mail.html.match(/<h1\b/g) || []).length, 1, 'exactly one h1');
      assert.ok(!/<table(?![^>]*role="presentation")/.test(mail.html), 'every table is role=presentation');
      assert.ok(mail.html.includes(copy.closing) && mail.text.includes(copy.closing), 'thanks + have a nice day');
      assert.ok(mail.html.includes('https://signature.cat/legal#privacy'));
      // art. 21(4) GDPR: the right to object, in its own paragraph, at the first communication
      assert.ok(mail.html.includes(`<p style="margin:0 0 6px">${copy.objection.replace("'", '&#39;')}</p>`) && mail.text.includes(copy.objection), `${locale} ${kind} objection`);
      assert.ok(mail.html.length < 80 * 1024, 'well under Gmail clipping');
      assert.ok(!/unsubscribe/i.test(mail.html), 'transactional: no unsubscribe link');
      assert.ok(!mail.html.includes('style="font-family:ui-sans-serif,system-ui,-apple-system,"'), 'font stack never breaks style=""');
    }
  }
  const pl = renderLeadConfirmation(leadFixture('pl'), { year: 2026 });
  assert.ok(pl.html.includes('121-300 pracowników') && pl.html.includes('Indywidualna wycena'));
  assert.ok(!pl.html.includes('Wybierz termin'), 'no booking block without BOOKING_URL');
  const de = renderHelpConfirmation(helpFixture('de'), { year: 2026 });
  assert.ok(de.html.includes('Hoch - das Problem blockiert einen Teil des Teams'));
  assert.ok(!de.html.includes('>Telefon<'), 'empty optional phone row is skipped');
});

test('confirmation emails: user input is escaped, line breaks kept, opt-in line only with consent', () => {
  const evil = {
    name: 'Eve <img src=x onerror=alert(1)> "q"',
    company: 'Acme & <b>Co</b>',
    message: 'line one\n<script>alert(1)</script>\nline $& three',
  };
  const lead = renderLeadConfirmation(leadFixture('en', evil), { year: 2026 });
  for (const raw of ['<img src=x', '<script>', '<b>Co</b>']) assert.ok(!lead.html.includes(raw), raw);
  assert.ok(lead.html.includes('Acme &amp; &lt;b&gt;Co&lt;/b&gt;'));
  assert.ok(lead.html.includes('line one<br />&lt;script&gt;alert(1)&lt;/script&gt;<br />line $&amp; three'));
  assert.ok(lead.html.includes('Thank you, Eve!'), 'greets by first name');
  assert.ok(lead.html.includes(MAIL_COPY.en.lead.optIn));
  const noOptIn = renderLeadConfirmation(leadFixture('en', { marketing: false }), { year: 2026 });
  assert.ok(!noOptIn.html.includes(MAIL_COPY.en.lead.optIn) && !noOptIn.text.includes(MAIL_COPY.en.lead.optIn));
  const help = renderHelpConfirmation(helpFixture('fr', { message: '<a href="https://phish.example">x</a> long enough' }), { year: 2026 });
  assert.ok(!help.html.includes('<a href="https://phish.example">'));
});

test('confirmation email copy passes the no-AI-tell typography rule (copy + rendered output)', () => {
  const walk = (v, path) => {
    if (typeof v === 'string') assert.ok(!FORBIDDEN.test(v), `${path}: ${v}`);
    else for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
  };
  walk(MAIL_COPY, 'MAIL_COPY');
  for (const locale of ['en', 'pl', 'de', 'fr']) {
    for (const mail of [
      renderLeadConfirmation(leadFixture(locale), { booking: `${SCHEDULE}?gv=true`, year: 2026 }),
      renderHelpConfirmation(helpFixture(locale), { year: 2026 }),
    ]) {
      assert.ok(!FORBIDDEN.test(mail.html), `${locale} html`);
      assert.ok(!FORBIDDEN.test(mail.text), `${locale} text`);
      assert.ok(!/&(?:mdash|ndash|nbsp|zwnj|laquo|raquo|ldquo|rdquo|bdquo);/.test(mail.html), `${locale} entities`);
    }
  }
  assert.deepEqual(Object.keys(MAIL_COPY), ['en', 'pl', 'de', 'fr']);
  const shape = (o) => JSON.stringify(Object.keys(o).sort().map((k) => [k, typeof o[k] === 'object' ? shape(o[k]) : 's']));
  for (const locale of ['pl', 'de', 'fr']) assert.equal(shape(MAIL_COPY[locale]), shape(MAIL_COPY.en), `${locale} copy has the en keys`);
});

// ---- routing + CSP -------------------------------------------------------------------
test('the Worker source never builds a legacy /audiences/ Resend path', () => {
  const src = readFileSync(new URL('./worker.js', import.meta.url), 'utf8');
  assert.ok(!/api\.resend\.com\/audiences|\/audiences\/\$\{/.test(src));
});

test('the Worker routes both form endpoints before canonicalization', async () => {
  for (const path of ['/api/contact-requests', '/api/help-requests']) {
    const res = await worker.fetch(new Request(`https://signature.cat${path}`), env(), {});
    assert.equal(res.status, 405, path);
    assert.equal(res.headers.get('Content-Type'), 'application/json');
    assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
  }
});

test('CSP frames only Turnstile and the Google Calendar booking page', () => {
  const frameSrc = buildCsp('n').split('; ').find((d) => d.startsWith('frame-src'));
  assert.equal(frameSrc, "frame-src 'self' https://challenges.cloudflare.com https://calendar.google.com");
});

test('CSP allows Google Tag Manager, the GA4 it loads and Preview Mode - still no inline or eval scripts', () => {
  const csp = Object.fromEntries(buildCsp('n').split('; ').map((d) => [d.split(' ')[0], d.split(' ').slice(1)]));
  // Google's "Use Tag Manager with a Content Security Policy" guide:
  // container, GA4 without Ads features, Preview Mode.
  const needed = {
    'script-src': ["'nonce-n'", 'https://www.googletagmanager.com', 'https://tagmanager.google.com'],
    'style-src': ['https://www.googletagmanager.com', 'https://tagmanager.google.com', 'https://fonts.googleapis.com'],
    'img-src': ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://ssl.gstatic.com', 'https://www.gstatic.com'],
    'connect-src': ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.google.com'],
    'font-src': ['https://fonts.gstatic.com', 'data:'],
  };
  for (const [directive, sources] of Object.entries(needed)) {
    for (const source of sources) assert.ok(csp[directive].includes(source), `${directive} allows ${source}`);
  }
  assert.ok(!csp['script-src'].includes("'unsafe-inline'"), 'inline scripts need the nonce');
  assert.ok(!buildCsp('n').includes("'unsafe-eval'"), 'no eval: GTM Custom JavaScript variables stay off');
  assert.deepEqual(csp['frame-ancestors'], ["'none'"]);
});

// ---- consent banner + Google Tag Manager (basic consent mode) ----------------------------
// Runs the injected consent script against a minimal DOM stub: proves that
// nothing is requested from Google before opt-in, and that GTM starts after
// the consent defaults with the request nonce on gtm.js.
function consentPage({ cookie = '', nonce = 'N0nce+/=' } = {}) {
  const script = bannerHtml('en', nonce).match(/<script nonce="[^"]*">([\s\S]*?)<\/script>/)[1];
  let jar = cookie ? cookie.split('; ') : [];
  const writes = [];
  const appended = [];
  const clicks = {};
  const node = (id) => ({ id, hidden: true, checked: false, focus() {}, addEventListener: (type, fn) => { clicks[id] = fn; } });
  const nodes = Object.fromEntries(['sigcat-cookies', 'scc-analytics', 'scc-accept', 'scc-necessary', 'scc-save'].map((id) => [id, node(id)]));
  const document = {
    getElementById: (id) => nodes[id] || null,
    createElement: (tag) => ({ tag, attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } }),
    head: { appendChild: (el) => appended.push(el) },
    addEventListener() {},
    dispatchEvent: () => true,
    get cookie() { return jar.join('; '); },
    set cookie(value) {
      writes.push(value);
      const pair = value.split(';')[0];
      jar = jar.filter((c) => c.split('=')[0] !== pair.split('=')[0]);
      if (!/Max-Age=0(;|$)/.test(value)) jar.push(pair);
    },
  };
  const window = {};
  class CustomEvent { constructor(type, init) { this.type = type; this.detail = init && init.detail; } }
  vm.runInNewContext(script, { window, document, CustomEvent });
  return {
    window,
    nodes,
    appended,
    writes,
    get jar() { return jar; },
    click: (id) => clicks[id](),
    // gtag() pushes `arguments` objects; normalize both entry kinds across the vm realm
    layer: () => (window.dataLayer || []).map((e) => JSON.parse(JSON.stringify(typeof e.length === 'number' ? Array.from(e) : e))),
  };
}
const GTM_SRC = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;

test('consent script: nothing reaches Google before opt-in; "Accept all" starts GTM after the consent defaults', () => {
  const page = consentPage();
  assert.equal(page.nodes['sigcat-cookies'].hidden, false, 'banner shown without a stored choice');
  assert.equal(page.window.sigcatConsent.analytics, null);
  assert.equal(page.appended.length, 0, 'no script before consent');
  assert.equal(page.window.dataLayer, undefined, 'no dataLayer before consent');

  page.click('scc-accept');
  assert.equal(page.nodes['sigcat-cookies'].hidden, true);
  assert.ok(page.writes.includes('sigcat_consent=v1:a1; Max-Age=31536000; Path=/; SameSite=Lax; Secure'));
  assert.equal(page.appended.length, 1);
  const [gtm] = page.appended;
  assert.equal(gtm.tag, 'script');
  assert.equal(gtm.async, true);
  assert.equal(gtm.src, GTM_SRC);
  assert.equal(gtm.attrs.nonce, 'N0nce+/=', 'nonce-aware loader: GTM propagates it to the scripts it injects');
  const layer = page.layer();
  assert.deepEqual(
    layer[0],
    ['consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }],
    'consent defaults come first',
  );
  assert.equal(layer[1].event, 'gtm.js', 'then the container start event');
  assert.equal(typeof layer[1]['gtm.start'], 'number');
  assert.deepEqual(layer.at(-1), ['consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied' }]);

  page.click('scc-save'); // same choice again
  assert.equal(page.appended.length, 1, 'the container is loaded once');
});

test('consent script: a stored opt-in loads GTM at once, a stored opt-out never does', () => {
  const optedIn = consentPage({ cookie: 'sigcat_consent=v1:a1' });
  assert.equal(optedIn.nodes['sigcat-cookies'].hidden, true);
  assert.deepEqual(optedIn.appended.map((s) => s.src), [GTM_SRC]);
  const optedOut = consentPage({ cookie: 'sigcat_consent=v1:a0' });
  assert.equal(optedOut.nodes['sigcat-cookies'].hidden, true);
  assert.equal(optedOut.window.sigcatConsent.analytics, false);
  assert.equal(optedOut.appended.length, 0);
  assert.equal(optedOut.window.dataLayer, undefined);
});

test('consent script: withdrawing consent denies analytics and deletes the GA cookies', () => {
  const page = consentPage({ cookie: 'sigcat_consent=v1:a1; _ga=GA1.1.1; _ga_8M16LHQXQP=GS1.1; sigcat_locale=pl' });
  page.click('scc-necessary');
  assert.deepEqual(page.layer().at(-1), ['consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' }]);
  for (const name of ['_ga', '_ga_8M16LHQXQP']) {
    assert.ok(page.writes.includes(`${name}=; Max-Age=0; Path=/; Domain=.signature.cat; SameSite=Lax; Secure`), name);
  }
  assert.deepEqual(page.jar, ['sigcat_locale=pl', 'sigcat_consent=v1:a0']);
  assert.equal(page.appended.length, 1, 'no second container');
});

test('consent banner ships no pre-consent Google markup (no <noscript> iframe, no direct gtag.js)', () => {
  assert.match(GTM_CONTAINER_ID, /^GTM-[A-Z0-9]+$/);
  for (const lang of ['en', 'pl', 'de', 'fr']) {
    const html = bannerHtml(lang, 'n');
    assert.ok(!/<noscript|<iframe|ns\.html/i.test(html), `${lang}: a noscript GTM iframe would load without consent`);
    assert.ok(!html.includes('gtag/js') && !html.includes("gtag('config'"), `${lang}: GA4 is configured in GTM`);
    assert.equal(html.match(/googletagmanager\.com/g).length, 1, `${lang}: only the post-consent gtm.js loader`);
  }
});

test('contact form sends the lead conversion to the GTM dataLayer, only with analytics consent', () => {
  const form = readFileSync(new URL('../assets/js/contact-form.js', import.meta.url), 'utf8');
  assert.match(
    form,
    /mode === 'lead' && window\.sigcatConsent && window\.sigcatConsent\.analytics === true && Array\.isArray\(window\.dataLayer\)\) \{\s*window\.dataLayer\.push\(\{ event: 'generate_lead', form_topic: topic \}\);/,
  );
  assert.ok(!/gtag\(/.test(form), 'no direct gtag() calls: GA4 is configured in GTM');
});

// ---- banner-lead gate (regressions) ------------------------------------------------------
test('banner leads keep their contract (+ User-Agent on the Resend call)', async () => {
  const lead = (body) => new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify(body) });
  const cfg = { TURNSTILE_SECRET: 's', RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' };
  assert.equal((await handleBannerLead(lead({ email: 'a@b.co', consent: false }), cfg)).status, 400);
  assert.equal((await handleBannerLead(lead({ email: 'a@b.co', consent: true }), cfg)).status, 403);
  const unconfigured = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), { TURNSTILE_SECRET: 's' });
  assert.deepEqual([unconfigured.status, (await unconfigured.json()).error], [503, 'lead_capture_unconfigured']);
  calls = [];
  const ok = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), cfg);
  assert.equal(ok.status, 200);
  assert.deepEqual(jsonOf(resendCreate()), { email: 'a@b.co', unsubscribed: false, segments: [{ id: 'aud-1' }] });
  assert.equal(calls.at(-1).url, membershipUrl(CONTACT_ID, 'aud-1'));
  for (const c of calls.filter((x) => x.url.startsWith(RESEND_CONTACTS))) assert.ok(c.init.headers['User-Agent']);
  noLegacyAudienceCalls();
  replies['api.resend.com'] = () => new Response('x', { status: 500 });
  let failed;
  const logs = await quietErrors(async () => {
    failed = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), cfg);
  });
  assert.equal(failed.status, 502);
  assert.match(logs, /banner gate: Resend contact answered 500$/m);
});

test('banner gate stays best-effort: no fail-closed, no token binding', async () => {
  const lead = (body) => new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify(body) });
  replies['challenges.cloudflare.com'] = () => Response.json({ success: true, hostname: 'signature.cat' });
  const bound = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), {
    TURNSTILE_SECRET: 's', RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1',
  });
  assert.equal(bound.status, 200);
  calls = [];
  const open = await handleBannerLead(lead({ email: 'a@b.co', consent: true }), { RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' });
  assert.equal(open.status, 200);
  assert.deepEqual(urls(), [RESEND_CONTACTS, membershipUrl(CONTACT_ID, 'aud-1')]);
});

// ---- review hardening -------------------------------------------------------------------
test('invisible, bidi and control characters are stripped before validation', () => {
  const lead = parseContact({
    ...VALID,
    name: 'Jan\u00AD Kowal\u200Bski\u2066',
    company: 'Acme\u202E\u0007 Co',
    message: 'a\u200B\u200B\u0000b\r\n\r\n\r\nc',
  });
  assert.deepEqual([lead.name, lead.company, lead.message], ['Jan Kowalski', 'Acme Co', 'ab\n\nc']);
  assert.equal(parseContact({ ...VALID, company: '\u200B\u200B\uFEFF' }), null, 'a company made of invisible characters is empty');
  assert.equal(parseHelp({ ...HELP, message: '\u200B'.repeat(40) }), null, 'an invisible description is too short');
  const src = readFileSync(new URL('./worker.js', import.meta.url), 'utf8');
  const form = readFileSync(new URL('../assets/js/contact-form.js', import.meta.url), 'utf8');
  const invisible = /INVISIBLE_RE = (\/.*\/g);/;
  assert.equal(form.match(invisible)[1], src.match(invisible)[1], 'the form mirrors the Worker normalization');
  const email = readFileSync(new URL('./confirmation-email.js', import.meta.url), 'utf8');
  const firstName = /(\/\^\[\\p\{L\}\].*?\/u)\.test/;
  assert.equal(form.match(firstName)[1], email.match(firstName)[1], 'the thank-you screen greets by the same first-name rule');
  for (const [name, text] of [['worker.js', src], ['contact-form.js', form]]) {
    assert.ok(!/[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/.test(text), `${name}: no raw invisible characters`);
  }
});

test('Slack renders user text verbatim (no @channel / #channel / URL linking)', () => {
  const lead = parseContact({ ...VALID, company: '@channel', message: '@here see #general' });
  const msg = contactSlackMessage(lead, { notion: { status: 'created' } });
  assert.ok(msg.blocks[1].fields.every((f) => f.verbatim === true));
  assert.equal(msg.blocks[2].text.verbatim, true);
  const help = helpSlackMessage(parseHelp(HELP));
  assert.ok(help.blocks[1].fields.every((f) => f.verbatim === true) && help.blocks[2].text.verbatim === true);
});

test('a body without Content-Length is still capped while streaming', async () => {
  const chunk = new TextEncoder().encode(JSON.stringify({ ...VALID, message: 'x'.repeat(1999) }));
  const stream = new ReadableStream({
    pull(c) {
      c.enqueue(chunk);
      if (++this.n > 20) c.close();
    },
    start() {
      this.n = 0;
    },
  });
  const req = new Request('https://signature.cat/api/contact-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.7' },
    body: stream,
    duplex: 'half',
  });
  assert.equal(req.headers.get('Content-Length'), null);
  const res = await handleContactRequest(req, full());
  assert.deepEqual([res.status, (await res.json()).error], [413, 'payload_too_large']);
  assert.deepEqual(calls, []);
});

test('rate-limit keys: IPv4 as is, IPv6 by /64', async () => {
  assert.equal(rateLimitIpKey('203.0.113.7'), '203.0.113.7');
  assert.equal(rateLimitIpKey('2001:db8:1:2:3:4:5:6'), '2001:0db8:0001:0002::/64');
  assert.equal(rateLimitIpKey('2001:DB8:1:2::99'), '2001:0db8:0001:0002::/64', 'same /64, same bucket');
  assert.equal(rateLimitIpKey('2001:db8::1'), '2001:0db8:0000:0000::/64');
  assert.equal(rateLimitIpKey('::1'), '0000:0000:0000:0000::/64');
  const keys = [];
  const limiter = { limit: async ({ key }) => (keys.push(key), { success: false }) };
  await handleContactRequest(post(VALID, undefined, { 'CF-Connecting-IP': '2001:db8:1:2:aaaa::1' }), full({ CONTACT_RL: limiter }));
  assert.deepEqual(keys, ['contact:2001:0db8:0001:0002::/64']);
});

test('confirmation emails: one per recipient per minute (CONTACT_RCPT_RL), request still delivered', async () => {
  const keys = [];
  const limiter = { limit: async ({ key }) => (keys.push(key), { success: false }) };
  let res;
  const logs = await quietErrors(async () => {
    res = await handleContactRequest(post({ ...VALID, email: 'Jan@Example.com' }), full({ CONTACT_RCPT_RL: limiter }));
  });
  assert.equal(res.status, 200);
  assert.ok(urls().includes(SLACK) && hosts().includes('api.notion.com'), 'lead delivered');
  assert.ok(!urls().includes('https://api.resend.com/emails'), 'no confirmation email');
  assert.ok(urls().includes(RESEND_CONTACTS), 'the opt-in is not a confirmation');
  noLegacyAudienceCalls();
  assert.deepEqual(keys, ['rcpt:jan@example.com']);
  assert.match(logs, /recipient rate limit/);
  replies['challenges.cloudflare.com'] = () => Response.json(VERIFIED_HELP);
  calls = [];
  await quietErrors(async () => {
    res = await handleHelpRequest(postHelp(HELP), helpEnv({ RESEND_API_KEY: 're_full', CONTACT_RCPT_RL: limiter }));
  });
  assert.equal(res.status, 200);
  assert.deepEqual(urls(), ['https://challenges.cloudflare.com/turnstile/v0/siteverify', SLACK_HELP]);
});

test('Notion: no definite answer is UNCONFIRMED, a 503 with a committed page is a row', async () => {
  const note = async () => {
    calls = [];
    await quietErrors(async () => {
      assert.equal((await handleContactRequest(post(VALID), full())).status, 200);
    });
    return jsonOf(calls.find((c) => c.url === SLACK)).blocks.at(-1).elements[0].text;
  };
  replies['api.notion.com'] = new TypeError('network down');
  assert.match(await note(), /Notion: :warning: UNCONFIRMED \(unreachable\) - check Notion before adding the row by hand/);
  replies['api.notion.com'] = () => new Response('bad gateway', { status: 502 });
  assert.match(await note(), /Notion: :warning: UNCONFIRMED \(HTTP 502/);
  replies['api.notion.com'] = () =>
    Response.json({ object: 'error', status: 503, code: 'service_unavailable', additional_data: { committed_resource_id: 'page-9' } }, { status: 503 });
  assert.match(await note(), /Notion: row added/);
  replies['api.notion.com'] = () => Response.json({ object: 'error', status: 409, code: 'conflict_error' }, { status: 409 });
  assert.match(await note(), /Notion: :warning: FAILED \(HTTP 409 conflict_error\) - add the row by hand/);
});

test('confirmation emails: echoed free text cannot become a link or a spoofed greeting', () => {
  const lead = renderLeadConfirmation(
    leadFixture('en', {
      name: 'www.evil.example Kowalski',
      company: 'evil-login.com',
      message: 'Verify at https://evil.example/login now',
      email: 'jan@example.com',
    }),
    { year: 2026 },
  );
  assert.match(lead.html, new RegExp(`<h1[^>]*>${MAIL_COPY.en.greetingNoName}</h1>`), 'no first name that looks like a domain');
  for (const mail of [lead.html, lead.text]) {
    for (const raw of ['www.evil.example', 'evil-login.com', 'https://evil.example']) assert.ok(!mail.includes(raw), raw);
    assert.ok(mail.includes('www[.]evil[.]example Kowalski') && mail.includes('evil-login[.]com'));
    assert.ok(mail.includes('https[://]evil[.]example/login'));
    assert.ok(mail.includes('jan@example.com'), 'the email row is the real address');
  }
  assert.ok(renderLeadConfirmation(leadFixture('en', { company: 'Acme Sp. z o.o.' }), { year: 2026 }).html.includes('Acme Sp. z o.o.'), 'abbreviations stay');
  for (const [name, greeting] of [['Jean-Luc Picard', 'Jean-Luc'], ["Zoë O'Neil", 'Zoë'], ['Łukasz Nowak', 'Łukasz']]) {
    const html = renderLeadConfirmation(leadFixture('en', { name }), { year: 2026 }).html;
    assert.ok(html.includes(`Thank you, ${greeting.replace("'", '&#39;')}!`), name);
  }
  for (const locale of ['en', 'pl', 'de', 'fr']) {
    const help = renderHelpConfirmation(helpFixture(locale, { name: 'http://x.example', message: 'see bit.ly/abc for the screenshot' }), { year: 2026 });
    assert.ok(help.html.includes(`>${MAIL_COPY[locale].greetingNoName.replace("'", '&#39;')}</h1>`), locale);
    assert.ok(!help.html.includes('bit.ly/abc') && help.html.includes('bit[.]ly/abc'), locale);
  }
});

test('confirmation emails: opt-in footer says how to get removed; long addresses wrap', () => {
  const optIn = renderLeadConfirmation(leadFixture('en', { marketing: true }), { year: 2026 });
  const noOptIn = renderLeadConfirmation(leadFixture('en', { marketing: false }), { year: 2026 });
  assert.ok(optIn.html.includes(MAIL_COPY.en.lead.whyOptIn) && optIn.text.includes(MAIL_COPY.en.lead.whyOptIn));
  assert.ok(!optIn.html.includes(MAIL_COPY.en.lead.why));
  assert.ok(noOptIn.html.includes(MAIL_COPY.en.lead.why) && !noOptIn.html.includes(MAIL_COPY.en.lead.whyOptIn));
  for (const locale of ['en', 'pl', 'de', 'fr']) assert.ok(MAIL_COPY[locale].lead.whyOptIn.length > MAIL_COPY[locale].lead.why.length, locale);
  const long = renderLeadConfirmation(leadFixture('en', { email: `${'a'.repeat(60)}@${'b'.repeat(60)}.example.com` }), { year: 2026 });
  const intro = long.html.match(/<p class="sc-text" style="([^"]*)">[^<]*a{60}@/)[1];
  assert.match(intro, /overflow-wrap:break-word;word-break:break-word/);
});

// ---- confirmation email diagnostics ---------------------------------------------------------
const captureLogs = async (fn) => {
  const orig = { log: console.log, error: console.error };
  const lines = [];
  console.log = (...a) => lines.push(a.join(' '));
  console.error = (...a) => lines.push(a.join(' '));
  try {
    await fn();
  } finally {
    console.log = orig.log;
    console.error = orig.error;
  }
  return lines.join('\n');
};

test('confirmation email: a Worker without a Resend key says so in the logs (never silent)', async () => {
  let res;
  const logs = await captureLogs(async () => {
    res = await handleContactRequest(post({ ...VALID, marketing: false }), env());
  });
  assert.equal(res.status, 200, 'the lead itself is still delivered');
  assert.ok(!hosts().includes('api.resend.com'));
  assert.match(logs, /confirmation email skipped - no RESEND_SEND_API_KEY or RESEND_API_KEY on the Worker/);
});

test('confirmation email: an accepted send is logged with the Resend id, never the address', async () => {
  replies['https://api.resend.com/emails'] = () => Response.json({ id: 'b1a2c3d4-0000-4000-8000-00000000abcd' });
  let res;
  const logs = await captureLogs(async () => {
    res = await handleContactRequest(post({ ...VALID, marketing: false }), full());
  });
  assert.equal(res.status, 200);
  assert.match(logs, /confirmation email accepted by Resend \(id b1a2c3d4-0000-4000-8000-00000000abcd\)/);
  assert.doesNotMatch(logs, /jan@example\.com/);
});

test('wrangler.toml persists Workers Logs (console output) without invocation logs', () => {
  const toml = readFileSync(new URL('./wrangler.toml', import.meta.url), 'utf8');
  const block = toml.match(/^\[observability\]\n([\s\S]*?)(?=^\[\[|^\[(?!observability))/m);
  assert.ok(block, '[observability] block present');
  assert.match(block[0], /^enabled = true$/m);
  assert.match(block[0], /^head_sampling_rate = 1$/m);
  assert.match(block[0], /^\s*\[observability\.logs\]\n\s*invocation_logs = false$/m);
});
