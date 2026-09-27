/**
 * Notion lead sink for the contact form (lead requests only - never help
 * requests). One POST /v1/pages per request creates a row in the leads
 * database. The integration token needs ONLY the "Insert content" capability:
 * a create can never overwrite an existing row (Notion's insert-only tokens
 * cannot update pages), but for the same reason it cannot look rows up either
 * - querying needs "Read content" - so a returning company gets a second row
 * instead of a merge. See cloudflare/README.md ("Notion") for the setup.
 *
 * Configuration (Cloudflare dashboard, never the repo):
 *   NOTION_TOKEN           - secret; internal connection token (Insert content)
 *   NOTION_DATA_SOURCE_ID  - the leads database's data source id (database
 *                            settings -> Manage data sources -> Copy data
 *                            source ID), the parent Notion recommends since
 *                            API 2025-09-03;
 *   NOTION_DATABASE_ID     - alternative: the database id from its URL (works
 *                            while the database has a single data source).
 * Either id is enough; without a token or an id the sink is off.
 */

export const NOTION_VERSION = '2026-03-11';
const NOTION_PAGES_URL = 'https://api.notion.com/v1/pages';
const NOTION_TIMEOUT_MS = 5000;
const USER_AGENT = 'signature.cat-worker/1.0 (+https://signature.cat)';

// Column names of the leads database, exactly as they appear in Notion (the
// API matches properties by name). Options for the multi-selects ("Formularz",
// "nowy", every size range) should exist in Notion beforehand.
export const NOTION_COLUMNS = {
  client: 'Klient', // title - company name
  info: 'Info', // rich text - optional description
  channel: 'Kanał', // multi-select - always "Formularz"
  phone: 'Phone', // phone
  email: 'Email', // email
  size: 'Wielkość - osoby', // multi-select - "1-50" ... "5000+"
  contact: 'Kontakt', // rich text - full name
  status: 'Status', // multi-select - always "nowy"
  date: 'Data', // date - submission time, Europe/Warsaw
  language: 'Język', // rich text - page language (PL, EN, DE, FR)
};
export const NOTION_CHANNEL = 'Formularz';
export const NOTION_STATUS = 'nowy';
// Notion caps email/phone values (100 characters in the create-page schema).
const NOTION_SHORT_MAX = 100;

const text = (content) => [{ type: 'text', text: { content } }];

/** Local wall-clock time in Warsaw as 'YYYY-MM-DDTHH:mm:ss' (no offset - the
    Notion date carries time_zone instead), or null if Intl cannot do it. */
export function warsawDateTime(date) {
  try {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Warsaw',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23',
      })
        .formatToParts(date)
        .map((p) => [p.type, p.value]),
    );
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
  } catch (e) {
    return null;
  }
}

/** The parent object for the configured leads database, or null (sink off). */
export function notionParent(env) {
  const clean = (v) => (typeof v === 'string' ? v.trim().replace(/-/g, '') : '');
  const dataSource = clean(env?.NOTION_DATA_SOURCE_ID);
  if (/^[0-9a-f]{32}$/i.test(dataSource)) return { type: 'data_source_id', data_source_id: dataSource };
  const database = clean(env?.NOTION_DATABASE_ID);
  if (/^[0-9a-f]{32}$/i.test(database)) return { type: 'database_id', database_id: database };
  return null;
}

/** The create-page body for one lead (parsed by parseContact). */
export function notionLeadPage(lead, parent, now = new Date()) {
  const local = warsawDateTime(now);
  const properties = {
    [NOTION_COLUMNS.client]: { title: text(lead.company) },
    [NOTION_COLUMNS.channel]: { multi_select: [{ name: NOTION_CHANNEL }] },
    [NOTION_COLUMNS.size]: { multi_select: [{ name: lead.size }] },
    [NOTION_COLUMNS.contact]: { rich_text: text(lead.name) },
    [NOTION_COLUMNS.status]: { multi_select: [{ name: NOTION_STATUS }] },
    [NOTION_COLUMNS.date]: {
      date: local ? { start: local, time_zone: 'Europe/Warsaw' } : { start: now.toISOString() },
    },
    [NOTION_COLUMNS.language]: { rich_text: text(lead.locale.toUpperCase()) },
  };
  // Notion rejects empty strings: optional values are omitted, not blank.
  const info = [lead.message];
  if (lead.phone) properties[NOTION_COLUMNS.phone] = { phone_number: lead.phone };
  if (lead.email.length <= NOTION_SHORT_MAX) {
    properties[NOTION_COLUMNS.email] = { email: lead.email };
  } else {
    info.unshift(`Email: ${lead.email}`); // too long for the email column
  }
  const infoText = info.filter(Boolean).join('\n\n').slice(0, 2000);
  if (infoText) properties[NOTION_COLUMNS.info] = { rich_text: text(infoText) };
  return { parent, properties };
}

/**
 * Create the lead row. Never throws. Resolves to
 *   {status: 'off'}             - not configured,
 *   {status: 'created', id}     - row created (also a 503 that reports
 *                                 additional_data.committed_resource_id),
 *   {status: 'failed', detail}  - Notion refused it (4xx, e.g. "HTTP 400
 *                                 validation_error" for a renamed column),
 *   {status: 'unknown', detail} - no definite answer (timeout, dropped
 *                                 connection, 5xx): Notion documents that a
 *                                 write can be saved and still time out or
 *                                 answer 5xx, so the row may exist.
 * POST /v1/pages is not idempotent, so there is no retry here.
 */
export async function createNotionLead(env, lead, now = new Date()) {
  const parent = notionParent(env);
  if (!env?.NOTION_TOKEN || !parent) return { status: 'off' };
  let res;
  try {
    res = await fetch(NOTION_PAGES_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify(notionLeadPage(lead, parent, now)),
      signal: AbortSignal.timeout(NOTION_TIMEOUT_MS),
    });
  } catch (e) {
    const detail = e?.name === 'TimeoutError' ? 'timeout' : 'unreachable';
    console.error(`contact form: Notion ${detail}`);
    return { status: 'unknown', detail };
  }
  let body = null;
  try {
    body = await res.json();
  } catch (e) {
    /* non-JSON answer */
  }
  if (res.ok) return { status: 'created', id: typeof body?.id === 'string' ? body.id : '' };
  const committed = body?.additional_data?.committed_resource_id;
  if (res.status === 503 && typeof committed === 'string' && committed) {
    return { status: 'created', id: committed };
  }
  const detail = `HTTP ${res.status}${body?.code ? ` ${body.code}` : ''}`;
  // The message names the offending column (e.g. a renamed property) - log it
  // for the Worker logs; the Slack note carries the short detail only.
  console.error(`contact form: Notion ${detail}: ${String(body?.message || '').slice(0, 300)}`);
  return { status: res.status >= 500 ? 'unknown' : 'failed', detail };
}
