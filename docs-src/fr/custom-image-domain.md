---
title: Servir les images depuis votre propre domaine
navTitle: Domaine d'images personnalisé
description: Pointez un sous-domaine comme images.yourcompany.com vers SignatureCat avec deux enregistrements DNS pour que les images de signature se chargent depuis votre propre domaine.
updated: 2026-07-17
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
3. **Ajoutez deux enregistrements DNS** chez votre fournisseur DNS, exactement comme indiqué :
   - un enregistrement **CNAME** pointant le sous-domaine vers `cdn.signature.cat` (pointe le sous-domaine vers nous),
   - un enregistrement **TXT** prouvant la propriété du domaine.
4. **Attendez la vérification.** SignatureCat vérifie les enregistrements automatiquement toutes les quelques minutes ; vous pouvez aussi cliquer sur **Vérifier maintenant**. L'activation prend en général quelques minutes, parfois jusqu'à une heure le temps que le DNS se rafraîchisse. Le certificat TLS est émis pour vous.

L'assistant affiche l'un des trois statuts : **En attente des enregistrements DNS**, **Domaine actif** ou **Vérification échouée**.

Une fois actif : « Les nouveaux e-mails chargent les images depuis votre domaine. Les modèles restent inchangés - la bascule est automatique. »

> [!NOTE]
> Les e-mails déjà envoyés ne sont pas affectés - ils continuent de charger les images depuis l'URL avec laquelle ils ont été rendus.

## Supprimer le domaine

Supprimer le domaine dans l'assistant rebascule automatiquement la diffusion des images vers `images.signature.cat` pour les nouveaux e-mails. Rien ne casse.

> [!WARNING]
> L'inverse n'est pas surveillé : si vous supprimez l'enregistrement CNAME chez votre fournisseur DNS **alors que le domaine est encore actif dans SignatureCat**, les images des signatures nouvellement envoyées cesseront silencieusement de se charger. Supprimez toujours d'abord le domaine dans SignatureCat, puis nettoyez le DNS.
