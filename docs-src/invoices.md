---
title: Invoices
navTitle: Invoices
description: How SignatureCat billing works - pricing tiers, the 7-day trial, where invoices are sent and how to set a dedicated invoice email.
updated: 2026-07-17
---

# Invoices

SignatureCat bills monthly per active Workspace user, through Stripe. Invoices and receipts are emailed to your **invoice email** address, which you can point at your accounting inbox independently of any admin account. Invoices for a given month are issued no later than the **10th day of the following month**.

## Pricing

Pricing is graduated per seat - each seat band has its own rate and larger workspaces blend down:

| Workspace user count | Price per user / month |
|---|---|
| 1 - 50 | $0.80 |
| 51 - 120 | $0.70 |
| 121 - 300 | $0.60 |
| 301+ | $0.55 |

For example, 60 users cost 50 x $0.80 + 10 x $0.70 = $47.00 per month. Prices are in USD and exclude tax.

**What counts as a billable user:** the number of active (non-suspended) users in your Google Workspace directory - not the number of SignatureCat logins. Seat increases are reflected immediately with prorations; when your headcount drops, the lower count takes effect from the next billing period.

## The 7-day trial

Every workspace starts with a 7-day free trial. A card is collected at sign-up and charged for the first time when the trial ends. In the last 3 days of the trial the app shows a reminder banner, and you also get a "Your signature.cat trial ends soon" email about 3 days before the end.

> [!NOTE]
> The trial is granted **once per Workspace domain**. Deleting the account and registering the same domain again does not start a new trial.

## Set the invoice email

1. Open [Settings](https://app.signature.cat/settings) (Admin only) and find the **Billing** section.
2. Enter the address in **Invoice email** - "Stripe sends invoices and receipts to this address. It can be different from the admin account email." - and click **Save**.

Use this to route paperwork straight to accounting (for example `invoices@yourcompany.com`). Billing-related product alerts (trial ending, payment failed) are separate and go to admin users - see [Notifications](/docs/notifications/).

## Company details on the invoice

Your legal company name, billing address and tax ID (VAT / NIP) are stored only in Stripe and printed on every invoice issued after you set them. You provide them at checkout and can edit them any time - see [Billing details](/docs/billing-details/). Changes apply to future invoices; already-issued invoices are immutable.

## What happens if a payment fails?

A failed charge does **not** cut access immediately. You get an "Action required - signature.cat payment failed" email and a red banner in the app, and you have a short grace window (up to 3 days) to update the card via **Manage billing** on [Billing](https://app.signature.cat/billing). If the window passes without a successful charge, signature management is paused until payment succeeds - your Gmail signatures stay as they are, but changes and syncs stop.
