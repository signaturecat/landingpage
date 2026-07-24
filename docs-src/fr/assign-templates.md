---
title: Affecter des modèles aux groupes, aux OU ou à tout le monde
navTitle: Affecter des modèles
description: Liez les modèles SignatureCat à des groupes Google, des unités organisationnelles ou tous les utilisateurs actifs du Workspace, et synchronisez les signatures à la demande.
updated: 2026-07-17
---

# Affecter des modèles aux groupes, aux OU ou à tout le monde

Les affectations lient un modèle à une cible - un groupe Google, une unité organisationnelle (OU) ou tous les utilisateurs actifs de votre espace de travail - et le maintiennent appliqué automatiquement. Vous les gérez sur la page [Affectations](https://app.signature.cat/assignments) (disponible pour les niveaux Editor et Admin).

## Affecter à un groupe

1. Sur [Affectations](https://app.signature.cat/assignments), ajoutez une entrée sous **Affectations de groupe**.
2. Saisissez l'**E-mail du groupe** (par exemple `engineering@example.com`).
3. Choisissez le **Modèle**.
4. Activez éventuellement **+ sous-groupes** pour inclure les membres des groupes imbriqués.
5. Choisissez éventuellement un mode d'alias sous **Alias** - voir les [modes d'alias](/docs/assignments/#alias-modes) pour comprendre ce que font « Adresses du groupe » et « Tous les alias ».

## Affecter à une unité organisationnelle

1. Ajoutez une entrée sous **Affectations OU**.
2. Saisissez le **Chemin de l'OU** commençant par une barre oblique, par exemple `/Engineering`.
3. Choisissez le modèle, et activez éventuellement **+ sous-OU** pour couvrir toute la sous-arborescence.

## Affecter à tout l'espace de travail

La section **Attribuer à tous** contient au maximum une entrée par espace de travail. Elle couvre tous les utilisateurs actifs (non suspendus) et sert de couche de base : les affectations OU et de groupe la remplacent toujours par utilisateur, vous pouvez donc définir un modèle par défaut pour toute l'entreprise et l'affiner pour des équipes spécifiques.

Cliquez sur **Attribuer à tous**, choisissez le modèle et enregistrez le formulaire.

> [!IMPORTANT]
> L'affectation pour tous atteint tous les utilisateurs actifs de votre Workspace, et la synchronisation quotidienne continuera de la réappliquer sans confirmation supplémentaire. Vérifiez soigneusement le modèle avant d'enregistrer - idéalement après un [test sur votre propre boîte](/docs/create-your-first-template/#test-it-on-your-own-mailbox).

## Quand les signatures changent-elles réellement ?

- Cliquez sur **Synchroniser maintenant** sur la page Affectations pour tout appliquer immédiatement, ou
- attendez la **synchronisation quotidienne en arrière-plan**, qui réapplique toutes les affectations une fois par jour et prend en compte automatiquement les nouveaux membres de groupes, les changements d'OU et les nouvelles recrues.

Si un utilisateur correspond à plusieurs affectations, une seule l'emporte : le groupe bat l'OU, l'OU bat l'affectation pour tous, et le choix [self-service](/docs/self-service/) de l'utilisateur les bat toutes, sauf si l'affectation a **Remplacer le self-service** activé. Les règles précises sont dans la [référence des affectations](/docs/assignments/#how-precedence-works).

Étape suivante : [vérifiez la tâche d'affectation](/docs/verify-assignments/) pour confirmer que tout a bien été appliqué.

> [!NOTE]
> Chaque cible ne peut contenir qu'une seule affectation. Tenter d'en créer une seconde pour le même groupe ou la même OU affiche « Cette cible a déjà une affectation. Modifiez l'entrée existante ou choisissez une autre cible. »
