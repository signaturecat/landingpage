---
title: Templates
navTitle: Templates
description: SignatureCat template reference - the visual and HTML editors, starters, preview, test apply, self-service toggle, default template and safe deletion.
updated: 2026-07-26
---

# Templates

A template is a single HTML document with `{{variable}}` tokens that SignatureCat renders per user. Templates live on the [Signatures](https://app.signature.cat/signatures) page (Designers, Editors and Admins) and are edited either in the [visual editor](/docs/visual-editor/) or in a code editor, both with live preview.

For a guided first run, see [Create your first template](/docs/create-your-first-template/). The variable set has its own page: [Template variables](/docs/template-variables/).

## The editor

The editor at `app.signature.cat/signatures/{id}` has two tabs, and opens in the mode the template was last saved in:

- **Visual** - design on a canvas without writing HTML: variable chips, image resize handles, columns, fonts and a guaranteed Gmail-safe output. It has a [dedicated page](/docs/visual-editor/).
- **HTML** - edit the signature markup directly, with autocompletion for all `{{variable}}` tokens.

Converting HTML to Visual is one-way and best-effort (complex table layouts are flattened; the editor warns first); saving from the HTML tab discards the visual document. In both modes you get:

- **Preview** - live rendering of the resolved signature, in a sandbox. **Render as** substitutes any real user's Directory record so you can check edge cases (long names, missing phone numbers).
- **Insert variable** - menu of all person variables, grouped with hints.
- **Logo / Banner** - the per-kind image galleries; see [Banners and logos](/docs/banners-and-logos/).
- **Wrap in {{del}} / Wrap in {{delete}}** - wraps the current selection in conditional tags.
- **Set me a test signature** - renders against your own Directory record and applies to your own Gmail mailbox only.
- **Name and icon** - a label, icon and color shown in template lists (never rendered into signatures).

## Validation and sanitization

Saving validates the template and rejects:

- unknown tokens (anything that is not a known variable, asset token or conditional tag),
- unbalanced `{{del}}` / `{{delete}}` pairs.

Error messages are specific: an unknown token is named and unbalanced conditional tags come with their open/close counts. A live counter tracks Gmail's 10,000-character signature limit.

The HTML is sanitized on save: scripts, iframes, event handlers (`onclick=` and friends) and `javascript:` URLs are stripped. Signatures are static HTML by nature - Gmail would strip active content anyway.

> [!TIP]
> Gmail signatures render best with table-based layouts and inline styles. Avoid external CSS files and web fonts; most mail clients ignore them.

## The default template

One template can be marked as **Default**. Users who are not covered by any [assignment](/docs/assignments/) or [self-service](/docs/self-service/) choice fall back to it - and so do users whose assignment was deleted.

## Self-service toggle

Each template has a self-service switch controlling whether end users can pick it on the [My signature](https://app.signature.cat/self-service) page. Disabling it clears the self-service choices that use it (with a confirmation). Details: [Self-service](/docs/self-service/).

## Deleting a template

Deleting an unused template just removes it. Deleting a template that is **in use** shows a cascade dialog first, spelling out exactly what goes with it:

- its group and OU assignments,
- self-service choices made by users,
- queued apply jobs (cancelled).

> [!WARNING]
> Confirming with **Delete anyway** permanently removes the template together with its assignments and self-service choices. Users covered by them fall back to the default template on the next sync. This cannot be undone.
