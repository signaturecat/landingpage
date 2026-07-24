---
title: Obtenir de l'aide
navTitle: Obtenir de l'aide
description: Comment joindre le support SignatureCat, quoi inclure dans un signalement et où vérifier avant d'écrire - page d'état, journaux et correctifs courants.
updated: 2026-07-17
---

# Obtenir de l'aide

Le support est assuré par e-mail à l'adresse [contact@signature.cat](mailto:contact@signature.cat). Avant d'écrire, une rapide auto-vérification vous apporte souvent une réponse plus vite - la plupart des cas "les signatures ne s'appliquent plus" relèvent de l'une de trois causes connues.

## Auto-vérification rapide

1. **S'agit-il d'un incident de la plateforme ?** Consultez [status.signature.cat](https://status.signature.cat/) - les incidents et les maintenances y sont annoncés. Voir [État du service](/docs/service-status/).
2. **Une tâche a-t-elle échoué ?** Ouvrez les [Journaux des tâches](https://app.signature.cat/assignments/logs) et regardez les codes d'erreur par utilisateur - [Vérifier une tâche d'affectation](/docs/verify-assignments/#what-the-per-user-rows-tell-you) explique chacun d'eux et son correctif.
3. **La Domain-Wide Delegation est-elle en bonne santé ?** Si les synchronisations sont en pause, les administrateurs ont une notification "Accès Domain-Wide Delegation perdu" - relancez l'assistant depuis [Paramètres](https://app.signature.cat/settings). Voir [Domain-Wide Delegation](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked).
4. **Facturation en pause ?** Une bannière rouge et le statut "En retard" sur [Facturation](https://app.signature.cat/billing) signifient qu'un paiement échoué a épuisé son délai de grâce - mettre la carte à jour rétablit tout. Voir [Informations de facturation](/docs/billing-details/).

## Écrire au support

Écrivez à [contact@signature.cat](mailto:contact@signature.cat) depuis une adresse de votre domaine Workspace si possible. Incluez :

- votre **domaine Workspace** (par exemple `yourcompany.com`),
- **ce que vous attendiez et ce qui s'est passé**, avec les horodatages et votre fuseau horaire,
- le **lien de la tâche** (`app.signature.cat/jobs/...`) ou une capture d'écran de la ligne des [Journaux des tâches](https://app.signature.cat/assignments/logs), si une tâche est concernée,
- tout **code d'erreur** affiché dans l'application (les messages d'erreur peuvent être dépliés pour révéler un code, un statut HTTP et un identifiant de requête - incluez les trois).

> [!TIP]
> L'identifiant de requête d'un message d'erreur déplié permet au support de retrouver votre requête exacte dans les journaux du serveur - c'est l'élément le plus utile que vous puissiez joindre.

## Délais de réponse

Le support se fait uniquement par e-mail. Pendant la période d'essai, il n'y a pas de délai de réponse garanti ; les clients payants sont traités en priorité. Les incidents affectant de nombreux clients sont coordonnés publiquement sur la [page d'état](https://status.signature.cat/).

## Demandes de fonctionnalités et retours

Envoyez-les à la même adresse - les retours d'usage réels façonnent la feuille de route. Décrivez votre cas d'usage plutôt que le seul nom de la fonctionnalité ; cela se transmet mieux.
