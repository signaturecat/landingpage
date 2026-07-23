---
title: Introduction
navTitle: Introduction
description: Ce qu'est SignatureCat et comment il gère les signatures Gmail dans votre Google Workspace - modèles, affectations et synchronisation quotidienne automatique.
updated: 2026-07-17
---

# Documentation SignatureCat

SignatureCat gère de façon centralisée les signatures Gmail dans l'ensemble de votre Google Workspace. Vous concevez un modèle de signature HTML avec des variables, vous l'affectez aux utilisateurs via des groupes, des unités organisationnelles ou tout l'espace de travail, et SignatureCat écrit une signature personnalisée dans chaque boîte - et la maintient à jour automatiquement.

L'application fonctionne sur [app.signature.cat](https://app.signature.cat). Cette documentation couvre tout, de la première configuration à la référence au quotidien.

## Comment fonctionne SignatureCat ?

1. **Connectez votre Google Workspace.** Un super administrateur Workspace autorise SignatureCat via la [Domain-Wide Delegation](/docs/domain-wide-delegation/), afin qu'il puisse lire votre annuaire d'utilisateurs et écrire les signatures Gmail.
2. **Créez un modèle.** Un modèle HTML avec des [variables](/docs/template-variables/) comme `{{firstname}}` ou `{{jobtitle}}` qui sont résolues par utilisateur à partir de votre Google Directory.
3. **Affectez-le.** Liez les modèles à des groupes, des unités organisationnelles ou tout le monde à la fois sur la page [Affectations](https://app.signature.cat/assignments).
4. **Restez à jour.** Une synchronisation en arrière-plan réapplique les affectations une fois par jour, de sorte que les nouvelles recrues et les changements d'équipe reçoivent la bonne signature sans que personne ne lève le petit doigt.

## Ce dont vous avez besoin

- Un domaine **Google Workspace** (les comptes Gmail personnels ne sont pas pris en charge).
- Un **super administrateur Workspace** pour enregistrer votre entreprise et effectuer l'autorisation unique. Le travail au quotidien peut ensuite être délégué à des non-administrateurs via la [gestion des accès](/docs/user-management/).
- Environ **10 minutes** pour toute la première configuration.

> [!NOTE]
> Chaque espace de travail démarre avec un essai gratuit de 7 jours. Une carte est collectée à l'inscription et débitée pour la première fois à la fin de l'essai. Voir [Factures](/docs/invoices/) pour les tarifs et les détails de facturation.

## Premiers pas

Suivez les guides de démarrage dans l'ordre :

1. [Connecter votre Google Workspace](/docs/connect-google-workspace/) - enregistrement, provisionnement et assistant Domain-Wide Delegation.
2. [Créer votre premier modèle](/docs/create-your-first-template/) - l'éditeur, les variables, l'aperçu et le test sur votre propre boîte.
3. [Affecter des modèles](/docs/assign-templates/) - groupes, OU ou tout l'espace de travail.
4. [Vérifier une tâche d'affectation](/docs/verify-assignments/) - confirmez que les signatures sont arrivées là où il faut.

## Où chercher les références

- [Modèles](/docs/templates/) et [Variables de modèle](/docs/template-variables/) - la référence complète de l'éditeur et des variables.
- [Affectations](/docs/assignments/) - règles de priorité et modes d'alias.
- [Tâches d'application](/docs/apply-jobs/) et [Journaux](/docs/logs/) - comment le déploiement des signatures est suivi.
- [Notifications](/docs/notifications/) - quelles alertes arrivent par e-mail et lesquelles apparaissent dans l'application.
- [Obtenir de l'aide](/docs/get-help/) - contact du support et [état du service](/docs/service-status/).
