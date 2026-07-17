---
title: Images
navTitle: Images
description: SignatureCat image reference - the per-workspace library, hosting on images.signature.cat or your own domain, formats, limits and lifecycle.
updated: 2026-07-17
---

# Images

Signature images - company logos, campaign banners and profile photos - come from three sources in SignatureCat: the built-in **image library**, **external URLs** you host yourself, and Google Directory **profile photos**. This page is the reference; the practical guide is [Banners and logos](/docs/banners-and-logos/).

## The image library

Each workspace has one library with two kinds of entries:

| Kind | Rendered size | Token | Library cap |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 entries |
| Banner | 450x100 px, max-width 100% | `{{banner}}` | 200 entries |

Library entries carry an optional label and an optional **click-through link**. Each template selects its own logo and banner from the library; templates without a selection render a neutral placeholder. Uploads are PNG or JPG, up to 5 MB (200 KB recommended); SVG is not accepted.

## Where images are served from

- **Library uploads** are stored by SignatureCat and served from `https://images.signature.cat/...` over a CDN with long-lived caching.
- With a verified [custom image domain](/docs/custom-image-domain/), newly rendered signatures serve library images from your subdomain (for example `images.yourcompany.com`) instead - better deliverability, same storage.
- **External URL images** ("I have a link") are hot-linked from wherever you host them. They must be public and HTTPS; ideally host them on your own domain.

> [!IMPORTANT]
> Image URLs are baked into each rendered signature. Emails that are already in recipients' inboxes keep fetching the URL they were sent with - which is why SignatureCat never deletes the underlying files of removed library images, and why an external image you take offline will show as broken in old emails.

## Profile photos

The `{{photo}}` variable uses the user's Google profile photo from Directory (auto-scaled to 400 px). It is not part of the library - users and admins manage profile photos in Google Workspace. See [Template variables](/docs/template-variables/#person-variables-google-directory).

## Lifecycle notes

- **Replacing an image:** add the new file to the library and select it on the template - or keep the same library entry and only update its click-through link (picked up on the next render).
- **Deleting a library entry** detaches it from templates that use it (they fall back to the placeholder) after a warning with the usage count.
- **Already-sent emails** are never affected by library changes.

## Deliverability tips

- Keep files small (banners under 200 KB) - large images slow rendering and hurt spam scores.
- Serve images from your own domain with a [custom image domain](/docs/custom-image-domain/) - mail clients trust the sender's domain more.
- Gmail proxies images for recipients, so exotic hosting setups (IP allowlists, referer checks) will break rendering. Keep images plainly public.
