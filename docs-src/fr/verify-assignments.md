---
title: Vérifier une tâche d'affectation
navTitle: Vérifier les tâches d'affectation
description: Vérifiez qu'une tâche de synchronisation ou d'application SignatureCat a réussi - statuts des tâches, résultats par utilisateur et signification des codes d'erreur courants.
updated: 2026-07-19
---

# Vérifier une tâche d'affectation

Chaque synchronisation et chaque application manuelle s'exécute comme une tâche avec un résultat par utilisateur que vous pouvez inspecter. La vérification la plus rapide est la page [Journaux des tâches](https://app.signature.cat/assignments/logs) ; une tâche en cours a aussi sa propre vue de détail sur `app.signature.cat/jobs/{id}` qui se met à jour en temps réel.

## Consulter les journaux des tâches

Ouvrez les [Journaux des tâches](https://app.signature.cat/assignments/logs) (niveaux Editor et Admin). Chaque ligne est une tâche terminée - une **Synchronisation des attributions** ou une **Application manuelle** - avec son statut, ses heures de début et de fin, qui l'a déclenchée (« Automatique » pour la synchronisation quotidienne) et un résumé comme « 42 réussies, 1 échouée, 2 ignorées ».

Dépliez une ligne pour voir le détail par utilisateur, ou cliquez sur **Ouvrir la vue complète de la tâche** pour le tableau de résultats complet.

> [!NOTE]
> Les journaux des tâches sont conservés pendant une durée limitée (par défaut les 30 derniers jours) et les entrées plus anciennes sont supprimées automatiquement. Vérifiez les tâches peu après les grands déploiements.

## Statuts des tâches

| Statut | Signification |
|---|---|
| En file d'attente | En attente que le worker la prenne en charge. |
| En cours | En cours d'exécution - la page de détail se met à jour en direct. |
| Réussi | Chaque utilisateur ciblé a reçu la signature. |
| Partiel | Certains utilisateurs ont réussi, d'autres ont échoué ou ont été ignorés - inspectez les lignes. |
| Échoué | La tâche ne s'est pas terminée. Une tâche bloquée en « En cours » plus de 30 minutes est marquée Échoué automatiquement. |
| Annulé | Annulée avant son exécution (par exemple le modèle a été supprimé avec des tâches en attente). |

## Ce que les lignes par utilisateur vous disent

Chaque ligne montre l'adresse écrite (les lignes d'alias portent un badge « alias »), le statut et un code d'erreur quand quelque chose a mal tourné. Les plus courants :

- **TARGET_NOT_FOUND** - le groupe ou l'OU affecté n'existe plus dans le Workspace (supprimé ou identifiant erroné). La cible a été ignorée, les administrateurs reçoivent une notification, et la ligne d'affectation affiche un badge « introuvable dans le Workspace ». Corrigez ou supprimez l'affectation sur [Affectations](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - l'utilisateur n'existe plus dans l'annuaire.
- **ALIAS_SCOPE_MISSING** - les signatures d'alias nécessitent le scope optionnel `gmail.settings.sharing`, qui n'a pas été accordé. Voir [Connecter votre Google Workspace](/docs/connect-google-workspace/#step-3-authorize-domain-wide-delegation).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - la Domain-Wide Delegation est cassée ou un scope manque. Relancez l'assistant depuis [Paramètres](https://app.signature.cat/settings). Voir [Domain-Wide Delegation](/docs/domain-wide-delegation/).
- **RATE_LIMITED** - Google a limité les requêtes ; le worker réessaie automatiquement avant de faire remonter ce code.

Une ligne peut aussi porter la note « a remplacé N autres affectations pour cet utilisateur » - l'utilisateur correspondait à plusieurs affectations et celle-ci l'a emporté. Les règles de priorité sont dans la [référence des affectations](/docs/assignments/#how-precedence-works).

## Vérifier dans Gmail

Pour un contrôle ponctuel, demandez à un utilisateur couvert d'ouvrir les paramètres Gmail et de regarder la signature, ou envoyez-vous un message de test. N'oubliez pas que la signature [self-service](/docs/self-service/) propre à un utilisateur l'emporte sur les affectations, sauf si l'affectation la remplace.

> [!TIP]
> Les lignes en échec d'une tâche terminée peuvent être relancées depuis la vue de détail de la tâche avec **Relancer les échecs** - inutile de tout réappliquer à tout le monde.
