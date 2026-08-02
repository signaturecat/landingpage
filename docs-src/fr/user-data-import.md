---
title: Importer des données utilisateur depuis un CSV
navTitle: Import de données
description: Chargez en masse les données de signature par utilisateur dans SignatureCat depuis un fichier CSV - colonnes, règles de remplacement, limites, étape d'aperçu et synchronisation Gmail ensuite.
updated: 2026-08-02
---

# Importer des données utilisateur depuis un CSV

Un import CSV définit les valeurs stockées de nombreux utilisateurs d'un coup, sur [app.signature.cat/data/import](https://app.signature.cat/data/import) ou via **Importer depuis un CSV** sur la page [Données](https://app.signature.cat/data). Le fichier est vérifié avant que quoi que ce soit ne soit écrit, et l'import entier est tout-ou-rien. Activez d'abord la fonction - voir [Remplacement des données utilisateur](/docs/user-data).

## Quand l'utiliser

Utilisez l'import quand vous avez des dizaines ou des centaines d'utilisateurs à renseigner, typiquement directement depuis un export RH. Pour une seule personne, l'éditeur par utilisateur est plus rapide et actualise sa signature immédiatement.

L'import ne touche que les adresses listées dans le fichier. Tous les autres conservent ce qu'ils ont, y compris les utilisateurs sans aucune donnée stockée.

## Le fichier

Partez de **Télécharger le modèle CSV** sur la page d'import - il contient la ligne d'en-tête et une ligne d'exemple :

```
email,firstname,lastname,jobtitle,department,photo,address,phone
jane.doe@yourcompany.com,Jane,Doe,Senior Account Manager,Sales,https://yourcompany.com/photos/jane.jpg,"Main Street 1, 00-001 Warsaw",+48 600 000 000
```

Le format est du CSV ordinaire : séparé par des virgules, une ligne d'en-tête, les valeurs contenant une virgule entourées de guillemets doubles (un guillemet à l'intérieur d'une valeur entre guillemets est doublé), fins de ligne LF ou CRLF, UTF-8.

`email` est obligatoire dans chaque fichier. Cette colonne identifie l'utilisateur dont la ligne remplace l'entrée et doit être l'adresse Workspace **principale** de cet utilisateur - ce n'est pas un remplacement de la variable `{{email}}`, et elle n'est écrite dans aucune signature. Les alias ne sont pas résolus ici : une ligne indiquant un alias n'atteint donc jamais la signature de cette personne.

Ajoutez au moins une des colonnes de données. Chacune renseigne le champ du même nom sur l'écran [Données](https://app.signature.cat/data) :

| Colonne | Renseigne | Limite |
|---|---|---|
| `firstname` | **Prénom**, `{{firstname}}` | 120 caractères |
| `lastname` | **Nom**, `{{lastname}}` | 120 caractères |
| `jobtitle` | **Poste**, `{{jobtitle}}` | 200 caractères |
| `department` | **Service**, `{{department}}` | 200 caractères |
| `photo` | **URL de la photo**, `{{photo}}` | 2048 caractères, lien `https://` uniquement |
| `address` | **Adresse**, `{{address}}` | 300 caractères |
| `phone` | **Téléphone**, `{{phone}}` | 60 caractères |

Les colonnes peuvent apparaître dans n'importe quel ordre, mais chaque en-tête doit être l'un des noms ci-dessus et aucun ne peut apparaître deux fois.

> [!IMPORTANT]
> Les remplacements **E-mail (affiché)** et **Domaine (affiché)** ne sont volontairement pas importables - cela garde la colonne `email` sans ambiguïté. Définissez ces deux champs utilisateur par utilisateur dans l'éditeur de la page [Données](https://app.signature.cat/data).

## Ce que fait une ligne

Une ligne remplace toute l'entrée stockée de cet utilisateur - ce n'est pas une mise à jour partielle :

- une cellule remplie stocke cette valeur ;
- une cellule vide signifie "utiliser l'annuaire" et efface toute valeur stockée pour ce champ ;
- une colonne que vous avez omise de l'en-tête est effacée elle aussi, pour chaque adresse du fichier ;
- une ligne avec une adresse et aucune valeur supprime entièrement l'entrée de cet utilisateur ;
- les utilisateurs absents du fichier ne sont jamais touchés.

Ainsi, un fichier avec seulement `email` et `phone` efface tous les autres champs stockés des utilisateurs listés. Exportez ce que vous avez déjà, ou listez toutes les colonnes que vous voulez conserver.

## Limites

Jusqu'à **2000 lignes de données** et **1 Mo** par fichier. Les fichiers plus gros sont rejetés avant le téléversement - découpez les données en plusieurs fichiers et importez-les l'un après l'autre.

## Téléverser, vérifier, confirmer

Rien n'est écrit tant que vous n'avez pas confirmé l'aperçu :

1. **Téléversement.** Choisissez le fichier avec **Choisir un fichier CSV**. Il est analysé et validé immédiatement.
2. **Vérifier avant l'import.** Vous obtenez un résumé (combien de lignes, combien sont nouvelles, combien mettent à jour une entrée existante) et un tableau des lignes marquées **Nouveau** ou **Mise à jour**, avec "annuaire" affiché partout où une cellule effacerait une valeur. Les fichiers très longs n'affichent que les premières lignes ; toutes sont importées.
3. **Confirmation.** Cliquez sur **Importer N lignes**. C'est seulement à ce moment que quelque chose est écrit. L'écran de résultat indique combien d'entrées ont été enregistrées et combien de lignes vides ont supprimé une entrée.

## Une seule ligne fautive rejette tout le fichier

L'import est tout-ou-rien : si une ligne ou le fichier lui-même échoue à la validation, rien n'est écrit et aucune entrée ne change. Corrigez le fichier et téléversez-le de nouveau.

Problèmes sur une seule ligne :

| Ce que dit l'application | Cause et correctif |
|---|---|
| "L'adresse e-mail n'est pas valide." | La cellule `email` n'est pas une adresse syntaxiquement valide. |
| "Cet e-mail apparaît plusieurs fois dans le fichier." | La même adresse est listée deux fois. Fusionnez les lignes en une seule - une ligne remplace toute l'entrée, la seconde l'emporterait donc silencieusement. |
| "La ligne n'a pas le même nombre de cellules que l'en-tête." | Généralement une virgule non protégée à l'intérieur d'une valeur. Entourez ces valeurs de guillemets doubles. |
| "La ligne contient des caractères de contrôle (p. ex. un saut de ligne dans une valeur)." | Les valeurs doivent être du texte brut sur une seule ligne. Retirez les sauts de ligne et les tabulations, y compris dans les cellules entre guillemets. |
| "Une valeur n'est pas valide pour sa colonne." | Une valeur dépasse la limite indiquée ci-dessus, ou une cellule `photo` n'est pas un lien `https://`. |

Problèmes qui rejettent d'emblée le fichier :

| Ce que dit l'application | Cause et correctif |
|---|---|
| "Le fichier ne contient aucune ligne de données." | Le fichier ne contient qu'un en-tête. |
| "La colonne email est absente." | Ajoutez la colonne `email` obligatoire. |
| "Ajoutez au moins une colonne de données en plus de email." | Un fichier d'adresses seules ne fait rien. |
| "Colonne inconnue dans l'en-tête." | Seuls les huit noms de colonnes documentés sont acceptés, orthographiés exactement. |
| "Une colonne apparaît deux fois dans l'en-tête." | Retirez le doublon. |
| "Le fichier dépasse 2000 lignes de données." | Découpez le fichier. |
| "Un guillemet n'est jamais refermé - vérifiez les guillemets." | Un guillemet double ouvrant n'a pas de fermant - souvent un guillemet parasite dans une adresse. |

> [!TIP]
> Les exports de tableur sont la source habituelle des ennuis : vérifiez que votre outil a bien enregistré du CSV simple (pas séparé par des points-virgules) et qu'aucune cellule ne contient de saut de ligne.

## Après l'import

Les valeurs importées atteignent les boîtes mail à la prochaine synchronisation quotidienne. Pour les appliquer plus tôt, utilisez **Synchroniser les signatures maintenant** sur l'écran de résultat - une synchronisation des signatures démarre immédiatement. Le bouton est facultatif ; le sauter laisse simplement le changement à la synchronisation quotidienne. Si une synchronisation est déjà en cours, l'application le signale, et ce que cette exécution manque est appliqué par la suivante.

Contrairement à un enregistrement pour un seul utilisateur sur la page [Données](https://app.signature.cat/data), un import n'actualise pas les signatures de lui-même - c'est la raison d'être de ce bouton.

> [!NOTE]
> Une ligne pour une adresse qui n'existe pas dans votre Workspace est acceptée (seule la forme des adresses est vérifiée), ne correspond jamais à une boîte mail et est nettoyée automatiquement plus tard. C'est sans danger, mais autant la retirer de votre fichier source.

À lire aussi : [Remplacement des données utilisateur](/docs/user-data), [Variables de modèle](/docs/template-variables), [Journaux](/docs/logs).
