---
title: Variables de modèle
navTitle: Variables de modèle
description: Toutes les variables de signature SignatureCat - champs de l'annuaire Google Workspace, remplacements de données par utilisateur, jetons de logo et de bannière et blocs conditionnels del/delete.
updated: 2026-08-02
---

# Variables de modèle

Les modèles SignatureCat utilisent des jetons `{{variable}}` résolus par utilisateur au moment de l'application. Il existe neuf variables de personne (remplies depuis Google Directory), deux jetons d'image et deux balises conditionnelles. Les noms de jetons sont en minuscules et reconnus sans tenir compte de la casse - `{{Phone}}` fonctionne comme `{{phone}}`. Les jetons inconnus sont rejetés à l'enregistrement du modèle.

## Variables de personne (Google Directory)

Les valeurs proviennent de la fiche de chaque utilisateur dans votre annuaire Google Workspace. Gardez l'annuaire propre et chaque signature reste exacte automatiquement.

Une valeur stockée pour un utilisateur sur l'onglet **Données** prime sur l'annuaire pour cet utilisateur et ce champ uniquement, partout où la signature est rendue : l'aperçu, **Me définir une signature de test** et le déploiement réel vers les boîtes. Les champs que vous laissez à l'annuaire continuent de venir de l'annuaire. Voir [Données utilisateur](/docs/user-data). Une exception : quand une signature est écrite sur un alias d'envoi, `{{email}}` et `{{domain}}` suivent toujours l'adresse de l'alias, même s'ils sont remplacés.

| Jeton | Valeur | Remarques |
|---|---|---|
| `{{firstname}}` | Prénom | |
| `{{lastname}}` | Nom | |
| `{{email}}` | Adresse e-mail principale | Lors de l'application à un alias, résolue vers l'adresse de l'**alias**. |
| `{{domain}}` | Partie domaine de l'e-mail | Suit l'alias lors de l'application à un alias. |
| `{{jobtitle}}` | Intitulé de poste | Depuis l'entrée d'organisation principale de l'utilisateur dans le Directory. |
| `{{department}}` | Service | Depuis la même entrée d'organisation. |
| `{{photo}}` | Photo de profil | Utilisé seul, le jeton rend une photo de profil prête à l'emploi - ronde par défaut, carrée si le modèle est basculé sur cette forme (115x115 px par défaut, [la forme et la taille se règlent par modèle](/docs/visual-editor#images-logo-bannire-et-photo)) ; les utilisateurs sans photo dans le Directory n'obtiennent aucune image plutôt qu'une icône cassée. À l'intérieur de votre propre `<img src="{{photo}}">`, il est résolu vers l'URL HTTPS de la photo (mise à l'échelle automatique en 400 px) et votre balisage reste intact. |
| `{{address}}` | Adresse formatée | L'entrée d'adresse principale de l'utilisateur. |
| `{{phone}}` | Numéro de téléphone | Le premier non vide parmi : professionnel, puis mobile, puis domicile. |

**Les valeurs vides sont rendues comme du texte vide.** La signature ne casse jamais, mais vous pouvez vous retrouver avec une étiquette orpheline comme "Tél :" - c'est à cela que servent les blocs conditionnels.

## Jetons d'image

| Jeton | Valeur |
|---|---|
| `{{logo}}` | Le logo d'entreprise sélectionné du modèle - 115x115 px par défaut, redimensionnable par modèle (24-300 px). |
| `{{banner}}` | La bannière de campagne sélectionnée du modèle - 450x100 px par défaut (une entrée de bibliothèque peut définir sa propre taille), redimensionnable par modèle, réduite sur écrans étroits. |

Les images proviennent de la bibliothèque par espace de travail et sont sélectionnées par modèle ; si rien n'est sélectionné, un espace réservé neutre est rendu. Si l'image de la bibliothèque a un lien de clic, l'image y est enveloppée automatiquement - et chaque modèle peut [remplacer ce lien](/docs/visual-editor#images-logo-bannire-et-photo). Les détails de dimensionnement et les poignées de redimensionnement sont décrits dans l'[éditeur visuel](/docs/visual-editor) et [Bannières et logos](/docs/banners-and-logos).

Si l'entrée de bibliothèque porte une **Description de l'image (ALT)**, ce texte est émis comme attribut `alt` de l'image rendue - aussi bien pour les images que vous avez téléversées que pour les entrées qui pointent vers votre propre URL. C'est ce que les destinataires lisent quand leur programme de messagerie bloque les images ou ne peut pas les charger. La description appartient à l'entrée de bibliothèque, tous les modèles qui utilisent cette image affichent donc la même ; une entrée sans description rend un `alt` vide.

> [!NOTE]
> Les jetons d'image rendent toujours quelque chose (image ou espace réservé), ils ne comptent donc pas comme "vides" pour les blocs conditionnels ci-dessous.

## Blocs conditionnels : del et delete

Deux balises enveloppantes retirent des fragments entiers de la signature quand des données manquent :

- `{{del}} ... {{/del}}` - **souple** : le bloc n'est retiré que lorsque **toutes** les variables de personne à l'intérieur sont vides. Si au moins une est remplie, le bloc reste (les variables vides à l'intérieur sont rendues comme du texte vide).
- `{{delete}} ... {{/delete}}` - **strict** : le bloc est retiré lorsque **l'une** des variables de personne à l'intérieur est vide. Utilisez-le quand un fragment n'a de sens que complet.

Exemple - une ligne de téléphone qui disparaît pour les utilisateurs sans aucun numéro :

```html
{{del}}<tr><td>Tel: {{phone}}</td></tr>{{/del}}
```

Les blocs peuvent être imbriqués ; les blocs internes sont évalués en premier. Les balises non équilibrées sont rejetées à l'enregistrement, et les balises elles-mêmes ne sont jamais écrites dans la signature Gmail finale.

Un garde peut aussi envelopper une cellule de tableau entière, une suite de cellules voisines ou une ligne de tableau entière. Dans l'[éditeur visuel](/docs/visual-editor#colonnes), c'est une colonne conditionnelle, définie depuis l'interrupteur de la colonne.

> [!TIP]
> Règle empirique : enveloppez chaque ligne facultative (téléphone, adresse, service) dans des balises `{{del}}`. Les signatures des utilisateurs aux fiches Directory peu remplies se réduisent alors avec élégance au lieu d'afficher des étiquettes vides.

## Tester la résolution des variables

Utilisez **Rendre comme** dans l'[éditeur de modèle](/docs/templates#lditeur) pour prévisualiser à partir de la fiche de n'importe quel utilisateur réel, et **Me définir une signature de test** pour appliquer le résultat à votre propre boîte. Les deux sont décrits dans [Créer votre premier modèle](/docs/create-your-first-template).
