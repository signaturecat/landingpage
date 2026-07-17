---
title: Get help
navTitle: Get help
description: How to reach SignatureCat support, what to include in a report, and where to check before writing - status page, logs and common fixes.
updated: 2026-07-17
---

# Get help

Support is provided by email at [contact@signature.cat](mailto:contact@signature.cat). Before writing, a quick self-check often gets you an answer faster - most "signatures stopped applying" cases are one of three known causes.

## Quick self-check

1. **Is it a platform incident?** Check [status.signature.cat](https://status.signature.cat/) - incidents and maintenance are announced there. See [Service status](/docs/service-status/).
2. **Did a job fail?** Open [Task logs](https://app.signature.cat/assignments/logs) and look at the per-user error codes - [Verify an assignment job](/docs/verify-assignments/#what-the-per-user-rows-tell-you) explains each one and its fix.
3. **Is Domain-Wide Delegation healthy?** If syncs are paused, admins will have a "Domain-Wide Delegation access lost" notification - re-run the wizard from [Settings](https://app.signature.cat/settings). See [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked).
4. **Billing paused?** A red banner and "Past due" status on [Billing](https://app.signature.cat/billing) mean a failed payment ran out its grace window - updating the card restores everything. See [Billing details](/docs/billing-details/).

## Writing to support

Email [contact@signature.cat](mailto:contact@signature.cat) from an address at your Workspace domain if possible. Include:

- your **Workspace domain** (for example `yourcompany.com`),
- **what you expected vs what happened**, with timestamps and your timezone,
- the **job link** (`app.signature.cat/jobs/...`) or a screenshot of the [Task logs](https://app.signature.cat/assignments/logs) row, if a job is involved,
- any **error code** shown in the app (error notices can be expanded to reveal a code, HTTP status and request id - include all three).

> [!TIP]
> The request id from an expanded error notice lets support find your exact request in the server logs - it is the single most useful thing you can attach.

## Response expectations

Support is email-only. During the trial period there is no guaranteed response time; paying customers are answered with priority. Incidents affecting many customers are coordinated publicly on the [status page](https://status.signature.cat/).

## Feature requests and feedback

Send them to the same address - real usage reports shape the roadmap. Include your use case rather than just the feature name; it travels better.
