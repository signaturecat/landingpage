---
title: Images
navTitle: Images
description: Référence des images dans les signatures e-mail SignatureCat pour Google Workspace - la bibliothèque, les descriptions ALT, l'hébergement, les formats, les limites et la suppression.
updated: 2026-08-19
---

# Images

Les images de signature - logos d'entreprise, bannières de campagne et photos de profil - proviennent de trois sources dans SignatureCat : la **bibliothèque d'images** intégrée, les **URL externes** que vous hébergez vous-même et les **photos de profil** Google Directory. Cette page est la référence ; le guide pratique est [Bannières et logos](/docs/banners-and-logos).

## La bibliothèque d'images

Chaque espace de travail dispose d'une bibliothèque avec deux types d'entrées :

| Type | Taille rendue | Jeton | Limite de la bibliothèque |
|---|---|---|---|
| Logo | 115x115 px | `{{logo}}` | 200 entrées |
| Bannière | 450x100 px, largeur max. 100% | `{{banner}}` | 200 entrées |

Les entrées de la bibliothèque portent un nom facultatif, un **lien de clic** facultatif et une **Description de l'image (ALT)** facultative. Chaque modèle sélectionne son propre logo et sa propre bannière dans la bibliothèque ; les modèles sans sélection rendent un espace réservé neutre. Les téléversements sont en PNG, JPG ou GIF - jusqu'à 5 Mo pour PNG/JPG et 20 Mo pour GIF (200 Ko recommandés pour les images statiques) ; le SVG n'est pas accepté.

## Description de l'image (ALT)

La **Description de l'image (ALT)** est ce qu'un destinataire voit à la place de l'image quand son client mail bloque les images, et ce qu'un lecteur d'écran annonce. Elle est facultative et limitée à 300 caractères.

- **Où la définir :** dans le formulaire d'ajout quand vous téléversez un fichier ou collez un lien, à l'étape image de l'assistant de nouveau modèle, et plus tard dans le panneau **Détails de l'image choisie** de la bibliothèque.
- **À quoi elle s'applique :** à chaque entrée de la bibliothèque, que SignatureCat héberge le fichier ou que vous pointiez vers le vôtre.
- **Où elle voyage :** avec l'entrée de la bibliothèque, exactement comme le lien de clic - changez-la une fois et chaque modèle utilisant cette image livre la nouvelle description au prochain rendu.
- **Si vous la laissez vide :** l'image est rendue comme décorative et ne reçoit aucune description.

## D'où les images sont-elles servies

- **Les téléversements dans la bibliothèque** sont stockés par SignatureCat et servis depuis `https://images.signature.cat/...` via un CDN avec une mise en cache de longue durée.
- Avec un [domaine d'images personnalisé](/docs/custom-image-domain) vérifié, les signatures nouvellement rendues servent les images de la bibliothèque depuis votre sous-domaine (par exemple `images.yourcompany.com`) - meilleure délivrabilité, même stockage.
- **Les images par URL externe** ("J'ai un lien") sont chargées directement depuis l'endroit où vous les hébergez. Elles doivent être publiques et en HTTPS ; hébergez-les idéalement sur votre propre domaine.

> [!IMPORTANT]
> Les URL d'images sont figées dans chaque signature rendue, les e-mails déjà présents dans les boîtes des destinataires continuent donc de charger l'URL avec laquelle ils ont été envoyés : supprimer une entrée de bibliothèque hébergée par SignatureCat libère le fichier stocké, et l'image finit par ne plus se charger dans les messages déjà distribués.

## Photos de profil

La variable `{{photo}}` utilise la photo de profil Google de l'utilisateur issue du Directory (mise à l'échelle automatique en 400 px). Elle ne fait pas partie de la bibliothèque - les utilisateurs et les administrateurs gèrent les photos de profil dans Google Workspace. Voir [Variables de modèle](/docs/template-variables#variables-de-personne-google-directory).

## Notes sur le cycle de vie

- **Remplacer une image :** téléversez le nouveau fichier, sélectionnez-le sur chaque modèle qui utilisait l'ancien, et ne supprimez l'ancienne entrée qu'une fois certain de vous - ou conservez la même entrée de bibliothèque et mettez seulement à jour son lien de clic ou sa description ALT, que chaque modèle reprend au prochain rendu.
- **Supprimer une entrée de la bibliothèque** la détache des modèles qui l'utilisent (ils reviennent à l'espace réservé) après un avertissement indiquant le nombre d'utilisations. Ces signatures continuent de s'appliquer entre-temps.
- **Supprimer une image en cours d'utilisation notifie l'espace de travail :** une notification dans l'application apparaît dans la cloche et un e-mail part vers les administrateurs et le propriétaire, en nommant les modèles concernés. Voir [Notifications](/docs/notifications).
- **Les fichiers hébergés sont libérés :** une fois l'entrée de bibliothèque supprimée, SignatureCat nettoie le fichier stocké au prochain passage quotidien, l'image cesse donc aussi de se charger dans les e-mails déjà distribués. La suppression est définitive et il n'existe pas d'annulation en libre-service.
- **Les images externes ne sont pas affectées par la suppression.** C'est vous qui hébergez le fichier, retirer l'entrée de bibliothèque ne retire donc que l'entrée - les anciens e-mails continuent de charger l'image jusqu'à ce que vous la mettiez hors ligne vous-même.

## Conseils de délivrabilité

- Gardez des fichiers légers (bannières sous 200 Ko) - les images volumineuses ralentissent le rendu et dégradent les scores anti-spam.
- Servez les images depuis votre propre domaine avec un [domaine d'images personnalisé](/docs/custom-image-domain) - les clients mail font davantage confiance au domaine de l'expéditeur.
- Gmail sert les images aux destinataires via un proxy, les configurations d'hébergement exotiques (listes d'autorisation d'IP, contrôles de referer) casseront donc le rendu. Gardez des images simplement publiques.
