---
title: Template variables
navTitle: Template variables
description: Complete reference of SignatureCat template variables - Google Directory person fields, logo and banner tokens, and del/delete conditional blocks.
updated: 2026-07-17
---

# Template variables

SignatureCat templates use `{{variable}}` tokens that resolve per user at apply time. There are nine person variables (filled from Google Directory), two image tokens and two conditional tags. Token names are lowercase and matched case-insensitively - `{{Phone}}` works the same as `{{phone}}`. Unknown tokens are rejected when the template is saved.

## Person variables (Google Directory)

Values come from each user's record in your Google Workspace directory. Keep the directory tidy and every signature stays accurate automatically.

| Token | Value | Notes |
|---|---|---|
| `{{firstname}}` | First name | |
| `{{lastname}}` | Last name | |
| `{{email}}` | Primary email address | When applying to an alias, resolves to the **alias** address instead. |
| `{{domain}}` | Domain part of the email | Follows the alias when applying to an alias. |
| `{{jobtitle}}` | Job title | From the user's primary organization entry in Directory. |
| `{{department}}` | Department | From the same organization entry. |
| `{{photo}}` | Profile photo URL | Auto-scaled to 400 px for crisp rendering; must be an HTTPS photo. |
| `{{address}}` | Formatted address | The user's primary address entry. |
| `{{phone}}` | Phone number | First non-empty of: work, then mobile, then home. |

**Empty values render as empty text.** The signature never breaks, but you may be left with a dangling label like "Phone:" - that is what conditional blocks are for.

## Image tokens

| Token | Value |
|---|---|
| `{{logo}}` | The template's selected company logo, rendered 115x115 px. |
| `{{banner}}` | The template's selected campaign banner, rendered 450x100 px, scaled down on narrow screens. |

Images come from the per-workspace library and are selected per template; if nothing is selected, a neutral placeholder renders. If the library image has a click-through link, the image is wrapped in it automatically. See [Banners and logos](/docs/banners-and-logos/).

> [!NOTE]
> Image tokens always render something (image or placeholder), so they do not count as "empty" for the conditional blocks below.

## Conditional blocks: del and delete

Two wrapper tags remove whole fragments of the signature when data is missing:

- `{{del}} ... {{/del}}` - **soft**: the block is removed only when **every** person variable inside is empty. If at least one is filled, the block stays (empty variables inside render as empty text).
- `{{delete}} ... {{/delete}}` - **hard**: the block is removed when **any** person variable inside is empty. Use it when a fragment only makes sense complete.

Example - a phone line that disappears for users without any phone number:

```html
{{del}}<tr><td>Tel: {{phone}}</td></tr>{{/del}}
```

Blocks can be nested; inner blocks are evaluated first. Unbalanced tags are rejected at save time, and the tags themselves are never written into the final Gmail signature.

> [!TIP]
> Rule of thumb: wrap every optional line (phone, address, department) in `{{del}}` tags. Signatures of users with sparse Directory records then shrink gracefully instead of showing empty labels.

## Testing how variables resolve

Use **Render as** in the [template editor](/docs/templates/#the-editor) to preview against any real user's record, and **Set me a test signature** to apply the result to your own mailbox. Both are described in [Create your first template](/docs/create-your-first-template/).
