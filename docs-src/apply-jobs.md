---
title: Apply jobs
navTitle: Apply jobs
description: How SignatureCat writes Gmail signatures across Google Workspace - the daily assignment sync, one-shot applies from the Apply page and job tracking.
updated: 2026-08-02
---

# Apply jobs

Every signature write happens inside a **job**: either the recurring **assignment sync** or a **manual apply** you dispatch yourself. Jobs run in the background, report per-user results, and can be watched live.

## The assignment sync

Once a day, SignatureCat re-resolves all [assignments](/docs/assignments) and re-applies signatures across the workspace. That is what keeps signatures current when people join groups, move between OUs or get hired. You can trigger the same sync at any time with **Sync now** on [Assignments](https://app.signature.cat/assignments).

## Manual applies: the Apply page

The [Apply](https://app.signature.cat/apply) page (Editors and Admins) dispatches a **one-shot** job: pick a template, choose recipients, apply once. It is independent of assignments - useful for one-off rollouts, fixing individual mailboxes or covering people outside any assignment.

Recipients can be mixed and matched (up to 50 entries):

- **Everyone** - one click covers every active user in the Workspace at apply time.
- **Users** - individual users, found by email search. This is the only place with individual-user targeting.
- **Groups** - members are resolved at apply time. Note: nested groups are **not** expanded here (unlike assignments with **+ sub-groups**).
- **OUs** - by path, with an **include sub-OUs** checkbox.
- **Aliases** - specific send-as addresses (up to 50). Each is matched to its mailbox owner and only signed if it is an accepted send-as alias; `{{email}}` / `{{domain}}` render from the alias.

Submitting redirects to the live job view.

> [!NOTE]
> A one-shot apply writes the signature **once**. If the user is covered by an assignment or self-service choice, the next daily sync will overwrite the one-shot result according to the [precedence rules](/docs/assignments#how-precedence-works).

## Watching a job

The job view at `app.signature.cat/jobs/{id}` live-updates while the job runs: status, progress and a per-user result table with error codes. Finished jobs are also listed on [Task logs](https://app.signature.cat/logs). There is no retry button on a finished job: fix the cause first, then dispatch a new apply from the [Apply](https://app.signature.cat/apply) page for the addresses that failed, or leave it to the daily sync.

When the job finishes, the same view adds an **Execution details** panel: **Primary addresses updated**, **Send-as aliases updated**, **Groups expanded** (with the number of subgroups where relevant), **Organizational units (OU) expanded**, and, for a whole-Workspace target, how many users it resolved to.

Statuses and error codes are documented in [Verify an assignment job](/docs/verify-assignments#job-statuses).

## How fast are changes visible?

Manual applies and self-service saves are near-instant (seconds to a couple of minutes for large targets). Assignment edits apply on the next daily sync unless you hit **Sync now**. Gmail shows the new signature on the next compose - already-sent emails never change.

Editing user data behaves differently depending on how you do it. Saving or deleting one user's values on the **Data** tab enqueues an immediate refresh of that one person's signature, so the change lands within moments. A CSV import does not enqueue anything: the last step of the import offers a skippable **Sync signatures now** button, and without it the imported values reach mailboxes with the next daily sync. See [User data](/docs/user-data).
