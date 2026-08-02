---
title: Notifications
navTitle: Notifications
description: Which SignatureCat signature alerts arrive by email and which appear in the app - Google Workspace access, assignment targets, images, billing.
updated: 2026-08-02
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
| A logo used by your signatures was deleted | A library image was deleted while templates still used it; for banners the subject reads "A banner used by your signatures was deleted" | Admins + owner |

Alert emails are deduplicated (at most one per topic per day) and sent only on the transition into the failure, not on every retry. The deleted-image email follows its own rule: one email per deleted image and recipient, so a cleanup session never floods a mailbox.

> [!NOTE]
> These product emails are separate from Stripe's **invoices and receipts**, which go to the [invoice email](/docs/invoices#set-the-invoice-email) address. Editors and Designers do not receive alert emails - only in-app notifications.

## What appears in the app?

The bell icon in the top navigation (Admins and Editors) collects operational notifications; unread ones show a badge, and each entry can be dismissed.

| In-app notification | Severity | Trigger |
|---|---|---|
| Domain-Wide Delegation access lost | Error | DWD or a required scope broke; syncs are paused until an admin re-runs the [DWD wizard](/docs/domain-wide-delegation#what-happens-if-dwd-is-removed-or-a-scope-revoked). |
| Group / OU no longer exists | Warning | An [assignment target](/docs/assignments#when-targets-disappear) went missing; the worker retries on the next sync. |
| Users without a self-service signature | Warning | Self-service users who have not picked a template yet (at most once per 7 days). |
| A logo or banner used by your signatures was deleted | Warning | Someone deleted a [library image](/docs/banners-and-logos#deleting-images) that at least one template still used; the entry names who deleted it and which templates keep applying with a placeholder. |
| Support access enabled | Info | An admin turned on the [Support access](/docs/support-access) switch; the entry names who allowed it. |
| Your trial ends soon | Warning | About 3 days before the trial ends. |
| Payment failed | Error | A charge failed; the grace window is running. |

Besides the bell, three banners can appear across the app: the amber **trial banner** in the last days of the trial, the red **payment banner** ("Update your card by {date} or signature management will be paused") during the payment grace window, and the red **Workspace access banner** ("The last Google Workspace access check failed. Signature syncs are paused until the access is fixed.").

The Workspace access banner is for admins only, because only they can fix it, and it appears only after a check has actually failed - never merely because a check is old or missing. Its inline **Check access now** button re-runs the access check on the spot: if it passes, the banner disappears; if it fails again, you land in the DWD wizard, which the banner also links directly as **Open the DWD wizard**. See [Domain-wide delegation](/docs/domain-wide-delegation).

## Recommended setup

- Make sure at least one regularly-read mailbox has the **Admin** level - alert emails go only to admins and the owner. See [User management](/docs/user-management).
- Point the [invoice email](/docs/invoices#set-the-invoice-email) at accounting so paperwork never depends on an admin inbox.
- Watch [status.signature.cat](https://status.signature.cat/) for platform-level incidents - see [Service status](/docs/service-status).
