---
title: Domain-Wide Delegation
navTitle: Domain-Wide Delegation
description: How SignatureCat uses Google Domain-Wide Delegation - scopes, the per-tenant client ID, propagation, revocation detection and re-granting.
updated: 2026-07-17
---

# Domain-Wide Delegation

Domain-Wide Delegation (DWD) is the Google Workspace mechanism that lets SignatureCat's dedicated service account read your directory and write Gmail signatures - without ever knowing anyone's password. You grant it once in the Google Admin console; this page explains exactly what is granted and how it behaves over time.

The step-by-step setup lives in [Connect your Google Workspace](/docs/connect-google-workspace/). This is the reference.

## What exactly do I authorize?

You add **one API client** on the Admin console's [Domain-wide delegation page](https://admin.google.com/ac/owl/domainwidedelegation), identified by a numeric **Client ID** that is unique to your organization (every SignatureCat customer has their own isolated service account). The Client ID is shown in the DWD wizard and later in [Settings](https://app.signature.cat/settings), Service Account section.

The scopes and what each one is for:

| Scope | Required | Used for |
|---|---|---|
| `gmail.settings.basic` | Yes | Writing the signature on each user's primary address. |
| `admin.directory.user.readonly` | Yes | Reading user profiles - names, job titles, phones - for [template variables](/docs/template-variables/). |
| `admin.directory.group.member.readonly` | Yes | Expanding group assignments into members. |
| `admin.directory.customer.readonly` | Yes | Reading the workspace seat count for billing. |
| `gmail.settings.sharing` | Optional | Writing signatures on send-as **aliases**. Skip it and alias features stay off. |

SignatureCat never asks for mail content scopes - it cannot read or send anyone's email.

## Is the Client ID stable?

Yes. SignatureCat rotates its service-account keys automatically for security, but rotation mints a new key on the **same** service account - the numeric Client ID never changes. You will never need to re-authorize DWD because of key rotation.

## How quickly does a new grant work?

Google propagates DWD changes eventually - usually seconds, occasionally up to about 30 seconds. The wizard's **Check** button waits out this window before reporting failure, so a single click typically succeeds right after you authorize. A yellow "propagating" card means exactly that: wait a moment and check again.

## What happens if DWD is removed or a scope revoked?

SignatureCat verifies DWD health before every sync. When it breaks:

- signature syncs **pause** immediately (nothing is half-applied),
- admins get the in-app notification "Domain-Wide Delegation access lost" and an "Action required" email,
- the app routes admins back to the DWD wizard.

Re-granting the missing entry or scope and passing **Check** resumes everything - state self-heals, nothing needs to be rebuilt. To re-open the wizard at any time use **Re-run DWD wizard** in [Settings](https://app.signature.cat/settings), Service Account section.

> [!WARNING]
> The DWD grant applies organization-wide, and removing it stops signature management for the whole workspace at once. If you only want to drop alias support, remove just the `gmail.settings.sharing` scope and re-run **Check**.

## Adding the optional alias scope later

Add `https://www.googleapis.com/auth/gmail.settings.sharing` to the existing Admin console entry (keep the other four scopes), then **Re-run DWD wizard** and click **Check**. Alias features unlock automatically - see [alias modes](/docs/assignments/#alias-modes).

## Removing SignatureCat

When you delete your account, SignatureCat removes its own infrastructure, but it cannot edit your Admin console: **delete the API client entry yourself** on the [Domain-wide delegation page](https://admin.google.com/ac/owl/domainwidedelegation) after the account is gone.
