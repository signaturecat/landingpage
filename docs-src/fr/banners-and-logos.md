---
title: Téléverser et insérer des bannières et des logos
navTitle: Bannières et logos
description: Ajoutez des logos d'entreprise et des bannières de campagne aux modèles de signature SignatureCat - bibliothèque d'images, limites de téléversement, liens de clic et espaces réservés.
updated: 2026-07-17
---

# Téléverser et insérer des bannières et des logos

SignatureCat conserve deux types d'images d'entreprise dans une bibliothèque par espace de travail : les **logos** (rendus en 115x115 px) et les **bannières** (rendues en 450x100 px, réduites sur petits écrans). Chaque modèle sélectionne son propre logo et sa propre bannière, insérés avec les jetons `{{logo}}` et `{{banner}}`.

## Ajouter une image à la bibliothèque

1. Ouvrez un modèle dans l'éditeur sur [Signatures](https://app.signature.cat/signatures).
2. Cliquez sur **Logo** ou **Bannière** dans la barre d'outils - chacun ouvre sa propre galerie (les logos et les bannières ne se mélangent jamais).
3. Choisissez **Ajouter à la bibliothèque**, puis au choix :
   - **J'ai un lien** - collez l'URL HTTPS publique d'une image que vous hébergez déjà, ou
   - **Téléverser un fichier** - PNG ou JPG, 200 Ko recommandés (limite stricte de 5 Mo).
4. Définissez éventuellement un nom dans la bibliothèque et un lien de clic (« Au clic, mène vers »), puis enregistrez. L'image est ajoutée à la bibliothèque et sélectionnée pour ce modèle.

> [!NOTE]
> PNG et JPG uniquement - les fichiers SVG ne sont pas acceptés (mauvaise prise en charge par les clients mail et raisons de sécurité). La bibliothèque contient jusqu'à 200 images par type.

## Insérer dans un modèle

Choisissez une image dans la galerie et cliquez sur **Utiliser la sélection** - l'éditeur peut aussi insérer pour vous le jeton `{{logo}}` ou `{{banner}}` à la position du curseur. Au moment du rendu, le jeton devient une véritable balise d'image ; si l'image a un lien de clic, elle est automatiquement enveloppée dans un lien.

Si un modèle utilise `{{banner}}` sans bannière sélectionnée, un espace réservé neutre est rendu à la place et l'éditeur vous invite à en choisir une - la signature ne casse jamais.

## Liens de clic

Le lien de clic accompagne l'**image de la bibliothèque**, pas le modèle : mettez le lien à jour une fois et chaque modèle utilisant cette image le récupère au prochain rendu. C'est pratique pour la rotation des bannières de campagne - changez l'URL cible sans toucher aux modèles.

## Recommandations de dimensions

| Type | Taille rendue | Recommandation |
|---|---|---|
| Logo | 115x115 px | Image carrée, un PNG avec transparence fonctionne le mieux. |
| Bannière | 450x100 px (largeur max. 100%) | Exportez en 900x200 px pour un rendu HiDPI net, gardez le fichier sous 200 Ko. |

Les images volumineuses ralentissent le rendu des e-mails et peuvent faire basculer les messages dans le territoire « message tronqué » de Gmail - gardez des fichiers légers.

## Supprimer des images

Supprimer une image de la bibliothèque la détache de chaque modèle qui l'avait sélectionnée - ces modèles reviennent à l'espace réservé. L'application vous avertit d'abord : « Cette image est utilisée dans N modèles. Après la suppression, elle ne s'y affichera plus - un espace réservé apparaîtra à la place. »

> [!NOTE]
> Les e-mails déjà envoyés conservent leurs images - la suppression n'affecte que les rendus futurs.

## D'où les images sont-elles servies

Les images de la bibliothèque sont hébergées par défaut sur `images.signature.cat`. Pour les servir depuis votre propre sous-domaine (meilleure délivrabilité), voir [Servir les images depuis votre propre domaine](/docs/custom-image-domain/). Les images par URL externe (« J'ai un lien ») sont toujours chargées depuis l'endroit où vous les hébergez - elles doivent rester accessibles publiquement en HTTPS.
