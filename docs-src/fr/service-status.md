---
title: État du service et SLA
navTitle: État du service
description: Page d'état en direct de SignatureCat, l'objectif de disponibilité mensuelle de 99%, ce qui compte comme indisponibilité et où les fenêtres de maintenance sont annoncées.
updated: 2026-07-17
---

# État du service et SLA

La disponibilité en direct, les incidents et les fenêtres de maintenance sont publiés sur **[status.signature.cat](https://status.signature.cat/)**. La page d'état est le point de référence pour la disponibilité : ce qu'elle rapporte fait foi, y compris pour le SLA ci-dessous. Son badge est aussi affiché dans l'en-tête de cette documentation.

## Objectif de disponibilité

SignatureCat vise **au moins 99% de disponibilité par mois calendaire**, mesurée et publiée sur la [page d'état](https://status.signature.cat/). L'objectif ne s'applique pas pendant la période d'essai gratuit.

Ne sont pas comptées comme indisponibilité :

- la **maintenance planifiée**, annoncée à l'avance sur [status.signature.cat/maintenance](https://status.signature.cat/maintenance),
- les défaillances des prestataires tiers dont dépend la plateforme (hébergement, CDN, traitement des paiements, API Google),
- la force majeure,
- les causes côté client - en particulier une autorisation [Domain-Wide Delegation](/docs/domain-wide-delegation/) révoquée ou des changements de configuration du Workspace.

La distribution des signatures dépend de la disponibilité et des règles des API de Google ; les changements que Google apporte à ces API ou à votre Workspace échappent au contrôle de SignatureCat.

La formulation complète et contraignante se trouve dans les [Conditions d'utilisation](https://signature.cat/legal/) - les conditions ne prévoient pas de crédits de service par défaut ; des garanties SLA individuelles peuvent être convenues dans un contrat séparé.

## Pendant un incident

- L'impact actuel et les mises à jour sont publiés sur la [page d'état](https://status.signature.cat/) au fur et à mesure de l'incident.
- Les **synchronisations de signatures sont mises en file d'attente, pas perdues** - après le rétablissement, la synchronisation quotidienne ramène chaque boîte à son état cible.
- Vous pouvez signaler des pannes ou des anomalies à [contact@signature.cat](mailto:contact@signature.cat) - voir [Obtenir de l'aide](/docs/get-help/).

## Fenêtres de maintenance

Les interruptions techniques planifiées sont annoncées à l'avance sur [status.signature.cat/maintenance](https://status.signature.cat/maintenance). Elles sont programmées pour minimiser l'impact et ne comptent pas comme indisponibilité.

> [!TIP]
> La page d'état propose des options d'abonnement - abonnez votre canal ops ou IT pour que les mises à jour d'incidents vous parviennent sans vérification manuelle.
