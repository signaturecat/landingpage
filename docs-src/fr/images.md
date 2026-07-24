---
title: Images
navTitle: Images
description: Référence des images SignatureCat - la bibliothèque par espace de travail, l'hébergement sur images.signature.cat ou votre propre domaine, formats, limites et cycle de vie.
updated: 2026-07-17
---

# Images

Les images de signature - logos d'entreprise, bannières de campagne et photos de profil - proviennent de trois sources dans SignatureCat : la **bibliothèque d'images** intégrée, les **URL externes** que vous hébergez vous-même et les **photos de profil** Google Directory. Cette page est la référence ; le guide pratique est [Bannières et logos](/docs/banners-and-logos/).

## La bibliothèque d'images

Chaque espace de travail dispose d'une bibliothèque avec deux types d'entrées :

| Type | Taille rendue | Jeton | Limite de la bibliothèque |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 entrées |
| Bannière | 450x100 px, largeur max. 100% | `{{banner}}` | 200 entrées |

Les entrées de la bibliothèque portent un nom facultatif et un **lien de clic** facultatif. Chaque modèle sélectionne son propre logo et sa propre bannière dans la bibliothèque ; les modèles sans sélection rendent un espace réservé neutre. Les téléversements sont en PNG ou JPG, jusqu'à 5 Mo (200 Ko recommandés) ; le SVG n'est pas accepté.

## D'où les images sont-elles servies

- **Les téléversements dans la bibliothèque** sont stockés par SignatureCat et servis depuis `https://images.signature.cat/...` via un CDN avec une mise en cache de longue durée.
- Avec un [domaine d'images personnalisé](/docs/custom-image-domain/) vérifié, les signatures nouvellement rendues servent les images de la bibliothèque depuis votre sous-domaine (par exemple `images.yourcompany.com`) - meilleure délivrabilité, même stockage.
- **Les images par URL externe** ("J'ai un lien") sont chargées directement depuis l'endroit où vous les hébergez. Elles doivent être publiques et en HTTPS ; hébergez-les idéalement sur votre propre domaine.

> [!IMPORTANT]
> Les URL d'images sont figées dans chaque signature rendue. Les e-mails déjà présents dans les boîtes des destinataires continuent de charger l'URL avec laquelle ils ont été envoyés - c'est pourquoi SignatureCat ne supprime jamais les fichiers sous-jacents des images retirées de la bibliothèque, et pourquoi une image externe que vous mettez hors ligne apparaîtra cassée dans les anciens e-mails.

## Photos de profil

La variable `{{photo}}` utilise la photo de profil Google de l'utilisateur issue du Directory (mise à l'échelle automatique en 400 px). Elle ne fait pas partie de la bibliothèque - les utilisateurs et les administrateurs gèrent les photos de profil dans Google Workspace. Voir [Variables de modèle](/docs/template-variables/#person-variables-google-directory).

## Notes sur le cycle de vie

- **Remplacer une image :** ajoutez le nouveau fichier à la bibliothèque et sélectionnez-le sur le modèle - ou conservez la même entrée de bibliothèque et mettez seulement à jour son lien de clic (pris en compte au prochain rendu).
- **Supprimer une entrée de la bibliothèque** la détache des modèles qui l'utilisent (ils reviennent à l'espace réservé) après un avertissement indiquant le nombre d'utilisations.
- **Les e-mails déjà envoyés** ne sont jamais affectés par les changements de la bibliothèque.

## Conseils de délivrabilité

- Gardez des fichiers légers (bannières sous 200 Ko) - les images volumineuses ralentissent le rendu et dégradent les scores anti-spam.
- Servez les images depuis votre propre domaine avec un [domaine d'images personnalisé](/docs/custom-image-domain/) - les clients mail font davantage confiance au domaine de l'expéditeur.
- Gmail sert les images aux destinataires via un proxy, les configurations d'hébergement exotiques (listes d'autorisation d'IP, contrôles de referer) casseront donc le rendu. Gardez des images simplement publiques.
