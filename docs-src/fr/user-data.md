---
title: Remplacement des données utilisateur
navTitle: Données utilisateur
description: Stockez des valeurs par utilisateur qui remplacent votre annuaire Google Workspace dans les signatures Gmail - consentement, les neuf champs, édition en self-service et suppression.
updated: 2026-08-02
---

# Remplacement des données utilisateur

L'onglet **Données** permet de stocker votre propre valeur pour un utilisateur précis et de l'utiliser dans les signatures à la place de ce que renvoie l'annuaire Google. La fonction est désactivée tant qu'un Admin ne l'active pas, elle couvre les mêmes neuf [variables](/docs/template-variables) de personne que vos modèles utilisent déjà, et elle n'écrit jamais rien en retour dans Google. La page est [app.signature.cat/data](https://app.signature.cat/data), réservée aux Admins.

## Quand utiliser les remplacements

Utilisez les remplacements pour les manques que vous ne pouvez pas corriger rapidement à la source. Corriger les données dans Google reste la voie recommandée, et l'écran de consentement le dit : **L'annuaire d'abord - les remplacements ensuite**. Le meilleur endroit pour les données des collaborateurs reste l'annuaire Google lui-même (dans la Google Admin console : **Annuaire**, **Utilisateurs**, choisir un utilisateur, **Informations utilisateur**). Les données qui y sont tenues alimentent les signatures automatiquement, sans aucun remplacement, et tous les autres outils Workspace en profitent aussi.

Les bonnes raisons de recourir malgré tout à un remplacement :

- un poste ou un service est erroné aujourd'hui et le processus qui en a la charge ne sera pas corrigé cette semaine ;
- un prestataire n'a pas de numéro de téléphone dans l'annuaire mais en a besoin dans la signature ;
- une personne doit apparaître dans les e-mails sous un prénom d'usage, mais pas dans sa fiche d'annuaire.

Corriger la fiche d'annuaire plus tard ne pose jamais de problème : remettez le champ sur la valeur de l'annuaire et le remplacement disparaît.

## Activer la fonction

Rien n'est stocké avant qu'un Admin n'active la fonction. Ouvrez [Données](https://app.signature.cat/data) et lisez l'écran de consentement **Stocker des données de signature pour certains utilisateurs ?**, qui précise sous **Ce que nous stockons, et quand** :

- rien n'est stocké avant l'activation de la fonction - et ensuite uniquement les valeurs que vous saisissez explicitement, seulement pour les utilisateurs que vous remplacez ;
- chaque modification est consignée dans le journal d'audit (qui, quand et quels champs - jamais les valeurs) ;
- désactiver la fonction supprime définitivement toutes les valeurs stockées, et les utilisateurs retirés de votre Workspace sont nettoyés automatiquement.

Cliquez sur **Activer et stocker les données** pour l'activer. Tant que vous ne le faites pas, les écrans de données ne contiennent rien et la fonction n'effectue aucun appel à l'annuaire.

> [!IMPORTANT]
> Les valeurs que vous saisissez ici sont stockées par SignatureCat, dans sa propre base de données - pas dans votre Google Workspace. Cette fonction ne modifie jamais vos fiches d'annuaire Google.

La page Données nécessite une connexion Workspace vérifiée ; si l'assistant de configuration n'est pas terminé, vous êtes d'abord redirigé vers [Domain-Wide Delegation](/docs/domain-wide-delegation).

## Les champs que vous pouvez remplacer

Neuf champs, un par variable de personne. Une valeur stockée l'emporte sur la valeur de l'annuaire à chaque rendu - aperçu de l'éditeur, application de test, application manuelle et synchronisation quotidienne - donc ce que montre l'éditeur est bien ce qui part. Un champ auquel vous ne touchez pas conserve sa valeur d'annuaire.

| Champ | Variable | Valeur de repli | Limite |
|---|---|---|---|
| **Prénom** | `{{firstname}}` | Prénom dans l'annuaire | 120 caractères |
| **Nom** | `{{lastname}}` | Nom de famille dans l'annuaire | 120 caractères |
| **E-mail (affiché)** | `{{email}}` | Adresse e-mail principale | 320 caractères, doit être une adresse valide |
| **Domaine (affiché)** | `{{domain}}` | Partie domaine de l'adresse principale | 253 caractères, domaine seul comme `yourcompany.com` |
| **Poste** | `{{jobtitle}}` | Intitulé sur l'entrée d'organisation principale de l'utilisateur | 200 caractères |
| **Service** | `{{department}}` | Service sur la même entrée | 200 caractères |
| **URL de la photo** | `{{photo}}` | Photo de profil de l'annuaire | 2048 caractères, lien `https://` uniquement |
| **Adresse** | `{{address}}` | L'adresse principale de l'utilisateur, formatée | 300 caractères |
| **Téléphone** | `{{phone}}` | Le premier non vide parmi professionnel, mobile, domicile | 60 caractères |

> [!WARNING]
> **E-mail (affiché)** et **Domaine (affiché)** ne changent que ce que la signature affiche. Ils ne changent jamais l'adresse de la boîte depuis laquelle les e-mails sont envoyés, et ils ne créent rien dans Google.

Deux autres règles à connaître :

- **URL de la photo** attend un lien public `https://` vers une image que vous hébergez - SignatureCat n'héberge aucune photo de collaborateur.
- Lorsqu'une signature est écrite sur un alias send-as, `{{email}}` et `{{domain}}` suivent l'adresse de l'alias même si vous avez stocké un remplacement pour cet utilisateur ; tous les autres champs conservent leur remplacement. Voir [Modes d'alias](/docs/assignments#modes-dalias).

## Remplacer les données d'un utilisateur

1. Sur [Données](https://app.signature.cat/data), tapez dans **Trouver un utilisateur** - au moins un caractère. Les résultats viennent en direct de votre annuaire Workspace ; une recherche vide ne renvoie volontairement rien, la page ne liste donc jamais tout votre Workspace.
2. Choisissez l'utilisateur dans les résultats. L'éditeur s'ouvre avec chaque champ affichant sa valeur d'annuaire en direct, en lecture seule, marquée d'une icône nuage.
3. Cliquez sur l'icône à côté d'un champ pour le faire passer de **Utiliser la valeur de l'annuaire** à **Remplacer ce champ**, puis saisissez votre valeur. Le mode annuaire est celui par défaut pour chaque champ, et y ramener un champ supprime la valeur stockée à l'enregistrement.
4. Si la donnée est fausse à la source, suivez **Modifier cet utilisateur dans la console d'administration Google** - le lien ouvre la fiche de cet utilisateur dans Google.
5. Cliquez sur **Enregistrer les données**.

Après l'enregistrement, l'application indique ce qui s'est passé pour la boîte mail :

| Ce que dit l'application | Ce que cela signifie |
|---|---|
| "Enregistré. La signature de jane@yourcompany.com sera actualisée dans un instant." | Une actualisation ponctuelle de la signature de cet utilisateur a été mise en file. |
| "Enregistré, mais jane@yourcompany.com n'a pas de signature attribuée - rien n'a été appliqué à sa boîte mail." | L'utilisateur ne correspond à aucune affectation et n'a fait aucun choix self-service : il n'y a donc rien à actualiser. |
| "Enregistré. Le changement s'appliquera à la prochaine synchronisation des signatures." | Rien n'a pu être mis en file pour l'instant ; la synchronisation quotidienne reprendra le changement. |

Chaque utilisateur que vous avez remplacé apparaît sous **Utilisateurs avec des données remplacées**, avec les champs qui portent une valeur, la date et **Dernière modification** (**Administrateur**, **Self-service** ou **Import CSV**). Cette liste provient de la base de données de SignatureCat et n'effectue aucun appel à Google.

Pour des dizaines ou des centaines d'utilisateurs d'un coup, utilisez plutôt **Importer depuis un CSV** - voir [Importer des données utilisateur depuis un CSV](/docs/user-data-import).

## Supprimer un remplacement

Vider tous les champs d'un utilisateur supprime son entrée stockée :

- dans l'éditeur, **Revenir aux données de l'annuaire** supprime toutes ses valeurs stockées d'un coup ;
- dans la liste, **Supprimer le remplacement** sur la ligne fait la même chose ;
- enregistrer un utilisateur dont tous les champs sont revenus en mode annuaire supprime aussi l'entrée.

Il n'existe aucun moyen de forcer une valeur vide : un remplacement vide signifie toujours "utiliser l'annuaire". Si une signature doit masquer complètement un champ manquant, enveloppez plutôt cette ligne dans un [bloc conditionnel](/docs/template-variables#blocs-conditionnels-del-et-delete).

Un utilisateur déjà parti de votre Workspace peut encore être nettoyé à la main - l'éditeur indique "Cet utilisateur n'existe plus dans votre Workspace." et propose **Supprimer le remplacement maintenant**. Le nettoyage automatique supprimerait l'entrée de toute façon.

## Laisser chacun compléter ses propres données

Ouvrez le cadenas **Édition en self-service** sur la page Données pour laisser les utilisateurs saisir leurs propres valeurs sur la page Ma signature. Un bouton **Mes données de signature** apparaît alors sur [app.signature.cat/self-service](https://app.signature.cat/self-service) et ouvre **Complétez vos données**, le même éditeur champ par champ avec **Enregistrer mes données** et **Utiliser les données de l'annuaire**.

- Tout niveau d'accès à partir de **Self-service** peut s'en servir, et uniquement sur sa propre fiche.
- Leurs saisies apparaissent dans votre liste avec **Self-service** dans la colonne **Dernière modification**, à côté de l'adresse de la personne qui les a enregistrées.
- Vous pouvez écraser ou supprimer chacune d'elles ; un enregistrement par un administrateur bascule la source de l'entrée sur **Administrateur**.
- Chaque modification en self-service atterrit dans le journal d'audit, comme les vôtres.

Plus d'informations sur la page Ma signature : [Self-service](/docs/self-service).

## Qui peut faire quoi

L'onglet **Données** est réservé aux Admins, comme [Gestion des accès](/docs/user-management). Tous les autres peuvent au mieux modifier leur propre fiche.

| Qui | Ce qu'il peut faire |
|---|---|
| Admin | Activer et désactiver la fonction, remplacer les données de n'importe quel utilisateur, [importer un CSV](/docs/user-data-import), ouvrir ou fermer l'édition en self-service. |
| Niveau **Self-service** et au-dessus | Modifier uniquement ses propres valeurs, et seulement tant que la fonction est active et l'édition en self-service ouverte. |

## Désactiver la fonction

La section **Désactiver et supprimer** en bas de la page Données efface tout. Cliquez sur **Désactiver le remplacement des données**, puis dans **Supprimer toutes les données stockées ?** suivez **Retapez votre domaine Workspace pour confirmer** et cliquez sur **Tout supprimer et désactiver**.

Toutes les valeurs stockées de votre espace de travail sont supprimées immédiatement, et l'édition en self-service est désactivée avec la fonction. Les signatures reviennent aux données de l'annuaire à la prochaine application.

> [!CAUTION]
> La suppression est définitive et irréversible. Exportez ou notez tout ce que vous voulez conserver avant de confirmer.

La page Données reste accessible même lorsqu'un abonnement a expiré : l'interrupteur d'arrêt vous est donc toujours accessible.

## Cycle de vie et confidentialité

- Des entrées n'existent que pour les utilisateurs que quelqu'un a réellement remplacés - SignatureCat ne duplique jamais votre annuaire.
- Les utilisateurs suspendus conservent leurs valeurs stockées.
- Les utilisateurs supprimés de votre Workspace voient leurs entrées retirées automatiquement, une fois par jour.
- Supprimer votre compte SignatureCat supprime avec lui toutes les valeurs stockées.
- Chaque modification est inscrite au journal d'audit avec qui, quand et quels noms de champs - jamais les valeurs elles-mêmes.
- Désactiver la fonction supprime tout, immédiatement.

Les documents contractuels et le résumé sur la confidentialité se trouvent sur la page [Informations légales](/docs/legal).
