---
title: Créer votre premier modèle
navTitle: Créer votre premier modèle
description: Créez un modèle de signature Gmail dans SignatureCat, personnalisez-le avec les variables Google Directory, prévisualisez-le et testez-le sur votre propre boîte.
updated: 2026-07-17
---

# Créer votre premier modèle

Un modèle est une signature HTML unique que SignatureCat personnalise par utilisateur avec les données de votre Google Directory. Vous créez les modèles sur la page [Signatures](https://app.signature.cat/signatures), et vous pouvez tester le résultat en toute sécurité sur votre propre boîte avant tout déploiement.

## Créer le modèle

1. Ouvrez [Signatures](https://app.signature.cat/signatures) et cliquez sur **Nouveau modèle**.
2. Choisissez un point de départ :
   - **Par défaut** - photo du Directory plus coordonnées.
   - **Avec logo d'entreprise** - votre logo (115x115 px) à la place de la photo personnelle, cohérent pour toute l'entreprise.
   - **Avec bannière** - la signature plus une bannière de campagne (450x100 px) en dessous.
3. Pour les starters logo ou bannière, choisissez une image dans votre bibliothèque ou téléversez-en une - ou passez cette étape et un espace réservé sera utilisé jusqu'à ce que vous en choisissiez une. Voir [Bannières et logos](/docs/banners-and-logos/).

L'éditeur s'ouvre immédiatement. Tout ce qui vient du starter peut être ajusté plus tard.

## Personnaliser avec des variables

Insérez des jetons `{{variable}}` avec le menu **Insérer une variable** - par exemple `{{firstname}}`, `{{jobtitle}}` ou `{{phone}}`. Au moment de l'application, chaque jeton est résolu à partir de la fiche Google Directory de l'utilisateur, de sorte qu'un seul modèle produit une signature personnelle pour chacun.

Enveloppez les lignes facultatives dans des balises conditionnelles pour que les signatures restent propres quand des données manquent :

- `{{del}} ... {{/del}}` retire le bloc enveloppé uniquement lorsque **toutes** les variables à l'intérieur sont vides.
- `{{delete}} ... {{/delete}}` retire le bloc lorsque **l'une** des variables à l'intérieur est vide.

La liste complète des variables, l'origine de chaque valeur et les règles conditionnelles exactes se trouvent dans la référence des [variables de modèle](/docs/template-variables/).

> [!TIP]
> Gardez les données du Directory propres avant le déploiement - les intitulés de poste, les services et les numéros de téléphone viennent directement de Google Directory. Les champs vides sont simplement rendus comme du texte vide, sauf si vous les enveloppez dans des balises `{{del}}`.

## Prévisualiser comme un utilisateur réel

Le volet d'aperçu rend la signature résolue en direct pendant que vous tapez. Utilisez le contrôle **Rendre comme** pour substituer la fiche Directory de n'importe quel utilisateur réel - par défaut, le rendu s'appuie sur la vôtre. L'aperçu vous indique exactement quelle fiche a été utilisée : "Rendu à partir des données Directory de {email}."

## Le tester sur votre propre boîte

Cliquez sur **Me définir une signature de test** dans la barre d'outils de l'éditeur. SignatureCat rend le modèle à partir de votre propre fiche Directory et l'écrit dans votre propre signature Gmail - personne d'autre n'est affecté. Envoyez-vous un e-mail ou vérifiez les paramètres Gmail pour voir le résultat réel.

Quand le modèle vous convient, continuez avec [Affecter des modèles](/docs/assign-templates/).

> [!NOTE]
> L'enregistrement d'un modèle le valide : les `{{tokens}}` inconnus et les balises `{{del}}` / `{{delete}}` non équilibrées sont rejetés, et le HTML est assaini (les scripts, les iframes et les gestionnaires d'événements en ligne sont retirés). Voir [Modèles](/docs/templates/) pour la référence complète.
