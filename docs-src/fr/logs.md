---
title: Journaux
navTitle: Journaux
description: Où SignatureCat enregistre chaque tâche de signature Gmail - journaux des tâches, résultats par utilisateur, badge tronquée par Gmail, lectures de boîte en direct et conservation.
updated: 2026-08-02
---

# Journaux

SignatureCat tient un journal opérationnel de chaque tâche de signature, par utilisateur et par adresse, pour que vous puissiez toujours répondre à "est-ce que ça s'est appliqué, et sinon, pourquoi". Le point d'entrée est l'onglet **Journaux** de la navigation principale : [Journaux des tâches](https://app.signature.cat/logs).

## Journaux des tâches

[Journaux des tâches](https://app.signature.cat/logs) (niveaux Editor et Admin) liste les tâches récemment terminées pour votre espace de travail, les plus récentes en premier :

- **Type** - Synchronisation des attributions (la tâche quotidienne ou **Synchroniser maintenant**) ou Application manuelle (depuis la page [Appliquer](https://app.signature.cat/apply) et les enregistrements self-service).
- **Statut** - Réussi, Partiel, Échoué ou Annulé.
- **Qui** - l'utilisateur qui l'a lancée, ou "Automatique" pour la synchronisation planifiée.
- **Décomptes** - "N réussies, N échouées, N ignorées".

Déplier une ligne affiche les résultats par utilisateur directement ; **Ouvrir la vue complète de la tâche** ouvre le tableau de résultats complet sur `app.signature.cat/jobs/{id}`.

## Ce que contient une ligne de résultat

Une ligne par adresse écrite : l'utilisateur (ou l'alias, marqué d'un badge "alias"), le résultat et un code d'erreur pour les échecs ou les cas ignorés. Les codes courants et leurs correctifs sont listés dans [Vérifier une tâche d'affectation](/docs/verify-assignments#ce-que-les-lignes-par-utilisateur-vous-disent). Les lignes peuvent aussi porter la note "a remplacé N autres affectations pour cet utilisateur" pour les audits de [priorité](/docs/assignments#fonctionnement-de-la-priorit).

Une ligne réussie peut en plus porter un badge ambre **tronquée par Gmail** accompagné de la phrase "Signature appliquée, mais Gmail a enregistré une copie tronquée." L'application elle-même a fonctionné - Gmail a accepté l'écriture puis a réécrit le HTML sur ses propres serveurs au moment de l'enregistrer. **Détails techniques** sur la ligne nomme les éléments supprimés ainsi que les décomptes de caractères avant et après. Voir [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

## Lire la signature actuelle de la boîte

Deux actions sur cette page lisent une boîte en direct : **Afficher la signature actuelle** sur une ligne de résultat réussie, et **Vérifier la signature d'un employé** dans l'en-tête de la page. Toutes deux ouvrent le même panneau en lecture seule, intitulé "Signature actuelle de la boîte", avec le sous-titre "Lit la signature directement depuis la boîte Gmail de l'utilisateur."

- **Afficher la signature actuelle** est proposé sur les lignes qui ont réussi et lance immédiatement la consultation pour cette adresse.
- **Vérifier la signature d'un employé** vous laisse choisir n'importe qui dans votre Workspace dans le champ **Employé** puis cliquer sur **Afficher la signature**.
- Les deux sont accessibles aux niveaux Editor et Admin.
- Le panneau affiche la signature, il ne la modifie pas. Comme il lit Gmail plutôt que les enregistrements propres à SignatureCat, il révèle aussi les signatures qu'un utilisateur a modifiées à la main dans ses paramètres Gmail.
- Si rien n'est stocké, vous obtenez "{email} n'a pas de signature définie dans Gmail." à la place d'un aperçu.

> [!NOTE]
> Chaque consultation est enregistrée dans le journal d'activité de votre compte dans [Paramètres](https://app.signature.cat/settings) avec l'adresse qui a été lue et la longueur de la signature - jamais son contenu. La signature elle-même n'est pas stockée par SignatureCat.

## Conservation

Les journaux des tâches sont conservés pendant une fenêtre limitée (par défaut **30 jours** après la fin d'une tâche) puis supprimés automatiquement - la page indique la fenêtre en vigueur. Exportez ou passez en revue ce dont vous avez besoin peu après les grands déploiements.

> [!NOTE]
> La fenêtre de conservation s'applique aux journaux d'exécution des tâches. Vos modèles, affectations et paramètres sont bien entendu permanents.

## Tâches en cours

Une tâche en cours d'exécution se suit au mieux sur sa propre page, `app.signature.cat/jobs/{id}`, qui interroge la progression - voir [Tâches d'application](/docs/apply-jobs#suivre-une-tche).
