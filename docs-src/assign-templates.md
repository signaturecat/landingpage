---
title: Assign templates to groups, OUs or everyone
navTitle: Assign templates
description: Bind SignatureCat templates to Google groups, organizational units or every active user in the Workspace, and sync signatures on demand.
updated: 2026-07-17
---

# Assign templates to groups, OUs or everyone

Assignments bind a template to a target - a Google group, an organizational unit (OU) or every active user in your workspace - and keep it applied automatically. You manage them on the [Assignments](https://app.signature.cat/assignments) page (available to Editors and Admins).

## Assign to a group

1. On [Assignments](https://app.signature.cat/assignments), add an entry under **Group assignments**.
2. Enter the **Group email** (for example `engineering@example.com`).
3. Pick the **Template**.
4. Optionally enable **+ sub-groups** to include members of nested groups.
5. Optionally pick an alias mode under **Aliases** - see [alias modes](/docs/assignments/#alias-modes) for what "Addresses in the group" and "All aliases" do.

## Assign to an organizational unit

1. Add an entry under **OU assignments**.
2. Enter the **OU path** starting with a slash, for example `/Engineering`.
3. Pick the template, and optionally enable **+ sub-OUs** to cover the whole subtree.

## Assign to the whole workspace

The **Assign to everyone** section holds at most one entry per workspace. It covers every active (non-suspended) user and acts as the base layer: OU and group assignments still override it per user, so you can set a company-wide default and refine it for specific teams.

Click **Assign to everyone**, pick the template and save the form.

> [!IMPORTANT]
> The everyone-assignment reaches every active user in your Workspace, and the daily sync will keep re-applying it without further confirmation. Review the template carefully before saving - ideally after a [test on your own mailbox](/docs/create-your-first-template/#test-it-on-your-own-mailbox).

## When do signatures actually change?

- Click **Sync now** on the Assignments page to apply everything immediately, or
- wait for the **daily background sync**, which re-applies all assignments once a day and picks up new group members, OU moves and new hires automatically.

If a user matches several assignments, exactly one wins: group beats OU, OU beats the everyone-assignment, and a user's own [self-service](/docs/self-service/) choice beats them all unless the assignment has **Override self-service** enabled. The precise rules are in the [Assignments reference](/docs/assignments/#how-precedence-works).

Next: [verify the assignment job](/docs/verify-assignments/) to confirm everything landed.

> [!NOTE]
> Each target can hold only one assignment. Trying to create a second one for the same group or OU shows "This target already has an assignment. Edit the existing entry or choose a different target."
