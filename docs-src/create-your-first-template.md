---
title: Create your first template
navTitle: Create your first template
description: Create a Gmail signature template in SignatureCat, personalize it with Google Directory variables, preview it and test it on your own mailbox.
updated: 2026-07-17
---

# Create your first template

A template is one HTML signature that SignatureCat personalizes per user with data from your Google Directory. You create templates on the [Signatures](https://app.signature.cat/signatures) page, and you can safely test the result on your own mailbox before rolling anything out.

## Create the template

1. Open [Signatures](https://app.signature.cat/signatures) and click **New template**.
2. Pick a starting point:
   - **Default** - Directory photo plus contact details.
   - **With company logo** - your logo (115x115 px) instead of the personal photo, consistent across the company.
   - **With banner** - the signature plus a campaign banner (450x100 px) below it.
3. For the logo or banner starters, pick an image from your library or upload one - or skip and a placeholder is used until you choose one. See [Banners and logos](/docs/banners-and-logos/).

The editor opens immediately. Everything from the starter can be adjusted later.

## Personalize with variables

Insert `{{variable}}` tokens with the **Insert variable** menu - for example `{{firstname}}`, `{{jobtitle}}` or `{{phone}}`. At apply time each token resolves from the user's Google Directory record, so one template produces a personal signature for everyone.

Wrap optional lines in conditional tags so signatures stay clean when data is missing:

- `{{del}} ... {{/del}}` removes the wrapped block only when **all** variables inside are empty.
- `{{delete}} ... {{/delete}}` removes the block when **any** variable inside is empty.

The complete list of variables, where each value comes from and the exact conditional rules are in the [Template variables](/docs/template-variables/) reference.

> [!TIP]
> Keep Directory data tidy before rolling out - job titles, departments and phone numbers come straight from Google Directory. Empty fields simply render as empty text unless you wrap them in `{{del}}` tags.

## Preview as a real user

The preview pane renders the resolved signature live as you type. Use the **Render as** control to substitute any real user's Directory record - by default it renders against your own. The preview tells you exactly which record it used: "Rendered against {email}'s Directory record."

## Test it on your own mailbox

Click **Set me a test signature** in the editor toolbar. SignatureCat renders the template against your own Directory record and writes it to your own Gmail signature - no one else is affected. Send yourself an email or check Gmail settings to see the real result.

When you are happy with the template, continue to [Assign templates](/docs/assign-templates/).

> [!NOTE]
> Saving a template validates it: unknown `{{tokens}}` and unbalanced `{{del}}` / `{{delete}}` tags are rejected, and the HTML is sanitized (scripts, iframes and inline event handlers are stripped). See [Templates](/docs/templates/) for the full reference.
