---
title: Modifier les informations de facturation et de paiement
navTitle: Informations de facturation
description: Mettez à jour votre carte, le nom de votre société, l'adresse de facturation et le numéro de TVA pour les factures SignatureCat via le portail de facturation Stripe.
updated: 2026-07-17
---

# Modifier les informations de facturation et de paiement

Les cartes de paiement et les données de facturation de la société se gèrent dans le **portail de facturation Stripe**, ouvert depuis SignatureCat. Seuls les Admins ont accès à la facturation.

## Mettre à jour la carte de paiement

1. Ouvrez [Facturation](https://app.signature.cat/billing) et cliquez sur **Gérer la facturation** (ou ouvrez [Paramètres](https://app.signature.cat/settings), section Facturation, **Gérer dans Stripe Portal**).
2. Dans le portail Stripe, ajoutez la nouvelle carte et définissez-la comme carte par défaut.

Le prochain prélèvement utilise la nouvelle carte. Si vous êtes dans un délai de grâce suite à un paiement échoué, un prélèvement réussi rétablit tout immédiatement.

## Mettre à jour le nom de la société, l'adresse ou le numéro de TVA

Dans le même portail Stripe, vous pouvez modifier le **nom légal de la société**, l'**adresse de facturation** et le **numéro fiscal** (TVA / NIP - les sociétés polonaises utilisent le numéro de TVA préfixé `PL`). Ils figurent sur chaque facture émise après la modification ; les factures déjà émises restent inchangées.

> [!NOTE]
> L'**e-mail de facturation** n'est volontairement pas modifiable dans le portail Stripe - changez-le dans [Paramètres](https://app.signature.cat/settings), section Facturation, afin que l'application et Stripe restent toujours synchronisés. Voir [Factures](/docs/invoices/#set-the-invoice-email).

## Vérifier l'état de votre abonnement

La section Facturation sur [Paramètres](https://app.signature.cat/settings) affiche l'état de l'abonnement (Active, Période d'essai, En retard, Annulée), le nombre actuel d'utilisateurs actifs et la date de renouvellement ("Actif jusqu'au ...").

## Annuler l'abonnement

Dans [Paramètres](https://app.signature.cat/settings), section Facturation, cliquez sur **Annuler l'abonnement**. L'accès continue jusqu'à la fin de la période de facturation en cours, puis la gestion des signatures s'arrête. Vos signatures Gmail ne sont pas supprimées - elles cessent simplement d'être gérées et mises à jour.

> [!WARNING]
> L'annulation ne supprime ni vos données ni l'entrée Domain-Wide Delegation. Si vous partez définitivement, supprimez aussi le compte dans la Zone dangereuse sur [Paramètres](https://app.signature.cat/settings) et retirez l'entrée DWD dans la Google Admin console - voir [Domain-Wide Delegation](/docs/domain-wide-delegation/#removing-signaturecat).
