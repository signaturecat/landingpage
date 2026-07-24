---
title: Journaux
navTitle: Journaux
description: Où SignatureCat enregistre ce qui s'est passé - journaux des tâches de synchronisation et d'application, résultats par utilisateur, conservation et piste d'audit.
updated: 2026-07-19
---

# Journaux

SignatureCat tient un journal opérationnel de chaque tâche de signature, par utilisateur et par adresse, pour que vous puissiez toujours répondre à « est-ce que ça s'est appliqué, et sinon, pourquoi ». Le point d'entrée principal est [Journaux des tâches](https://app.signature.cat/assignments/logs).

## Journaux des tâches

[Journaux des tâches](https://app.signature.cat/assignments/logs) (niveaux Editor et Admin) liste les tâches récemment terminées pour votre espace de travail, les plus récentes en premier :

- **Type** - Synchronisation des attributions (la tâche quotidienne ou **Synchroniser maintenant**) ou Application manuelle (depuis la page [Appliquer](https://app.signature.cat/apply) et les enregistrements self-service).
- **Statut** - Réussi, Partiel, Échoué ou Annulé.
- **Qui** - l'utilisateur qui l'a lancée, ou « Automatique » pour la synchronisation planifiée.
- **Décomptes** - « N réussies, N échouées, N ignorées ».

Déplier une ligne affiche les résultats par utilisateur directement ; **Ouvrir la vue complète de la tâche** ouvre le tableau de résultats complet sur `app.signature.cat/jobs/{id}`.

## Ce que contient une ligne de résultat

Une ligne par adresse écrite : l'utilisateur (ou l'alias, marqué d'un badge « alias »), le résultat et un code d'erreur pour les échecs ou les cas ignorés. Les codes courants et leurs correctifs sont listés dans [Vérifier une tâche d'affectation](/docs/verify-assignments/#what-the-per-user-rows-tell-you). Les lignes peuvent aussi porter la note « a remplacé N autres affectations pour cet utilisateur » pour les audits de [priorité](/docs/assignments/#how-precedence-works).

## Conservation

Les journaux des tâches sont conservés pendant une fenêtre limitée (par défaut **30 jours** après la fin d'une tâche) puis supprimés automatiquement - la page indique la fenêtre en vigueur. Exportez ou passez en revue ce dont vous avez besoin peu après les grands déploiements.

> [!NOTE]
> La fenêtre de conservation s'applique aux journaux d'exécution des tâches. Vos modèles, affectations et paramètres sont bien entendu permanents.

## Tâches en cours

Une tâche en cours d'exécution se suit au mieux sur sa propre page, `app.signature.cat/jobs/{id}`, qui interroge la progression - voir [Tâches d'application](/docs/apply-jobs/#watching-a-job).
