---
title: Upload and insert banners and logos
navTitle: Banners and logos
description: Add company logos and campaign banners to SignatureCat signature templates - image library, upload limits, click-through links and placeholders.
updated: 2026-07-17
---

# Upload and insert banners and logos

SignatureCat keeps two kinds of company images in a per-workspace library: **logos** (rendered 115x115 px) and **banners** (rendered 450x100 px, scaled down on small screens). Each template selects its own logo and banner, inserted with the `{{logo}}` and `{{banner}}` tokens.

## Add an image to the library

1. Open a template in the editor on [Signatures](https://app.signature.cat/signatures).
2. Click **Logo** or **Banner** in the toolbar - each opens its own gallery (logos and banners never mix).
3. Choose **Add to library**, then either:
   - **I have a link** - paste a public HTTPS URL of an image you already host, or
   - **Upload a file** - PNG or JPG, recommended up to 200 KB (5 MB hard limit).
4. Optionally set a library label and a click-through link ("On click, leads to"), then save. The image is added to the library and selected for this template.

> [!NOTE]
> PNG and JPG only - SVG files are not accepted (poor mail-client support and security reasons). The library holds up to 200 images per kind.

## Insert into a template

Pick an image in the gallery and click **Use selected** - the editor can also insert the `{{logo}}` or `{{banner}}` token at the cursor for you. At render time the token becomes a proper image tag; if the image has a click-through link, it is wrapped in a link automatically.

If a template uses `{{banner}}` without a selected banner, a neutral placeholder renders instead and the editor nudges you to pick one - the signature never breaks.

## Click-through links

The click link travels with the **library image**, not the template: update the link once and every template using that image picks it up on the next render. This is handy for rotating campaign banners - swap the target URL without touching templates.

## Sizing recommendations

| Kind | Rendered size | Recommendation |
|---|---|---|
| Logo | 115x115 px | Square image, PNG with transparency works best. |
| Banner | 450x100 px (max-width 100%) | Export at 900x200 px for sharp HiDPI rendering, keep the file under 200 KB. |

Large images slow down email rendering and can push messages into the "message clipped" territory in Gmail - keep files small.

## Deleting images

Deleting a library image detaches it from every template that selected it - those templates fall back to the placeholder. The app warns you first: "This image is used in N template(s). After deleting it will no longer show there - a placeholder appears instead."

> [!NOTE]
> Emails that were already sent keep their images - deletion only affects future renders.

## Where images are served from

Library images are hosted at `images.signature.cat` by default. To serve them from your own subdomain (better deliverability), see [Serve images from your own domain](/docs/custom-image-domain/). External URL images ("I have a link") are always fetched from wherever you host them - they must stay publicly reachable over HTTPS.
