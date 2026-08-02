---
title: Servir les images depuis votre propre domaine
navTitle: Domaine d'images personnalisé
description: Pointez un sous-domaine comme images.yourcompany.com vers SignatureCat avec un seul enregistrement CNAME pour que les images de signature dans Gmail se chargent depuis votre propre domaine.
updated: 2026-08-02
---

# Servir les images depuis votre propre domaine

Par défaut, les logos et les bannières de vos signatures sont servis depuis `images.signature.cat`. Vous pouvez à la place les servir depuis un sous-domaine de votre propre domaine - par exemple `images.yourcompany.com`. Les clients mail chargent plus volontiers les images provenant du domaine de l'expéditeur, la délivrabilité s'améliore donc, et les URL portent votre marque.

La configuration ne casse rien : tant que le domaine n'est pas actif, les images continuent de se charger depuis `images.signature.cat`, et après l'activation la bascule se fait automatiquement pour les signatures nouvellement rendues. Les modèles restent inchangés.

## Prérequis

- Un niveau d'accès **Admin** dans SignatureCat.
- L'accès aux paramètres DNS de votre domaine.
- Un **sous-domaine** (comme `images.yourcompany.com`). Les domaines racines (`yourcompany.com`) ne sont pas pris en charge, par conception.

## Configuration

1. Ouvrez la bibliothèque d'images depuis l'éditeur de n'importe quel modèle sur [Signatures](https://app.signature.cat/signatures) (bouton Logo ou Bannière) et choisissez **Utiliser votre domaine** dans la barre de diffusion.
2. **Saisissez un sous-domaine** - par exemple `images.yourcompany.com` - et cliquez sur **Générer l'enregistrement DNS**.
3. **Ajoutez un enregistrement DNS** chez votre fournisseur DNS, exactement comme indiqué : un **CNAME** pointant votre sous-domaine vers `cdn.signature.cat`. Ce seul enregistrement est tout ce dont SignatureCat a besoin. Certains fournisseurs n'attendent que la partie qui précède votre domaine dans le champ Nom, et l'assistant affiche cette forme courte pour vous.
4. **Attendez la vérification.** SignatureCat vérifie l'enregistrement automatiquement toutes les quelques minutes ; vous pouvez aussi cliquer sur **Vérifier maintenant**. L'activation prend en général quelques minutes, parfois jusqu'à une heure le temps que le DNS se rafraîchisse. Le certificat TLS est émis pour vous.

L'assistant affiche l'un des trois statuts : **En attente des enregistrements DNS**, **Domaine actif** ou **Vérification échouée**.

Une fois actif : "Les nouveaux e-mails chargent les images depuis votre domaine. Les modèles restent inchangés - la bascule est automatique."

> [!NOTE]
> Les e-mails déjà envoyés ne sont pas affectés - ils continuent de charger les images depuis l'URL avec laquelle ils ont été rendus.

### La vérification ne passe pas ?

Si le domaine reste en attente après une vérification, ou si la vérification échoue, l'assistant révèle un enregistrement **TXT** sous le titre **La vérification ne passe pas ?**. C'est une solution de repli pour deux cas rares : un enregistrement CAA sur votre domaine bloque l'autorité de certification utilisée par SignatureCat, ou le nom d'hôte est déjà servi via une autre zone Cloudflare. Ajoutez l'enregistrement TXT à côté du CNAME, puis cliquez de nouveau sur **Vérifier maintenant**. Dans tous les autres cas, le CNAME suffit à lui seul.

## Supprimer le domaine

Supprimer le domaine dans l'assistant rebascule automatiquement la diffusion des images vers `images.signature.cat` pour les nouveaux e-mails. Rien ne casse.

> [!WARNING]
> Si vous supprimez l'enregistrement CNAME chez votre fournisseur DNS **alors que le domaine est encore actif dans SignatureCat**, toutes les images déjà servies depuis ce sous-domaine cessent de se charger - y compris les images des e-mails envoyés plus tôt. Supprimez toujours d'abord le domaine dans SignatureCat, puis nettoyez le DNS.

Les domaines actifs sont revérifiés automatiquement, un CNAME qui disparaît est donc repéré en environ un jour : le domaine sort de l'état actif et les signatures nouvellement rendues rebasculent d'elles-mêmes vers `images.signature.cat`. C'est un filet de sécurité pour les signatures à venir, pas une réparation pour celles qui sont déjà dans les boîtes des destinataires - d'où l'ordre indiqué ci-dessus.
