---
title: Service status and SLA
navTitle: Service status
description: SignatureCat live status page, the 99% monthly availability target, what counts as downtime and where maintenance windows are announced.
updated: 2026-07-17
---

# Service status and SLA

Live availability, incidents and maintenance windows are published at **[status.signature.cat](https://status.signature.cat/)**. The status page is the reference point for availability: what it reports is what counts, including for the SLA below. Its badge is also shown in the header of these docs.

## Availability target

SignatureCat targets **at least 99% availability per calendar month**, measured and published on the [status page](https://status.signature.cat/). The target does not apply during the free trial period.

Not counted as downtime:

- **planned maintenance**, announced in advance at [status.signature.cat/maintenance](https://status.signature.cat/maintenance),
- failures of third-party providers the platform depends on (hosting, CDN, payment processing, Google APIs),
- force majeure,
- causes on the customer's side - in particular a revoked [Domain-Wide Delegation](/docs/domain-wide-delegation/) grant or Workspace configuration changes.

Signature delivery depends on the availability and policies of Google's APIs; changes Google makes to those APIs or to your Workspace are outside SignatureCat's control.

The full, binding wording lives in the [Terms of Service](https://signature.cat/legal/) - the terms do not provide service credits by default; individual SLA guarantees can be agreed in a separate contract.

## During an incident

- Current impact and updates are posted on the [status page](https://status.signature.cat/) as the incident progresses.
- Signature **syncs are queued, not lost** - after recovery, the daily sync brings every mailbox back to its target state.
- You can report outages or anomalies to [contact@signature.cat](mailto:contact@signature.cat) - see [Get help](/docs/get-help/).

## Maintenance windows

Planned technical breaks are announced in advance at [status.signature.cat/maintenance](https://status.signature.cat/maintenance). They are scheduled to minimize impact and do not count toward downtime.

> [!TIP]
> The status page offers subscription options - subscribe your ops or IT channel so incident updates reach you without checking manually.
