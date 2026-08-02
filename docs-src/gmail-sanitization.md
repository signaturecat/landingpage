---
title: When Gmail trims your signature
navTitle: Gmail trimming
description: Why Gmail can store a trimmed copy of a signature SignatureCat applied in your Google Workspace, how to spot it and how to fix the template.
updated: 2026-08-02
---

# When Gmail trims your signature

If SignatureCat reports a successful apply but the signature in Gmail looks cut off, Gmail trimmed it after the write. Gmail runs its own sanitizer on Google's servers whenever it saves a signature, so the copy Gmail keeps can be structurally different from the one SignatureCat sent - the write succeeds and the stored result is still shorter. SignatureCat compares the two on every write and tells you when they differ.

## Why Gmail changes a signature that applied successfully

Gmail sanitizes signature HTML on its own servers, by rules Google does not publish. The API call can return success and Gmail can still keep a reduced copy, dropping elements it did not want to store. The rewrite happens inside Google, after your template left SignatureCat, so neither the template validation nor the preview can predict it.

SignatureCat catches it immediately after the fact. Every signature write reads the copy Gmail returns in its own write response - that response body is the saved signature, already sanitized - and compares its structure with what was sent. The check costs no extra Google API calls, and it runs on all four write paths: one-shot applies, the daily assignment sync, and both alias write paths. Cosmetic rewrites do not raise a warning: re-encoded entities, whitespace, `b` swapped for `strong` or `i` for `em`, or Gmail wrapping your signature in markup of its own are all treated as benign. The warning fires only when structural elements actually went missing.

> [!NOTE]
> This is Gmail's behavior on Google's side, not a SignatureCat setting, and it cannot be switched off. SignatureCat's own sanitizer is a different thing that runs earlier, when you save a template, stripping scripts, iframes and inline event handlers - see [Templates](/docs/templates).

## Where you see the warning

Two surfaces report it: the job results in [Logs](/docs/logs), and the test apply in the template editor.

### In Logs and on the job view

The per-user row keeps its green tick and gains an amber **trimmed by Gmail** badge with the line "Applied, but Gmail stored a trimmed copy of this signature." The same badge and line appear on the full job view at `app.signature.cat/jobs/{id}`.

Open **Technical details** on the row for the raw facts: how many characters were sent, how many Gmail stored, and which elements were dropped with their before and after counts, for example:

```
Gmail stored a sanitized copy of the signature (2712 -> 1580 chars; dropped tags: tr 5->3, img 2->1)
```

A signature Gmail stored as completely empty carries the same badge and the same line - only the technical details say that the stored signature is empty. The per-user error code behind the badge is `GMAIL_SIGNATURE_SANITIZED`; unlike the codes in [Verify an assignment job](/docs/verify-assignments), it sits on a successful row and is a warning, not a failure.

### After a test apply in the editor

Click **Set me a test signature** in the template editor and SignatureCat writes the template to your own Gmail signature, then reads your mailbox back. If Gmail trimmed it, an amber, dismissible notice appears with one of two titles:

| Title | What Gmail stored |
|---|---|
| Applied, but Gmail stored a trimmed copy of this signature. | A structurally different, reduced copy. |
| Applied, but Gmail stored an empty signature. | Nothing at all. |

The body reads "Gmail rewrites signatures on its servers while saving them. Check your mailbox and simplify the affected parts if something is missing." The details disclosure shows "Sent {sent} characters, Gmail stored {stored}." and "Dropped elements: {list}". **Dismiss warning** closes the notice.

> [!TIP]
> This is the fastest way to find the construct Gmail rejects: it touches only your own mailbox and it verifies the result after every write, so each attempt is one click.

## Why the row still counts as a success

The write worked, so the row stays a success. Gmail accepted the request and saved a signature; applying the same template again sends the same HTML, and Gmail stores the same trimmed copy. Re-running the rollout therefore changes nothing.

The fix is the template, not the job:

1. Read the dropped elements in the technical details - they name the parts that went missing.
2. Simplify that part of the template: flatten nesting, split one complicated block into simple ones, remove the element that sits where the signature gets cut.
3. Apply it to yourself with **Set me a test signature** and check whether the warning is gone.
4. Read the mailbox back to confirm what Gmail really kept.
5. Re-apply to the affected users once the test comes back clean.

## Check what is really in the mailbox

Two actions on [Logs](/docs/logs) read a signature live from the mailbox instead of showing what SignatureCat last sent:

- **View current signature** - on a successful per-user row. Opens a read-only preview of the signature currently stored on that address.
- **Check an employee's signature** - in the Logs page header. Search for any user in your Workspace and click **Show signature**.

Both reach into Gmail at the moment you click, so they also catch signatures a user edited by hand in Gmail, not only Gmail's own trimming. If the mailbox has no signature at all, the popup says "{email} has no signature set in Gmail." The lookup is available to Editors and Admins, and each one is recorded in your activity log with the address that was read.

## What tends to survive, what tends to get trimmed

Google does not document the rules, so treat this as observation rather than a specification.

- **The one case seen in production:** a hand-written template combining a nested table, a horizontal rule, a banner image and italic legal text applied successfully - and Gmail kept only the part above the horizontal rule. Everything below it was gone from the mailbox.
- **Deep nesting is the usual suspect.** Layouts built from tables inside tables inside tables give Gmail the most to rewrite.
- **Cosmetic differences are not trimming.** If your signature looks right in the mailbox and no warning appeared, Gmail re-serializing your markup is harmless.

SignatureCat watches the structural elements for disappearance: links, line breaks, `div`, `hr`, images, lists and list items, paragraphs, `span`, tables with their rows and cells, plus bold and italic. Those are the names you will see in the dropped-elements list.

When something is flagged, simplify the flagged part, test it on your own mailbox, and read the mailbox back rather than trusting the preview - the preview renders the HTML SignatureCat sends, which is exactly the copy Gmail may reduce.

## Gmail's 10,000 character limit

Gmail caps a signature at 10,000 characters of HTML, and that is a separate, earlier failure mode: it is about size, not structure, and it stops you before anything reaches Gmail. The [visual editor](/docs/visual-editor) shows a live budget counter in the corner of the canvas reading "{used} / {max} characters", which changes color as you approach the cap. Over the limit the editor states "The signature exceeds the Gmail limit of 10,000 characters of HTML. Shorten it to save." and the save is rejected.

A template that fits the budget can still be trimmed by Gmail, and a trimmed signature is usually well under the cap - the two problems are unrelated.

## When to contact support

Write to support when a signature is trimmed and simplifying it does not help, or when the same template is stored correctly for some users and trimmed for others. See [Get help](/docs/get-help) for the address and the general checklist, and include:

- the **job link** (`app.signature.cat/jobs/...`) or a screenshot of the row with the **trimmed by Gmail** badge,
- the full text behind **Technical details** (character counts and dropped elements),
- the template involved, and which part of it disappears in the mailbox,
- whether **Set me a test signature** on your own mailbox reproduces it.

> [!IMPORTANT]
> Support cannot make Gmail keep markup it decided to drop - Google controls that. What support can help with is identifying which construct in the template triggers the trimming.
