---
title: Logs
navTitle: Logs
description: Where SignatureCat records every Gmail signature job - task logs, per-user results, the trimmed by Gmail badge, live mailbox checks and retention.
updated: 2026-08-02
---

# Logs

SignatureCat keeps an operational log of every signature job, per user and per address, so you can always answer "did it apply, and if not, why". The entry point is the **Logs** tab in the top navigation: [Task logs](https://app.signature.cat/logs).

## Task logs

[Task logs](https://app.signature.cat/logs) (Editors and Admins) lists recent finished jobs for your workspace, newest first:

- **Kind** - Assignment sync (the daily job or **Sync now**) or Manual apply (from the [Apply](https://app.signature.cat/apply) page and self-service saves).
- **Status** - Succeeded, Partial, Failed or Cancelled.
- **Who** - the user who dispatched it, or "Automatic" for the scheduled sync.
- **Counts** - "N succeeded, N failed, N skipped".

Expanding a row shows the per-user results inline; **Open full job view** opens the complete result table at `app.signature.cat/jobs/{id}`.

## What a result row contains

One row per written address: the user (or alias, marked with an "alias" badge), the outcome and an error code for failures or skips. Common codes and their fixes are listed in [Verify an assignment job](/docs/verify-assignments#what-the-per-user-rows-tell-you). Rows may also carry the note "overrode N other assignment(s) for this user" for [precedence](/docs/assignments#how-precedence-works) audits.

A row that succeeded can additionally carry an amber **trimmed by Gmail** badge with the line "Applied, but Gmail stored a trimmed copy of this signature." The apply itself worked - Gmail accepted the write and then rewrote the HTML on its own servers while saving it. **Technical details** on the row names the elements that were dropped and the character counts before and after. See [When Gmail trims your signature](/docs/gmail-sanitization).

## Read the current mailbox signature

Two actions on this page read a mailbox live: **View current signature** on a successful result row, and **Check an employee's signature** in the page header. Both open the same read-only panel, titled "Current mailbox signature", with the subtitle "Reads the signature straight from the user's Gmail mailbox."

- **View current signature** is offered on rows that succeeded and starts the lookup for that address immediately.
- **Check an employee's signature** lets you pick anyone in your Workspace in the **Employee** field and press **Show signature**.
- Both are available to Editors and Admins.
- The panel shows the signature, it does not edit it. Because it reads Gmail rather than SignatureCat's own records, it also reveals signatures a user changed by hand in their Gmail settings.
- If there is nothing stored, you get "{email} has no signature set in Gmail." instead of a preview.

> [!NOTE]
> Every lookup is recorded in your account's activity log in [Settings](https://app.signature.cat/settings) with the address that was checked and the length of the signature - never its content. The signature itself is not stored by SignatureCat.

## Retention

Job logs are retained for a limited window (by default **30 days** after a job finishes) and then removed automatically - the page states the current window. Export or review anything you need shortly after big rollouts.

> [!NOTE]
> The retention window applies to job execution logs. Your templates, assignments and settings are of course permanent.

## Live jobs

A running job is best watched on its own page, `app.signature.cat/jobs/{id}`, which polls for progress - see [Apply jobs](/docs/apply-jobs#watching-a-job).
