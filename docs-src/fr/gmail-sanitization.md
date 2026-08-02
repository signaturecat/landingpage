---
title: Quand Gmail tronque votre signature
navTitle: Troncature par Gmail
description: Pourquoi Gmail peut conserver une copie tronquée d'une signature appliquée par SignatureCat dans votre Google Workspace, comment la repérer et comment corriger le modèle.
updated: 2026-08-02
---

# Quand Gmail tronque votre signature

Si SignatureCat signale une application réussie mais que la signature dans Gmail semble coupée, c'est que Gmail l'a tronquée après l'écriture. Gmail applique son propre assainissement sur les serveurs de Google chaque fois qu'il enregistre une signature : la copie que Gmail conserve peut donc être structurellement différente de celle que SignatureCat a envoyée - l'écriture réussit et le résultat stocké est malgré tout plus court. SignatureCat compare les deux à chaque écriture et vous prévient quand elles diffèrent.

## Pourquoi Gmail modifie une signature qui s'est appliquée avec succès

Gmail assainit le HTML des signatures sur ses propres serveurs, selon des règles que Google ne publie pas. L'appel d'API peut renvoyer un succès et Gmail peut malgré tout conserver une copie réduite, en supprimant les éléments qu'il ne voulait pas stocker. La réécriture a lieu chez Google, après que votre modèle a quitté SignatureCat : ni la validation du modèle ni l'aperçu ne peuvent donc la prévoir.

SignatureCat le détecte immédiatement après coup. Chaque écriture de signature lit la copie que Gmail renvoie dans sa propre réponse d'écriture - ce corps de réponse est la signature enregistrée, déjà assainie - et compare sa structure avec ce qui a été envoyé. La vérification ne coûte aucun appel supplémentaire à l'API Google, et elle s'exécute sur les quatre chemins d'écriture : les applications ponctuelles, la synchronisation quotidienne des affectations et les deux chemins d'écriture des alias. Les réécritures cosmétiques ne déclenchent pas d'avertissement : entités réencodées, espaces, `b` remplacé par `strong` ou `i` par `em`, ou encore Gmail qui enveloppe votre signature dans son propre balisage sont tous considérés comme bénins. L'avertissement ne se déclenche que lorsque des éléments structurels ont réellement disparu.

> [!NOTE]
> C'est un comportement de Gmail du côté de Google, pas un réglage de SignatureCat, et il ne peut pas être désactivé. L'assainissement propre à SignatureCat est autre chose : il intervient plus tôt, à l'enregistrement d'un modèle, et retire les scripts, les iframes et les gestionnaires d'événements en ligne - voir [Modèles](/docs/templates).

## Où l'avertissement apparaît

Deux endroits le signalent : les résultats des tâches dans [Journaux](/docs/logs) et l'application de test dans l'éditeur de modèle.

### Dans les journaux et sur la vue de la tâche

La ligne par utilisateur garde sa coche verte et reçoit un badge ambre **tronquée par Gmail** accompagné de la phrase "Signature appliquée, mais Gmail a enregistré une copie tronquée." Le même badge et la même phrase apparaissent sur la vue complète de la tâche, à l'adresse `app.signature.cat/jobs/{id}`.

Ouvrez **Détails techniques** sur la ligne pour obtenir les faits bruts : combien de caractères ont été envoyés, combien Gmail en a enregistré, et quels éléments ont été supprimés avec leurs décomptes avant et après, par exemple :

```
Gmail stored a sanitized copy of the signature (2712 -> 1580 chars; dropped tags: tr 5->3, img 2->1)
```

Une signature que Gmail a enregistrée entièrement vide porte le même badge et la même phrase - seuls les détails techniques indiquent que la signature stockée est vide. Le code d'erreur par utilisateur derrière le badge est `GMAIL_SIGNATURE_SANITIZED` ; contrairement aux codes de [Vérifier une tâche d'affectation](/docs/verify-assignments), il figure sur une ligne réussie et constitue un avertissement, pas un échec.

### Après une application de test dans l'éditeur

Cliquez sur **Me définir une signature de test** dans l'éditeur de modèle : SignatureCat écrit le modèle dans votre propre signature Gmail, puis relit votre boîte. Si Gmail l'a tronquée, un avis ambre, que vous pouvez fermer, apparaît avec l'un de ces deux titres :

| Titre | Ce que Gmail a enregistré |
|---|---|
| Signature appliquée, mais Gmail a enregistré une copie tronquée. | Une copie réduite, structurellement différente. |
| Signature appliquée, mais Gmail a enregistré une signature vide. | Rien du tout. |

Le corps indique "Gmail réécrit les signatures sur ses serveurs lors de l'enregistrement. Vérifiez votre boîte mail et simplifiez les parties concernées si un élément manque." Le bloc de détails affiche "{sent} caractères envoyés, {stored} enregistrés par Gmail." et "Éléments supprimés : {list}". **Fermer l'avertissement** ferme l'avis.

> [!TIP]
> C'est le moyen le plus rapide de trouver la construction que Gmail rejette : cette action ne touche que votre propre boîte et elle vérifie le résultat après chaque écriture, chaque tentative se résume donc à un clic.

## Pourquoi la ligne compte quand même comme réussie

L'écriture a fonctionné : la ligne reste une réussite. Gmail a accepté la requête et enregistré une signature ; appliquer à nouveau le même modèle envoie le même HTML et Gmail stocke la même copie tronquée. Relancer le déploiement ne change donc rien.

Le correctif est dans le modèle, pas dans la tâche :

1. Lisez les éléments supprimés dans les détails techniques - ils nomment les parties qui ont disparu.
2. Simplifiez cette partie du modèle : aplatissez l'imbrication, découpez un bloc compliqué en blocs simples, retirez l'élément qui se trouve là où la signature est coupée.
3. Appliquez-le à vous-même avec **Me définir une signature de test** et vérifiez si l'avertissement a disparu.
4. Relisez la boîte mail pour confirmer ce que Gmail a réellement conservé.
5. Réappliquez aux utilisateurs concernés une fois que le test revient propre.

## Vérifier ce qui se trouve réellement dans la boîte

Deux actions sur [Journaux](/docs/logs) lisent une signature en direct depuis la boîte au lieu d'afficher ce que SignatureCat a envoyé en dernier :

- **Afficher la signature actuelle** - sur une ligne par utilisateur réussie. Ouvre un aperçu en lecture seule de la signature actuellement stockée sur cette adresse.
- **Vérifier la signature d'un employé** - dans l'en-tête de la page Journaux. Recherchez n'importe quel utilisateur de votre Workspace et cliquez sur **Afficher la signature**.

Toutes deux interrogent Gmail au moment où vous cliquez : elles détectent donc aussi les signatures qu'un utilisateur a modifiées à la main dans Gmail, et pas seulement la troncature opérée par Gmail. Si la boîte n'a aucune signature, la fenêtre indique "{email} n'a pas de signature définie dans Gmail." La consultation est ouverte aux niveaux Editor et Admin, et chacune est enregistrée dans votre journal d'activité avec l'adresse qui a été lue.

## Ce qui survit en général, ce qui est tronqué en général

Google ne documente pas les règles : considérez ce qui suit comme des observations plutôt que comme une spécification.

- **Le seul cas observé en production :** un modèle écrit à la main combinant un tableau imbriqué, une barre horizontale, une image de bannière et une mention légale en italique s'est appliqué avec succès - et Gmail n'a conservé que la partie située au-dessus de la barre horizontale. Tout ce qui se trouvait en dessous avait disparu de la boîte.
- **L'imbrication profonde est le suspect habituel.** Les mises en page faites de tableaux dans des tableaux dans des tableaux donnent à Gmail le plus de matière à réécrire.
- **Les différences cosmétiques ne sont pas des troncatures.** Si votre signature est correcte dans la boîte et qu'aucun avertissement n'est apparu, la resérialisation de votre balisage par Gmail est sans conséquence.

SignatureCat surveille la disparition des éléments structurels : liens, sauts de ligne, `div`, `hr`, images, listes et éléments de liste, paragraphes, `span`, tableaux avec leurs lignes et leurs cellules, plus le gras et l'italique. Ce sont les noms que vous verrez dans la liste des éléments supprimés.

Quand quelque chose est signalé, simplifiez la partie concernée, testez-la sur votre propre boîte et relisez la boîte plutôt que de vous fier à l'aperçu - l'aperçu rend le HTML que SignatureCat envoie, c'est-à-dire exactement la copie que Gmail est susceptible de réduire.

## La limite de 10 000 caractères de Gmail

Gmail plafonne une signature à 10 000 caractères de HTML, et c'est un mode d'échec distinct, qui survient plus tôt : il porte sur la taille, pas sur la structure, et il vous arrête avant que quoi que ce soit n'atteigne Gmail. L'[éditeur visuel](/docs/visual-editor) affiche un compteur de budget en direct dans le coin du canevas, qui indique "{used} / {max} caractères" et change de couleur à l'approche du plafond. Au-delà de la limite, l'éditeur indique "La signature dépasse la limite Gmail de 10 000 caractères HTML. Raccourcissez-la pour enregistrer." et l'enregistrement est refusé.

Un modèle qui tient dans le budget peut malgré tout être tronqué par Gmail, et une signature tronquée est en général bien en deçà du plafond - les deux problèmes n'ont aucun rapport.

## Quand contacter le support

Écrivez au support quand une signature est tronquée et que la simplifier n'y change rien, ou quand le même modèle est enregistré correctement pour certains utilisateurs et tronqué pour d'autres. Voir [Obtenir de l'aide](/docs/get-help) pour l'adresse et la liste de contrôle générale, et joignez :

- le **lien de la tâche** (`app.signature.cat/jobs/...`) ou une capture d'écran de la ligne avec le badge **tronquée par Gmail**,
- le texte complet derrière **Détails techniques** (décomptes de caractères et éléments supprimés),
- le modèle concerné, et quelle partie de celui-ci disparaît dans la boîte,
- si **Me définir une signature de test** sur votre propre boîte reproduit le problème.

> [!IMPORTANT]
> Le support ne peut pas forcer Gmail à conserver un balisage qu'il a décidé de supprimer - c'est Google qui le contrôle. Ce que le support peut faire, c'est aider à identifier quelle construction du modèle déclenche la troncature.
