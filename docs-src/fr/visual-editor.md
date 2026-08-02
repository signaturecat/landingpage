---
title: Éditeur visuel
navTitle: Éditeur visuel
description: Concevez des modèles de signature Gmail sans écrire de HTML - puces de variables, colonnes, séparateurs, images personnalisées et mise en forme compatible e-mail sur un seul canevas.
updated: 2026-08-02
---

# Éditeur visuel

L'éditeur visuel vous permet de concevoir un modèle de signature sans écrire une ligne de HTML. Vous travaillez sur un canevas avec mise en forme du texte, puces de variables et images affichées à leur taille réelle, et l'éditeur ne peut produire que du balisage issu d'une liste blanche compatible e-mail - ce que le canevas émet est exactement ce que SignatureCat stocke et envoie à Gmail, rien n'est réécrit dans votre dos.

> [!NOTE]
> Gmail a le dernier mot : il applique son propre assainissement quand il enregistre une signature, une mise en page très compliquée peut donc revenir tronquée. Voir [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

L'éditeur se trouve sur la même page que l'[éditeur HTML](/docs/templates#lditeur) : ouvrez n'importe quel modèle sur [Signatures](https://app.signature.cat/signatures) et basculez entre les onglets **Visuel** et **HTML**.

## Modes d'édition

Chaque modèle est édité dans l'un de deux modes, et l'éditeur s'ouvre dans le mode dans lequel le modèle a été enregistré pour la dernière fois :

- **Visuel** - le canevas décrit sur cette page. L'enregistrement stocke à la fois le document visuel et le HTML généré.
- **HTML** - l'éditeur de code classique avec autocomplétion des jetons ; voir [Modèles](/docs/templates#lditeur).

Basculer de l'un à l'autre est possible à tout moment, avec deux réserves :

- **HTML vers Visuel est une conversion à sens unique.** L'importateur traduit votre balisage en blocs de canevas au mieux, et une signature écrite à la main survit désormais bien mieux au trajet : chaque ligne d'un tableau de mise en page à plusieurs lignes devient sa propre [rangée de colonnes](#colonnes), et les gardes `{{del}}` ou `{{delete}}` enveloppant une cellule entière, une suite de cellules voisines ou une ligne entière sont conservées au lieu d'être silencieusement abandonnées. Les mises en page à tableaux profondément imbriqués sont toujours aplaties, et l'éditeur vous avertit avant une conversion avec perte.
- **Visuel vers HTML est un déclassement.** Vous obtenez le HTML généré à modifier librement, mais enregistrer depuis l'onglet HTML abandonne le document visuel - y revenir plus tard signifie convertir à nouveau.

## Texte, polices et couleurs

Le canevas prend en charge la mise en forme qui survit de manière fiable aux clients mail : paragraphes, **gras**, *italique*, souligné, listes à puces et numérotées, une palette de couleurs de texte compatible e-mail, des liens (web, mailto et tel) et annuler/rétablir.

Deux menus déroulants contrôlent la typographie :

- **Taille de police** - sept tailles fixes plus **Taille par défaut** : 10, 12, 14, 16, 18, 20 et 24 px. Rien d'autre n'est proposé, et la valeur par défaut du canevas est 14 px.
- **Police** - "Default (mail client)" plus sept familles web-safe : Arial, Verdana, Tahoma, Trebuchet MS, Georgia, Times New Roman et Courier New. L'option par défaut n'émet aucune police du tout, laissant le client mail de chaque destinataire utiliser la sienne - le choix le plus sûr. La police s'applique à toute la signature, pas à la sélection.

**Couleur du texte** propose huit échantillons compatibles e-mail plus **Couleur par défaut**, qui retire à nouveau la couleur.

> [!NOTE]
> Les polices web-safe se rendent de manière cohérente parce qu'elles sont livrées avec le système du destinataire, pas avec l'e-mail. La première fois que vous choisissez une police autre que celle par défaut, l'éditeur affiche une courte note de compatibilité.

## Colonnes

Insérez une rangée de 2 ou 3 colonnes depuis la barre d'outils (**Insérer 2 colonnes**, **Insérer 3 colonnes**) pour placer du contenu côte à côte - par exemple une photo à gauche et les coordonnées à droite. Les colonnes sont stockées comme un tableau à une seule ligne dans le HTML généré, la seule technique de mise en page que chaque client mail rend correctement. Il n'est pas possible d'ajouter une colonne à une rangée existante : insérez une rangée avec le nombre de colonnes dont vous avez besoin.

Une fois la rangée sur le canevas :

- **Changez les proportions.** Faites glisser la barre d'accentuation dans la gouttière entre deux colonnes (**Largeur de colonne (glisser; les flèches ajustent)**). Chaque colonne conserve au moins 10 pour cent de la largeur, et la poignée fonctionne aussi au clavier - les flèches la déplacent par pas de 5 pour cent. Un seul glissement fixe les proportions de toute la rangée, une rangée est donc soit un partage égal, soit entièrement personnalisée.
- **Déplacez toute la rangée.** La poignée en haut à gauche de la rangée (**Déplacer cette ligne (déposer entre les lignes)**) la fait glisser entre les autres blocs, avec un trait qui montre où elle va atterrir.
- **Supprimez une seule colonne.** Le bouton corbeille dans la surcouche de la colonne la retire ; une colonne qui contient encore du contenu demande d'abord une confirmation. Une rangée qui ne garde qu'une seule colonne est automatiquement désenveloppée, supprimer ne peut donc jamais laisser derrière soi une mise en page cassée.
- **Rendez une colonne conditionnelle.** L'interrupteur dans la surcouche de la colonne fait passer la colonne par aucun garde, puis `{{del}}`, puis `{{delete}}` (**Rendre cette colonne conditionnelle (elle disparaît si ses variables sont vides)**). Toute la colonne disparaît alors pour les utilisateurs dont les variables qu'elle contient sont vides - une colonne photo pour les personnes sans photo, par exemple. Une colonne conditionnelle est dessinée avec un contour en pointillés et une étiquette de coin qui montre le jeton ; les règles sont exactement celles des [blocs conditionnels](/docs/template-variables#blocs-conditionnels-del-et-delete).

Le HTML importé conserve sa mise en page : chaque ligne d'un tableau à plusieurs cellules devient sa propre rangée de colonnes, une rangée photo-et-nom au-dessus d'une rangée séparateur reste donc deux rangées au lieu de se replier en une seule.

## Séparateurs

Un séparateur est une ligne horizontale entre deux blocs - la façon nette de séparer un nom des coordonnées. Insérez-en un avec **Insérer un séparateur** ; par défaut, c'est un fin trait gris clair avec un peu d'espace au-dessus et en dessous.

Sur le canevas, c'est un bloc sélectionnable appelé **Ligne de séparation**. Survolez-le pour faire apparaître une poignée qui le fait glisser entre les autres blocs et un bouton qui le retire. Deux propriétés sont à votre main :

- **Couleur** - sélectionnez la ligne, puis choisissez un échantillon dans la palette de la barre d'outils (**Couleur de la ligne (sélectionnez la ligne, puis choisissez une couleur)**).
- **Longueur** - faites glisser la poignée au bout de la ligne (**Longueur de la ligne (glisser ; double-clic = pleine largeur)**) entre 10 et 100 pour cent de la largeur de la signature. Un double-clic restaure la pleine largeur.

Un séparateur que vous avez écrit à la main en HTML conserve le style que vous lui avez donné lors de la conversion du modèle en mode visuel.

## Les variables sous forme de puces

Les variables de personne comme `{{firstname}}` ou `{{phone}}` apparaissent sur le canevas sous forme de **puces** - des jetons pleins que vous ne pouvez pas casser accidentellement en tapant dedans. Les puces peuvent être :

- insérées depuis le menu **Insérer une variable**,
- mises en forme comme le texte qui les entoure - gras, italique, souligné, plus **Couleur du texte** et **Taille de police**, qui se répercutent sur la valeur livrée dans la signature finale,
- glissées-déposées n'importe où sur le canevas,
- retirées avec le bouton corbeille qui apparaît au survol.

Sélectionnez la puce, ou une portion de texte qui la contient, avant de choisir une taille ou une couleur : poser le curseur à côté d'une puce ne change rien. Les puces d'image (`{{logo}}`, `{{banner}}`, `{{photo}}`) ne se restylent jamais ainsi - elles se dimensionnent avec leurs poignées de redimensionnement.

La liste complète des variables et les règles de résolution se trouvent dans [Variables de modèle](/docs/template-variables).

## Images : logo, bannière et photo

`{{logo}}`, `{{banner}}` et `{{photo}}` sont rendus sur le canevas comme des puces d'image à leur taille réelle - les puces logo et bannière montrent l'image réellement sélectionnée dans votre [bibliothèque](/docs/banners-and-logos), la puce photo montre un avatar en espace réservé (les vraies photos sont substituées par utilisateur au moment du rendu).

Sélectionnez une puce d'image et faites glisser ses **poignées de redimensionnement** (bords et coin) pour la dimensionner pour ce modèle - comme on redimensionne une fenêtre. Un double-clic restaure la taille par défaut. Les poignées s'utilisent à la souris ; il n'y a pas de déplacement au clavier. Plages autorisées :

| Image | Taille par défaut | Plage de redimensionnement |
|---|---|---|
| Logo | 115x115 px | 24-300 px par côté |
| Bannière | 450x100 px (ou la taille propre de l'entrée de bibliothèque) | 24-600 x 24-400 px |
| Photo | 115x115 px, circulaire | 24-300 px par côté |

La photo de profil est ronde par défaut. Le petit interrupteur sur la poignée de la puce photo la passe en carrée pour ce modèle (**Passer à une photo carrée**) et inversement (**Passer à une photo ronde**).

Les tailles sont stockées **par modèle** : redimensionner une bannière dans un modèle ne change jamais les autres modèles qui utilisent la même image de bibliothèque.

Une puce de logo ou de bannière sélectionnée expose aussi un bouton **Lien** : conservez le lien de clic de l'image de bibliothèque, retirez le lien pour ce modèle uniquement, ou pointez-le vers une autre URL - sans toucher à l'entrée de bibliothèque que partagent les autres modèles.

## Images personnalisées

Toute image que vous hébergez déjà à une adresse `https://` peut aller directement dans un modèle, sans l'ajouter à la bibliothèque partagée. Cliquez sur **Insérer une image (URL)** dans la barre d'outils et remplissez :

- **URL de l'image (https)** - l'adresse de l'image. Elle doit commencer par `https://`.
- **Description (ALT, facultatif)** - ce que les destinataires voient quand leur programme de messagerie ne peut pas afficher l'image. Elle ne peut pas contenir de jetons de modèle `{{ }}`.
- **Forme** - **Carrée** ou **Ronde**.

Sur le canevas, le bloc se comporte comme les autres images : la poignée le déplace entre les blocs, les poignées de bord et de coin le redimensionnent (16 à 600 px de large, 16 à 400 px de haut), le crayon (**Modifier l'image**) rouvre l'adresse, la description et la forme, et le bouton corbeille le retire. Si vous le placez dans un lien, le lien est conservé.

Une image personnalisée appartient à ce seul modèle. Ce n'est pas une entrée de bibliothèque : elle n'apparaît pas dans les galeries Logo et Bannière, les autres modèles ne peuvent pas la choisir, et elle n'est pas gérée dans [Bannières et logos](/docs/banners-and-logos). SignatureCat ne téléverse ni ne stocke le fichier - l'image reste chez votre hébergeur, l'adresse doit donc continuer de fonctionner aussi longtemps que la signature est utilisée.

> [!TIP]
> Utilisez la bibliothèque pour le logo et la bannière de campagne que toute votre entreprise partage, et une image personnalisée pour un cas unique - un badge de récompense ou un logo d'événement qui ne vit que dans un seul modèle.

## Blocs conditionnels

Les enveloppes `{{del}}` et `{{delete}}` apparaissent comme des blocs encadrés sur le canevas, pour que vous voyiez exactement ce qui disparaît quand les données d'un utilisateur manquent. Une [colonne](#colonnes) entière peut porter le même garde. Quand un enregistrement est rejeté à cause de balises non équilibrées, l'éditeur affiche deux micro-démos en boucle qui contrastent le comportement de `{{del}}` et `{{delete}}` - les règles exactes se trouvent dans [Variables de modèle](/docs/template-variables#blocs-conditionnels-del-et-delete).

## Rester dans les limites de Gmail

Gmail plafonne les signatures à 10 000 caractères. Un compteur de budget en direct sous le canevas suit la taille du HTML généré, pour que vous le sachiez bien avant que Gmail ne rejette la signature.

## Réinitialisation et validation

- **Annuler les modifications** (visible dès que vous avez des modifications non enregistrées, infobulle "Restaurer la dernière version enregistrée") restaure le modèle à son dernier état enregistré, y compris le mode d'édition enregistré, après une confirmation.
- Les erreurs de validation sont précises : un jeton inconnu est nommé, les balises conditionnelles non équilibrées viennent avec leurs décomptes d'ouverture/fermeture - pas de devinettes.

Quand votre modèle vous convient, vérifiez-le sur les clients simulés au-dessus de l'aperçu ([Aperçu par client de messagerie](/docs/mail-client-preview)), prévisualisez-le avec de vrais utilisateurs et testez-le sur votre propre boîte - voir [Créer votre premier modèle](/docs/create-your-first-template#prvisualiser-comme-un-utilisateur-rel).
