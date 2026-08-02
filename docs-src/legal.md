---
title: Legal
navTitle: Legal
description: SignatureCat legal documents - Terms of Service, Privacy Policy and DPA - plus what the app reads from Google Workspace and writes as a Gmail signature.
updated: 2026-08-02
---

# Legal

All legal documents live at [signature.cat/legal](https://signature.cat/legal/). The Polish versions of the Terms of Service and the Privacy Policy are the legally binding ones; English, German and French translations are provided for convenience.

## Documents

- **[Terms of Service](https://signature.cat/legal/#terms)** - the service agreement, including the availability commitments described in [Service status and SLA](/docs/service-status).
- **[Privacy Policy](https://signature.cat/legal/#privacy)** - data categories, purposes, legal bases, retention periods and data subject rights.
- **[Data Processing Agreement (DPA)](https://signature.cat/legal/#dpa)** - concluded under Art. 28 GDPR, in English, on request: email [contact@signature.cat](mailto:contact@signature.cat). Categories of sub-processors are listed in the Privacy Policy; the full named list is made available to customers under the DPA.

## Privacy in short

- SignatureCat is **EU-hosted** and built for GDPR (RODO) compliance.
- The app reads the directory fields needed for [template variables](/docs/template-variables), writes the finished signature into Gmail signature settings, and can read that signature back to show what Gmail actually stored. It has no access to email content.
- Only if an Admin explicitly switches on [User data](/docs/user-data) does the app also store per-user values - the ones the Admin or the user enters - and only for the users someone actually overrode. Switching the feature off deletes every stored value.
- Each customer runs on an **isolated service account**; credentials are stored in a secrets vault and rotated automatically. See [Domain-Wide Delegation](/docs/domain-wide-delegation) for exactly what is authorized.
- Cookie preferences on the websites can be changed any time via the "Cookie settings" link in the footer of [signature.cat](https://signature.cat/).

> [!NOTE]
> This page is a convenience overview, not legal advice, and does not replace the binding documents at [signature.cat/legal](https://signature.cat/legal/).
