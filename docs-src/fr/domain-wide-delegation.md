---
title: Domain-Wide Delegation
navTitle: Domain-Wide Delegation
description: Comment SignatureCat utilise la Google Domain-Wide Delegation - scopes, identifiant client par locataire, propagation, détection de révocation et réautorisation.
updated: 2026-07-17
---

# Domain-Wide Delegation

La Domain-Wide Delegation (DWD) est le mécanisme de Google Workspace qui permet au compte de service dédié de SignatureCat de lire votre annuaire et d'écrire les signatures Gmail - sans jamais connaître le mot de passe de quiconque. Vous l'accordez une seule fois dans la Google Admin console ; cette page explique exactement ce qui est accordé et comment cela se comporte dans le temps.

La configuration pas à pas se trouve dans [Connecter votre Google Workspace](/docs/connect-google-workspace/). Ceci est la référence.

## Qu'est-ce que j'autorise exactement ?

Vous ajoutez **un client API** sur la [page Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) de l'Admin console, identifié par un **identifiant client** numérique unique à votre organisation (chaque client SignatureCat dispose de son propre compte de service isolé). L'identifiant client est affiché dans l'assistant DWD et ensuite dans [Paramètres](https://app.signature.cat/settings), section Compte de service.

Les scopes et le rôle de chacun :

| Scope | Requis | Utilisé pour |
|---|---|---|
| `gmail.settings.basic` | Oui | Écrire la signature sur l'adresse principale de chaque utilisateur. |
| `admin.directory.user.readonly` | Oui | Lire les profils utilisateurs - noms, intitulés de poste, téléphones - pour les [variables de modèle](/docs/template-variables/). |
| `admin.directory.group.member.readonly` | Oui | Étendre les affectations de groupe en membres. |
| `admin.directory.customer.readonly` | Oui | Lire le nombre d'utilisateurs du Workspace pour la facturation. |
| `gmail.settings.sharing` | Optionnel | Écrire les signatures sur les **alias** send-as. Sautez-le et les fonctionnalités d'alias restent désactivées. |

SignatureCat ne demande jamais de scopes sur le contenu des messages - il ne peut ni lire ni envoyer l'e-mail de quiconque.

## L'identifiant client est-il stable ?

Oui. SignatureCat effectue automatiquement la rotation des clés de son compte de service pour des raisons de sécurité, mais la rotation génère une nouvelle clé sur le **même** compte de service - l'identifiant client numérique ne change jamais. Vous n'aurez jamais à réautoriser la DWD à cause de la rotation des clés.

## En combien de temps une nouvelle autorisation prend-elle effet ?

Google propage les changements DWD progressivement - en général quelques secondes, parfois jusqu'à environ 30 secondes. Le bouton **Vérifier** de l'assistant attend cette fenêtre avant de signaler un échec, un seul clic réussit donc en général juste après l'autorisation. Une carte jaune "propagation en cours" signifie exactement cela : patientez un instant et vérifiez à nouveau.

## Que se passe-t-il si la DWD est retirée ou un scope révoqué ?

SignatureCat vérifie la santé de la DWD avant chaque synchronisation. Quand elle casse :

- les synchronisations de signatures se mettent **en pause** immédiatement (rien n'est appliqué à moitié),
- les administrateurs reçoivent la notification dans l'application "Accès Domain-Wide Delegation perdu" et un e-mail "Action requise",
- l'application redirige les administrateurs vers l'assistant DWD.

Réaccorder l'entrée ou le scope manquant et passer **Vérifier** relance tout - l'état se rétablit de lui-même, rien n'a besoin d'être reconstruit. Pour rouvrir l'assistant à tout moment, utilisez **Relancer l'assistant DWD** dans [Paramètres](https://app.signature.cat/settings), section Compte de service.

> [!WARNING]
> L'autorisation DWD s'applique à toute l'organisation, et son retrait arrête d'un coup la gestion des signatures pour tout l'espace de travail. Si vous voulez seulement abandonner la prise en charge des alias, retirez uniquement le scope `gmail.settings.sharing` et relancez **Vérifier**.

## Ajouter le scope d'alias optionnel plus tard

Ajoutez `https://www.googleapis.com/auth/gmail.settings.sharing` à l'entrée existante de l'Admin console (conservez les quatre autres scopes), puis **Relancer l'assistant DWD** et cliquez sur **Vérifier**. Les fonctionnalités d'alias se débloquent automatiquement - voir les [modes d'alias](/docs/assignments/#alias-modes).

## Retirer SignatureCat

Quand vous supprimez votre compte, SignatureCat retire sa propre infrastructure, mais il ne peut pas modifier votre Admin console : **supprimez vous-même l'entrée du client API** sur la [page Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) une fois le compte supprimé.
