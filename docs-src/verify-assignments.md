---
title: Verify an assignment job
navTitle: Verify assignment jobs
description: Check that a SignatureCat sync or apply job succeeded - job statuses, per-user results and what the common error codes mean.
updated: 2026-07-19
---

# Verify an assignment job

Every sync and manual apply runs as a job with a per-user result you can inspect. The quickest check is the [Task logs](https://app.signature.cat/assignments/logs) page; a live job also has its own detail view at `app.signature.cat/jobs/{id}` that updates in real time.

## Check the task logs

Open [Task logs](https://app.signature.cat/assignments/logs) (Editors and Admins). Each row is one finished job - an **Assignment sync** or a **Manual apply** - with its status, start and finish time, who triggered it ("Automatic" for the daily sync) and a summary like "42 succeeded, 1 failed, 2 skipped".

Expand a row to see the per-user drill-down, or click **Open full job view** for the complete result table.

> [!NOTE]
> Task logs are kept for a limited time (by default the last 30 days) and older entries are removed automatically. Check jobs soon after large rollouts.

## Job statuses

| Status | Meaning |
|---|---|
| Queued | Waiting for the worker to pick it up. |
| Running | In progress - the detail page live-updates. |
| Succeeded | Every targeted user got the signature. |
| Partial | Some users succeeded, some failed or were skipped - inspect the rows. |
| Failed | The job did not complete. A job stuck in Running for over 30 minutes is marked Failed automatically. |
| Cancelled | Cancelled before it ran (for example the template was deleted with pending jobs). |

## What the per-user rows tell you

Each row shows the address written (alias rows carry an "alias" badge), the status and an error code when something went wrong. The most common ones:

- **TARGET_NOT_FOUND** - the assigned group or OU no longer exists in the Workspace (deleted or a wrong identifier). The target was skipped, admins get a notification, and the assignment row shows a "not found in Workspace" badge. Fix or remove the assignment on [Assignments](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - the user no longer exists in the directory.
- **ALIAS_SCOPE_MISSING** - alias signatures require the optional `gmail.settings.sharing` scope, which has not been granted. See [Connect your Google Workspace](/docs/connect-google-workspace/#step-3-authorize-domain-wide-delegation).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - Domain-Wide Delegation is broken or missing a scope. Re-run the wizard from [Settings](https://app.signature.cat/settings). See [Domain-Wide Delegation](/docs/domain-wide-delegation/).
- **RATE_LIMITED** - Google throttled the requests; the worker retries automatically before surfacing this.

A row can also note "overrode N other assignment(s) for this user" - the user matched several assignments and this one won. Precedence rules are in the [Assignments reference](/docs/assignments/#how-precedence-works).

## Verify inside Gmail

For a spot check, ask a covered user to open Gmail Settings and look at the signature, or send yourself a test message. Remember that a user's own [self-service](/docs/self-service/) signature wins over assignments unless the assignment overrides it.

> [!TIP]
> Failed rows on a finished job can be retried from the job detail view with **Re-run failed** - no need to re-apply to everyone.
