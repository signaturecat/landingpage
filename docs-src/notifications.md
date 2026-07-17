---
title: Notifications
navTitle: Notifications
description: Which SignatureCat alerts arrive by email and which appear in the app - DWD loss, missing assignment targets, trial and payment events.
updated: 2026-07-17
---

# Notifications

SignatureCat notifies you through two channels: **email** for account-level events that need action, and the **in-app notification bell** for operational alerts. Emails go to admins (and the account owner); the bell is visible to Admins and Editors.

## What arrives by email?

| Email | When it is sent | Who receives it |
|---|---|---|
| Welcome to signature.cat | First sign-in of a new user | The new user |
| You now have access to signature.cat | An admin grants a user access on [User management](https://app.signature.cat/user-management) | The granted user |
| Your signature.cat trial has started | Trial begins | Admins + owner |
| Your signature.cat trial ends soon | About 3 days before the trial ends | Admins + owner |
| Your signature.cat plan is active | First successful charge after the trial | Admins + owner |
| Action required - signature.cat payment failed | A charge fails (grace window starts) | Admins + owner |
| A signature.cat assignment target no longer exists | An assigned group or OU was deleted in the Workspace | Admins + owner |
| Action required - signature.cat lost Workspace access (DWD) | Domain-Wide Delegation broke or a required scope was revoked | Admins + owner |

Alert emails are deduplicated (at most one per topic per day) and sent only on the transition into the failure, not on every retry.

> [!NOTE]
> These product emails are separate from Stripe's **invoices and receipts**, which go to the [invoice email](/docs/invoices/#set-the-invoice-email) address. Editors and Designers do not receive alert emails - only in-app notifications.

## What appears in the app?

The bell icon in the top navigation (Admins and Editors) collects operational notifications; unread ones show a badge, and each entry can be dismissed.

| In-app notification | Severity | Trigger |
|---|---|---|
| Domain-Wide Delegation access lost | Error | DWD or a required scope broke; syncs are paused until an admin re-runs the [DWD wizard](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked). |
| Group / OU no longer exists | Warning | An [assignment target](/docs/assignments/#when-targets-disappear) went missing; the worker retries on the next sync. |
| Users without a self-service signature | Warning | Self-service users who have not picked a template yet (at most once per 7 days). |
| Your trial ends soon | Warning | About 3 days before the trial ends. |
| Payment failed | Error | A charge failed; the grace window is running. |

Besides the bell, two banners can appear across the app: the amber **trial banner** in the last days of the trial, and the red **payment banner** ("Update your card by {date} or signature management will be paused") during the payment grace window.

## Recommended setup

- Make sure at least one regularly-read mailbox has the **Admin** level - alert emails go only to admins and the owner. See [User management](/docs/user-management/).
- Point the [invoice email](/docs/invoices/#set-the-invoice-email) at accounting so paperwork never depends on an admin inbox.
- Watch [status.signature.cat](https://status.signature.cat/) for platform-level incidents - see [Service status](/docs/service-status/).
