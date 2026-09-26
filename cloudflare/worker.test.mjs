// Unit tests for the edge Worker's API handlers (zero dependencies).
// Run from the repo root:  node --test cloudflare/worker.test.mjs
// Outbound calls (Slack, Resend, Turnstile siteverify) are stubbed through
// globalThis.fetch - nothing leaves the machine.
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import worker, {
  buildCsp,
  bookingEmbedUrl,
  CONTACT_TURNSTILE,
  contactSlackMessage,
  handleBannerLead,
  handleContactRequest,
  parseContact,
} from './worker.js';

const SLACK = 'https://hooks.slack.com/services/T000/B000/XXXX';
const SCHEDULE = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0test';
const VALID = {
  name: '  Jan   Kowalski ',
  email: 'jan@example.com',
  phone: '+48 600 100 200',
  size: '121-300',
  message: 'Two domains,\r\n\r\n\r\n\r\nthree languages.',
  topic: 'pricing',
  locale: 'pl',
  marketing: true,
  'cf-turnstile-response': 'token-ok',
};

// What siteverify answers for a token solved in the contact form on
// signature.cat (success + the fields the endpoint binds the token to).
const VERIFIED = { success: true, hostname: 'signature.cat', ...CONTACT_TURNSTILE };

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
    const reply = replies[host];
    if (reply instanceof Error) throw reply;
    if (reply) return reply(url, init);
    if (host === 'challenges.cloudflare.com') return Response.json(VERIFIED);
    return new Response('ok', { status: 200 });
  };
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = (body, headers = {}) =>
  new Request('https://signature.cat/api/contact-requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
const hosts = () => calls.map((c) => new URL(c.url).hostname);
const env = (extra = {}) => ({ SLACK_WEBHOOK_URL: SLACK, TURNSTILE_SECRET: 's3cret', ...extra });

// ---- parseContact ------------------------------------------------------------
test('parseContact normalizes a valid payload', () => {
  assert.deepEqual(parseContact(VALID), {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    phone: '+48 600 100 200',
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
    { phone: '+48 600 100 200 ext 4' },
    { phone: '(((((())))))' },
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
  assert.equal(parseContact({ ...VALID, message: undefined }).message, '');
});

// ---- bookingEmbedUrl ---------------------------------------------------------
test('bookingEmbedUrl accepts only Google Calendar appointment pages', () => {
  assert.equal(bookingEmbedUrl(SCHEDULE), `${SCHEDULE}?gv=true`);
  assert.equal(bookingEmbedUrl(` ${SCHEDULE}?gv=true `), `${SCHEDULE}?gv=true`);
  for (const bad of [
    undefined,
    '',
    'not a url',
    'http://calendar.google.com/calendar/appointments/schedules/x',
    'https://calendar.app.google/abc',
    'https://evil.example/calendar/appointments/schedules/x',
    'https://calendar.google.com/calendar/embed?src=x',
  ]) {
    assert.equal(bookingEmbedUrl(bad), '', String(bad));
  }
});

// ---- Slack message -----------------------------------------------------------
test('contactSlackMessage escapes user input and caps the message', () => {
  const lead = parseContact({ ...VALID, name: 'Eve <!channel> & co', message: '&'.repeat(2000) });
  const msg = contactSlackMessage(lead, { booking: true });
  const text = JSON.stringify(msg);
  assert.ok(!text.includes('<!channel>'));
  assert.ok(text.includes('Eve &lt;!channel&gt; &amp; co'));
  assert.equal(msg.blocks[0].text.text, 'New contact request: Custom pricing');
  const body = msg.blocks[2].text.text;
  assert.ok(body.length <= 3000, `message block is ${body.length} chars`);
  assert.match(msg.blocks.at(-1).elements[0].text, /Marketing opt-in: yes \| Booking calendar shown: yes/);
  assert.equal(msg.unfurl_links, false);
  const noMessage = contactSlackMessage(parseContact({ ...VALID, message: '' }));
  assert.equal(noMessage.blocks.length, 3); // header, fields, context
});

// ---- handleContactRequest ----------------------------------------------------
test('contact: happy path posts to Slack, opts into Resend, returns the booking page', async () => {
  const pending = [];
  const res = await handleContactRequest(
    post(VALID),
    env({ BOOKING_URL: SCHEDULE, RESEND_API_KEY: 're_x', RESEND_AUDIENCE_ID: 'aud-1' }),
    { waitUntil: (p) => pending.push(p) },
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, booking: `${SCHEDULE}?gv=true` });
  assert.equal(res.headers.get('Cache-Control'), 'no-store');
  await Promise.all(pending);
  assert.deepEqual(hosts(), ['challenges.cloudflare.com', 'hooks.slack.com', 'api.resend.com']);
  const verify = calls[0].init.body;
  assert.equal(verify.get('secret'), 's3cret');
  assert.equal(verify.get('response'), 'token-ok');
  const slack = JSON.parse(calls[1].init.body);
  assert.match(slack.text, /Custom pricing\): Jan Kowalski, 121-300 employees/);
  assert.equal(calls[2].url, 'https://api.resend.com/audiences/aud-1/contacts');
  assert.deepEqual(JSON.parse(calls[2].init.body), {
    email: 'jan@example.com',
    first_name: 'Jan',
    last_name: 'Kowalski',
    unsubscribed: false,
  });
});

test('contact: no marketing opt-in = no Resend call, no booking key without BOOKING_URL', async () => {
  const res = await handleContactRequest(
    post({ ...VALID, marketing: false }),
    env({ RESEND_API_KEY: 're_x', RESEND_AUDIENCE_ID: 'aud-1' }),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.deepEqual(hosts(), ['challenges.cloudflare.com', 'hooks.slack.com']);
});

test('contact: RESEND_CONTACT_AUDIENCE_ID wins, Resend failure never fails the request', async () => {
  replies['api.resend.com'] = () => new Response('nope', { status: 422 });
  const errors = [];
  const origError = console.error;
  console.error = (...a) => errors.push(a.join(' '));
  try {
    const res = await handleContactRequest(
      post(VALID),
      env({ RESEND_API_KEY: 're_x', RESEND_AUDIENCE_ID: 'aud-1', RESEND_CONTACT_AUDIENCE_ID: 'aud-2' }),
    );
    assert.equal(res.status, 200);
  } finally {
    console.error = origError;
  }
  assert.equal(calls.at(-1).url, 'https://api.resend.com/audiences/aud-2/contacts');
  assert.match(errors.join('\n'), /Resend answered 422/);
});

test('contact: request errors', async () => {
  const get = new Request('https://signature.cat/api/contact-requests');
  assert.equal((await handleContactRequest(get, env())).status, 405);
  assert.equal((await handleContactRequest(post('{nope'), env())).status, 400);
  const invalid = await handleContactRequest(post({ ...VALID, email: 'x' }), env());
  assert.deepEqual([invalid.status, (await invalid.json()).error], [400, 'invalid_payload']);
  const big = await handleContactRequest(post({ ...VALID, message: 'x'.repeat(20000) }), env());
  assert.equal(big.status, 413);
  assert.deepEqual(calls, []); // nothing forwarded for any of these
});

test('contact: a verified Turnstile token is required', async () => {
  const { 'cf-turnstile-response': _drop, ...noToken } = VALID;
  const missing = await handleContactRequest(post(noToken), env());
  assert.deepEqual([missing.status, (await missing.json()).error], [403, 'turnstile_required']);

  replies['challenges.cloudflare.com'] = () =>
    Response.json({ success: false, 'error-codes': ['invalid-input-response'] });
  const failed = await handleContactRequest(post(VALID), env());
  assert.deepEqual([failed.status, (await failed.json()).error], [403, 'turnstile_failed']);

  replies['challenges.cloudflare.com'] = new TypeError('network down');
  const down = await handleContactRequest(post(VALID), env());
  assert.deepEqual([down.status, (await down.json()).error], [503, 'turnstile_unavailable']);
  assert.ok(!hosts().includes('hooks.slack.com'), 'Slack must not be called without a passed check');
});

test('contact: fails closed without TURNSTILE_SECRET', async () => {
  const { 'cf-turnstile-response': _drop, ...noToken } = VALID;
  for (const body of [VALID, noToken]) {
    const res = await handleContactRequest(post(body), env({ TURNSTILE_SECRET: undefined }));
    assert.deepEqual([res.status, (await res.json()).error], [503, 'turnstile_unconfigured']);
  }
  assert.deepEqual(calls, []); // no siteverify, no Slack, no Resend
});

test('contact: the token must be bound to this host, the widget action and the form cData', async () => {
  for (const wrong of [
    { hostname: 'localhost' }, // solved on a dev page with the same sitekey
    { hostname: undefined },
    { action: 'other-action' },
    { cdata: undefined }, // e.g. a token from the banner gate widget
    { cdata: 'banner-gate' },
  ]) {
    replies['challenges.cloudflare.com'] = () => Response.json({ ...VERIFIED, ...wrong });
    const res = await handleContactRequest(post(VALID), env());
    assert.deepEqual([res.status, (await res.json()).error], [403, 'turnstile_mismatch'], JSON.stringify(wrong));
  }
  assert.ok(!hosts().includes('hooks.slack.com'), 'a mismatched token must never reach Slack');

  calls = [];
  const huge = await handleContactRequest(post({ ...VALID, 'cf-turnstile-response': 'x'.repeat(2049) }), env());
  assert.deepEqual([huge.status, (await huge.json()).error], [403, 'turnstile_invalid']);
  assert.deepEqual(calls, []); // rejected before siteverify
});

test('contact: Slack missing or failing', async () => {
  const unconfigured = await handleContactRequest(post(VALID), env({ SLACK_WEBHOOK_URL: '' }));
  assert.deepEqual([unconfigured.status, (await unconfigured.json()).error], [503, 'contact_unconfigured']);

  replies['hooks.slack.com'] = () => new Response('invalid_blocks', { status: 400 });
  const failed = await handleContactRequest(post(VALID), env({ RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'a' }));
  assert.deepEqual([failed.status, (await failed.json()).error], [502, 'contact_delivery_failed']);
  assert.ok(!hosts().includes('api.resend.com'), 'no Resend contact for an undelivered request');

  replies['hooks.slack.com'] = new TypeError('network down');
  assert.equal((await handleContactRequest(post(VALID), env())).status, 502);
});

// ---- routing + CSP -------------------------------------------------------------
test('the Worker routes /api/contact-requests before canonicalization', async () => {
  const res = await worker.fetch(new Request('https://signature.cat/api/contact-requests'), env(), {});
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('Content-Type'), 'application/json');
  assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
});

test('CSP frames only Turnstile and the Google Calendar booking page', () => {
  const frameSrc = buildCsp('n').split('; ').find((d) => d.startsWith('frame-src'));
  assert.equal(frameSrc, "frame-src 'self' https://challenges.cloudflare.com https://calendar.google.com");
});

// ---- banner-lead gate (regression after the shared-helper refactor) ------------
test('banner leads keep their contract', async () => {
  const lead = (body) =>
    new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify(body) });
  const cfg = { TURNSTILE_SECRET: 's', RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' };
  assert.equal((await handleBannerLead(lead({ email: 'a@b.co', consent: false }), cfg)).status, 400);
  assert.equal((await handleBannerLead(lead({ email: 'a@b.co', consent: true }), cfg)).status, 403);
  const unconfigured = await handleBannerLead(
    lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }),
    { TURNSTILE_SECRET: 's' },
  );
  assert.deepEqual([unconfigured.status, (await unconfigured.json()).error], [503, 'lead_capture_unconfigured']);
  calls = [];
  const ok = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), cfg);
  assert.equal(ok.status, 200);
  assert.deepEqual(JSON.parse(calls.at(-1).init.body), { email: 'a@b.co', unsubscribed: false });
  replies['api.resend.com'] = () => new Response('x', { status: 500 });
  const failed = await handleBannerLead(lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }), cfg);
  assert.equal(failed.status, 502);
});

test('banner gate stays best-effort: no fail-closed, no token binding', async () => {
  const lead = (body) =>
    new Request('https://signature.cat/api/banner-leads', { method: 'POST', body: JSON.stringify(body) });
  // the gate's implicit widget carries no cData - a plain success must pass
  replies['challenges.cloudflare.com'] = () => Response.json({ success: true, hostname: 'signature.cat' });
  const bound = await handleBannerLead(
    lead({ email: 'a@b.co', consent: true, 'cf-turnstile-response': 't' }),
    { TURNSTILE_SECRET: 's', RESEND_API_KEY: 'k', RESEND_AUDIENCE_ID: 'aud-1' },
  );
  assert.equal(bound.status, 200);
  // without TURNSTILE_SECRET the gate skips verification (the tool must work)
  calls = [];
  const open = await handleBannerLead(lead({ email: 'a@b.co', consent: true }), {
    RESEND_API_KEY: 'k',
    RESEND_AUDIENCE_ID: 'aud-1',
  });
  assert.equal(open.status, 200);
  assert.deepEqual(hosts(), ['api.resend.com']);
});
