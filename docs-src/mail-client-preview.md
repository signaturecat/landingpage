---
title: Mail client preview
navTitle: Mail client preview
description: See a Gmail signature on simulated Gmail, Outlook and Apple Mail surfaces in light and dark - what the SignatureCat preview shows and what it cannot.
updated: 2026-08-02
---

# Mail client preview

The preview next to the editor draws your signature on a simulated mail client surface: your HTML, unchanged, on that client's page background, in its default font, with the one color change that client makes in dark mode. It is an approximation, not the client's own rendering engine.

The app states this itself, behind the info icon at the end of the client row ("What this preview does and does not show"):

> Approximation: the signature HTML is unchanged, only the surface and the way this client repaints colors in dark mode. It is not rendered by the client's own engine.

Use the simulation to catch color and layout mistakes early. Use **Set me a test signature** and your own mailbox for the answer that counts.

## What a client profile changes

A profile changes four things around your signature and nothing inside it:

- the page background behind the message,
- the default text color,
- the default link color,
- the client's default font and size.

Everything your template sets explicitly - fonts, colors, table widths, image sizes - is passed through untouched. That is also why the default font matters: a signature that sets no `font-family` inherits the recipient's client default, and each profile shows you which one that would be.

The pill buttons above the frame ("Simulated mail client") switch profiles, and a **Light** / **Dark** toggle sits next to them. The preview opens on **Gmail (web)** in **Light** - the surface that shows the signature as authored - and remembers the client and mode you picked for your next visit. The frame is sandboxed: no scripts run inside it, and links in the signature open in a new tab.

## The five client profiles

| Profile | What it simulates | Why it is there |
|---|---|---|
| **Gmail (web)** | Gmail in a browser: white page, Arial, light only | The as-authored view, and the profile the preview opens on |
| **Gmail (app)** | Gmail on a phone: Roboto, full inversion in dark mode | The most common fully inverting client |
| **Outlook (classic, Windows)** | The Word rendering engine: an Aptos/Calibri stack at 11pt, plus geometry rules, and a forced inversion in dark mode | The only profile that also approximates a different layout engine |
| **Outlook.com** | Outlook on the web: Segoe UI, and a dark mode that keeps the colors you set explicitly | The partial-inversion case, where only some colors change |
| **Apple Mail** | Apple Mail on macOS and iOS: the system font, full inversion in dark mode | The second fully inverting client, with different defaults |

Four of the five offer both light and dark, so there are nine client-and-mode combinations in total. The brand names are deliberately left untranslated in every language version of the app.

## Light and dark

Each profile applies the one color transformation that client actually performs in dark mode - and the five are not the same transformation.

| Profile | Dark mode |
|---|---|
| Gmail (web) | Not offered. Gmail's web interface darkens around the message, never the message itself. |
| Gmail (app) | Full inversion, unless the signature paints its own background. |
| Apple Mail | Full inversion, unless the signature paints its own background. |
| Outlook (classic, Windows) | Inverts always, even a signature that brings its own background, because Word repaints regardless. |
| Outlook.com | Partial: a dark surface with lighter default text and links, while any color set explicitly in the signature is left alone. |

The **Dark** half of the toggle is disabled for **Gmail (web)**, with the reason on the control: "Gmail (web) darkens its own interface, but never the colors inside a message."

### Signatures with their own background

If your signature paints its own opaque background, the inverting profiles leave its colors alone - and the preview says so: "This signature paints its own background, so an inverting client leaves its colors alone." A real auto-inverting client leaves such content alone, so the simulation does too.

White, `transparent` and fully transparent `rgba()` values do not count as a background here. **Outlook (classic, Windows)** is the exception: it inverts anyway, which is why dark marketing emails come out light there.

### Picking colors that survive both modes

Leave your contact lines without an explicit color and let them inherit. A forced-dark client lightens inherited text, so the lines stay readable; a dark gray hardcoded on every line looks right on white and nearly disappears on Outlook.com's dark surface, where explicit colors are kept as they are. The preview names that case too: "Outlook.com keeps colors the author set explicitly and only lightens text that has no color of its own - a hardcoded dark color stays dark here."

The built-in starters are written this way: the name and the job title carry a color, the contact lines carry none, and the links use a gray with enough contrast on a white page and on a dark surface.

## Outlook (classic, Windows) renders with Word

Classic Outlook on Windows does not use a browser engine - it draws mail with Word, and this profile approximates that geometry in **both** light and dark. In this profile:

- rounded corners are removed, so a round photo shows as a square,
- `display` is honored only as `display:none`, so a span styled as a block stops behaving like one,
- margins on `<span>` are dropped,
- padding survives only inside table cells (`td` and `th`),
- `white-space`, `float`, `box-shadow`, `text-shadow`, `opacity`, `transform` and background images are ignored,
- `max-width` applies to tables only.

This is why the built-in starters build every line as a `<div>` with explicit margins, put gutters as padding on table cells and set image sizes with `width` and `height` attributes instead of CSS.

> [!NOTE]
> A circular profile photo cannot look the same everywhere: the Word engine has no support for rounded corners, so `{{photo}}` is a circle in Gmail and Apple Mail and a square in classic Outlook. The preview reproduces that difference instead of hiding it.

One thing to know before you switch tabs: opening Outlook-tuned HTML in the [visual editor](/docs/visual-editor) and saving it re-serializes the markup and drops part of what gives it classic-Outlook parity - block margins, explicit line heights and cell padding. If you need that parity, keep editing the template on the **HTML** tab.

## What the simulation does not reproduce

The simulation stops at the surface. It does not:

- run the client's own rendering engine - nothing you see is real Gmail or real Outlook output;
- reproduce classic Outlook's table auto-layout or the 120 DPI scaling it applies;
- claim exact vendor colors - the surfaces are representative approximations, because no vendor publishes the real values;
- show what Gmail stores once you save. Gmail runs its own sanitizer on its servers, so a signature can be trimmed after a successful write - see [When Gmail trims your signature](/docs/gmail-sanitization).

## Render as

The **Render as:** field renders the template against a real person's Google Directory record, so you can check the cases your own record does not have: a long job title, a missing phone number, an empty department.

- Leave the field empty and the preview renders against your own Directory record.
- Type two characters or more and suggestions appear from your Workspace directory, each with the name, the address and the Directory photo. At most ten matches, suspended users excluded.
- The field also accepts free text, so you can type any address - an alias, or somebody the search does not return. The preview reloads once what you typed is a complete address. If nothing matches: "No users match your search. You can still type any address."
- **Clear and render as me** puts it back to you.

Rendering as somebody else requires the Designer, Editor or Admin access level. Self-service users get the same preview, pinned to their own record. See [User management](/docs/user-management).

The line directly under the preview always names the record that was used: "Rendered against {email}'s Directory record."

Values resolve exactly as they will on a real apply: the Google Directory record, with any per-user values stored on the Data tab layered on top. The full list of fields and where each one comes from is in [Template variables](/docs/template-variables). If the template uses `{{banner}}` or `{{logo}}`, a second line under the preview reminds you that those tokens render with the images picked for this template - see [Banners and logos](/docs/banners-and-logos).

When a target cannot be rendered, the message is specific:

| Message | What happened |
|---|---|
| "No Workspace user found for {email}. Check the address and try again." | The address is not in your Google Directory. |
| "That email address or domain isn't valid. Check it and try again." | The address or its domain is malformed. |
| "Too many preview updates. Pausing for a moment, then it will refresh." | Too many refreshes in a short time. The preview resumes on its own. |
| "Finish domain-wide delegation setup to preview signatures." | The preview reads the directory, so it needs a verified delegation. See [Domain-wide delegation](/docs/domain-wide-delegation). |

## The only 100 percent check

Your own mailbox is the only faithful check. Click **Set me a test signature** in the editor: SignatureCat renders the template against your own Directory record and writes it to your own Gmail signature, so nobody else is affected. Then open Gmail and look at the result.

That check answers a different question than the preview. The preview shows how a client would draw your HTML; the mailbox shows what Gmail actually stored, and Gmail rewrites signatures on its own servers when it saves them. If the result looks cut off, read [When Gmail trims your signature](/docs/gmail-sanitization).

## Where the preview appears

The client simulation is on the two surfaces where signatures are authored:

- **The template editor** on [Signatures](https://app.signature.cat/signatures), for Designers, Editors and Admins - with the client pills, the light and dark toggle, **Render as** and **Set me a test signature**. See [Templates](/docs/templates).
- **[My signature](https://app.signature.cat/self-service)**, for self-service users - the same pills and toggle, always rendered against the signed-in user's own record ("Rendered against your own Directory record."). There is no test-apply button there, so the disclaimer names the other route to certainty: "For a 100% faithful check, save and look at the signature in your own mailbox." See [Self-service signatures](/docs/self-service).
