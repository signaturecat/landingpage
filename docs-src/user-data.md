---
title: User data overrides
navTitle: User data
description: Store per-user values that override your Google Workspace directory in Gmail signatures - consent, the nine fields, self-service editing and deletion.
updated: 2026-08-02
---

# User data overrides

The **Data** tab lets you store your own value for a single user and use it in signatures instead of what the Google directory returns. The feature is off until an Admin turns it on, it covers the same nine person [variables](/docs/template-variables) your templates already use, and it never writes anything back to Google. The page is [app.signature.cat/data](https://app.signature.cat/data), Admins only.

## When to use overrides

Use overrides for gaps you cannot fix at the source quickly. Fixing the data in Google stays the recommended path, and the consent screen says so: **Directory first - overrides second**. The best place for employee data is the Google directory itself (in the Google Admin Console: **Directory**, **Users**, select a user, **User information**). Data kept there flows into signatures automatically, no overrides needed, and every other Workspace tool benefits from it too.

Good reasons to override anyway:

- a job title or department is wrong today and the process that owns it will not be fixed this week;
- a contractor has no phone number in the directory but needs one in the signature;
- one person should appear under a preferred first name in email, but not in the directory record.

Fixing the directory record later is always safe: switch the field back to the directory value and the override disappears.

## Turning it on

Nothing is stored until an Admin enables the feature. Open [Data](https://app.signature.cat/data) and read the consent screen **Store signature data for selected users?**, which states under **What we store, and when**:

- nothing is stored until you enable the feature - and then only the values you explicitly enter, only for the users you override;
- every change is recorded in the audit log (who, when and which fields - never the values);
- turning the feature off permanently deletes every stored value, and users removed from your Workspace are cleaned up automatically.

Click **Enable and store data** to switch it on. Until you do, the data screens hold nothing and the feature makes no directory calls at all.

> [!IMPORTANT]
> The values you enter here are stored by SignatureCat, in SignatureCat's own database - not in your Google Workspace. Your Google directory records are never changed by this feature.

The Data page needs a verified Workspace connection; if the setup wizard is unfinished you are sent to [Domain-Wide Delegation](/docs/domain-wide-delegation) first.

## Fields you can override

Nine fields, one per person variable. A stored value wins over the directory value on every render path - editor preview, test apply, manual apply and the daily sync - so what the editor shows is what ships. A field you leave alone keeps its directory value.

| Field | Variable | Falls back to | Limit |
|---|---|---|---|
| **First name** | `{{firstname}}` | Given name in the directory | 120 characters |
| **Last name** | `{{lastname}}` | Family name in the directory | 120 characters |
| **Email (displayed)** | `{{email}}` | Primary email address | 320 characters, must be a valid address |
| **Domain (displayed)** | `{{domain}}` | Domain part of the primary address | 253 characters, bare domain such as `yourcompany.com` |
| **Job title** | `{{jobtitle}}` | Title on the user's primary organization entry | 200 characters |
| **Department** | `{{department}}` | Department on the same entry | 200 characters |
| **Photo URL** | `{{photo}}` | Directory profile photo | 2048 characters, `https://` link only |
| **Address** | `{{address}}` | The user's primary address, formatted | 300 characters |
| **Phone** | `{{phone}}` | First non-empty of work, mobile, home | 60 characters |

> [!WARNING]
> **Email (displayed)** and **Domain (displayed)** change only what the signature shows. They never change the mailbox address emails are sent from, and they create nothing in Google.

Two more rules worth knowing:

- **Photo URL** takes a public `https://` link to an image you host - SignatureCat hosts no employee photos.
- When a signature is written to a send-as alias, `{{email}}` and `{{domain}}` follow the alias address even if you stored an override for that user; every other field keeps its override. See [Alias modes](/docs/assignments#alias-modes).

## Override one user

1. On [Data](https://app.signature.cat/data), type into **Find a user** - at least one character. Results come live from your Workspace directory; an empty search returns nothing on purpose, so the page never lists your whole Workspace.
2. Pick the user from the results. The editor opens with every field showing its live directory value, read-only, marked with a cloud icon.
3. Click the icon next to a field to switch it from **Use the directory value** to **Override this field**, then type your value. Directory mode is the default for every field, and switching a field back to it removes the stored value when you save.
4. If the data is wrong at the source, follow **Edit this user in Google Admin Console** - it opens that user's profile in Google.
5. Click **Save data**.

After saving, the app says what happened to the mailbox:

| What the app says | What it means |
|---|---|
| "Saved. The signature of jane@yourcompany.com will refresh in a moment." | A one-off refresh of that user's signature was queued. |
| "Saved, but jane@yourcompany.com has no signature assigned - nothing was applied to their mailbox." | The user matches no assignment and has made no self-service choice, so there is nothing to refresh. |
| "Saved. The change will apply with the next signature sync." | Nothing could be queued right now; the daily sync picks the change up. |

Every user you overrode is listed under **Users with overridden data**, with the fields that carry a value, the date and **Last change by** (**Admin**, **Self-service** or **CSV import**). That list comes from SignatureCat's own database and makes no calls to Google.

For dozens or hundreds of users at once, use **Import from CSV** instead - see [Import user data from a CSV](/docs/user-data-import).

## Remove an override

Clearing every field for a user deletes their stored entry:

- in the editor, **Back to directory data** removes all their stored values at once;
- in the list, **Remove override** on the row does the same;
- saving a user whose fields are all back in directory mode removes the entry too.

There is no way to force an empty value: an empty override always means "use the directory". If a signature should hide a missing field entirely, wrap that line in a [conditional block](/docs/template-variables#conditional-blocks-del-and-delete) instead.

A user who is already gone from your Workspace can still be cleaned up by hand - the editor says "This user no longer exists in your Workspace." and offers **Remove the override now**. The automatic cleanup would remove the entry anyway.

## Letting people fill in their own data

Open the **Self-service editing** padlock on the Data page to let users enter their own values on the My signature page. A **My signature data** button then appears at [app.signature.cat/self-service](https://app.signature.cat/self-service) and opens **Fill in your data**, the same per-field editor with **Save my data** and **Use directory data**.

- Any access level from **Self-service** upward can use it, and only ever on their own record.
- Their entries show up in your list with **Self-service** in the **Last change by** column, next to the address of whoever saved them.
- You can overwrite or delete any of them; an admin save moves the entry's source to **Admin**.
- Every self-service change lands in the audit log like your own.

More about the My signature page: [Self-service](/docs/self-service).

## Who can do what

The **Data** tab is Admin only, like [User management](/docs/user-management). Everyone else can at most edit their own record.

| Who | What they can do |
|---|---|
| Admin | Turn the feature on and off, override any user, [import a CSV](/docs/user-data-import), open or close self-service editing. |
| **Self-service** level and above | Edit their own values only, and only while the feature is on and self-service editing is open. |

## Turning it off

The **Turn off and delete** section at the bottom of the Data page removes everything. Click **Turn off data overrides**, then in **Delete all stored data?** follow **Type your Workspace domain to confirm** and click **Delete everything and turn off**.

Every stored value for your workspace is deleted immediately, and self-service editing is switched off with the feature. Signatures fall back to directory data with the next apply.

> [!CAUTION]
> The deletion is permanent and cannot be undone. Export or write down anything you want to keep before you confirm.

The Data page stays reachable even when a subscription has lapsed, so the off switch is always available to you.

## Lifecycle and privacy

- Entries exist only for the users someone actually overrode - SignatureCat never mirrors your directory.
- Suspended users keep their stored values.
- Users deleted from your Workspace have their entries removed automatically, once a day.
- Deleting your SignatureCat account deletes every stored value with it.
- Every change is written to the audit log with who, when and which field names - never the values themselves.
- Turning the feature off deletes everything, immediately.

The binding documents and the privacy summary are on the [Legal and privacy](/docs/legal) page.
