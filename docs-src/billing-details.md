---
title: Change billing info and payment details
navTitle: Billing details
description: Update your card, company name, billing address and tax ID for SignatureCat invoices through the Stripe billing portal.
updated: 2026-07-17
---

# Change billing info and payment details

Payment cards and invoice company data are managed in the **Stripe billing portal**, opened from inside SignatureCat. Only Admins can access billing.

## Update the payment card

1. Open [Billing](https://app.signature.cat/billing) and click **Manage billing** (or open [Settings](https://app.signature.cat/settings), Billing section, **Manage in Stripe Portal**).
2. In the Stripe portal, add the new card and set it as default.

The next charge uses the new card. If you are in a failed-payment grace window, a successful charge restores everything immediately.

## Update company name, address or tax ID

In the same Stripe portal you can edit the legal **company name**, **billing address** and **tax ID** (VAT / NIP - Polish companies use the `PL` prefixed VAT ID). These print on every invoice issued after the change; already-issued invoices stay as they are.

> [!NOTE]
> The **invoice email** is deliberately not editable in the Stripe portal - change it in [Settings](https://app.signature.cat/settings), Billing section, so the app and Stripe always agree. See [Invoices](/docs/invoices/#set-the-invoice-email).

## Check your subscription status

The Billing section on [Settings](https://app.signature.cat/settings) shows the subscription status (Active, Trialing, Past due, Canceled), the current number of active users, and the renewal date ("Active until ...").

## Cancel the subscription

In [Settings](https://app.signature.cat/settings), Billing section, click **Cancel subscription**. Access continues until the end of the current billing period, then signature management stops. Your Gmail signatures are not removed - they simply stop being managed and updated.

> [!WARNING]
> Cancelling does not delete your data or the Domain-Wide Delegation entry. If you are leaving for good, also delete the account in the Danger zone on [Settings](https://app.signature.cat/settings) and remove the DWD entry in the Google Admin console - see [Domain-Wide Delegation](/docs/domain-wide-delegation/#removing-signaturecat).
