---
title: Images
navTitle: Images
description: Reference for images in SignatureCat email signatures for Google Workspace - the library, ALT descriptions, hosting, formats, limits and deletion.
updated: 2026-08-19
---

# Images

Signature images - company logos, campaign banners and profile photos - come from three sources in SignatureCat: the built-in **image library**, **external URLs** you host yourself, and Google Directory **profile photos**. This page is the reference; the practical guide is [Banners and logos](/docs/banners-and-logos).

## The image library

Each workspace has one library with two kinds of entries:

| Kind | Rendered size | Token | Library cap |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 entries |
| Banner | 450x100 px, max-width 100% | `{{banner}}` | 200 entries |

Library entries carry an optional label, an optional **click-through link** and an optional **Image description (ALT)**. Each template selects its own logo and banner from the library; templates without a selection render a neutral placeholder. Uploads are PNG, JPG or GIF - up to 5 MB for PNG/JPG and 20 MB for GIF (200 KB recommended for static images); SVG is not accepted.

## Image description (ALT)

The **Image description (ALT)** is what a recipient sees instead of the picture when their mail client blocks images, and what a screen reader announces. It is optional and limited to 300 characters.

- **Where you set it:** in the add form when you upload a file or paste a link, in the image step of the new-template wizard, and later in the **Selected image details** panel of the library.
- **What it applies to:** every library entry, whether SignatureCat hosts the file or you link to your own.
- **Where it travels:** with the library entry, exactly like the click-through link - change it once and every template using that image ships the new description on the next render.
- **If you leave it empty:** the image is rendered as decorative and gets no description.

## Where images are served from

- **Library uploads** are stored by SignatureCat and served from `https://images.signature.cat/...` over a CDN with long-lived caching.
- With a verified [custom image domain](/docs/custom-image-domain), newly rendered signatures serve library images from your subdomain (for example `images.yourcompany.com`) instead - better deliverability, same storage.
- **External URL images** ("I have a link") are hot-linked from wherever you host them. They must be public and HTTPS; ideally host them on your own domain.

> [!IMPORTANT]
> Image URLs are baked into each rendered signature, so emails already in recipients' inboxes keep fetching the URL they were sent with: deleting a library entry that SignatureCat hosts releases the stored file, and the image eventually stops loading in mail that was already delivered.

## Profile photos

The `{{photo}}` variable uses the user's Google profile photo from Directory (auto-scaled to 400 px). It is not part of the library - users and admins manage profile photos in Google Workspace. See [Template variables](/docs/template-variables#person-variables-google-directory).

## Lifecycle notes

- **Replacing an image:** upload the new file, select it on every template that used the old one, and delete the old entry only once you are sure - or keep the same library entry and only update its click-through link or ALT description, which every template picks up on the next render.
- **Deleting a library entry** detaches it from templates that use it (they fall back to the placeholder) after a warning with the usage count. Those signatures keep applying in the meantime.
- **Deleting an in-use image notifies the workspace:** an in-app notification appears in the bell and an email goes to the admins and the owner, naming the affected templates. See [Notifications](/docs/notifications).
- **Hosted files are released:** once the library entry is gone, SignatureCat cleans up the stored file on the next daily pass, so the image stops loading in already-delivered emails too. Deletion is permanent and there is no self-service undo.
- **External images are unaffected by deletion.** You host the file, so removing the library entry only removes the entry - old emails keep loading the image until you take it offline yourself.

## Deliverability tips

- Keep files small (banners under 200 KB) - large images slow rendering and hurt spam scores.
- Serve images from your own domain with a [custom image domain](/docs/custom-image-domain) - mail clients trust the sender's domain more.
- Gmail proxies images for recipients, so exotic hosting setups (IP allowlists, referer checks) will break rendering. Keep images plainly public.
