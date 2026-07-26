---
title: Visual editor
navTitle: Visual editor
description: Design Gmail signatures without writing HTML - SignatureCat's visual editor with variable chips, image resizing, columns, fonts and guaranteed Gmail-safe output.
updated: 2026-07-26
---

# Visual editor

The visual editor lets you design a signature template without writing a line of HTML. You work on a canvas with text formatting, variable chips and live-sized images - and everything it produces is guaranteed email-safe: the editor can only emit markup that renders correctly in Gmail, so there is no way to build a signature that breaks in the mailbox.

The editor lives on the same page as the [HTML editor](/docs/templates/#the-editor): open any template on [Signatures](https://app.signature.cat/signatures) and switch between the **Visual** and **HTML** tabs.

## Editing modes

Every template is edited in one of two modes, and the editor opens in the mode the template was last saved in:

- **Visual** - the canvas described on this page. Saving stores both the visual document and the generated HTML.
- **HTML** - the classic code editor with token autocompletion; see [Templates](/docs/templates/#the-editor).

Switching between them is possible at any time, with two caveats:

- **HTML to Visual is a one-way conversion.** The importer translates your markup into canvas blocks on a best-effort basis - simple layouts (including single-row tables, which become [columns](#columns)) convert cleanly, while deeply nested table layouts are flattened. The editor warns you before a lossy conversion.
- **Visual to HTML is a downgrade.** You get the generated HTML to edit freely, but saving from the HTML tab discards the visual document - switching back later means converting again.

## Text, fonts and colors

The canvas supports the formatting that reliably survives mail clients: paragraphs, **bold**, *italic*, underline, bullet and numbered lists, an email-safe text color palette, links (web, mailto and tel) and undo/redo.

Two dropdowns control typography:

- **Font size** - 10 to 24 px.
- **Font** - "Default (mail client)" plus seven web-safe families: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman and Courier New. The default option emits no font at all, letting each recipient's mail client use its own - the safest choice.

> [!NOTE]
> Web-safe fonts render consistently because they ship with the recipient's system, not with the email. The first time you pick a non-default font the editor shows a short compatibility note.

## Columns

Insert a 2- or 3-column row from the toolbar to place content side by side - for example a photo on the left and contact details on the right. Columns are stored as a single-row table in the generated HTML, the one layout technique every mail client renders correctly. Existing single-row tables in imported HTML become columns automatically.

## Variables as chips

Person variables like `{{firstname}}` or `{{phone}}` appear on the canvas as **chips** - solid tokens you cannot accidentally break by typing into them. Chips can be:

- inserted from the **Insert variable** menu,
- formatted like text (bold, italic, underline apply to the resolved value),
- dragged and dropped anywhere on the canvas,
- removed with the trash button that appears on hover.

The full variable list and resolution rules are in [Template variables](/docs/template-variables/).

## Images: logo, banner and photo

`{{logo}}`, `{{banner}}` and `{{photo}}` render on the canvas as image chips at their real size - the logo and banner chips show the actual image selected from your [library](/docs/banners-and-logos/), the photo chip shows a circular avatar placeholder (real photos substitute per user at render time).

Select an image chip and drag its **resize handles** (edges and corner) to size it for this template - like resizing a window. Double-click restores the default size; the handles also work from the keyboard (arrow keys step 10 px, Shift-arrows 50 px, Home/End jump to the limits). Allowed ranges:

| Image | Default size | Resize range |
|---|---|---|
| Logo | 115x115 px | 24-300 px per side |
| Banner | 450x100 px (or the library entry's own size) | 24-600 x 24-400 px |
| Photo | 115x115 px, circular | 24-300 px per side |

Sizes are stored **per template**: resizing a banner in one template never changes other templates that use the same library image.

A selected logo or banner chip also exposes a **Link** button: keep the library image's click-through link, remove the link for this template only, or point it at a different URL - without touching the library entry other templates share.

## Conditional blocks

`{{del}}` and `{{delete}}` wrappers appear as framed blocks on the canvas, so you can see exactly what disappears when a user's data is missing. When a save is rejected because of unbalanced tags, the editor shows two looping micro-demos contrasting how `{{del}}` and `{{delete}}` behave - the exact rules are in [Template variables](/docs/template-variables/#conditional-blocks-del-and-delete).

## Staying within Gmail's limits

Gmail caps signatures at 10,000 characters. A live budget counter under the canvas tracks the generated HTML size, so you know long before Gmail would reject the signature.

## Reset and validation

- **Reset to saved** (visible whenever you have unsaved changes) restores the template to its last saved state, including the saved editing mode, after a confirmation.
- Validation errors are specific: an unknown token is named, unbalanced conditional tags come with open/close counts - no guesswork.

When your template looks right, preview it against real users and test it on your own mailbox - see [Create your first template](/docs/create-your-first-template/#preview-as-a-real-user).
