---
title: Factures
navTitle: Factures
description: Comment fonctionne la facturation SignatureCat - paliers de tarification, essai de 7 jours, où les factures sont envoyées et comment définir un e-mail de facturation dédié.
updated: 2026-07-17
---

# Factures

SignatureCat facture mensuellement par utilisateur Workspace actif, via Stripe. Les factures et les reçus sont envoyés par e-mail à votre adresse d'**e-mail de facturation**, que vous pouvez faire pointer vers votre boîte comptabilité indépendamment de tout compte administrateur. Les factures d'un mois donné sont émises au plus tard le **10 du mois suivant**.

## Tarification

La tarification est progressive par utilisateur - chaque tranche a son propre tarif et les grands espaces de travail bénéficient d'un tarif dégressif :

| Nombre d'utilisateurs du Workspace | Prix par utilisateur / mois |
|---|---|
| 1 - 50 | 0,80 $ |
| 51 - 120 | 0,70 $ |
| 121 - 300 | 0,60 $ |
| 301+ | 0,55 $ |

Par exemple, 60 utilisateurs coûtent 50 x 0,80 $ + 10 x 0,70 $ = 47,00 $ par mois. Les prix sont en USD et hors taxes.

**Ce qui compte comme utilisateur facturable :** le nombre d'utilisateurs actifs (non suspendus) dans votre annuaire Google Workspace - pas le nombre de connexions à SignatureCat. Les augmentations d'effectif sont répercutées immédiatement avec prorata ; quand votre effectif baisse, le nombre inférieur prend effet à partir de la période de facturation suivante.

## L'essai de 7 jours

Chaque espace de travail démarre avec un essai gratuit de 7 jours. Une carte est collectée à l'inscription et débitée pour la première fois à la fin de l'essai. Dans les 3 derniers jours de l'essai, l'application affiche une bannière de rappel, et vous recevez aussi un e-mail « Votre essai signature.cat se termine bientôt » environ 3 jours avant la fin.

> [!NOTE]
> L'essai est accordé **une fois par domaine Workspace**. Supprimer le compte et enregistrer à nouveau le même domaine ne démarre pas un nouvel essai.

## Définir l'e-mail de facturation

1. Ouvrez [Paramètres](https://app.signature.cat/settings) (Admin uniquement) et trouvez la section **Facturation**.
2. Saisissez l'adresse dans **E-mail de facturation** - « Stripe envoie les factures et les reçus à cette adresse. Elle peut être différente de l'e-mail du compte administrateur. » - et cliquez sur **Enregistrer**.

Utilisez cette option pour acheminer les documents directement vers la comptabilité (par exemple `invoices@yourcompany.com`). Les alertes produit liées à la facturation (fin d'essai, paiement échoué) sont distinctes et vont aux utilisateurs administrateurs - voir [Notifications](/docs/notifications/).

## Coordonnées de la société sur la facture

Le nom légal de votre société, l'adresse de facturation et le numéro fiscal (TVA / NIP) sont stockés uniquement dans Stripe et imprimés sur chaque facture émise après leur saisie. Vous les fournissez au moment du paiement et pouvez les modifier à tout moment - voir [Informations de facturation](/docs/billing-details/). Les changements s'appliquent aux factures futures ; les factures déjà émises sont immuables.

## Que se passe-t-il si un paiement échoue ?

Un prélèvement échoué ne coupe **pas** l'accès immédiatement. Vous recevez un e-mail « Action requise - échec du paiement signature.cat » et une bannière rouge dans l'application, et vous disposez d'un court délai de grâce (jusqu'à 3 jours) pour mettre la carte à jour via **Gérer la facturation** sur [Facturation](https://app.signature.cat/billing). Si le délai s'écoule sans prélèvement réussi, la gestion des signatures est mise en pause jusqu'à ce qu'un paiement aboutisse - vos signatures Gmail restent telles quelles, mais les modifications et les synchronisations s'arrêtent.
