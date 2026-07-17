---
title: Assignments
navTitle: Assignments
description: SignatureCat assignments reference - target kinds, precedence when a user matches several assignments, alias modes and conflict handling.
updated: 2026-07-17
---

# Assignments

An assignment binds one template to one target and keeps it applied by the daily sync. This page is the reference for how targets, precedence and aliases behave; the how-to lives in [Assign templates](/docs/assign-templates/). Assignments are managed at [app.signature.cat/assignments](https://app.signature.cat/assignments) by Editors and Admins.

## Target kinds

| Target | Value | Scope option |
|---|---|---|
| Group | Group email address | **+ sub-groups** includes nested group members. |
| OU | Path starting with `/`, for example `/Engineering` | **+ sub-OUs** covers the whole subtree. |
| Everyone | All active users in the Workspace | At most **one** such assignment per workspace. |

Each target can hold only one assignment - creating a duplicate is rejected with "This target already has an assignment." A target's kind is fixed after creation; to switch a group assignment to an OU, delete and recreate it.

Individual users are deliberately not an assignment target - cover individuals with [self-service](/docs/self-service/) or a one-off [apply job](/docs/apply-jobs/).

## How precedence works

Users often match several assignments. Every sync computes exactly **one winner per user**, layer by layer, from bottom to top:

1. **Everyone** - the base layer for every active user.
2. **OU assignments** override the everyone-assignment for users in the OU.
3. **Group assignments** override the OU template for their members. If a user belongs to multiple assigned groups, the **most recently updated** assignment wins.
4. **Self-service** - a user's own choice wins over every assignment, **unless** the winning assignment has **Override self-service** enabled.

When an assignment displaces others for a user, the job result row records it ("overrode N other assignment(s) for this user") so you can audit conflicts on the [logs](/docs/logs/) pages.

> [!TIP]
> Design pattern: one everyone-assignment as the company default, OU assignments per country or brand, group assignments for exceptions (sales campaign, executive team). The layering does the rest.

## Alias modes

Each assignment has an **Aliases** setting that controls which addresses get the signature. Alias writing requires the optional `gmail.settings.sharing` scope - see [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-exactly-do-i-authorize).

| Mode | Behavior |
|---|---|
| **Off** (default) | Only each user's primary address is signed. Send-as aliases are left untouched. |
| **Addresses in the group** | Group assignments only. The signature goes to exactly the addresses the group lists: a member added by an alias gets it only on that alias, a member added by their primary address only on the primary. Aliases not in the group are never touched. |
| **All aliases** | Every user gets the signature on their primary address and on every send-as alias they own. Owned aliases not yet set up as send-as entries are created first. |

Notes on behavior:

- With **All aliases**, external addresses and non-editable aliases are never auto-created; a newly created send-as entry that Gmail reports as pending verification is skipped until verified.
- `{{email}}` and `{{domain}}` resolve to the **alias** being written, so alias signatures show the right address. All other variables come from the mailbox owner's record.
- Each alias write gets its own row in the job results, so [verification](/docs/verify-assignments/) shows exactly which addresses were signed or skipped.
- Self-service signatures are always applied to the user's accepted aliases as well.

## Override self-service

Per assignment, the **Override self-service** switch makes the assignment win over users' own self-service choices. The row shows an "overrides self-service" badge. Use it for compliance-critical signatures (legal disclaimers) where individual customization is not acceptable.

## When targets disappear

If an assigned group or OU is deleted in Google Workspace, the next sync marks the assignment with a "not found in Workspace" badge, skips the target, notifies admins (in-app + email, once per failing streak) and retries on subsequent syncs. Fix the target in the edit panel or remove the assignment. See [Verify an assignment job](/docs/verify-assignments/#what-the-per-user-rows-tell-you).

## Editing and removing

Rows are edited in place (template, target value, scope, alias mode, override). Removing an assignment stops managing those users - already-applied signatures remain in Gmail until something else (another assignment, self-service or the default template) overwrites them on a later sync.
