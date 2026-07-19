---
title: Logs
navTitle: Logs
description: Where SignatureCat records what happened - task logs for sync and apply jobs, per-user results, retention and audit trail.
updated: 2026-07-19
---

# Logs

SignatureCat keeps an operational log of every signature job, per user and per address, so you can always answer "did it apply, and if not, why". The main entry point is [Task logs](https://app.signature.cat/assignments/logs).

## Task logs

[Task logs](https://app.signature.cat/assignments/logs) (Editors and Admins) lists recent finished jobs for your workspace, newest first:

- **Kind** - Assignment sync (the daily job or **Sync now**) or Manual apply (from the [Apply](https://app.signature.cat/apply) page and self-service saves).
- **Status** - Succeeded, Partial, Failed or Cancelled.
- **Who** - the user who dispatched it, or "Automatic" for the scheduled sync.
- **Counts** - "N succeeded, N failed, N skipped".

Expanding a row shows the per-user results inline; **Open full job view** opens the complete result table at `app.signature.cat/jobs/{id}`.

## What a result row contains

One row per written address: the user (or alias, marked with an "alias" badge), the outcome and an error code for failures or skips. Common codes and their fixes are listed in [Verify an assignment job](/docs/verify-assignments/#what-the-per-user-rows-tell-you). Rows may also carry the note "overrode N other assignment(s) for this user" for [precedence](/docs/assignments/#how-precedence-works) audits.

## Retention

Job logs are retained for a limited window (by default **30 days** after a job finishes) and then removed automatically - the page states the current window. Export or review anything you need shortly after big rollouts.

> [!NOTE]
> The retention window applies to job execution logs. Your templates, assignments and settings are of course permanent.

## Live jobs

A running job is best watched on its own page, `app.signature.cat/jobs/{id}`, which polls for progress - see [Apply jobs](/docs/apply-jobs/#watching-a-job).
