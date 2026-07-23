---
title: Tâches d'application
navTitle: Tâches d'application
description: Comment SignatureCat applique les signatures - la synchronisation quotidienne des affectations, les applications manuelles ponctuelles depuis la page Appliquer et le suivi des tâches.
updated: 2026-07-17
---

# Tâches d'application

Chaque écriture de signature a lieu au sein d'une **tâche** : soit la **synchronisation des affectations** récurrente, soit une **application manuelle** que vous lancez vous-même. Les tâches s'exécutent en arrière-plan, rapportent des résultats par utilisateur et peuvent être suivies en direct.

## La synchronisation des affectations

Une fois par jour, SignatureCat résout à nouveau toutes les [affectations](/docs/assignments/) et réapplique les signatures dans tout l'espace de travail. C'est ce qui maintient les signatures à jour lorsque des personnes rejoignent des groupes, changent d'OU ou sont recrutées. Vous pouvez déclencher la même synchronisation à tout moment avec **Synchroniser maintenant** sur la page [Affectations](https://app.signature.cat/assignments).

## Applications manuelles : la page Appliquer

La page [Appliquer](https://app.signature.cat/apply) (niveaux Editor et Admin) lance une tâche **ponctuelle** : choisissez un modèle, sélectionnez les destinataires, appliquez une fois. Elle est indépendante des affectations - utile pour les déploiements ponctuels, la correction de boîtes individuelles ou la couverture de personnes hors de toute affectation.

Les destinataires peuvent être combinés librement (jusqu'à 50 entrées) :

- **Tout le monde** - un clic couvre tous les utilisateurs actifs du Workspace au moment de l'application.
- **Utilisateurs** - des utilisateurs individuels, trouvés par recherche d'e-mail. C'est le seul endroit permettant de cibler un utilisateur individuel.
- **Groupes** - les membres sont résolus au moment de l'application. Remarque : les groupes imbriqués ne sont **pas** étendus ici (contrairement aux affectations avec **+ sous-groupes**).
- **OU** - par chemin, avec une case à cocher **inclure les sous-OU**.
- **Alias** - des adresses send-as précises (jusqu'à 50). Chacune est associée au propriétaire de sa boîte et n'est signée que s'il s'agit d'un alias send-as accepté ; `{{email}}` / `{{domain}}` sont rendus à partir de l'alias.

L'envoi redirige vers la vue en direct de la tâche.

> [!NOTE]
> Une application ponctuelle écrit la signature **une seule fois**. Si l'utilisateur est couvert par une affectation ou un choix self-service, la prochaine synchronisation quotidienne écrasera le résultat ponctuel selon les [règles de priorité](/docs/assignments/#how-precedence-works).

## Suivre une tâche

La vue de la tâche sur `app.signature.cat/jobs/{id}` se met à jour en direct pendant l'exécution : statut, progression et tableau de résultats par utilisateur avec les codes d'erreur. Les tâches terminées figurent aussi dans les [Journaux des tâches](https://app.signature.cat/assignments/logs). **Relancer les échecs** ne réessaie que les lignes en échec.

Les statuts et les codes d'erreur sont documentés dans [Vérifier une tâche d'affectation](/docs/verify-assignments/#job-statuses).

## En combien de temps les changements sont-ils visibles ?

Les applications manuelles et les enregistrements self-service sont quasi instantanés (de quelques secondes à quelques minutes pour les grandes cibles). Les modifications d'affectations s'appliquent à la prochaine synchronisation quotidienne, sauf si vous cliquez sur **Synchroniser maintenant**. Gmail affiche la nouvelle signature à la prochaine rédaction de message - les e-mails déjà envoyés ne changent jamais.
