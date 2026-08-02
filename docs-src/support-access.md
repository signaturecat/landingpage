---
title: Support access
navTitle: Support access
description: What SignatureCat support can and cannot do on your Google Workspace account, including viewing a user's current Gmail signature, and how it is logged.
updated: 2026-08-02
---

# Support access

By default, SignatureCat support **cannot change anything on your account**. If you want our team to help hands-on - for example during onboarding or while tracking down a misbehaving assignment - an Admin can grant that permission with a single switch, and revoke it just as easily.

## Where the switch is

Go to [Settings](https://app.signature.cat/settings) and find the **Support access** section. It is visible to users with the **Admin** access level only. Flip the switch on to allow changes, off to block them again - the change takes effect immediately.

## What it unlocks

With support access **on**, our support team can work on the parts of your account they typically help with, plus one diagnostic view that is otherwise blocked:

| Area | Examples |
|---|---|
| Signature templates | Fixing broken HTML, adjusting variables |
| Assignments | Retargeting a group or OU, changing the assigned template |
| User access | Adding or correcting access grants |
| Invoice email | Correcting the address your invoices go to |
| Signature diagnostics | Viewing the signature a user's Gmail currently has set |

With the switch **off**, support can still *read* account data needed to diagnose a problem (job logs, configuration), but every change is rejected by the system - not just hidden in the interface. Viewing a user's current Gmail signature is the exception among the reads: it reaches into a mailbox, so it is refused whenever the switch is off.

## What it never allows

Regardless of the switch, SignatureCat staff can not:

- sign in as you or any of your users;
- change or cancel your subscription, or issue charges;
- delete your account;
- read anyone's email - SignatureCat holds no mail content scopes at all, so mail, attachments and drafts are out of reach with the switch on or off (see [Domain-Wide Delegation](/docs/domain-wide-delegation));
- access stored secrets or credentials.

## Everything is on the record

Transparency is built in:

- Turning the switch on or off is written to your account's activity log, and the other Admins get an in-app notification when support access is enabled.
- Every change made by our team appears in the activity log in [Settings](https://app.signature.cat/settings) as the staff member's name followed by "(SignatureCat Support)" - the same trail your own admins' changes go to.
- Every time our team views the signature a user's Gmail currently has set, that view is written to the same activity log. The entry records the address that was checked, never the signature itself.
- These entries are part of your account data, so they are included in data exports.

> [!TIP]
> Enable support access for the duration of a support case and switch it off when the case is closed. Nothing breaks if you leave it off - it only limits what our team can do for you hands-on.

The mechanism is described in the [Terms of Service and the Privacy Policy](/legal) (service access with the Customer's consent).
