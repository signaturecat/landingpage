---
title: Import user data from a CSV
navTitle: Import user data
description: Bulk-load per-user signature data into SignatureCat from a CSV file - columns, replace rules, limits, the preview step and the Gmail sync afterwards.
updated: 2026-08-02
---

# Import user data from a CSV

A CSV import sets stored values for many users in one go, at [app.signature.cat/data/import](https://app.signature.cat/data/import) or through **Import from CSV** on the [Data](https://app.signature.cat/data) page. The file is checked before anything is written, and the whole import applies all-or-nothing. Turn the feature on first - see [User data overrides](/docs/user-data).

## When to use it

Use the import when you have dozens or hundreds of users to set up, typically straight from an HR export. For one person the per-user editor is faster and refreshes their signature right away.

The import only ever touches the addresses listed in the file. Everyone else keeps whatever they have, including users with no stored data at all.

## The file

Start from **Download CSV template** on the import page - it contains the header row and one example row:

```
email,firstname,lastname,jobtitle,department,photo,address,phone
jane.doe@yourcompany.com,Jane,Doe,Senior Account Manager,Sales,https://yourcompany.com/photos/jane.jpg,"Main Street 1, 00-001 Warsaw",+48 600 000 000
```

The format is ordinary CSV: comma-separated, one header row, values with a comma inside wrapped in double quotes (a quote inside a quoted value is doubled), LF or CRLF line ends, UTF-8.

`email` is required in every file. It identifies the user whose entry the row replaces and must be that user's **primary** Workspace address - it is not an override of the `{{email}}` variable, and it is not written into any signature. Aliases are not resolved here, so a row listing an alias never reaches that person's signature.

Add at least one of the data columns. Each one sets the field of the same name on the [Data](https://app.signature.cat/data) screen:

| Column | Sets | Limit |
|---|---|---|
| `firstname` | **First name**, `{{firstname}}` | 120 characters |
| `lastname` | **Last name**, `{{lastname}}` | 120 characters |
| `jobtitle` | **Job title**, `{{jobtitle}}` | 200 characters |
| `department` | **Department**, `{{department}}` | 200 characters |
| `photo` | **Photo URL**, `{{photo}}` | 2048 characters, `https://` link only |
| `address` | **Address**, `{{address}}` | 300 characters |
| `phone` | **Phone**, `{{phone}}` | 60 characters |

Columns may appear in any order, but every header must be one of the names above and none may appear twice.

> [!IMPORTANT]
> The **Email (displayed)** and **Domain (displayed)** overrides are deliberately not importable - that keeps the `email` column unambiguous. Set those two per user in the editor on the [Data](https://app.signature.cat/data) page.

## What a row does

A row replaces that user's whole stored entry - it is not a partial update:

- a filled cell stores that value;
- an empty cell means "use the directory" and clears any value stored for that field;
- a column you left out of the header is cleared as well, for every address in the file;
- a row with an address and no values at all removes that user's entry entirely;
- users not listed in the file are never touched.

So a file with only `email` and `phone` clears every other stored field of the listed users. Export what you already have, or list every column you want to keep.

## Limits

Up to **2000 data rows** and **1 MB** per file. Larger files are rejected before the upload - split the data into several files and import them one after another.

## Upload, check, confirm

Nothing is written until you confirm the preview:

1. **Upload.** Choose the file with **Choose a CSV file**. It is parsed and validated on the spot.
2. **Review before import.** You get a summary (how many rows, how many are new, how many update an existing entry) and a table of rows marked **New** or **Update**, with "directory" shown wherever a cell would clear a value. Very long files list the first rows only; all of them are imported.
3. **Confirm.** Click **Import N rows**. Only now is anything written. The result screen reports how many entries were saved and how many empty rows removed an entry.

## One broken row rejects the whole file

The import is all-or-nothing: if any row or the file itself fails validation, nothing is written and no entry changes. Fix the file and upload it again.

Problems with a single row:

| What the app says | Cause and fix |
|---|---|
| "The email address is not valid." | The `email` cell is not a syntactically valid address. |
| "This email appears more than once in the file." | The same address is listed twice. Merge the rows into one - a row replaces the whole entry, so the second one would silently win. |
| "The row has a different number of cells than the header." | Usually an unquoted comma inside a value. Wrap such values in double quotes. |
| "The row contains control characters (e.g. a line break inside a value)." | Values must be single-line plain text. Remove line breaks and tabs, including inside quoted cells. |
| "A value is not valid for its column." | A value is longer than the limit above, or a `photo` cell is not an `https://` link. |

Problems that reject the file outright:

| What the app says | Cause and fix |
|---|---|
| "The file has no data rows." | The file holds only a header. |
| "The email column is missing." | Add the required `email` column. |
| "Add at least one data column besides email." | A file of addresses alone does nothing. |
| "Unknown column in the header." | Only the eight documented column names are accepted, spelled exactly. |
| "A column appears twice in the header." | Remove the duplicate. |
| "The file has more than 2000 data rows." | Split the file. |
| "A quoted value is never closed - check the quoting." | An opening double quote has no closing one - often a stray quote in an address. |

> [!TIP]
> Spreadsheet exports are the usual source of trouble: check that your tool saved plain CSV (not semicolon-separated), and that no cell carries a line break.

## After the import

Imported values reach mailboxes with the next daily sync. To apply them sooner, use **Sync signatures now** on the result screen - it starts a signature sync immediately. The button is optional; skipping it just leaves the change to the daily sync. If a sync is already running, the app says so, and anything that run misses is applied by the next one.

Unlike a single-user save on the [Data](https://app.signature.cat/data) page, an import does not refresh signatures on its own - that is why the button is offered.

> [!NOTE]
> A row for an address that does not exist in your Workspace is accepted (addresses are checked for shape only), never matches a mailbox, and is cleaned up automatically later. It is harmless, but worth removing from your source file.

Related: [User data overrides](/docs/user-data), [Template variables](/docs/template-variables), [Logs](/docs/logs).
