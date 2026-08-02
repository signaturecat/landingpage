---
title: Changelog
navTitle: Changelog
description: What's new in SignatureCat - monthly highlights of new features and improvements to email signature management for Google Workspace and Gmail.
updated: 2026-08-02
published: 2026-07-24
---

# Changelog

What's new in SignatureCat, the email signature manager for Google Workspace. We keep improving signature templates, the Gmail integration and Workspace administration - the highlights are collected here, month by month.

## August 2026

- **We now check what Gmail actually saved.** Gmail rewrites signatures on its own servers when it stores them, and it can quietly drop parts of a complicated layout. SignatureCat now compares what it sent with what Gmail kept: if anything was trimmed, the result row is flagged "trimmed by Gmail" and the test signature in the editor tells you which elements disappeared. See [When Gmail trims your signature](/docs/gmail-sanitization).
- **See the signature a mailbox has right now.** From [Logs](/docs/logs) you can open any employee's current Gmail signature and look at it, without asking them for a screenshot. Useful when someone edited their signature by hand in Gmail, or when you want proof that a rollout landed.
- **Alternative text for logos and banners.** Every image in your library can now carry a short description that recipients see when their mail app blocks images - one of the simplest accessibility wins in an email signature. See [Banners and logos](/docs/banners-and-logos).
- **Any image, straight from a URL.** Beside the shared image library, the visual editor can now place a one-off image hosted anywhere, with its own description, a square or round shape and drag-to-resize. Profile photos got the same choice: round (the default) or square.
- **Dividers you can style.** Insert a horizontal line between blocks and set its color and length - the tidy way to separate a name from contact details.
- **Columns that disappear when they are empty.** A whole column can now be marked conditional, so the photo column (or the phone column) vanishes for people who have no photo or no phone, instead of leaving a gap in their signature.
- **Existing HTML signatures import better.** Multi-row layout tables, conditional sections around whole cells and hand-written markup now survive the switch to the visual editor far more faithfully.
- **Privacy policy update.** A new version of the [Privacy Policy](https://signature.cat/privacy) is effective as of today: it describes the optional [User data](/docs/user-data) storage and the reading of a signature back from a mailbox.

## July 2026

- **Fill the gaps in your directory data.** Missing job titles or phone numbers no longer block a good signature. On the new **Data** tab you can store per-user values that override the Google directory in signatures, import hundreds of them from a CSV file, or let people fill in their own details. It is off until you switch it on, and switching it off deletes everything it stored. See [User data](/docs/user-data).
- **A visual signature editor.** Design Gmail signature templates without writing HTML: variable chips you drag and drop, 2-3 column layouts, web-safe fonts, an email-safe color palette and conditional blocks you can see - with output guaranteed to render correctly in Gmail. The classic HTML editor stays one tab away. See the new [Visual editor](/docs/visual-editor) guide.
- **Resize images per template.** Drag the corners of a logo, banner or profile photo right on the canvas - each signature template keeps its own size, and banner library entries can define their own default dimensions. A template can also override an image's click-through link without touching the shared library.
- **Column widths you can drag.** Grab the gutter between two columns to change their proportions, or pick up a whole row and move it. A 30/70 photo-and-details layout is now a drag, not a guess.
- **Formatting that sticks to variables.** Making `{{firstname}}` bigger or giving it a color now really ships that way in the delivered signature, instead of quietly falling back to the surrounding text style.
- **A smarter {{photo}} variable.** Used on its own, `{{photo}}` now renders a ready-made circular profile photo sized per template - and users without a photo in the Google Workspace Directory get no broken image, the photo simply disappears from their signature.
- **Clearer template validation.** Save errors now name the exact unknown token or count the unbalanced conditional tags, and the editor explains `{{del}}` vs `{{delete}}` with two animated mini-demos.
- **See your signature the way each mail client shows it.** The preview can now simulate Gmail on the web, Gmail on the phone, classic Outlook on Windows, Outlook.com and Apple Mail, in light and dark mode - so you can catch the dark-mode surprise before your colleagues do. You can also render the template against any real user's directory record with the **Render as** field. See [Mail client preview](/docs/mail-client-preview).
- **Starter templates rebuilt for Outlook, and more of them.** The built-in starting points were rewritten so a brand-new signature no longer collapses into a single line in classic Outlook, and the new-template wizard can now offer extra ready-made designs on top of the three built-in ones.
- **Documentation in four languages.** This help center is now available in English, Polish, German and French. The language selector in the footer keeps you on the same article when you switch, so your whole team can read about Google Workspace signature management in their own language.
- **See who edited a signature template.** Every signature template now shows who last edited it and when - in the template list and inside the signature editor. Useful when several Workspace admins manage email signatures together.
- **Simpler custom image domains.** Hosting signature banners and logos on your own domain now needs just one CNAME record. A guided wizard checks the setup for you - see [Custom image domain](/docs/custom-image-domain).
- **A heads-up when an image in use is deleted.** Removing a logo or banner that signature templates still use now sends a notification in the app and an email to admins, so a missing image is never a silent surprise in someone's mailbox.
- **Clearer signature rollout results.** The job view got a redesign: a colored progress bar, per-user result icons and an execution details section that shows exactly which Gmail accounts received the new signature.
- **A dedicated Logs page.** Signature assignment history lives on its own [Logs](/docs/logs) page, so auditing who got which email signature - and when - is one click away.
- **A warning when Workspace access breaks.** If SignatureCat loses the access it needs to your Google Workspace, admins now see a red bar across the app with a **Check access now** button, instead of finding out from a failed rollout days later.
- **A guided tour on your first visit.** New admins get a short, skippable walkthrough of the navigation on the Signatures page, so nobody has to guess what lives behind each tab.
- **Public documentation launched.** signature.cat/docs went live with more than 20 guides, from [connecting your Google Workspace](/docs/connect-google-workspace) to [creating your first signature template](/docs/create-your-first-template). In-app help links now point straight to the relevant article.
- **Better error messages everywhere.** Every screen in the app now shows a clear message in your language when something goes wrong, with technical details one tap away - useful when contacting support.
- **Safer template deletion.** Deleting a signature template that is still assigned to groups or organizational units now shows a warning with exact counts before anything is removed.
- **Legal and privacy refresh.** A new legal hub with terms and privacy policy per language, a privacy-friendly cookie banner, and terms acceptance built into onboarding.

## June 2026

- **Signatures for Gmail send-as aliases.** SignatureCat can manage email signatures for Gmail aliases, not just the primary address. Enable the optional Google Workspace permission and every send-as alias in your domain can carry its own branded signature.
- **In-app notifications and branded emails.** A notification bell keeps Workspace admins informed about signature rollouts, and all transactional emails got a clean, responsive redesign.
- **Per-assignment self-service control.** Decide per group or organizational unit whether users may customize their own email signature or the company template stays locked - see [Self-service](/docs/self-service).
- **A free trial for every new workspace.** New pricing with a free trial: connect your Google Workspace, try the full signature management experience and pick a plan when you are ready.
- **Polished mobile experience.** Tooltips, improved mobile layouts and a refreshed sign-in flow across the app.

## May 2026

- **SignatureCat goes public.** First public release: centralized email signature management for Google Workspace. Design one signature template, roll it out to every Gmail user in your domain and keep branding consistent automatically.
