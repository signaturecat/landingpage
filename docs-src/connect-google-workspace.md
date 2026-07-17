---
title: Connect your Google Workspace
navTitle: Connect Google Workspace
description: Register SignatureCat as a Google Workspace super admin, provision your isolated service account and authorize Domain-Wide Delegation.
updated: 2026-07-17
---

# Connect your Google Workspace

To connect a Google Workspace to SignatureCat, a **Workspace super admin** signs in at [app.signature.cat](https://app.signature.cat), provisions a dedicated service account and authorizes it in the Google Admin console through Domain-Wide Delegation (DWD). The whole flow takes about 10 minutes and is required exactly once.

> [!IMPORTANT]
> The first registration of a company account must be performed by a **Google Workspace super admin**. Only a super admin can open the Domain-Wide Delegation page in the Google Admin console, and SignatureCat needs directory access to count your seats correctly. Regular users can be invited later - they do not need admin privileges. See [User management](/docs/user-management/).

## Step 1: Sign in with Google

Open [app.signature.cat](https://app.signature.cat) and click **Sign in with Google** using your company account. SignatureCat only requests the basic `openid email profile` sign-in scopes at this point - the Workspace permissions are granted separately in step 3, and only to your own isolated service account.

Personal Gmail accounts are rejected: SignatureCat requires a Google Workspace account.

## Step 2: Set up your workspace

Right after the first sign-in you land on the **Set up your workspace** screen. Clicking **Set up workspace** creates a dedicated, isolated Google Cloud service account for your organization - this is the identity that will manage Gmail signatures on your behalf. It usually takes a few seconds (up to 15).

> [!NOTE]
> Each customer gets their **own** service account. Its credentials are stored in a secrets vault, never in the application database, and keys are rotated automatically. Rotation never changes the Client ID, so you will never have to re-authorize because of it.

Only the administrator who created the organization can complete this step.

## Step 3: Authorize Domain-Wide Delegation

Next, the wizard **Authorize SignatureCat in your Workspace** at [app.signature.cat/onboarding/dwd](https://app.signature.cat/onboarding/dwd) walks you through the Google Admin console:

1. **Open the Admin Console** - the wizard links straight to the [Domain-wide delegation page](https://admin.google.com/ac/owl/domainwidedelegation) (Security, API Controls, Domain-wide delegation). Sign in as a super admin.
2. **Add new** - click **Add new** API client.
3. **Paste the Client ID** - copy the numeric Client ID shown in the wizard (unique to your organization) and paste it into the Admin console form. Use the copy button; it must be the numeric ID, not an email address.
4. **Paste the OAuth scopes** - copy the comma-separated scope string from the wizard and paste it into the OAuth scopes field:

```
https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.member.readonly,https://www.googleapis.com/auth/admin.directory.customer.readonly,https://www.googleapis.com/auth/gmail.settings.sharing
```

5. **Authorize** - click **Authorize** in the Admin console.
6. **Verify** - back in SignatureCat, click **Check**. The app runs a connectivity test against each scope and shows a per-scope OK / Failed result.

The last scope, `gmail.settings.sharing`, is **optional**: it is only needed to write signatures on send-as aliases. You can skip it now and add it later - everything else works, and the wizard will show an "Alias signatures are off" notice. See [Assignments](/docs/assignments/#alias-modes) for what aliases unlock.

> [!WARNING]
> Paste the scope string exactly as copied. A missing or altered scope fails the check with a per-scope error such as "This scope wasn't authorized. Re-do step 4 with the exact scope string."

### The check says access is still propagating

Google needs a moment to propagate a fresh DWD grant - typically seconds, sometimes up to about 30 seconds. The **Check** button already waits out most of this window. If you still see the yellow "access may still be propagating" card, wait a moment and click **Check** again. This is not an error.

## Step 4: Billing

After DWD verifies, you are taken to [Billing](https://app.signature.cat/billing) to start the 7-day free trial (card collected up front, charged when the trial ends). See [Invoices](/docs/invoices/) for the pricing tiers.

That's it - continue with [Create your first template](/docs/create-your-first-template/).

## Renewing or re-granting Domain-Wide Delegation

If the DWD entry or one of its scopes is later removed in the Google Admin console, SignatureCat detects it before the next sync: signature syncs pause, admins get an in-app notification and an email, and the app asks you to re-run the wizard.

To re-run it at any time, open [Settings](https://app.signature.cat/settings), find the **Service Account** section and click **Re-run DWD wizard** (the Client ID is shown there too). Once the check passes, syncs resume automatically.

> [!WARNING]
> Removing the Domain-Wide Delegation entry in the Admin console immediately breaks signature management for your whole workspace. If you are deleting your SignatureCat account, remove the DWD entry afterwards - SignatureCat cannot remove it for you.
