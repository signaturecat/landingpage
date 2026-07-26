---
title: Téléverser et insérer des bannières et des logos
navTitle: Bannières et logos
description: Ajoutez des logos d'entreprise et des bannières de campagne aux modèles de signature SignatureCat - bibliothèque d'images, tailles personnalisées, redimensionnement par modèle, liens de clic et espaces réservés.
updated: 2026-07-26
---

# Téléverser et insérer des bannières et des logos

SignatureCat conserve deux types d'images d'entreprise dans une bibliothèque par espace de travail : les **logos** (115x115 px par défaut) et les **bannières** (450x100 px par défaut, réduites sur petits écrans). Chaque modèle sélectionne son propre logo et sa propre bannière, insérés avec les jetons `{{logo}}` et `{{banner}}` - et peut redimensionner l'un ou l'autre pour lui-même avec les [poignées de redimensionnement de l'éditeur visuel](/docs/visual-editor/#images-logo-banner-and-photo).

## Ajouter une image à la bibliothèque

1. Ouvrez un modèle dans l'éditeur sur [Signatures](https://app.signature.cat/signatures).
2. Cliquez sur **Logo** ou **Bannière** dans la barre d'outils - chacun ouvre sa propre galerie (les logos et les bannières ne se mélangent jamais).
3. Choisissez **Ajouter à la bibliothèque**, puis au choix :
   - **J'ai un lien** - collez l'URL HTTPS publique d'une image que vous hébergez déjà, ou
   - **Téléverser un fichier** - PNG ou JPG, 200 Ko recommandés (limite stricte de 5 Mo).
4. Définissez éventuellement un nom dans la bibliothèque et un lien de clic ("Au clic, mène vers"), puis enregistrez. L'image est ajoutée à la bibliothèque et sélectionnée pour ce modèle.

Pour les bannières, vous pouvez aussi donner à l'**entrée de bibliothèque sa propre taille** (une case à cocher avec des champs largeur et hauteur, 24-600 x 24-400 px) - à l'ajout de l'entrée comme plus tard dans les détails de l'entrée sélectionnée. Cette taille devient la valeur par défaut de l'entrée partout où elle est utilisée ; l'effacer revient à 450x100.

> [!NOTE]
> PNG et JPG uniquement - les fichiers SVG ne sont pas acceptés (mauvaise prise en charge par les clients mail et raisons de sécurité). La bibliothèque contient jusqu'à 200 images par type.

## Insérer dans un modèle

Choisissez une image dans la galerie et cliquez sur **Utiliser la sélection** - l'éditeur peut aussi insérer pour vous le jeton `{{logo}}` ou `{{banner}}` à la position du curseur. Au moment du rendu, le jeton devient une véritable balise d'image ; si l'image a un lien de clic, elle est automatiquement enveloppée dans un lien.

Si un modèle utilise `{{banner}}` sans bannière sélectionnée, un espace réservé neutre est rendu à la place et l'éditeur vous invite à en choisir une - la signature ne casse jamais.

## Tailles d'image : défaut de bibliothèque vs par modèle

Deux niveaux contrôlent la taille de rendu d'un logo ou d'une bannière, et le plus spécifique l'emporte :

1. **Taille par modèle** - définie avec les poignées de redimensionnement dans l'[éditeur visuel](/docs/visual-editor/#images-logo-banner-and-photo) (bannière 24-600 x 24-400 px, logo 24-300 px). Elle ne s'applique qu'à ce modèle, donc redimensionner une bannière dans un modèle ne change jamais les autres qui partagent la même image.
2. **Taille de l'entrée de bibliothèque** (bannières uniquement) - la valeur par défaut propre à l'entrée, décrite ci-dessus.

Sans l'un ni l'autre, les valeurs par défaut s'appliquent : logo 115x115, bannière 450x100.

## Liens de clic

Le lien de clic accompagne l'**image de la bibliothèque**, pas le modèle : mettez le lien à jour une fois et chaque modèle utilisant cette image le récupère au prochain rendu. C'est pratique pour la rotation des bannières de campagne - changez l'URL cible sans toucher aux modèles.

Quand un modèle doit se comporter différemment, sélectionnez la puce d'image dans l'[éditeur visuel](/docs/visual-editor/#images-logo-banner-and-photo) et utilisez le bouton **Lien** : conservez le lien de la bibliothèque, retirez le lien pour ce modèle uniquement, ou pointez-le vers une autre URL.

## Recommandations de dimensions

| Type | Taille rendue par défaut | Recommandation |
|---|---|---|
| Logo | 115x115 px (redimensionnable par modèle jusqu'à 300 px) | Image carrée, un PNG avec transparence fonctionne le mieux. |
| Bannière | 450x100 px (tailles personnalisées jusqu'à 600x400 px ; largeur max. 100%) | Exportez au double de la taille d'affichage pour un rendu HiDPI net, gardez le fichier sous 200 Ko. |

Les images volumineuses ralentissent le rendu des e-mails et peuvent faire basculer les messages dans le territoire "message tronqué" de Gmail - gardez des fichiers légers.

## Supprimer des images

Supprimer une image de la bibliothèque la détache de chaque modèle qui l'avait sélectionnée - ces modèles reviennent à l'espace réservé. L'application vous avertit d'abord : "Cette image est utilisée dans N modèles. Après la suppression, elle ne s'y affichera plus - un espace réservé apparaîtra à la place."

> [!NOTE]
> Les e-mails déjà envoyés conservent leurs images - la suppression n'affecte que les rendus futurs.

## D'où les images sont-elles servies

Les images de la bibliothèque sont hébergées par défaut sur `images.signature.cat`. Pour les servir depuis votre propre sous-domaine (meilleure délivrabilité), voir [Servir les images depuis votre propre domaine](/docs/custom-image-domain/). Les images par URL externe ("J'ai un lien") sont toujours chargées depuis l'endroit où vous les hébergez - elles doivent rester accessibles publiquement en HTTPS.
