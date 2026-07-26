---
title: Upload and insert banners and logos
navTitle: Banners and logos
description: Add company logos and campaign banners to SignatureCat signature templates - image library, custom sizes, per-template resizing, click-through links and placeholders.
updated: 2026-07-26
---

# Upload and insert banners and logos

SignatureCat keeps two kinds of company images in a per-workspace library: **logos** (115x115 px by default) and **banners** (450x100 px by default, scaled down on small screens). Each template selects its own logo and banner, inserted with the `{{logo}}` and `{{banner}}` tokens - and can resize either one for itself with the [visual editor's resize handles](/docs/visual-editor/#images-logo-banner-and-photo).

## Add an image to the library

1. Open a template in the editor on [Signatures](https://app.signature.cat/signatures).
2. Click **Logo** or **Banner** in the toolbar - each opens its own gallery (logos and banners never mix).
3. Choose **Add to library**, then either:
   - **I have a link** - paste a public HTTPS URL of an image you already host, or
   - **Upload a file** - PNG or JPG, recommended up to 200 KB (5 MB hard limit).
4. Optionally set a library label and a click-through link ("On click, leads to"), then save. The image is added to the library and selected for this template.

For banners you can also give the **library entry its own size** (a checkbox with width and height fields, 24-600 x 24-400 px) - both when adding the entry and later in the selected entry's details. That size becomes the entry's default wherever it is used; clearing it returns to 450x100.

> [!NOTE]
> PNG and JPG only - SVG files are not accepted (poor mail-client support and security reasons). The library holds up to 200 images per kind.

## Insert into a template

Pick an image in the gallery and click **Use selected** - the editor can also insert the `{{logo}}` or `{{banner}}` token at the cursor for you. At render time the token becomes a proper image tag; if the image has a click-through link, it is wrapped in a link automatically.

If a template uses `{{banner}}` without a selected banner, a neutral placeholder renders instead and the editor nudges you to pick one - the signature never breaks.

## Image sizes: library default vs per-template

Two layers control how big a logo or banner renders, and the more specific one wins:

1. **Per-template size** - set with the resize handles in the [visual editor](/docs/visual-editor/#images-logo-banner-and-photo) (banner 24-600 x 24-400 px, logo 24-300 px). It applies to that template only, so resizing a banner in one template never changes the others sharing the same image.
2. **Library entry size** (banners only) - the entry's own default described above.

With neither set, the defaults apply: logo 115x115, banner 450x100.

## Click-through links

The click link travels with the **library image**, not the template: update the link once and every template using that image picks it up on the next render. This is handy for rotating campaign banners - swap the target URL without touching templates.

When one template should behave differently, select the image chip in the [visual editor](/docs/visual-editor/#images-logo-banner-and-photo) and use the **Link** button: keep the library link, remove the link for this template only, or point it at a different URL.

## Sizing recommendations

| Kind | Default rendered size | Recommendation |
|---|---|---|
| Logo | 115x115 px (resizable per template up to 300 px) | Square image, PNG with transparency works best. |
| Banner | 450x100 px (custom sizes up to 600x400 px; max-width 100%) | Export at twice the display size for sharp HiDPI rendering, keep the file under 200 KB. |

Large images slow down email rendering and can push messages into the "message clipped" territory in Gmail - keep files small.

## Deleting images

Deleting a library image detaches it from every template that selected it - those templates fall back to the placeholder. The app warns you first: "This image is used in N template(s). After deleting it will no longer show there - a placeholder appears instead."

> [!NOTE]
> Emails that were already sent keep their images - deletion only affects future renders.

## Where images are served from

Library images are hosted at `images.signature.cat` by default. To serve them from your own subdomain (better deliverability), see [Serve images from your own domain](/docs/custom-image-domain/). External URL images ("I have a link") are always fetched from wherever you host them - they must stay publicly reachable over HTTPS.
