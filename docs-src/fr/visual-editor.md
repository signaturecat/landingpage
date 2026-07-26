---
title: Éditeur visuel
navTitle: Éditeur visuel
description: Concevez des signatures Gmail sans écrire de HTML - l'éditeur visuel de SignatureCat avec puces de variables, redimensionnement d'images, colonnes, polices et un rendu garanti compatible Gmail.
updated: 2026-07-26
---

# Éditeur visuel

L'éditeur visuel vous permet de concevoir un modèle de signature sans écrire une ligne de HTML. Vous travaillez sur un canevas avec mise en forme du texte, puces de variables et images affichées à leur taille réelle - et tout ce qu'il produit est garanti compatible e-mail : l'éditeur ne peut émettre que du balisage qui se rend correctement dans Gmail, il est donc impossible de construire une signature qui casse dans la boîte de réception.

L'éditeur se trouve sur la même page que l'[éditeur HTML](/docs/templates/#the-editor) : ouvrez n'importe quel modèle sur [Signatures](https://app.signature.cat/signatures) et basculez entre les onglets **Visuel** et **HTML**.

## Modes d'édition

Chaque modèle est édité dans l'un de deux modes, et l'éditeur s'ouvre dans le mode dans lequel le modèle a été enregistré pour la dernière fois :

- **Visuel** - le canevas décrit sur cette page. L'enregistrement stocke à la fois le document visuel et le HTML généré.
- **HTML** - l'éditeur de code classique avec autocomplétion des jetons ; voir [Modèles](/docs/templates/#the-editor).

Basculer de l'un à l'autre est possible à tout moment, avec deux réserves :

- **HTML vers Visuel est une conversion à sens unique.** L'importateur traduit votre balisage en blocs de canevas au mieux - les mises en page simples (y compris les tableaux à une seule ligne, qui deviennent des [colonnes](#colonnes)) se convertissent proprement, tandis que les mises en page à tableaux profondément imbriqués sont aplaties. L'éditeur vous avertit avant une conversion avec perte.
- **Visuel vers HTML est un déclassement.** Vous obtenez le HTML généré à modifier librement, mais enregistrer depuis l'onglet HTML abandonne le document visuel - y revenir plus tard signifie convertir à nouveau.

## Texte, polices et couleurs

Le canevas prend en charge la mise en forme qui survit de manière fiable aux clients mail : paragraphes, **gras**, *italique*, souligné, listes à puces et numérotées, une palette de couleurs de texte compatible e-mail, des liens (web, mailto et tel) et annuler/rétablir.

Deux menus déroulants contrôlent la typographie :

- **Taille de police** - de 10 à 24 px.
- **Police** - "Default (mail client)" plus sept familles web-safe : Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman et Courier New. L'option par défaut n'émet aucune police du tout, laissant le client mail de chaque destinataire utiliser la sienne - le choix le plus sûr.

> [!NOTE]
> Les polices web-safe se rendent de manière cohérente parce qu'elles sont livrées avec le système du destinataire, pas avec l'e-mail. La première fois que vous choisissez une police autre que celle par défaut, l'éditeur affiche une courte note de compatibilité.

## Colonnes

Insérez une rangée de 2 ou 3 colonnes depuis la barre d'outils pour placer du contenu côte à côte - par exemple une photo à gauche et les coordonnées à droite. Les colonnes sont stockées comme un tableau à une seule ligne dans le HTML généré, la seule technique de mise en page que chaque client mail rend correctement. Les tableaux à une seule ligne présents dans du HTML importé deviennent automatiquement des colonnes.

## Les variables sous forme de puces

Les variables de personne comme `{{firstname}}` ou `{{phone}}` apparaissent sur le canevas sous forme de **puces** - des jetons pleins que vous ne pouvez pas casser accidentellement en tapant dedans. Les puces peuvent être :

- insérées depuis le menu **Insérer une variable**,
- mises en forme comme du texte (gras, italique et souligné s'appliquent à la valeur résolue),
- glissées-déposées n'importe où sur le canevas,
- retirées avec le bouton corbeille qui apparaît au survol.

La liste complète des variables et les règles de résolution se trouvent dans [Variables de modèle](/docs/template-variables/).

## Images : logo, bannière et photo

`{{logo}}`, `{{banner}}` et `{{photo}}` sont rendus sur le canevas comme des puces d'image à leur taille réelle - les puces logo et bannière montrent l'image réellement sélectionnée dans votre [bibliothèque](/docs/banners-and-logos/), la puce photo montre un avatar circulaire en espace réservé (les vraies photos sont substituées par utilisateur au moment du rendu).

Sélectionnez une puce d'image et faites glisser ses **poignées de redimensionnement** (bords et coin) pour la dimensionner pour ce modèle - comme on redimensionne une fenêtre. Un double-clic restaure la taille par défaut ; les poignées fonctionnent aussi au clavier (les flèches avancent de 10 px, Maj+flèches de 50 px, Début/Fin sautent aux limites). Plages autorisées :

| Image | Taille par défaut | Plage de redimensionnement |
|---|---|---|
| Logo | 115x115 px | 24-300 px par côté |
| Bannière | 450x100 px (ou la taille propre de l'entrée de bibliothèque) | 24-600 x 24-400 px |
| Photo | 115x115 px, circulaire | 24-300 px par côté |

Les tailles sont stockées **par modèle** : redimensionner une bannière dans un modèle ne change jamais les autres modèles qui utilisent la même image de bibliothèque.

Une puce de logo ou de bannière sélectionnée expose aussi un bouton **Lien** : conservez le lien de clic de l'image de bibliothèque, retirez le lien pour ce modèle uniquement, ou pointez-le vers une autre URL - sans toucher à l'entrée de bibliothèque que partagent les autres modèles.

## Blocs conditionnels

Les enveloppes `{{del}}` et `{{delete}}` apparaissent comme des blocs encadrés sur le canevas, pour que vous voyiez exactement ce qui disparaît quand les données d'un utilisateur manquent. Quand un enregistrement est rejeté à cause de balises non équilibrées, l'éditeur affiche deux micro-démos en boucle qui contrastent le comportement de `{{del}}` et `{{delete}}` - les règles exactes se trouvent dans [Variables de modèle](/docs/template-variables/#conditional-blocks-del-and-delete).

## Rester dans les limites de Gmail

Gmail plafonne les signatures à 10 000 caractères. Un compteur de budget en direct sous le canevas suit la taille du HTML généré, pour que vous le sachiez bien avant que Gmail ne rejette la signature.

## Réinitialisation et validation

- **Rétablir la version enregistrée** (visible dès que vous avez des modifications non enregistrées) restaure le modèle à son dernier état enregistré, y compris le mode d'édition enregistré, après une confirmation.
- Les erreurs de validation sont précises : un jeton inconnu est nommé, les balises conditionnelles non équilibrées viennent avec leurs décomptes d'ouverture/fermeture - pas de devinettes.

Quand votre modèle vous convient, prévisualisez-le avec de vrais utilisateurs et testez-le sur votre propre boîte - voir [Créer votre premier modèle](/docs/create-your-first-template/#preview-as-a-real-user).
