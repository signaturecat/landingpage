# Signature.Cat Terms of Service

Version 1.0 - effective as of 16.07.2026

**These Terms of Service are available in Polish at https://signature.cat/terms as the legally binding version. This document is an automatic translation of the Polish original, provided for informational purposes only, and may contain errors or inaccuracies. In case of any discrepancy, the Polish version shall prevail.**

These Terms constitute terms and conditions for the provision of services by electronic means within the meaning of Art. 8 of the Polish Act of 18 July 2002 on Providing Services by Electronic Means.

---

## § 1. Provider

1. The provider is **Tomasz Piasecki**, conducting business activity under the name **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (hereinafter: the "Provider").
2. Contact with the Provider: e-mail **contact@signature.cat**.
3. The Service is provided at the following addresses: **https://app.signature.cat** (application) and **https://signature.cat** (informational website).

## § 2. Definitions

1. **Service / Platform** - the Signature.Cat service provided by electronic means in the SaaS model, described in § 4.
2. **Customer** - an entrepreneur (a legal person, an organizational unit or a natural person conducting business activity) who has concluded an Agreement with the Provider in connection with their business or professional activity.
3. **Agreement** - the agreement for the provision of the Service concluded between the Provider and the Customer on the terms set out in the Terms.
4. **Workspace** - the Customer's Google Workspace environment, registered for the Customer's domain, which the Customer manages in their own Google admin console.
5. **Account** - the Customer's account in the Platform, linked to a single Workspace domain.
6. **User** - a natural person acting on behalf of the Customer who signs in to the Platform with a Google account belonging to the Customer's Workspace.
7. **Workspace Administrator** - a User holding Google super administrator privileges in the Customer's Workspace.
8. **Access Level** - the scope of a User's permissions in the Platform, granted in accordance with § 6(6).
9. **Trial Period (Trial)** - the 7-day test period described in § 7.
10. **Subscription Plan** - a monthly, renewable subscription billed according to the number of Seats, described in § 8.
11. **Seat** - one active (non-suspended) user in the Customer's Workspace, determined on the basis of the Google user directory (Directory).
12. **DWD (Domain-Wide Delegation)** - a Google mechanism whereby the Workspace Administrator authorizes a dedicated service account to act within the Customer's Workspace within strictly defined scopes (§ 5(3)).
13. **Payment Operator** - Stripe, a payment services provider handling payments and billing data (PCI-DSS Level 1 certification).
14. **DPA** - a personal data processing agreement within the meaning of Art. 28 GDPR, concluded between the Customer and the Provider.
15. **Terms** - this document.

## § 3. Nature of the Service - B2B only

1. The Service is intended **exclusively for entrepreneurs** and may be used solely in connection with the Customer's business or professional activity. The Provider does not provide the Service to consumers.
2. By concluding the Agreement, the Customer represents that it concludes the Agreement within the scope of its business or professional activity and that the Agreement is of a professional nature for the Customer. The requirement to hold Google Workspace registered for a company domain (§ 5(1)) constitutes a technical confirmation of this nature.
3. Consumer protection provisions do not apply to the Agreement, including the statutory 14-day right of withdrawal from a distance contract - to the fullest extent permitted by law.
4. The person accepting the Terms on behalf of the Customer represents that they are authorized to incur obligations on behalf of the Customer.

## § 4. Scope and description of the Service

1. The Service consists in the central management of e-mail signatures of Gmail users within the Customer's Workspace. As at the effective date of the Terms, the Service includes:
   1. creating and editing signature templates in HTML format, with personalization variables (including first name, last name, job title, department, phone, photo) and conditional blocks; variable values are retrieved on an ongoing basis from the user directory of the Customer's Workspace;
   2. assigning templates to individual users, Google groups or organizational units (OU); assignments are expanded to the appropriate persons at the time of deployment;
   3. automatic, daily synchronization of assignments, keeping signatures up to date;
   4. optional deployment of signatures on send-as aliases, provided the Customer consents thereto by authorizing an additional, optional DWD scope (§ 5(3)(5));
   5. a self-service page for end users (preview and, depending on the granted Access Level, also editing of one's own signature);
   6. a library of company images (logos, banners) together with their hosting at an address made available by the Provider or - after the Customer configures a CNAME record - under a subdomain of the Customer's own domain;
   7. management of Users' Access Levels (§ 6(6));
   8. an event register (audit log) documenting actions performed in the Account;
   9. an interface in the following languages: English, Polish, German and French;
   10. e-mail notifications about events concerning the Account (including registration, granting of access, loss of DWD authorization, billing events).
2. The Service does not impose a limit on the number of signature templates or images within reasonable use; technical limitations are indicated in § 5(5). The only billing parameter is the number of Seats (§ 8).
3. The Provider continuously develops the Service. Changes that do not degrade functionality material to the Customer do not constitute an amendment to the Agreement.

## § 5. Technical requirements and rules of use

1. Using the Service requires, on the Customer's side:
   1. an active **Google Workspace** subscription registered for the Customer's domain; signing in to the Platform is possible only with a Google account belonging to the Workspace (private accounts, e.g. @gmail.com, are not supported);
   2. a Workspace Administrator (Google super administrator) - only they can perform the DWD authorization in the Google admin console and carry out the first registration of the Account;
   3. a current version of one of the commonly used web browsers (including Chrome, Firefox, Safari, Edge) with JavaScript and cookies enabled;
   4. an active e-mail account for receiving notifications and billing correspondence.
2. Signatures are deployed in the **Gmail** service (the user's send signature setting). The Service does not support other e-mail clients or mail servers.
3. Operation of the Service requires the Customer to maintain DWD authorization for a dedicated service account within the following scopes:
   1. `https://www.googleapis.com/auth/gmail.settings.basic` (writing signatures) - required;
   2. `https://www.googleapis.com/auth/admin.directory.user.readonly` (reading the user directory) - required;
   3. `https://www.googleapis.com/auth/admin.directory.group.member.readonly` (reading group membership) - required;
   4. `https://www.googleapis.com/auth/admin.directory.customer.readonly` (reading basic Workspace data) - required;
   5. `https://www.googleapis.com/auth/gmail.settings.sharing` (signatures on send-as aliases) - optional; its absence disables only the alias feature.
   Revocation or restriction of the DWD authorization by the Customer prevents the provision of a material part of the Service and does not constitute non-performance of the Agreement by the Provider.
4. Signature content is subject to automatic server-side sanitization: scripts, JavaScript events and selected CSS constructs that could be used for tracking or code injection are not allowed. Images are accepted exclusively in PNG and JPEG formats (the SVG format is blocked for security reasons), up to 5 MB in size, up to 200 per asset type; files are verified as to their actual content type.
5. The Customer is prohibited from providing unlawful content, including in particular: content infringing third-party rights (including copyrights to logos and graphics), malicious code, content used for sending unsolicited commercial information (spam) and content misleading recipients.
6. The following are also prohibited: attempts to circumvent the Platform's security measures or limits, security testing without the Provider's prior written consent, automated downloading of Platform content (scraping), sharing the Account with third parties, and reselling the Service without a separate agreement.

## § 6. Registration, Account and Users

1. Account registration takes place by signing in with a Google Workspace account (Google OAuth). The Platform does not store Users' passwords; authentication is performed exclusively by Google.
2. **The Agreement is concluded upon acceptance of the Terms during Account registration, and at the latest upon activation of the Trial Period or the Subscription Plan.** The Trial Period constitutes a fully valid agreement for the provision of services by electronic means.
3. The Account is linked to a single Workspace domain. The first registration of the Account may be carried out only by a Workspace Administrator.
4. The Customer ensures that the data provided during registration and in billing is true and up to date.
5. The Customer is liable for the acts and omissions of all its Users as for its own acts and is obliged to ensure that only authorized persons have access to the Account.
6. Users' access to Platform features is determined by Access Levels (from self-service access, through project and editing permissions, to full administrative permissions), granted in the Platform by the Customer's authorized Users. Workspace Administrators always hold the full administrative level and it cannot be revoked from them in the Platform.

## § 7. Trial Period

1. A new Customer is entitled to one free Trial Period lasting **7 days** from activation, covering - as at the effective date of the Terms - the full functionality of the Service, subject to paragraph 8.
2. Activation of the Trial Period requires providing a valid payment card in the Payment Operator's form. **The card is not charged during the Trial Period.**
3. **After the Trial Period expires, the subscription automatically converts into a paid Subscription Plan and the Customer's card is charged the first monthly fee** - unless the Customer cancels the subscription before the end of the Trial Period. Cancellation before the end of the Trial Period does not involve any fees.
4. The Provider reminds the Customer of the approaching end of the Trial Period by an e-mail message sent approximately 3 days before its expiry.
5. If, at the moment the Trial Period ends, the Account does not have a valid payment method, the subscription is automatically cancelled without charging any fees, and access to Platform features is blocked until a Subscription Plan is purchased.
6. **The Trial Period is available once per Workspace domain.** Use of the Trial Period is recorded in a register maintained by the Provider and remains effective also after the Account is deleted; re-registration of the same domain starts directly with a paid Subscription Plan.
7. The end of the Trial Period without conversion to a Subscription Plan does not result in automatic deletion of Account data; the rules for data retention and deletion are set out in § 15 and in the Privacy Policy.
8. **The Trial Period is provided "as-is", to the fullest extent permitted by law.** During the Trial Period:
   1. the availability target referred to in § 9(1) does not apply, and the Customer is not entitled to service credits or compensation for unavailability of the Service;
   2. the Provider gives no warranties or representations as to the operation, availability and fitness of the Service for the Customer's purposes;
   3. technical support is provided exclusively by e-mail (contact@signature.cat), without a guaranteed response time;
   4. the Provider may limit or change the scope of features available during the Trial Period.
   The provisions of this paragraph do not limit the complaint procedure (§ 13) or liability for damage caused by willful misconduct.

## § 8. Fees and billing

1. The Service is billed as a **monthly subscription paid in advance**, in US dollars (USD). An annual plan is not offered.
2. The fee depends on the number of Seats, according to tiers applied on a **graduated (cascading)** basis - each Seat is billed at the rate of the tier it falls within:

   | Number of Seats | Rate per Seat / month |
   |---|---|
   | 1 - 50 | 0.80 USD |
   | 51 - 120 | 0.70 USD |
   | 121 - 300 | 0.60 USD |
   | 301 and above | 0.55 USD |

   Example: 60 Seats = 50 x 0.80 USD + 10 x 0.70 USD = 47.00 USD per month.
3. The number of Seats corresponds to the number of active (non-suspended) users in the Customer's Workspace, but no fewer than 1, and is **updated automatically** based on the Workspace user directory: an increase in the number of Seats is billed immediately with a pro-rata surcharge for the remainder of the billing period, while a decrease in the number of Seats is taken into account from the next billing period (the Customer does not receive a refund for the current period).
4. Payments are handled by the Payment Operator. **The Provider does not store payment card data.** Billing data (company name, address, optionally NIP/VAT ID) is provided in the Payment Operator's forms and stored there; in the Platform the Customer manages only the billing e-mail address.
5. The prices indicated in paragraph 2 do not include taxes. The Customer is responsible for settling taxes due in accordance with the regulations of the jurisdiction applicable to the Customer, including - in the case of EU VAT taxpayers - taking into account the reverse charge mechanism, where applicable.
6. Payment confirmations and billing documents are delivered to the billing e-mail address indicated by the Customer.
7. **The subscription renews automatically every month** until it is cancelled. The Customer may cancel the subscription at any time - in the Platform settings or in the Payment Operator's billing portal - with effect at the end of the current, paid-for billing period. The Service remains fully available until the end of that period.
8. In the event of a failed card charge:
   1. access to the Service is maintained for a **3-day remediation period**, counted from the first failed charge attempt; the Customer is informed by e-mail and by a message in the Platform and may update the payment method during that time;
   2. repeated charge attempts are carried out automatically by the Payment Operator;
   3. after the remediation period expires without effect, access to Platform features is suspended until the outstanding amount is settled; a successful charge restores access automatically.
9. **Fees for a commenced billing period are non-refundable**, including in the event of cancellation of the subscription or deletion of the Account during the period. This does not exclude the Customer's claims for non-performance of the Agreement by the Provider.
10. The Provider is entitled to change the price list, in particular in the event of changes in the costs of providing the Service, the scope of features, third-party providers' rates or the market environment. A change of the price list requires notifying the Customer by e-mail at least **30 days** in advance (§ 14(5)) and takes effect at the earliest from the next billing period commencing after that notice period has elapsed. Prices do not change during a paid-for period. A Customer who does not accept the new prices may cancel the subscription in accordance with paragraph 7.

## § 9. Service availability

1. The Provider exercises due care to ensure that Platform availability is at least **99% per calendar month**. This target does not apply during the Trial Period (§ 7(8)).
2. Unavailability does not include interruptions resulting from:
   1. planned maintenance work announced in advance;
   2. failures or limitations on the part of external infrastructure and service providers used by the Platform (including hosting, content delivery network, payment operator, Google services and APIs);
   3. force majeure;
   4. causes attributable to the Customer, in particular revocation of the DWD authorization, changes in the Workspace configuration or failure to meet the technical requirements of § 5.
3. Deployment of signatures depends on the availability and operating rules of Google APIs; the Provider is not liable for changes introduced by Google in those interfaces or for Google's decisions concerning the Customer's Workspace.
4. Failures and irregularities may be reported to contact@signature.cat. The Terms do not provide for service credits; individual SLA guarantees may be agreed in a separate agreement.

## § 10. Liability

1. The Provider is liable for non-performance or improper performance of the Agreement on general principles, with the limitations indicated below, permissible in professional (B2B) dealings.
2. **The Provider's aggregate liability** on any grounds related to the Agreement is limited to the equivalent of **one monthly subscription fee** for the Account affected by the damage - in the amount of the fee for the billing period in which the event causing the damage occurred, and if no fee was charged for that period (in particular during the Trial Period) - in the amount calculated according to the Customer's number of Seats and the price list applicable on the date of the event.
3. The Provider is not liable for lost profits or indirect and consequential damages, including loss of revenue, reputation or data processed outside the Platform.
4. The limitations in paragraphs 2 and 3 do not apply to damage caused by willful misconduct.
5. The Customer is responsible for:
   1. content entered into the Platform (templates, images, URLs), including holding the rights to use it;
   2. compliance of signature content with the law applicable to the Customer (including requirements concerning the marking of commercial correspondence);
   3. the consequences of actions of persons to whom the Customer has granted access to the Account, and the consequences of unauthorized access resulting from the Customer's failure to observe security rules on its side;
   4. maintaining the DWD authorization and the correctness of the Workspace configuration.
6. In the event of a material breach of the Terms, the Provider may - after an ineffective demand to cease the breaches, and in flagrant cases (e.g. distribution of malicious code, spam) immediately - suspend access to the Account until the matter is clarified. Suspension does not release the Customer from the obligation to pay for the current billing period.

## § 11. Intellectual property and license

1. The Platform, including its code, interface, documentation, Signature.Cat marks and logos, is the property of the Provider or the subject of rights held by the Provider.
2. For the term of the Agreement, the Provider grants the Customer a non-exclusive, non-transferable license, territorially limited to the scope of operation of the Service, to use the Platform solely for the purposes of the Customer's own business. The license does not include the right to grant sublicenses.
3. Decompiling, reverse engineering, copying or creating derivative works of the Platform is prohibited, except in cases permitted by mandatory provisions of law.
4. **Customer Content** (signature templates, images, configuration) remains the property of the Customer. The Customer grants the Provider a license limited to the scope necessary to provide the Service (storing, processing, rendering and publishing images at hosting addresses, deploying signatures in the Customer's Workspace).
5. The Provider **does not use the Customer's content or data to train artificial intelligence models** or for purposes other than providing and maintaining the Service.

## § 12. Personal data and DPA

1. With respect to Users' personal data, billing data and data collected via the Provider's websites - the Provider is the data controller. The processing rules are set out in the Privacy Policy available at https://signature.cat/privacy.
2. With respect to personal data of the Customer's employees and associates processed within the Service (Workspace directory data used in signatures) - the Customer is the data controller, and the Provider acts as a processor on the Customer's documented instructions.
3. The parties conclude a DPA governing the entrustment referred to in paragraph 2. The DPA is concluded at the Customer's request sent to contact@signature.cat. The DPA is concluded exclusively in English and the English version is its only binding version. Until an individual DPA is concluded, the entrustment takes place on the terms described in the Privacy Policy and the Terms.
4. The Provider makes the list of sub-processors (further processors) available to the Customer within the DPA and upon request.

## § 13. Complaints

1. Complaints concerning the Service may be submitted to **contact@signature.cat**.
2. A complaint should include: the Workspace domain, a description of the problem, the date and time of occurrence and - where possible - the request identifier or a screenshot of the error message.
3. The Provider confirms receipt of a complaint within 3 business days and processes it within **14 days** of receiving a complete complaint. The Customer is informed of the outcome at the e-mail address from which the complaint was sent, or at another indicated address.
4. If processing the complaint requires additional information, the time limit referred to in paragraph 3 runs from the date such information is provided.

## § 14. Amendments to the Terms and the price list, notifications

1. The Provider is entitled to amend the Terms, in particular in the event of: changes in the scope or manner of operation of the Service, changes in legal provisions or their interpretation, changes in third-party providers' terms, security reasons, as well as in order to introduce editorial changes. The right to change the price list is governed by § 8(10).
2. Amendments take effect with the following notice periods, counted from the date of publication of the notification:
   1. **price list changes** - at least **30 days**, with effect at the earliest from the next billing period (§ 8(10));
   2. **functional changes** (concerning the scope or manner of operation of the Service or the rights and obligations of the parties) - at least **10 days**;
   3. **editorial or cosmetic changes** not affecting the Customer's rights and obligations - at least **7 days**;
   4. **changes resulting from mandatory provisions of law or decisions of authorities** - **immediately**, including without observing the periods indicated in points 1-3, if required by a deadline arising from the provision or decision.
3. Notifications of the changes referred to in paragraph 2 points 2-4 are displayed in the application interface after signing in. The User is obliged to sign in regularly and check notifications. Using the application after the effective date of a change constitutes acceptance of that change.
4. If no User of the Customer has signed in to the Platform during the 30 days preceding the publication of the notification referred to in paragraph 3, the Provider may additionally send a notification to the Customer's e-mail address; such delivery is auxiliary in nature, is not guaranteed, and its absence does not affect the effectiveness of the notification published in the Platform.
5. **The Provider informs about price list changes (paragraph 2 point 1) by e-mail**, sent from **alerts@signature.cat** to the billing e-mail address, and in its absence - to the Workspace Administrator's e-mail address. A notification is deemed delivered upon its dispatch to the appropriate address. The Provider is not liable for non-delivery or delayed delivery of a message for reasons attributable to the Customer or its e-mail provider, in particular as a result of: the message being classified as spam, being placed in quarantine, being rejected at the receiving server level, or filtering rules configured in the Customer's domain. To ensure deliverability, the Customer should add the address alerts@signature.cat to the list of trusted senders (whitelist) in its domain and keep the billing e-mail address up to date; the consequences of failing to do so are borne by the Customer. The delivery rules set out in this paragraph apply accordingly to the other e-mail notifications provided for in the Terms.
6. A Customer who does not accept the changes may terminate the Agreement before their effective date without additional costs - by cancelling the subscription with effect at the end of the current billing period.
7. The Provider maintains an archive of previous versions of the Terms and makes it available upon request sent to contact@signature.cat.

## § 15. Termination of the Agreement, data after termination and migration

1. The Agreement is concluded for an indefinite period, with monthly billing periods.
2. **The Customer may terminate the Agreement at any time** by cancelling the subscription (§ 8(7)), with effect at the end of the current billing period, without contractual penalties and without termination fees. The notice period therefore does not exceed one monthly billing period.
3. The Provider may terminate the Agreement with 30 days' notice, but not earlier than at the end of a paid-for billing period, in particular in the event of discontinuation of the Service. In the event of a flagrant breach of the Terms by the Customer, the Provider may terminate the Agreement with immediate effect, after first applying § 10(6), unless the nature of the breach makes this impossible.
4. After the subscription expires, access to Platform features is blocked, and Account data is stored in accordance with the Privacy Policy - until it is deleted at the Customer's request or until the periods indicated therein have elapsed. Signatures previously deployed in the mailboxes of the Customer's users remain unchanged (the Service does not remove them).
5. **Account deletion** is available on a self-service basis in the Platform settings to a User with administrative permissions and requires confirmation by typing the Workspace domain. Upon submission of the request, the subscription is cancelled with immediate effect, and after **7 days** the Account data is permanently deleted (including templates, assignments, images, User accounts and the Customer's dedicated cloud resources), subject to data whose longer retention is provided for in the Privacy Policy or by law.
6. **Data export:** upon request submitted to contact@signature.cat, the Provider provides the Customer with an export of Account data (in particular signature templates and assignment configuration) in a commonly used, open, machine-readable format (JSON or CSV) - during the term of the Agreement and within **30 days** of its termination, provided the data has not been previously permanently deleted at the Customer's request. The export is free of charge.
7. The Provider does not apply provider-switching fees or technical obstacles to migrating data to another provider or to the Customer's own infrastructure.
8. After termination of the Agreement, the Customer should independently remove the DWD authorization entry in the Google admin console - the Provider has no technical means of doing this on the Customer's behalf.

## § 16. Final provisions

1. The Agreement is governed by **Polish law**.
2. The court having jurisdiction over disputes arising from the Agreement is the common court with territorial jurisdiction over the Provider's registered office. The preceding sentence does not affect mandatory provisions on jurisdiction.
3. If individual provisions of the Terms prove invalid or ineffective, the remaining provisions remain in force, and the invalid provision is replaced by a valid provision closest to its economic purpose.
4. The Terms enter into force on **16.07.2026**.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
