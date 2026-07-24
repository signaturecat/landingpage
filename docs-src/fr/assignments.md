---
title: Affectations
navTitle: Affectations
description: Référence des affectations SignatureCat - types de cibles, priorité lorsqu'un utilisateur correspond à plusieurs affectations, modes d'alias et gestion des conflits.
updated: 2026-07-17
---

# Affectations

Une affectation lie un modèle à une cible et le maintient appliqué par la synchronisation quotidienne. Cette page est la référence sur le comportement des cibles, de la priorité et des alias ; le guide pratique se trouve dans [Affecter des modèles](/docs/assign-templates/). Les affectations sont gérées sur [app.signature.cat/assignments](https://app.signature.cat/assignments) par les niveaux Editor et Admin.

## Types de cibles

| Cible | Valeur | Option de portée |
|---|---|---|
| Groupe | Adresse e-mail du groupe | **+ sous-groupes** inclut les membres des groupes imbriqués. |
| OU | Chemin commençant par `/`, par exemple `/Engineering` | **+ sous-OU** couvre toute la sous-arborescence. |
| Tous | Tous les utilisateurs actifs du Workspace | Au maximum **une** affectation de ce type par espace de travail. |

Chaque cible ne peut contenir qu'une seule affectation - la création d'un doublon est rejetée avec « Cette cible a déjà une affectation. » Le type d'une cible est figé après la création ; pour transformer une affectation de groupe en affectation d'OU, supprimez-la et recréez-la.

Les utilisateurs individuels ne sont volontairement pas une cible d'affectation - couvrez les cas individuels avec le [self-service](/docs/self-service/) ou une [tâche d'application](/docs/apply-jobs/) ponctuelle.

## Fonctionnement de la priorité

Les utilisateurs correspondent souvent à plusieurs affectations. Chaque synchronisation calcule exactement **un gagnant par utilisateur**, couche par couche, de bas en haut :

1. **Tous** - la couche de base pour chaque utilisateur actif.
2. **Les affectations OU** remplacent l'affectation pour tous pour les utilisateurs de l'OU.
3. **Les affectations de groupe** remplacent le modèle de l'OU pour leurs membres. Si un utilisateur appartient à plusieurs groupes affectés, l'affectation **la plus récemment mise à jour** l'emporte.
4. **Self-service** - le choix propre de l'utilisateur l'emporte sur toute affectation, **sauf** si l'affectation gagnante a **Remplacer le self-service** activé.

Lorsqu'une affectation en supplante d'autres pour un utilisateur, la ligne de résultat de la tâche l'enregistre (« a remplacé N autres affectations pour cet utilisateur »), ce qui vous permet d'auditer les conflits sur les pages de [journaux](/docs/logs/).

> [!TIP]
> Schéma recommandé : une affectation pour tous comme modèle par défaut de l'entreprise, des affectations OU par pays ou par marque, des affectations de groupe pour les exceptions (campagne commerciale, équipe de direction). L'empilement des couches fait le reste.

## Modes d'alias

Chaque affectation dispose d'un paramètre **Alias** qui contrôle quelles adresses reçoivent la signature. L'écriture sur les alias nécessite le scope optionnel `gmail.settings.sharing` - voir [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-exactly-do-i-authorize).

| Mode | Comportement |
|---|---|
| **Désactivé** (par défaut) | Seule l'adresse principale de chaque utilisateur est signée. Les alias send-as ne sont pas touchés. |
| **Adresses du groupe** | Affectations de groupe uniquement. La signature va exactement aux adresses listées dans le groupe : un membre ajouté par un alias la reçoit uniquement sur cet alias, un membre ajouté par son adresse principale uniquement sur celle-ci. Les alias hors du groupe ne sont jamais modifiés. |
| **Tous les alias** | Chaque utilisateur reçoit la signature sur son adresse principale et sur chaque alias send-as qu'il possède. Les alias possédés qui ne sont pas encore configurés en send-as sont créés au préalable. |

Remarques sur le comportement :

- Avec **Tous les alias**, les adresses externes et les alias non modifiables ne sont jamais créés automatiquement ; une entrée send-as nouvellement créée que Gmail signale comme en attente de vérification est ignorée jusqu'à sa vérification.
- `{{email}}` et `{{domain}}` sont résolus vers l'**alias** en cours d'écriture, les signatures d'alias affichent donc la bonne adresse. Toutes les autres variables proviennent de la fiche du propriétaire de la boîte.
- Chaque écriture d'alias reçoit sa propre ligne dans les résultats de la tâche, la [vérification](/docs/verify-assignments/) montre donc exactement quelles adresses ont été signées ou ignorées.
- Les signatures self-service sont toujours appliquées aussi aux alias acceptés de l'utilisateur.

## Remplacer le self-service

Par affectation, l'interrupteur **Remplacer le self-service** fait gagner l'affectation sur les choix self-service des utilisateurs. La ligne affiche un badge « remplace le self-service ». Utilisez-le pour les signatures critiques en matière de conformité (mentions légales) où la personnalisation individuelle n'est pas acceptable.

## Quand les cibles disparaissent

Si un groupe ou une OU affecté est supprimé dans Google Workspace, la synchronisation suivante marque l'affectation avec un badge « introuvable dans le Workspace », ignore la cible, notifie les administrateurs (dans l'application + e-mail, une fois par série d'échecs) et réessaie lors des synchronisations suivantes. Corrigez la cible dans le panneau d'édition ou supprimez l'affectation. Voir [Vérifier une tâche d'affectation](/docs/verify-assignments/#what-the-per-user-rows-tell-you).

## Modifier et retirer

Les lignes sont modifiées sur place (modèle, valeur de la cible, portée, mode d'alias, remplacement). Retirer une affectation arrête la gestion de ces utilisateurs - les signatures déjà appliquées restent dans Gmail jusqu'à ce qu'autre chose (une autre affectation, le self-service ou le modèle par défaut) les écrase lors d'une synchronisation ultérieure.
