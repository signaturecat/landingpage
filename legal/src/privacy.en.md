# Signature.Cat Privacy Policy

Version 1.1 - effective as of 02.08.2026

**This Privacy Policy is available in Polish at https://signature.cat/privacy as the legally binding version. This document is an automatic translation of the Polish original, provided for informational purposes only, and may contain errors or inaccuracies. In case of any discrepancy, the Polish version shall prevail.**

---

## 1. Data controller and contact

The controller of personal data within the scope described in this Policy is **Tomasz Piasecki**, conducting business activity under the name **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (hereinafter: "we", the "Provider").

Contact for all matters concerning personal data: **contact@signature.cat**.

## 2. Scope of this document

This Policy applies to:

- the **app.signature.cat** application (the Signature.Cat service - central management of Gmail signatures in Google Workspace, hereinafter: the "Service"),
- the **signature.cat** informational website together with its language subpages,
- the hosting of signature images (addresses made available by the Provider and subdomains configured by Customers),
- correspondence conducted with us (e-mail, reports, complaints).

The Service is intended exclusively for entrepreneurs (B2B). Capitalized terms have the meaning given to them in the Terms (https://signature.cat/terms).

## 3. Two roles: controller and processor

Depending on the category of data, we act in one of two roles:

**a) Data controller** - with respect to:
- data of Users signing in to the Service (persons acting on behalf of the Customer),
- the Customer's billing and contact data,
- data of visitors to the signature.cat website,
- data of persons contacting us.

**b) Processor** - with respect to personal data of the Customer's employees and associates, processed within the Service on the Customer's instructions. The Customer is the controller of this data. The processing consists of:
- reading data from the user directory of the Customer's Google Workspace (first name, last name, e-mail address including aliases, job title, department, phone numbers, address, profile photo URL) **exclusively on an ongoing basis, at the moment of previewing or deploying a signature** - these values are not stored by us after the operation is completed;
- writing the rendered signature in the Gmail settings of the given user (the signature remains in the Customer's Google environment);
- short-term storage of e-mail addresses covered by a deployment in the task history (30 days, for the purposes of the deployment report);
- storing content that the Customer independently places in signature templates or images.

The entrustment of processing is governed by a data processing agreement (DPA), concluded exclusively in English - it is concluded at the Customer's request sent to contact@signature.cat. The full list of further processors (sub-processors) is made available to Customers within the DPA and upon request.

## 4. Categories of data processed (as controller)

**User account data** - obtained from Google during sign-in (Google OAuth): Google account identifier, e-mail address, first and last name, profile photo URL, Workspace domain; and additionally the granted Access Level and role in the Account.

**Billing data** - the billing e-mail address (stored in the Service); the company name, billing address, NIP/VAT ID and payment card data are provided in the payment operator's forms and stored exclusively by that operator - we have no access to card data.

**Account content** - signature templates (HTML), assignment configuration, images (logos, banners) together with their URLs. Images used in signatures are publicly accessible at their URLs (they are visible to e-mail recipients).

**Audit log** - a record of actions performed in the Account: type of action, User identifier, timestamp and event metadata (which may include the User's e-mail address). The audit log **does not contain IP addresses or browser information**.

**Technical data** - the IP address is processed only transiently (in memory) for the purposes of rate limiting and abuse protection - **we do not save IP addresses in the database**. Standard technical logs of the hosting infrastructure (including HTTP logs) are processed within the hosting platform for diagnostic purposes.

**Communication** - e-mail messages sent by us (notifications about account events, the trial period, payments, access grants) contain the recipient's e-mail address, their first and last name or name, and information about the event; incoming correspondence is processed for the purpose of handling the matter.

**Trial Period register** - the Workspace domain and the date of use of the trial period (without data of natural persons), maintained for the purpose of preventing abuse; the entry remains effective also after the Account is deleted.

**The signature.cat website** - language preference (cookie) and - after consent is given - Google Analytics statistical data (section 11).

## 5. Purposes of processing and legal bases

| Purpose | Legal basis (GDPR) |
|---|---|
| Conclusion and performance of the Agreement: maintaining the Account, providing Service features, Trial Period, transactional notifications | Art. 6(1)(b) |
| Handling payments and billing (including transferring data to the payment operator) | Art. 6(1)(b) |
| Fulfillment of tax and accounting obligations | Art. 6(1)(c) |
| Service security and abuse prevention: rate limiting, content sanitization, audit log, Trial Period register, internal notifications about account events | Art. 6(1)(f) (legitimate interest: protection of the Service and customers) |
| Handling reports, questions and complaints | Art. 6(1)(b) or (f) |
| Establishing, pursuing or defending claims | Art. 6(1)(f) |
| Visit statistics for the signature.cat website (Google Analytics) | Art. 6(1)(a) (consent) |

Providing account data and billing data is voluntary but necessary to use the Service. We do not make decisions based solely on automated processing that would produce legal effects. We do not use data to train artificial intelligence models.

## 6. Data recipients and sub-processors

We transfer data only to entities supporting the provision of the Service, to the extent necessary for their tasks. We use the following categories of providers:

| Category | Scope of data | Processing location |
|---|---|---|
| Application and database hosting provider | all Service data | EU (Amsterdam) |
| Network services, CDN and image storage provider | network traffic, Customers' images | image storage: EU jurisdiction; network: global edge infrastructure |
| Cloud services provider (secret management, audit log archive) | technical keys of service accounts, audit archive | archive: EU region; secrets: multi-region replication |
| Payment operator (PCI-DSS Level 1 certification) | billing data, card data (held exclusively by the operator) | EU/USA |
| Transactional e-mail provider | recipient's e-mail address, first and last name or name, notification content | EU/USA |
| Google (Google Workspace services and APIs) | OAuth sign-in, operations in the Customer's Workspace | according to the Customer's Workspace configuration |
| Internal team communication tools (operational notifications) | account-related events (including the Workspace domain and the e-mail address of the Customer's administrator) | EU/USA |

We make the full, named list of sub-processors together with their roles available to Customers within the DPA and upon request (contact@signature.cat). Data may also be disclosed to entities authorized under the law (e.g. public authorities) and to the Provider's legal and accounting advisors to the extent necessary.

## 7. Data transfers outside the EEA

The core infrastructure of the Service (application, database, image storage, audit archive) operates in European Union regions. Some of the providers indicated in section 6 (the payment operator, the network services provider, the transactional e-mail provider, Google, internal communication tools) are based in the USA or use global infrastructure - as a result, data may be transferred outside the European Economic Area.

The basis for such transfers are standard contractual clauses (SCC) included in the data processing agreements with these providers, and, with respect to providers certified under the EU-US Data Privacy Framework - the European Commission's decision confirming an adequate level of protection. Information about transfer safeguards can be obtained at contact@signature.cat.

## 8. Data retention periods

| Data | Retention period |
|---|---|
| Account data (Users, templates, assignments, images, settings) | for the term of the Agreement; after the subscription expires - until the Account is deleted at the Customer's request, no longer than until the expiry of the limitation periods for claims related to the Agreement (as a rule 6 years) |
| Account deletion (self-service, in settings) | permanent deletion of data takes place 7 days after the request is submitted |
| Sign-in sessions | 7 days from last activity, at most 14 days from sign-in |
| Signature deployment history (including e-mail addresses covered by a deployment) | 30 days from task completion |
| Audit log | 365 days in the production database; an archival copy for security purposes and defense of claims - no longer than 6 years |
| Results of automatic Workspace connection tests (preflight) | 90 days |
| Internal operational events (team notifications) | 30 days from delivery |
| Unfinished image uploads (without confirmation) | 30 minutes, then automatic deletion |
| Trial Period register (Workspace domain + date) | for the period the Signature.Cat service is provided (abuse prevention) |
| Billing and accounting documents | 5 years, counting from the end of the tax year (legal obligation) |
| Correspondence and reports | for the duration of handling the matter, then until the expiry of the limitation periods for claims |
| Google Analytics statistical data | up to 14 months |
| Data during the Trial Period | same as Account data (section 10) |

Data of the Customer's employees retrieved from the Workspace directory is not stored - we process it only at the moment of rendering or deploying a signature (section 3(b)).

## 9. Rights of data subjects

Every person whose data we process as controller has the following rights: access to data, rectification, erasure, restriction of processing, data portability, objection to processing based on legitimate interest, and withdrawal of consent at any time (without affecting the lawfulness of processing carried out before the withdrawal).

Requests may be submitted to **contact@signature.cat**. We respond without undue delay, at the latest within one month (with the possibility of extension by two months in complex cases, of which we will inform you).

Every person is also entitled to lodge a complaint with the supervisory authority: **the President of the Personal Data Protection Office (UODO), the Polish supervisory authority**, ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl).

If a request concerns data processed by us in the role of processor (data of the Customer's employees - section 3(b)), the appropriate addressee of the request is the employer (the Customer) as the controller of that data. We will forward such a request to the Customer and support its fulfillment.

## 10. Trial Period

The Trial Period is a fully binding agreement for the provision of services by electronic means. We process data collected during the Trial Period on the same terms as after conversion to a paid subscription. If the Trial Period does not end with conversion to a paid plan, the Account loses access to Service features, and the data is stored in accordance with section 8 - the Customer may at any time delete the Account on a self-service basis (permanent deletion after 7 days).

## 11. Cookies and analytics

**The app.signature.cat application** uses only cookies necessary for its operation:

| Cookie | Purpose | Period |
|---|---|---|
| `__Secure-next-auth.session-token` (and technical sign-in cookies) | maintaining the signed-in session (HTTP-only) | up to 7 days from last activity, max. 14 days |
| `NEXT_LOCALE` | remembering the selected interface language | 12 months |

The application does not use analytics or marketing cookies.

**The signature.cat website** uses:

| Cookie | Purpose | Period |
|---|---|---|
| `sigcat_locale` | remembering the manually selected website language | 12 months |
| `_ga`, `_ga_*` (Google Analytics 4) | visit statistics | up to 24 months |

**Google Analytics 4** (provider: Google Ireland Limited) is used exclusively for aggregate visit statistics of the signature.cat website (including number of visits, traffic sources, approximate location at city level). The tool is activated **only after consent is given** in the consent banner on the website; consent can be withdrawn at any time by changing the consent settings on the website or by deleting cookies. Google Analytics 4 does not store full IP addresses. Event data is stored in the tool for a maximum of 14 months. Google Analytics is not embedded in the app.signature.cat application.

We do not use marketing cookies and we do not sell personal data.

## 12. Data from Google APIs

The Service uses Google APIs (Google OAuth sign-in and Google Workspace interfaces: Gmail settings and the user directory - within the scopes indicated in the Terms). The use of information received from Google APIs complies with the Google API Services User Data Policy, including the Limited Use requirements: we use this data exclusively to provide and improve user-facing features of the Service (signature management), we do not use it for advertising purposes, we do not sell it, we do not transfer it to third parties beyond the scope necessary to provide the Service, and we do not use it to train artificial intelligence models.

## 13. Data security (technical and organizational measures)

We apply, among others, the following measures:

- TLS encryption of all traffic in transit, with HTTPS enforcement (HSTS);
- encryption of OAuth tokens at rest using the AES-256-GCM algorithm, with the encryption key stored outside the database;
- private keys of service accounts stored exclusively in a secret management service (never in the database, logs or API responses), with an in-memory cache expiring within up to 5 minutes and automatic, periodic key rotation;
- customer isolation: one dedicated Google service account per Customer and restriction of every data operation to the given Customer's environment;
- access control based on permission levels, enforced server-side for every operation;
- service access by SignatureCat personnel: changes to Account settings by our support team require the Customer's prior consent, granted by an administrator with a dedicated switch in the application settings; every support action, as well as each enabling or disabling of the consent, is recorded in the Account's audit log together with the staff member's name, and read-only access (diagnostics) is limited to the scope necessary to maintain the Service;
- authentication exclusively via Google OAuth (the Service does not store passwords); additional sign-in protections, including MFA, follow from the Customer's Google Workspace policy;
- browser security headers, including an enforced Content Security Policy;
- rate limiting per IP address at the network edge;
- server-side sanitization of signature content (blocking scripts and dangerous constructs) and verification of uploaded image files (PNG/JPEG only, verification of the actual file type, 5 MB limit, SVG blocked);
- database in a private network, with no public access point; backups with point-in-time recovery;
- an append-only audit log and internal notifications about significant account events;
- data minimization: attributes of the Customer's employees are not stored, and payment card data is processed exclusively by the payment operator.

## 14. Personal data breaches

In the event of a personal data breach, we carry out a risk assessment and - where required - notify the breach to the President of the Personal Data Protection Office (UODO) within 72 hours of becoming aware of it, and notify the data subjects if the breach may result in a high risk to their rights and freedoms. As a processor, we inform the Customer (the controller) of a breach concerning entrusted data without undue delay after becoming aware of it.

## 15. Changes to this Policy

We give at least **14 days'** advance notice of changes to this Policy - by a notification displayed in the application after signing in. If no User of the Customer has signed in to the application during the 30 days preceding the publication of the notification, we may additionally send an e-mail notification (auxiliary delivery, not guaranteed). Changes resulting from legal provisions may enter into force immediately. We make an archive of previous versions together with their effective dates available upon request sent to contact@signature.cat.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
