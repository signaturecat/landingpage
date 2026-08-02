---
title: Visual editor
navTitle: Visual editor
description: Design Gmail signature templates without writing HTML - variable chips, columns, dividers, custom images and email-safe formatting on one canvas.
updated: 2026-08-02
---

# Visual editor

The visual editor lets you design a signature template without writing a line of HTML. You work on a canvas with text formatting, variable chips and live-sized images, and the editor can only produce markup from an email-safe allowlist - what the canvas emits is exactly what SignatureCat stores and sends to Gmail, nothing is rewritten behind your back.

> [!NOTE]
> Gmail has the last word: it runs its own sanitizer when it saves a signature, so a very complicated layout can still come back trimmed. See [When Gmail trims your signature](/docs/gmail-sanitization).

The editor lives on the same page as the [HTML editor](/docs/templates#the-editor): open any template on [Signatures](https://app.signature.cat/signatures) and switch between the **Visual** and **HTML** tabs.

## Editing modes

Every template is edited in one of two modes, and the editor opens in the mode the template was last saved in:

- **Visual** - the canvas described on this page. Saving stores both the visual document and the generated HTML.
- **HTML** - the classic code editor with token autocompletion; see [Templates](/docs/templates#the-editor).

Switching between them is possible at any time, with two caveats:

- **HTML to Visual is a one-way conversion.** The importer translates your markup into canvas blocks on a best-effort basis, and a hand-written signature now survives that trip much better: every row of a multi-row layout table becomes its own [column row](#columns), and `{{del}}` or `{{delete}}` guards wrapped around a whole cell, a run of neighbouring cells or a whole row are kept instead of being silently dropped. Deeply nested table layouts are still flattened, and the editor warns you before a lossy conversion.
- **Visual to HTML is a downgrade.** You get the generated HTML to edit freely, but saving from the HTML tab discards the visual document - switching back later means converting again.

## Text, fonts and colors

The canvas supports the formatting that reliably survives mail clients: paragraphs, **bold**, *italic*, underline, bullet and numbered lists, an email-safe text color palette, links (web, mailto and tel) and undo/redo.

Two dropdowns control typography:

- **Font size** - seven fixed sizes plus **Default size**: 10, 12, 14, 16, 18, 20 and 24 px. Anything else is not offered, and the canvas default is 14 px.
- **Font** - "Default (mail client)" plus seven web-safe families: Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman and Courier New. The default option emits no font at all, letting each recipient's mail client use its own - the safest choice. The font applies to the whole signature, not to the selection.

**Text color** offers eight email-safe swatches plus **Default color**, which removes the color again.

> [!NOTE]
> Web-safe fonts render consistently because they ship with the recipient's system, not with the email. The first time you pick a non-default font the editor shows a short compatibility note.

## Columns

Insert a 2- or 3-column row from the toolbar (**Insert 2 columns**, **Insert 3 columns**) to place content side by side - for example a photo on the left and contact details on the right. Columns are stored as a single-row table in the generated HTML, the one layout technique every mail client renders correctly. There is no way to add a column to an existing row: insert a row with the number of columns you need.

Once a row is on the canvas:

- **Change the proportions.** Drag the accent bar in the gutter between two columns (**Column width (drag; arrow keys adjust)**). Each column keeps at least 10 percent of the width, and the handle also works from the keyboard - arrow keys move it in steps of 5 percent. One drag sets the proportions for the whole row, so a row is either an equal split or a fully custom one.
- **Move the whole row.** The grip at the top left of the row (**Move this row (drop between lines)**) drags it between the other blocks, with a line showing where it will land.
- **Delete a single column.** The trash button in the column overlay removes it; a column that still holds content asks for confirmation first. A row left with only one column is unwrapped automatically, so deleting can never leave a broken layout behind.
- **Make a column conditional.** The toggle in the column overlay cycles the column through no guard, `{{del}}` and `{{delete}}` (**Make this column conditional (it disappears when its variables are empty)**). The whole column then disappears for users whose variables inside it are empty - a photo column for people without a photo, for instance. A conditional column is drawn with a dashed outline and a corner tag showing the token; the rules are exactly those of [conditional blocks](/docs/template-variables#conditional-blocks-del-and-delete).

Imported HTML keeps its layout: every row of a multi-cell table becomes its own column row, so a photo-and-name row above a divider row stays two rows instead of collapsing into one.

## Dividers

A divider is a horizontal line between two blocks - the tidy way to separate a name from contact details. Insert one with **Insert a divider**; by default it is a thin light-grey line with a little space above and below.

On the canvas it is a selectable block called **Divider line**. Hover it for a grip that drags it between the other blocks and a button that removes it. Two properties are yours to set:

- **Color** - select the line, then pick a swatch from the toolbar palette (**Divider color (select the line, then pick a color)**).
- **Length** - drag the handle at the end of the line (**Divider length (drag; double-click for full width)**) between 10 and 100 percent of the signature width. Double-click restores full width.

A divider you wrote by hand in HTML keeps the style you gave it when the template is converted to the visual mode.

## Variables as chips

Person variables like `{{firstname}}` or `{{phone}}` appear on the canvas as **chips** - solid tokens you cannot accidentally break by typing into them. Chips can be:

- inserted from the **Insert variable** menu,
- formatted like the text around them - bold, italic, underline, plus **Text color** and **Font size**, which carry through to the value that ships in the delivered signature,
- dragged and dropped anywhere on the canvas,
- removed with the trash button that appears on hover.

Select the chip, or a run of text containing it, before picking a size or a color: parking the caret next to a chip changes nothing. Image chips (`{{logo}}`, `{{banner}}`, `{{photo}}`) are never restyled this way - they are sized with their resize handles instead.

The full variable list and resolution rules are in [Template variables](/docs/template-variables).

## Images: logo, banner and photo

`{{logo}}`, `{{banner}}` and `{{photo}}` render on the canvas as image chips at their real size - the logo and banner chips show the actual image selected from your [library](/docs/banners-and-logos), the photo chip shows an avatar placeholder (real photos substitute per user at render time).

Select an image chip and drag its **resize handles** (edges and corner) to size it for this template - like resizing a window. Double-click restores the default size. The handles are mouse-operated; there is no keyboard stepping for them. Allowed ranges:

| Image | Default size | Resize range |
|---|---|---|
| Logo | 115x115 px | 24-300 px per side |
| Banner | 450x100 px (or the library entry's own size) | 24-600 x 24-400 px |
| Photo | 115x115 px, round | 24-300 px per side |

The profile photo is round by default. The small toggle on the photo chip's grip switches it to a square for this template (**Switch to a square photo**) and back again (**Switch to a round photo**).

Sizes are stored **per template**: resizing a banner in one template never changes other templates that use the same library image.

A selected logo or banner chip also exposes a **Link** button: keep the library image's click-through link, remove the link for this template only, or point it at a different URL - without touching the library entry other templates share.

## Custom images

Any image you already host on an `https://` address can go straight into a template, without adding it to the shared library. Click **Insert an image (URL)** on the toolbar and fill in:

- **Image URL (https)** - the address of the image. It has to start with `https://`.
- **Description (ALT, optional)** - what recipients see when their mail program cannot display the image. It cannot contain `{{ }}` template tokens.
- **Shape** - **Square** or **Round**.

On the canvas the block works like the other images: the grip moves it between blocks, the edge and corner handles resize it (16 to 600 px wide, 16 to 400 px tall), the pencil (**Edit image**) reopens the address, description and shape, and the trash button removes it. If you place it inside a link, the link is kept.

A custom image belongs to that one template. It is not a library entry: it does not show up in the Logo and Banner galleries, other templates cannot pick it, and it is not managed in [Banners and logos](/docs/banners-and-logos). SignatureCat neither uploads nor stores the file - the image stays on your host, so the address has to keep working for as long as the signature is in use.

> [!TIP]
> Use the library for the logo and the campaign banner your whole company shares, and a custom image for a one-off - an award badge or an event logo that lives in a single template.

## Conditional blocks

`{{del}}` and `{{delete}}` wrappers appear as framed blocks on the canvas, so you can see exactly what disappears when a user's data is missing. A whole [column](#columns) can carry the same guard. When a save is rejected because of unbalanced tags, the editor shows two looping micro-demos contrasting how `{{del}}` and `{{delete}}` behave - the exact rules are in [Template variables](/docs/template-variables#conditional-blocks-del-and-delete).

## Staying within Gmail's limits

Gmail caps signatures at 10,000 characters. A live budget counter under the canvas tracks the generated HTML size, so you know long before Gmail would reject the signature.

## Reset and validation

- **Discard changes** (visible whenever you have unsaved changes, tooltip "Restore the last saved version") restores the template to its last saved state, including the saved editing mode, after a confirmation.
- Validation errors are specific: an unknown token is named, unbalanced conditional tags come with open/close counts - no guesswork.

When your template looks right, check it on the simulated clients above the preview ([Mail client preview](/docs/mail-client-preview)), render it against real users and test it on your own mailbox - see [Create your first template](/docs/create-your-first-template#preview-as-a-real-user).
