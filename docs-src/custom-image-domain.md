---
title: Serve images from your own domain
navTitle: Custom image domain
description: Point a subdomain like images.yourcompany.com at SignatureCat with two DNS records so signature images load from your own domain.
updated: 2026-07-17
---

# Serve images from your own domain

By default, logos and banners in your signatures are served from `images.signature.cat`. You can serve them from a subdomain of your own domain instead - for example `images.yourcompany.com`. Mail clients fetch images from the sender's own domain more readily, so deliverability improves, and the URLs carry your brand.

Setup breaks nothing: until the domain is active, images keep loading from `images.signature.cat`, and after activation the switch happens automatically for newly rendered signatures. Templates stay unchanged.

## Requirements

- An **Admin** access level in SignatureCat.
- Access to your domain's DNS settings.
- A **subdomain** (like `images.yourcompany.com`). Apex domains (`yourcompany.com`) are not supported by design.

## Set it up

1. Open the image library from any template editor on [Signatures](https://app.signature.cat/signatures) (Logo or Banner button) and choose **Use your own domain** in the serving bar.
2. **Enter a subdomain** - for example `images.yourcompany.com` - and click **Generate DNS records**.
3. **Add two DNS records** at your DNS provider, exactly as shown:
   - a **CNAME** record pointing the subdomain to `cdn.signature.cat` (points the subdomain to us),
   - a **TXT** record proving domain ownership.
4. **Wait for verification.** SignatureCat checks the records automatically every few minutes; you can also click **Check now**. Activation usually takes a few minutes, sometimes up to an hour while DNS refreshes. The TLS certificate is issued for you.

The wizard shows one of three statuses: **Waiting for DNS records**, **Domain active** or **Verification failed**.

Once active: "New emails fetch images from your domain. Templates stay unchanged - the switch happens automatically."

> [!NOTE]
> Emails that were already sent are not affected - they keep loading images from the URL they were rendered with.

## Removing the domain

Removing the domain in the wizard switches image serving back to `images.signature.cat` automatically for new emails. Nothing breaks.

> [!WARNING]
> The reverse is not monitored: if you delete the CNAME record at your DNS provider **while the domain is still active in SignatureCat**, images in newly sent signatures will silently stop loading. Always remove the domain in SignatureCat first, then clean up DNS.
