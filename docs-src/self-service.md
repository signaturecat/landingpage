---
title: Self-service signatures
navTitle: Self-service
description: Let end users pick and apply their own Gmail signature from admin-approved SignatureCat templates - setup, flow, own data and precedence rules.
updated: 2026-08-02
---

# Self-service signatures

Self-service lets each user pick their own signature from templates you approve, and apply it to their own mailbox immediately - without touching anyone else's. Users find it under **My signature** at [app.signature.cat/self-service](https://app.signature.cat/self-service).

## What admins set up

Two switches make self-service available:

1. **Enable templates for self-service.** On [Signatures](https://app.signature.cat/signatures), toggle self-service on for each template users may pick. Only these templates are visible on the self-service page.
2. **Grant users access.** On [User management](https://app.signature.cat/user-management), grant users or groups the **Self-service** level (or **Self-service + edit** to also allow their own custom HTML). See [User management](/docs/user-management) - including the warning about group grants covering future members.

> [!WARNING]
> Disabling self-service on a template clears the choices of every user who picked it, and their pending jobs are cancelled. The app asks for confirmation first.

## What the user does

1. Sign in at [app.signature.cat](https://app.signature.cat) and open **My signature**.
2. Pick an **Organization template** from the dropdown. A live preview renders against the user's own Directory record.
3. Users with the edit level can switch to **Custom HTML** and adjust the markup, with the same [variables](/docs/template-variables) available; **Reset to template** restores the original.
4. Click **Save signature**. The signature is applied to the user's mailbox right away ("Saved - applied to your mailbox"), including their accepted send-as aliases.

If the dropdown is empty, no template has self-service enabled yet: "Your organization hasn't published any self-service templates yet. Ask an admin to enable one."

## My signature data

**My signature data** is a button on the **My signature** page where a user fills in their own values for the variables in their signature - job title, phone, address and the rest. It appears once an Admin has turned on user data for the organization and opened the **Self-service editing** padlock; see [User data](/docs/user-data).

For the user, it works like this:

1. Open [My signature](https://app.signature.cat/self-service) and click **My signature data**.
2. The **Fill in your data** popup opens: "These values fill the variables in your signature."
3. Each field shows the value from your company directory until you click the icon next to it and type your own.
4. Click **Save my data**. **Use directory data** does the opposite: it removes everything you entered and puts every field back to the directory value.

What that changes:

- The values feed the same [template variables](/docs/template-variables) as everywhere else - the organization template you picked, the preview on the page and the signature in your mailbox all use them.
- Saving re-applies your signature to your mailbox right away ("Saved. Your signature is being updated right now."). If nothing can be applied at that moment, the change goes out with the next signature update.
- You can only ever edit your **own** record. The popup always works on your own address.
- Your Admin sees every entry, including who last changed it, and can overwrite or delete it.

> [!NOTE]
> No **My signature data** button on the page? Then user data is switched off for your organization, or self-service editing is still locked. Ask an Admin.

## How self-service interacts with assignments

A user's self-service choice sits at the **top** of the precedence ladder: it wins over group, OU and everyone-assignments. The one exception is an assignment with **Override self-service** enabled, which inverts the rule for the users it covers. Details: [Assignments](/docs/assignments#how-precedence-works).

> [!NOTE]
> Self-service users can only ever set their **own** signature. They see only the templates you enabled, never other users' data or admin pages.
