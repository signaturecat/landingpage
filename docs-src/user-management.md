---
title: User management and access levels
navTitle: User management
description: Who can sign in to SignatureCat, what each access level allows, and how to grant access to individual users or whole Google groups.
updated: 2026-07-17
---

# User management and access levels

Only people you explicitly let in can sign in to SignatureCat: Workspace super admins (always allowed), users with a direct access grant, and members of groups you granted access to. Everyone else is turned away at login. Access is managed on the [User management](https://app.signature.cat/user-management) page (Admins only).

## What does each access level allow?

| Access level | What it allows |
|---|---|
| Self-service | Sets their own signature from organization templates only. |
| Self-service + edit | Self-service plus their own custom HTML signature. |
| Designer | Edits organization signature templates. |
| Editor | Designer plus managing assignments and apply jobs, and in-app notifications. |
| Admin | Full access, including billing, user management, image domains and the DWD wizard. |

A few practical consequences:

- **Templates** ([Signatures](https://app.signature.cat/signatures)): Designer, Editor, Admin.
- **Assignments and Apply** ([Assignments](https://app.signature.cat/assignments), [Apply](https://app.signature.cat/apply)): Editor, Admin.
- **Billing, user management, custom image domain**: Admin only.
- Editors see in-app [notifications](/docs/notifications/); alert and billing **emails** go to admins only.

> [!NOTE]
> Workspace **super admins** always have the Admin level. It is enforced at every sign-in and cannot be revoked in SignatureCat - to change it, change their admin status in Google Workspace itself.

## Who can sign in?

Sign-in is Google-only and requires a Google Workspace account in your domain. When someone without access tries, they see: "Your account doesn't have access to SignatureCat yet. Ask a Workspace super admin to grant you access, then sign in again." - and nothing is changed in your workspace.

Sessions last up to 7 days of inactivity with a hard cap of 14 days, then a one-click Google re-login is needed.

## Grant access to a single user

1. Open [User management](https://app.signature.cat/user-management) and click **Add access**.
2. On the **User** tab, enter the email address (it must belong to your Workspace, secondary domains included).
3. Pick an access level and click **Save access**.

The user receives a "You now have access to signature.cat" email invitation.

A direct user grant always **overrides** any group grant for that person - even if the group grant is stronger.

## Grant access to a whole Google group

1. In the same drawer, switch to the **Group** tab.
2. Paste the group email (for example `engineering@example.com`), pick the level and save.

> [!WARNING]
> A group grant covers **everyone in the group, including people added to it in the future** - membership is checked live at each sign-in, with no per-person confirmation. Grant broad groups the lowest level that does the job (usually Self-service).

> [!IMPORTANT]
> Group membership is evaluated when the user signs in. Someone who is already signed in, or was just added to the group, may need to **sign in again** before the new access takes effect.

## Removing and changing access

- Edit or remove grants from the same page. Removing a grant blocks the next sign-in; it does not remove a signature that is already applied to the mailbox.
- You cannot change or remove **your own** access - another admin has to do it (the UI shows a "You" badge instead of the controls).
- Access levels only control the SignatureCat app. They have no effect on the user's Google account.

## Letting users manage their own signature

Grant users (or a group) the **Self-service** level and enable at least one template for self-service - the full flow is described in [Self-service](/docs/self-service/).
