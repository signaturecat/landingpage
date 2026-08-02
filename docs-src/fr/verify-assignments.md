---
title: Vérifier une tâche d'affectation
navTitle: Vérifier les tâches d'affectation
description: Vérifiez qu'une tâche de signature SignatureCat a réussi dans Google Workspace - statuts des tâches, résultats par utilisateur, codes d'erreur et lecture en direct d'une boîte Gmail.
updated: 2026-08-02
---

# Vérifier une tâche d'affectation

Chaque synchronisation et chaque application manuelle s'exécute comme une tâche avec un résultat par utilisateur que vous pouvez inspecter. La vérification la plus rapide est la page [Journaux des tâches](https://app.signature.cat/logs) ; une tâche en cours a aussi sa propre vue de détail sur `app.signature.cat/jobs/{id}` qui se met à jour en temps réel.

## Consulter les journaux des tâches

Ouvrez les [Journaux des tâches](https://app.signature.cat/logs) (niveaux Editor et Admin). Chaque ligne est une tâche terminée - une **Synchronisation des attributions** ou une **Application manuelle** - avec son statut, ses heures de début et de fin, qui l'a déclenchée ("Automatique" pour la synchronisation quotidienne) et un résumé comme "42 réussies, 1 échouée, 2 ignorées".

Dépliez une ligne pour voir le détail par utilisateur, ou cliquez sur **Ouvrir la vue complète de la tâche** pour le tableau de résultats complet.

La vue complète de la tâche porte aussi un panneau **Détails de l'exécution** une fois la tâche terminée : **Adresses principales mises à jour**, **Alias send-as mis à jour**, **Groupes traités** (avec le nombre de sous-groupes, quand l'affectation les incluait), **Unités organisationnelles (OU) traitées**, et pour une cible couvrant tout le Workspace le nombre d'utilisateurs auquel elle s'est résolue. Servez-vous-en pour confirmer qu'une tâche a bien couvert la population attendue.

> [!NOTE]
> Les journaux des tâches sont conservés pendant une durée limitée (par défaut les 30 derniers jours) et les entrées plus anciennes sont supprimées automatiquement. Vérifiez les tâches peu après les grands déploiements.

## Statuts des tâches

| Statut | Signification |
|---|---|
| En file d'attente | En attente que le worker la prenne en charge. |
| En cours | En cours d'exécution - la page de détail se met à jour en direct. |
| Réussi | Chaque utilisateur ciblé a reçu la signature. |
| Partiel | Certains utilisateurs ont réussi, d'autres ont échoué ou ont été ignorés - inspectez les lignes. |
| Échoué | La tâche ne s'est pas terminée. Une tâche bloquée en "En cours" plus de 30 minutes est marquée Échoué automatiquement. |
| Annulé | Annulée avant son exécution (par exemple le modèle a été supprimé avec des tâches en attente). |

## Ce que les lignes par utilisateur vous disent

Chaque ligne montre l'adresse écrite (les lignes d'alias portent un badge "alias"), le statut et un code d'erreur quand quelque chose a mal tourné. Les plus courants :

- **TARGET_NOT_FOUND** - le groupe ou l'OU affecté n'existe plus dans le Workspace (supprimé ou identifiant erroné). La cible a été ignorée, les administrateurs reçoivent une notification, et la ligne d'affectation affiche un badge "introuvable dans le Workspace". Corrigez ou supprimez l'affectation sur [Affectations](https://app.signature.cat/assignments).
- **USER_NOT_FOUND** - l'utilisateur n'existe plus dans l'annuaire.
- **ALIAS_SCOPE_MISSING** - les signatures d'alias nécessitent le scope optionnel `gmail.settings.sharing`, qui n'a pas été accordé. Voir [Connecter votre Google Workspace](/docs/connect-google-workspace#tape-4-autoriser-la-domain-wide-delegation).
- **DWD_NOT_CONFIGURED / DWD_SCOPE_MISSING** - la Domain-Wide Delegation est cassée ou un scope manque. Relancez l'assistant depuis [Paramètres](https://app.signature.cat/settings). Voir [Domain-Wide Delegation](/docs/domain-wide-delegation).
- **RATE_LIMITED** - Google a limité les requêtes ; le worker réessaie automatiquement avant de faire remonter ce code.

Un code est un avertissement plutôt qu'un échec : **GMAIL_SIGNATURE_SANITIZED** figure sur des lignes qui ont **réussi**, sous la forme du badge ambre **tronquée par Gmail** avec la phrase "Signature appliquée, mais Gmail a enregistré une copie tronquée." Gmail a accepté l'écriture puis a réécrit le HTML au moment de l'enregistrer : une nouvelle tentative stocke donc exactement la même chose. Le correctif consiste à simplifier le balisage signalé - **Détails techniques** sur la ligne nomme les éléments supprimés - et à tester le modèle à nouveau. Voir [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

Une ligne peut aussi porter la note "a remplacé N autres affectations pour cet utilisateur" - l'utilisateur correspondait à plusieurs affectations et celle-ci l'a emporté. Les règles de priorité sont dans la [référence des affectations](/docs/assignments#fonctionnement-de-la-priorit).

## Vérifier dans Gmail

La vérification la plus rapide est **Afficher la signature actuelle** sur une ligne réussie dans les [Journaux des tâches](https://app.signature.cat/logs) : elle lit en direct la boîte Gmail de cet utilisateur et vous montre ce qui y est réellement stocké, y compris ce que l'utilisateur a modifié à la main. Voir [Lire la signature actuelle de la boîte](/docs/logs#lire-la-signature-actuelle-de-la-bote).

Pour un contrôle dans le client de messagerie lui-même, demandez à un utilisateur couvert d'ouvrir les paramètres Gmail et de regarder la signature, ou envoyez-vous un message de test. N'oubliez pas que la signature [self-service](/docs/self-service) propre à un utilisateur l'emporte sur les affectations, sauf si l'affectation la remplace.

> [!TIP]
> Une tâche terminée n'a pas de bouton de relance. Une fois corrigé ce que le code d'erreur indique, lancez une nouvelle application depuis la page [Appliquer](https://app.signature.cat/apply) pour ces seules adresses - inutile de tout réappliquer à tout le monde.
