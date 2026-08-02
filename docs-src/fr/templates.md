---
title: Modèles
navTitle: Modèles
description: Fonctionnement des modèles de signature SignatureCat - les éditeurs visuel et HTML, l'aperçu en direct, l'application de test vers Gmail, le modèle par défaut et la suppression sécurisée.
updated: 2026-08-02
---

# Modèles

Un modèle est un document HTML unique avec des jetons `{{variable}}` que SignatureCat rend par utilisateur. Les modèles se trouvent sur la page [Signatures](https://app.signature.cat/signatures) (niveaux Designer, Editor et Admin) et sont modifiés soit dans l'[éditeur visuel](/docs/visual-editor), soit dans un éditeur de code, tous deux avec aperçu en direct.

Chaque entrée de la liste porte son nom, son icône et sa couleur, un marqueur **Par défaut** là où il s'applique, et **Dernière modification par** avec la personne qui l'a modifié en dernier - utile quand plusieurs admins se partagent le travail. **Dupliquer** crée une copie indépendante d'un modèle, pour essayer une variante sans toucher à l'original.

Pour une première prise en main guidée, voir [Créer votre premier modèle](/docs/create-your-first-template). Le jeu de variables a sa propre page : [Variables de modèle](/docs/template-variables).

## L'éditeur

L'éditeur sur `app.signature.cat/signatures/{id}` a deux onglets et s'ouvre dans le mode dans lequel le modèle a été enregistré pour la dernière fois :

- **Visuel** - concevez sur un canevas sans écrire de HTML : puces de variables, poignées de redimensionnement d'images, colonnes, séparateurs, images ponctuelles depuis une URL, polices et une palette de couleurs compatible e-mail. Il a une [page dédiée](/docs/visual-editor).
- **HTML** - modifiez directement le balisage de la signature, avec l'autocomplétion pour tous les jetons `{{variable}}`.

La conversion de HTML vers Visuel est à sens unique et au mieux (les mises en page à tableaux complexes sont aplaties ; l'éditeur avertit d'abord) ; enregistrer depuis l'onglet HTML abandonne le document visuel. Dans les deux modes, vous disposez de :

- **Aperçu** - rendu en direct de la signature résolue, dans un bac à sable. **Rendre comme** substitue la fiche Directory de n'importe quel utilisateur réel pour vérifier les cas limites (noms longs, numéros de téléphone manquants), et l'aperçu peut imiter cinq clients mail en clair et en sombre ; voir [Aperçu par client de messagerie](/docs/mail-client-preview).
- **Insérer une variable** - menu de toutes les variables de personne, groupées avec des indications.
- **Logo / Bannière** - les galeries d'images par type ; voir [Bannières et logos](/docs/banners-and-logos).
- **Envelopper dans {{del}} / Envelopper dans {{delete}}** - enveloppe la sélection courante dans des balises conditionnelles.
- **Me définir une signature de test** - rend à partir de votre propre fiche Directory et applique uniquement à votre propre boîte Gmail. SignatureCat relit ensuite ce que Gmail a réellement enregistré, une signature que Gmail a tronquée en l'enregistrant est donc signalée au lieu de paraître correcte ; voir [Quand Gmail tronque votre signature](/docs/gmail-sanitization).
- **Annuler les modifications** - apparaît dès que vous avez des modifications non enregistrées et restaure la dernière version enregistrée, après une confirmation.
- **Nom et icône** - un libellé, une icône et une couleur affichés dans les listes de modèles (jamais rendus dans les signatures).

## Validation et assainissement

L'enregistrement valide le modèle et rejette :

- les jetons inconnus (tout ce qui n'est pas une variable connue, un jeton d'image ou une balise conditionnelle),
- les paires `{{del}}` / `{{delete}}` non équilibrées.

Les messages d'erreur sont précis : un jeton inconnu est nommé et les balises conditionnelles non équilibrées viennent avec leurs décomptes d'ouverture/fermeture. Un compteur en direct suit la limite de signature de 10 000 caractères de Gmail.

Le HTML est assaini à l'enregistrement : les scripts, les iframes, les gestionnaires d'événements (`onclick=` et consorts) et les URL `javascript:` sont retirés. Les signatures sont par nature du HTML statique - Gmail retirerait de toute façon le contenu actif.

Gmail assainit lui aussi, sur ses propres serveurs, au moment où il stocke la signature : une écriture peut réussir et Gmail conserver malgré tout une copie simplifiée d'une mise en page compliquée. SignatureCat compare les deux et vous indique quand c'est arrivé - la marche à suivre se trouve dans [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

> [!TIP]
> Les signatures Gmail se rendent mieux avec des mises en page à base de tableaux et des styles en ligne. Évitez les fichiers CSS externes et les polices web ; la plupart des clients mail les ignorent.

## Le modèle par défaut

Un modèle peut être marqué comme **Par défaut**. Les utilisateurs qui ne sont couverts par aucune [affectation](/docs/assignments) ni aucun choix [self-service](/docs/self-service) y reviennent - tout comme les utilisateurs dont l'affectation a été supprimée.

## Interrupteur self-service

Chaque modèle a un interrupteur self-service contrôlant si les utilisateurs finaux peuvent le choisir sur la page [Ma signature](https://app.signature.cat/self-service). Le désactiver efface les choix self-service qui l'utilisent (avec une confirmation). Détails : [Self-service](/docs/self-service).

## Supprimer un modèle

Supprimer un modèle inutilisé le retire simplement. Supprimer un modèle **en cours d'utilisation** affiche d'abord un dialogue en cascade détaillant exactement ce qui part avec lui :

- ses affectations de groupe et d'OU,
- les choix self-service faits par les utilisateurs,
- les tâches d'application en attente (annulées).

> [!WARNING]
> Confirmer avec **Supprimer quand même** retire définitivement le modèle avec ses affectations et ses choix self-service. Les utilisateurs qu'ils couvraient reviennent au modèle par défaut à la prochaine synchronisation. Cette action est irréversible.
