---
title: Modèles
navTitle: Modèles
description: Référence des modèles SignatureCat - l'éditeur HTML, les starters, l'aperçu, l'application de test, l'interrupteur self-service, le modèle par défaut et la suppression sécurisée.
updated: 2026-07-17
---

# Modèles

Un modèle est un document HTML unique avec des jetons `{{variable}}` que SignatureCat rend par utilisateur. Les modèles se trouvent sur la page [Signatures](https://app.signature.cat/signatures) (niveaux Designer, Editor et Admin) et sont modifiés dans un éditeur de code avec aperçu en direct.

Pour une première prise en main guidée, voir [Créer votre premier modèle](/docs/create-your-first-template/). Le jeu de variables a sa propre page : [Variables de modèle](/docs/template-variables/).

## L'éditeur

L'éditeur sur `app.signature.cat/signatures/{id}` est **HTML-first** : vous modifiez directement le balisage de la signature, avec l'autocomplétion pour tous les jetons `{{variable}}`. À côté du volet de code, vous disposez de :

- **Aperçu** - rendu en direct de la signature résolue, dans un bac à sable. **Rendre comme** substitue la fiche Directory de n'importe quel utilisateur réel pour vérifier les cas limites (noms longs, numéros de téléphone manquants).
- **Insérer une variable** - menu de toutes les variables de personne, groupées avec des indications.
- **Logo / Bannière** - les galeries d'images par type ; voir [Bannières et logos](/docs/banners-and-logos/).
- **Envelopper dans {{del}} / Envelopper dans {{delete}}** - enveloppe la sélection courante dans des balises conditionnelles.
- **Me définir une signature de test** - rend à partir de votre propre fiche Directory et applique uniquement à votre propre boîte Gmail.
- **Nom et icône** - un libellé, une icône et une couleur affichés dans les listes de modèles (jamais rendus dans les signatures).

## Validation et assainissement

L'enregistrement valide le modèle et rejette :

- les jetons inconnus (tout ce qui n'est pas une variable connue, un jeton d'image ou une balise conditionnelle),
- les paires `{{del}}` / `{{delete}}` non équilibrées.

Le HTML est assaini à l'enregistrement : les scripts, les iframes, les gestionnaires d'événements (`onclick=` et consorts) et les URL `javascript:` sont retirés. Les signatures sont par nature du HTML statique - Gmail retirerait de toute façon le contenu actif.

> [!TIP]
> Les signatures Gmail se rendent mieux avec des mises en page à base de tableaux et des styles en ligne. Évitez les fichiers CSS externes et les polices web ; la plupart des clients mail les ignorent.

## Le modèle par défaut

Un modèle peut être marqué comme **Par défaut**. Les utilisateurs qui ne sont couverts par aucune [affectation](/docs/assignments/) ni aucun choix [self-service](/docs/self-service/) y reviennent - tout comme les utilisateurs dont l'affectation a été supprimée.

## Interrupteur self-service

Chaque modèle a un interrupteur self-service contrôlant si les utilisateurs finaux peuvent le choisir sur la page [Ma signature](https://app.signature.cat/self-service). Le désactiver efface les choix self-service qui l'utilisent (avec une confirmation). Détails : [Self-service](/docs/self-service/).

## Supprimer un modèle

Supprimer un modèle inutilisé le retire simplement. Supprimer un modèle **en cours d'utilisation** affiche d'abord un dialogue en cascade détaillant exactement ce qui part avec lui :

- ses affectations de groupe et d'OU,
- les choix self-service faits par les utilisateurs,
- les tâches d'application en attente (annulées).

> [!WARNING]
> Confirmer avec **Supprimer quand même** retire définitivement le modèle avec ses affectations et ses choix self-service. Les utilisateurs qu'ils couvraient reviennent au modèle par défaut à la prochaine synchronisation. Cette action est irréversible.
