---
title: Connecter votre Google Workspace
navTitle: Connecter Google Workspace
description: Enregistrez SignatureCat en tant que super administrateur Google Workspace, provisionnez votre compte de service isolé et autorisez la Domain-Wide Delegation.
updated: 2026-07-17
---

# Connecter votre Google Workspace

Pour connecter un Google Workspace à SignatureCat, un **super administrateur Workspace** se connecte sur [app.signature.cat](https://app.signature.cat), provisionne un compte de service dédié et l'autorise dans la Google Admin console via la Domain-Wide Delegation (DWD). L'ensemble du parcours prend environ 10 minutes et n'est requis qu'une seule fois.

> [!IMPORTANT]
> Le premier enregistrement d'un compte d'entreprise doit être effectué par un **super administrateur Google Workspace**. Seul un super administrateur peut ouvrir la page Domain-Wide Delegation dans la Google Admin console, et SignatureCat a besoin d'un accès à l'annuaire pour compter correctement vos utilisateurs. Les utilisateurs ordinaires peuvent être invités ensuite - ils n'ont pas besoin de privilèges d'administrateur. Voir [Gestion des accès](/docs/user-management/).

## Étape 1 : Se connecter avec Google

Ouvrez [app.signature.cat](https://app.signature.cat) et cliquez sur **Se connecter avec Google** avec votre compte d'entreprise. À ce stade, SignatureCat ne demande que les scopes de connexion de base `openid email profile` - les autorisations Workspace sont accordées séparément à l'étape 3, et uniquement à votre propre compte de service isolé.

Les comptes Gmail personnels sont refusés : SignatureCat nécessite un compte Google Workspace.

## Étape 2 : Configurer votre espace de travail

Juste après la première connexion, vous arrivez sur l'écran **Configurez votre espace de travail**. Cliquer sur **Configurer l'espace de travail** crée un compte de service Google Cloud dédié et isolé pour votre organisation - c'est l'identité qui gérera les signatures Gmail en votre nom. Cela prend en général quelques secondes (jusqu'à 15).

> [!NOTE]
> Chaque client obtient son **propre** compte de service. Ses identifiants sont stockés dans un coffre de secrets, jamais dans la base de données de l'application, et les clés sont rotées automatiquement. La rotation ne change jamais l'identifiant client, vous n'aurez donc jamais à réautoriser à cause d'elle.

Seul l'administrateur qui a créé l'organisation peut terminer cette étape.

## Étape 3 : Autoriser la Domain-Wide Delegation

Ensuite, l'assistant **Autoriser SignatureCat dans votre Workspace** sur [app.signature.cat/onboarding/dwd](https://app.signature.cat/onboarding/dwd) vous guide à travers la Google Admin console :

1. **Ouvrir la Console d'administration** - l'assistant renvoie directement à la [page Domain-wide delegation](https://admin.google.com/ac/owl/domainwidedelegation) (Sécurité, Contrôles API, Délégation au niveau du domaine). Connectez-vous en tant que super administrateur.
2. **Ajouter** - cliquez sur **Ajouter un client API**.
3. **Coller l'identifiant client** - copiez l'identifiant client numérique affiché dans l'assistant (unique à votre organisation) et collez-le dans le formulaire de l'Admin console. Utilisez le bouton de copie ; il doit s'agir de l'identifiant numérique, pas d'une adresse e-mail.
4. **Coller les habilitations OAuth** - copiez la chaîne de scopes séparés par des virgules depuis l'assistant et collez-la dans le champ des habilitations OAuth :

```
https://www.googleapis.com/auth/gmail.settings.basic,https://www.googleapis.com/auth/admin.directory.user.readonly,https://www.googleapis.com/auth/admin.directory.group.member.readonly,https://www.googleapis.com/auth/admin.directory.customer.readonly,https://www.googleapis.com/auth/gmail.settings.sharing
```

5. **Autoriser** - cliquez sur **Autoriser** dans l'Admin console.
6. **Vérifier** - de retour dans SignatureCat, cliquez sur **Vérifier**. L'application exécute un test de connectivité pour chaque scope et affiche un résultat OK / Échec par scope.

Le dernier scope, `gmail.settings.sharing`, est **optionnel** : il n'est nécessaire que pour écrire les signatures sur les alias send-as. Vous pouvez le sauter maintenant et l'ajouter plus tard - tout le reste fonctionne, et l'assistant affichera l'avis "Les signatures d'alias sont désactivées". Voir [Affectations](/docs/assignments/#alias-modes) pour ce que les alias débloquent.

> [!WARNING]
> Collez la chaîne de scopes exactement telle que copiée. Un scope manquant ou modifié fait échouer la vérification avec une erreur par scope telle que "Cette habilitation n'a pas été autorisée. Refaites l'étape 4 avec la chaîne exacte."

### La vérification indique que l'accès se propage encore

Google a besoin d'un moment pour propager une nouvelle autorisation DWD - en général quelques secondes, parfois jusqu'à environ 30 secondes. Le bouton **Vérifier** attend déjà la majeure partie de cette fenêtre. Si vous voyez toujours la carte jaune "l'accès est peut-être encore en cours de propagation", patientez un instant et cliquez à nouveau sur **Vérifier**. Ce n'est pas une erreur.

## Étape 4 : Facturation

Après la vérification de la DWD, vous êtes dirigé vers [Facturation](https://app.signature.cat/billing) pour démarrer l'essai gratuit de 7 jours (carte collectée dès l'inscription, débitée à la fin de l'essai). Voir [Factures](/docs/invoices/) pour les paliers de tarification.

C'est tout - continuez avec [Créer votre premier modèle](/docs/create-your-first-template/).

## Renouveler ou réaccorder la Domain-Wide Delegation

Si l'entrée DWD ou l'un de ses scopes est retiré plus tard dans la Google Admin console, SignatureCat le détecte avant la synchronisation suivante : les synchronisations de signatures se mettent en pause, les administrateurs reçoivent une notification dans l'application et un e-mail, et l'application vous demande de relancer l'assistant.

Pour le relancer à tout moment, ouvrez [Paramètres](https://app.signature.cat/settings), trouvez la section **Compte de service** et cliquez sur **Relancer l'assistant DWD** (l'identifiant client y est aussi affiché). Une fois la vérification passée, les synchronisations reprennent automatiquement.

> [!WARNING]
> Retirer l'entrée Domain-Wide Delegation dans l'Admin console casse immédiatement la gestion des signatures pour tout votre espace de travail. Si vous supprimez votre compte SignatureCat, retirez l'entrée DWD ensuite - SignatureCat ne peut pas la retirer à votre place.
