---
title: Gestion des accès et niveaux d'accès
navTitle: Gestion des accès
description: Qui peut se connecter à SignatureCat, ce que chaque niveau d'accès autorise, et comment accorder l'accès à des utilisateurs individuels ou à des groupes Google entiers.
updated: 2026-07-17
---

# Gestion des accès et niveaux d'accès

Seules les personnes que vous laissez explicitement entrer peuvent se connecter à SignatureCat : les super administrateurs Workspace (toujours autorisés), les utilisateurs disposant d'un accès direct et les membres des groupes auxquels vous avez accordé l'accès. Tous les autres sont refoulés à la connexion. L'accès se gère sur la page [Gestion des accès](https://app.signature.cat/user-management) (Admins uniquement).

## Que permet chaque niveau d'accès ?

| Niveau d'accès | Ce qu'il permet |
|---|---|
| Self-service | Définit sa propre signature uniquement à partir des modèles de l'organisation. |
| Self-service + édition | Self-service plus son propre HTML de signature personnalisé. |
| Designer | Modifie les modèles de signature de l'organisation. |
| Editor | Designer plus la gestion des affectations et des tâches d'application, et les notifications dans l'application. |
| Admin | Accès complet, y compris la facturation, la gestion des accès, les domaines d'images et l'assistant DWD. |

Quelques conséquences pratiques :

- **Modèles** ([Signatures](https://app.signature.cat/signatures)) : Designer, Editor, Admin.
- **Affectations et Appliquer** ([Affectations](https://app.signature.cat/assignments), [Appliquer](https://app.signature.cat/apply)) : Editor, Admin.
- **Facturation, gestion des accès, domaine d'images personnalisé** : Admin uniquement.
- Les Editors voient les [notifications](/docs/notifications/) dans l'application ; les **e-mails** d'alerte et de facturation ne vont qu'aux administrateurs.

> [!NOTE]
> Les **super administrateurs** Workspace ont toujours le niveau Admin. C'est appliqué à chaque connexion et ne peut pas être révoqué dans SignatureCat - pour le changer, modifiez leur statut d'administrateur dans Google Workspace lui-même.

## Qui peut se connecter ?

La connexion se fait uniquement via Google et nécessite un compte Google Workspace de votre domaine. Quand une personne sans accès essaie, elle voit : « Votre compte n'a pas encore accès à SignatureCat. Demandez à un super administrateur Workspace de vous accorder l'accès, puis reconnectez-vous. » - et rien n'est modifié dans votre espace de travail.

Les sessions durent jusqu'à 7 jours d'inactivité avec un plafond strict de 14 jours, puis une reconnexion Google en un clic est nécessaire.

## Accorder l'accès à un utilisateur unique

1. Ouvrez [Gestion des accès](https://app.signature.cat/user-management) et cliquez sur **Ajouter un accès**.
2. Sur l'onglet **Utilisateur**, saisissez l'adresse e-mail (elle doit appartenir à votre Workspace, domaines secondaires inclus).
3. Choisissez un niveau d'accès et cliquez sur **Enregistrer l'accès**.

L'utilisateur reçoit un e-mail d'invitation « Vous avez maintenant accès à signature.cat ».

Un accès accordé directement à un utilisateur **remplace** toujours tout accès de groupe pour cette personne - même si l'accès de groupe est plus élevé.

## Accorder l'accès à un groupe Google entier

1. Dans le même panneau, passez à l'onglet **Groupe**.
2. Collez l'e-mail du groupe (par exemple `engineering@example.com`), choisissez le niveau et enregistrez.

> [!WARNING]
> Un accès de groupe couvre **tous les membres du groupe, y compris les personnes qui y seront ajoutées à l'avenir** - l'appartenance est vérifiée en direct à chaque connexion, sans confirmation par personne. Accordez aux groupes larges le niveau le plus bas qui suffit (généralement Self-service).

> [!IMPORTANT]
> L'appartenance au groupe est évaluée à la connexion de l'utilisateur. Une personne déjà connectée, ou qui vient d'être ajoutée au groupe, devra peut-être **se reconnecter** pour que le nouvel accès prenne effet.

## Retirer et modifier l'accès

- Modifiez ou retirez les accès depuis la même page. Retirer un accès bloque la prochaine connexion ; cela ne retire pas une signature déjà appliquée à la boîte.
- Vous ne pouvez pas modifier ni retirer **votre propre** accès - un autre administrateur doit le faire (l'interface affiche un badge « Vous » à la place des contrôles).
- Les niveaux d'accès ne contrôlent que l'application SignatureCat. Ils n'ont aucun effet sur le compte Google de l'utilisateur.

## Laisser les utilisateurs gérer leur propre signature

Accordez aux utilisateurs (ou à un groupe) le niveau **Self-service** et activez au moins un modèle pour le self-service - le parcours complet est décrit dans [Self-service](/docs/self-service/).
