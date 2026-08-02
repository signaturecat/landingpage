---
title: Introduction
navTitle: Introduction
description: What SignatureCat is and how it manages Gmail signatures across your Google Workspace - templates, assignments and automatic daily sync.
updated: 2026-08-02
---

# SignatureCat documentation

SignatureCat centrally manages Gmail signatures across your entire Google Workspace. You design one HTML signature template with variables, assign it to users through groups, organizational units or the whole workspace, and SignatureCat writes a personalized signature into every mailbox - and keeps it up to date automatically.

The app runs at [app.signature.cat](https://app.signature.cat). This documentation covers everything from first setup to day-to-day reference.

## How does SignatureCat work?

1. **Connect your Google Workspace.** A Workspace super admin authorizes SignatureCat through [Domain-Wide Delegation](/docs/domain-wide-delegation/), so it can read your user directory and write Gmail signatures.
2. **Create a template.** One HTML template with [variables](/docs/template-variables/) like `{{firstname}}` or `{{jobtitle}}` that resolve per user from your Google Directory.
3. **Assign it.** Bind templates to groups, organizational units or everyone at once on the [Assignments](https://app.signature.cat/assignments) page.
4. **Fill the gaps.** Where the directory is incomplete, an admin can store per-user values on the **Data** tab that win over the directory in signatures. See [User data](/docs/user-data).
5. **Stay up to date.** A background sync re-applies assignments once a day, so new hires and team changes get the right signature without anyone lifting a finger.

## What you need

- A **Google Workspace** domain (personal Gmail accounts are not supported).
- A **Workspace super admin** to register your company and complete the one-time authorization. Day-to-day work can then be delegated to non-admins through [user management](/docs/user-management/).
- About **10 minutes** for the whole first setup.

> [!NOTE]
> Every workspace starts with a 7-day free trial. A card is collected at sign-up and first charged when the trial ends. See [Invoices](/docs/invoices/) for pricing and billing details.

## First steps

Follow the Getting started guides in order:

1. [Connect your Google Workspace](/docs/connect-google-workspace/) - registration, provisioning and the Domain-Wide Delegation wizard.
2. [Create your first template](/docs/create-your-first-template/) - the editor, variables, preview and testing on your own mailbox.
3. [Assign templates](/docs/assign-templates/) - groups, OUs or the whole workspace.
4. [Verify an assignment job](/docs/verify-assignments/) - confirm signatures landed where they should.

## Where to look things up

- [Templates](/docs/templates/) and [Template variables](/docs/template-variables/) - the full editor and variable reference.
- [Assignments](/docs/assignments/) - precedence rules and alias modes.
- [Apply jobs](/docs/apply-jobs/) and [Logs](/docs/logs/) - how signature rollout is tracked.
- [User data](/docs/user-data) and [Import user data](/docs/user-data-import) - per-user values that override the directory, one by one or from a CSV file.
- [Mail client preview](/docs/mail-client-preview) - how the preview simulates Gmail, Outlook and Apple Mail in light and dark.
- [When Gmail trims your signature](/docs/gmail-sanitization) - what the "trimmed by Gmail" warning means and how to fix it.
- [Notifications](/docs/notifications/) - which alerts arrive by email and which appear in the app.
- [Get help](/docs/get-help/) - support contact and [service status](/docs/service-status/).
