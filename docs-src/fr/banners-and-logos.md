---
title: Téléverser et insérer des bannières et des logos
navTitle: Bannières et logos
description: Ajoutez des logos d'entreprise et des bannières de campagne aux modèles de signature Gmail dans SignatureCat - bibliothèque d'images, descriptions ALT, tailles, liens de clic et suppression.
updated: 2026-08-19
---

# Téléverser et insérer des bannières et des logos

SignatureCat conserve deux types d'images d'entreprise dans une bibliothèque par espace de travail : les **logos** (115x115 px par défaut) et les **bannières** (450x100 px par défaut, réduites sur petits écrans). Chaque modèle sélectionne son propre logo et sa propre bannière, insérés avec les jetons `{{logo}}` et `{{banner}}` - et peut redimensionner l'un ou l'autre pour lui-même avec les [poignées de redimensionnement de l'éditeur visuel](/docs/visual-editor#images-logo-bannire-et-photo).

## Ajouter une image à la bibliothèque

1. Ouvrez un modèle dans l'éditeur sur [Signatures](https://app.signature.cat/signatures).
2. Cliquez sur **Logo** ou **Bannière** dans la barre d'outils - chacun ouvre sa propre galerie (les logos et les bannières ne se mélangent jamais).
3. Choisissez **Ajouter à la bibliothèque**, puis au choix :
   - **J'ai un lien** - collez l'URL HTTPS publique d'une image que vous hébergez déjà, ou
   - **Téléverser un fichier** - PNG, JPG ou GIF, 200 Ko recommandés (limite stricte : 5 Mo, GIF animé jusqu'à 20 Mo).
4. Définissez éventuellement un nom dans la bibliothèque, un lien de clic ("Au clic, mène vers") et une **Description de l'image (ALT)**, puis enregistrez. L'image est ajoutée à la bibliothèque et sélectionnée pour ce modèle.

Pour les bannières, vous pouvez aussi donner à l'**entrée de bibliothèque sa propre taille** (une case à cocher avec des champs largeur et hauteur, 24-600 x 24-400 px) - à l'ajout de l'entrée comme plus tard dans les détails de l'entrée sélectionnée. Cette taille devient la valeur par défaut de l'entrée partout où elle est utilisée ; l'effacer revient à 450x100.

> [!NOTE]
> PNG, JPG et GIF uniquement - les fichiers SVG ne sont pas acceptés (mauvaise prise en charge par les clients mail et raisons de sécurité). Les GIF animés jouent dans Gmail ; l'Outlook classique sous Windows n'affiche que la première image. La bibliothèque contient jusqu'à 200 images par type.

## Insérer dans un modèle

Choisissez une image dans la galerie et cliquez sur **Utiliser la sélection** - l'éditeur peut aussi insérer pour vous le jeton `{{logo}}` ou `{{banner}}` à la position du curseur. Au moment du rendu, le jeton devient une véritable balise d'image ; si l'image a un lien de clic, elle est automatiquement enveloppée dans un lien.

Si un modèle utilise `{{banner}}` sans bannière sélectionnée, un espace réservé neutre est rendu à la place et l'éditeur vous invite à en choisir une - la signature ne casse jamais.

## Tailles d'image : défaut de bibliothèque vs par modèle

Deux niveaux contrôlent la taille de rendu d'un logo ou d'une bannière, et le plus spécifique l'emporte :

1. **Taille par modèle** - définie avec les poignées de redimensionnement dans l'[éditeur visuel](/docs/visual-editor#images-logo-bannire-et-photo) (bannière 24-600 x 24-400 px, logo 24-300 px). Elle ne s'applique qu'à ce modèle, donc redimensionner une bannière dans un modèle ne change jamais les autres qui partagent la même image.
2. **Taille de l'entrée de bibliothèque** (bannières uniquement) - la valeur par défaut propre à l'entrée, décrite ci-dessus.

Sans l'un ni l'autre, les valeurs par défaut s'appliquent : logo 115x115, bannière 450x100.

## Liens de clic

Le lien de clic accompagne l'**image de la bibliothèque**, pas le modèle : mettez le lien à jour une fois et chaque modèle utilisant cette image le récupère au prochain rendu. C'est pratique pour la rotation des bannières de campagne - changez l'URL cible sans toucher aux modèles.

Quand un modèle doit se comporter différemment, sélectionnez la puce d'image dans l'[éditeur visuel](/docs/visual-editor#images-logo-bannire-et-photo) et utilisez le bouton **Lien** : conservez le lien de la bibliothèque, retirez le lien pour ce modèle uniquement, ou pointez-le vers une autre URL.

## Description de l'image (ALT)

Chaque image de la bibliothèque peut porter une **Description de l'image (ALT)**, jusqu'à 300 caractères. L'application le dit simplement : "Le destinataire verra cette description si son programme de messagerie ne peut pas afficher l'image." Beaucoup de gens lisent leur courrier avec les images bloquées par défaut, et les lecteurs d'écran annoncent la description à la place de l'image, donc une entrée de logo décrite comme "Logo Acme" dit encore quelque chose d'utile.

Définissez-la à l'ajout de l'image (aussi bien avec **J'ai un lien** qu'avec **Téléverser un fichier**), à l'étape image de l'assistant de nouveau modèle, ou plus tard dans le panneau **Détails de l'image choisie** de la bibliothèque. Comme le lien de clic, la description appartient à l'entrée de bibliothèque, donc chaque modèle utilisant cette image livre la même - et les images que vous hébergez vous-même disposent du champ tout comme les téléversements. Laissez-la vide et l'image est rendue comme décorative, sans description.

> [!TIP]
> Décrivez ce que l'image dit, pas le fait que ce soit une image : "Logo Acme" ou "Promotion printemps 2026 - 20 pour cent de remise" vaut mieux que "banner.png".

## Recommandations de dimensions

| Type | Taille rendue par défaut | Recommandation |
|---|---|---|
| Logo | 115x115 px (redimensionnable par modèle jusqu'à 300 px) | Image carrée, un PNG avec transparence fonctionne le mieux. |
| Bannière | 450x100 px (tailles personnalisées jusqu'à 600x400 px ; largeur max. 100%) | Exportez au double de la taille d'affichage pour un rendu HiDPI net, gardez le fichier sous 200 Ko. |

Les images volumineuses ralentissent le rendu des e-mails et peuvent faire basculer les messages dans le territoire "message tronqué" de Gmail - gardez des fichiers légers.

## Supprimer des images

Supprimer une image de la bibliothèque la détache de chaque modèle qui l'avait sélectionnée - ces modèles reviennent à l'espace réservé et continuent de s'appliquer normalement. L'application vous avertit d'abord : "Cette image est utilisée dans N modèles. Après la suppression, elle ne s'y affichera plus - un espace réservé apparaîtra à la place."

Si l'image supprimée était encore utilisée, SignatureCat prévient aussi l'espace de travail : une notification dans l'application ("Un logo utilisé par vos signatures a été supprimé") apparaît dans la cloche et un e-mail part vers les administrateurs et le propriétaire, en listant les modèles concernés. Personne n'a à repérer l'espace réservé par hasard.

> [!IMPORTANT]
> Pour les images hébergées par SignatureCat, la suppression est définitive : le fichier stocké est libéré au prochain nettoyage quotidien, l'image cesse donc aussi de se charger dans les e-mails déjà distribués, et il n'existe pas d'annulation en libre-service.

Les images que vous avez ajoutées avec **J'ai un lien** ne sont pas concernées de cette façon - le fichier reste sur votre propre serveur, les anciens e-mails continuent donc de le charger. Pour remplacer une image hébergée sans risque, téléversez la nouvelle, pointez les modèles vers elle, et ne supprimez l'ancienne entrée qu'une fois certain que plus rien n'en a besoin.

## D'où les images sont-elles servies

Les images de la bibliothèque sont hébergées par défaut sur `images.signature.cat`. Pour les servir depuis votre propre sous-domaine (meilleure délivrabilité), voir [Servir les images depuis votre propre domaine](/docs/custom-image-domain). Les images par URL externe ("J'ai un lien") sont toujours chargées depuis l'endroit où vous les hébergez - elles doivent rester accessibles publiquement en HTTPS.
