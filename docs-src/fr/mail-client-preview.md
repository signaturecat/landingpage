---
title: Aperçu par client de messagerie
navTitle: Aperçu par client de messagerie
description: Voyez une signature Gmail sur des surfaces simulées Gmail, Outlook et Apple Mail, en clair et en sombre - ce que l'aperçu SignatureCat montre et ce qu'il ne montre pas.
updated: 2026-08-02
---

# Aperçu par client de messagerie

L'aperçu situé à côté de l'éditeur dessine votre signature sur une surface de client de messagerie simulée : votre HTML, inchangé, sur le fond de page de ce client, dans sa police par défaut, avec l'unique changement de couleur que ce client opère en mode sombre. C'est une approximation, pas le moteur de rendu du client lui-même.

L'application le dit elle-même, derrière l'icône d'information au bout de la rangée des clients ("Ce que cet aperçu montre et ne montre pas") :

> Approximation : le HTML de la signature est inchangé, seuls la surface et la façon dont ce client repeint les couleurs en mode sombre changent. Ce n'est pas un rendu par le moteur du client.

Utilisez la simulation pour repérer tôt les erreurs de couleur et de mise en page. Utilisez **Me définir une signature de test** et votre propre boîte mail pour obtenir la réponse qui compte.

## Ce qu'un profil de client change

Un profil change quatre choses autour de votre signature et rien à l'intérieur :

- le fond de page derrière le message,
- la couleur de texte par défaut,
- la couleur de lien par défaut,
- la police et la taille par défaut du client.

Tout ce que votre modèle définit explicitement - polices, couleurs, largeurs de tableaux, tailles d'images - est transmis sans modification. C'est aussi pourquoi la police par défaut compte : une signature qui ne définit aucune `font-family` hérite de la valeur par défaut du client du destinataire, et chaque profil vous montre laquelle ce serait.

Les boutons en pastille au-dessus du cadre ("Client de messagerie simulé") changent de profil, et un sélecteur **Clair** / **Sombre** se trouve juste à côté. L'aperçu s'ouvre sur **Gmail (web)** en mode **Clair** - la surface qui montre la signature telle qu'elle a été écrite - et retient le client et le mode que vous avez choisis pour votre prochaine visite. Le cadre est en bac à sable : aucun script ne s'y exécute, et les liens de la signature s'ouvrent dans un nouvel onglet.

## Les cinq profils de client

| Profil | Ce qu'il simule | Pourquoi il est là |
|---|---|---|
| **Gmail (web)** | Gmail dans un navigateur : page blanche, Arial, mode clair uniquement | La vue telle qu'écrite, et le profil sur lequel l'aperçu s'ouvre |
| **Gmail (app)** | Gmail sur un téléphone : Roboto, inversion complète en mode sombre | Le client à inversion complète le plus répandu |
| **Outlook (classic, Windows)** | Le moteur de rendu de Word : une pile Aptos/Calibri en 11pt, plus des règles de géométrie, et une inversion forcée en mode sombre | Le seul profil qui approxime aussi un autre moteur de mise en page |
| **Outlook.com** | Outlook sur le web : Segoe UI, et un mode sombre qui conserve les couleurs que vous avez définies explicitement | Le cas de l'inversion partielle, où seules certaines couleurs changent |
| **Apple Mail** | Apple Mail sur macOS et iOS : la police système, inversion complète en mode sombre | Le second client à inversion complète, avec d'autres valeurs par défaut |

Quatre des cinq proposent à la fois le clair et le sombre, ce qui fait neuf combinaisons client-mode au total. Les noms de marque sont délibérément laissés non traduits dans toutes les versions linguistiques de l'application.

## Clair et sombre

Chaque profil applique l'unique transformation de couleur que ce client effectue réellement en mode sombre - et les cinq ne sont pas la même transformation.

| Profil | Mode sombre |
|---|---|
| Gmail (web) | Non proposé. L'interface web de Gmail assombrit ce qui entoure le message, jamais le message lui-même. |
| Gmail (app) | Inversion complète, sauf si la signature peint son propre fond. |
| Apple Mail | Inversion complète, sauf si la signature peint son propre fond. |
| Outlook (classic, Windows) | Inverse toujours, même une signature qui apporte son propre fond, parce que Word repeint quoi qu'il arrive. |
| Outlook.com | Partielle : une surface sombre avec du texte et des liens par défaut plus clairs, tandis que toute couleur définie explicitement dans la signature reste intacte. |

La moitié **Sombre** du sélecteur est désactivée pour **Gmail (web)**, avec la raison affichée sur le contrôle : "Gmail (web) assombrit sa propre interface, mais jamais les couleurs à l'intérieur d'un message."

### Les signatures qui ont leur propre fond

Si votre signature peint son propre fond opaque, les profils qui inversent ne touchent pas à ses couleurs - et l'aperçu le dit : "Cette signature peint son propre fond, donc un client qui inverse les couleurs n'y touche pas." Un vrai client à inversion automatique laisse un tel contenu intact, la simulation fait donc de même.

Le blanc, `transparent` et les valeurs `rgba()` entièrement transparentes ne comptent pas comme un fond ici. **Outlook (classic, Windows)** fait exception : il inverse quand même, ce qui explique pourquoi les e-mails marketing sombres y ressortent clairs.

### Choisir des couleurs qui survivent aux deux modes

Laissez vos lignes de coordonnées sans couleur explicite et laissez-les hériter. Un client en mode sombre forcé éclaircit le texte hérité, les lignes restent donc lisibles ; un gris foncé codé en dur sur chaque ligne rend bien sur du blanc et disparaît presque sur la surface sombre d'Outlook.com, où les couleurs explicites sont conservées telles quelles. L'aperçu nomme ce cas lui aussi : "Outlook.com conserve les couleurs définies explicitement par l'auteur et n'éclaircit que le texte sans couleur propre : une couleur sombre codée en dur reste sombre ici."

Les starters intégrés sont écrits de cette façon : le nom et l'intitulé de poste portent une couleur, les lignes de coordonnées n'en portent aucune, et les liens utilisent un gris qui offre assez de contraste sur une page blanche comme sur une surface sombre.

## Outlook (classic, Windows) fait son rendu avec Word

Outlook classique sur Windows n'utilise pas de moteur de navigateur - il dessine le courrier avec Word, et ce profil approxime cette géométrie **aussi bien** en clair qu'en sombre. Dans ce profil :

- les coins arrondis sont supprimés, une photo ronde s'affiche donc en carré,
- `display` n'est respecté que sous la forme `display:none`, un span stylé en bloc cesse donc de se comporter comme tel,
- les marges sur `<span>` sont abandonnées,
- le padding ne survit qu'à l'intérieur des cellules de tableau (`td` et `th`),
- `white-space`, `float`, `box-shadow`, `text-shadow`, `opacity`, `transform` et les images de fond sont ignorés,
- `max-width` ne s'applique qu'aux tableaux.

C'est pourquoi les starters intégrés construisent chaque ligne comme un `<div>` avec des marges explicites, placent les gouttières sous forme de padding sur les cellules de tableau et définissent les tailles d'images avec les attributs `width` et `height` plutôt qu'avec du CSS.

> [!NOTE]
> Une photo de profil circulaire ne peut pas avoir le même aspect partout : le moteur de Word ne prend pas en charge les coins arrondis, `{{photo}}` est donc un cercle dans Gmail et Apple Mail et un carré dans Outlook classique. L'aperçu reproduit cette différence au lieu de la masquer.

Une chose à savoir avant de changer d'onglet : ouvrir dans l'[éditeur visuel](/docs/visual-editor) un HTML réglé pour Outlook puis l'enregistrer resérialise le balisage et abandonne une partie de ce qui lui donne sa parité avec Outlook classique - marges de bloc, hauteurs de ligne explicites et padding de cellule. Si vous avez besoin de cette parité, continuez à modifier le modèle sur l'onglet **HTML**.

## Ce que la simulation ne reproduit pas

La simulation s'arrête à la surface. Ce qu'elle ne fait pas :

- exécuter le moteur de rendu propre au client - rien de ce que vous voyez n'est une vraie sortie Gmail ou Outlook ;
- reproduire l'auto-layout des tableaux d'Outlook classique ni la mise à l'échelle 120 DPI qu'il applique ;
- garantir les couleurs exactes des éditeurs - les surfaces sont des approximations représentatives, car aucun éditeur ne publie les vraies valeurs ;
- montrer ce que Gmail enregistre une fois que vous avez sauvegardé. Gmail applique son propre assainissement sur ses serveurs : une signature peut donc être tronquée après une écriture réussie - voir [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

## Rendre comme

Le champ **Rendre comme :** rend le modèle à partir de la fiche Google Directory d'une personne réelle, ce qui vous permet de vérifier les cas que votre propre fiche ne présente pas : un intitulé de poste long, un numéro de téléphone manquant, un service vide.

- Laissez le champ vide et l'aperçu se fait à partir de votre propre fiche Directory.
- Saisissez deux caractères ou plus et des suggestions apparaissent depuis l'annuaire de votre Workspace, chacune avec le nom, l'adresse et la photo Directory. Dix correspondances au maximum, utilisateurs suspendus exclus.
- Le champ accepte aussi le texte libre : vous pouvez donc saisir n'importe quelle adresse - un alias, ou quelqu'un que la recherche ne renvoie pas. L'aperçu se recharge dès que ce que vous avez saisi est une adresse complète. Si rien ne correspond : "Aucune personne correspondante. Vous pouvez aussi saisir n'importe quelle adresse."
- **Effacer et rendre comme moi** remet l'aperçu sur vous.

Rendre comme quelqu'un d'autre exige le niveau d'accès Designer, Editor ou Admin. Les utilisateurs self-service ont le même aperçu, figé sur leur propre fiche. Voir [Gestion des accès](/docs/user-management).

La ligne située juste sous l'aperçu nomme toujours la fiche qui a été utilisée : "Rendu à partir des données Directory de {email}."

Les valeurs se résolvent exactement comme lors d'une vraie application : la fiche Google Directory, avec par-dessus les éventuelles valeurs par utilisateur enregistrées sur l'onglet Données. La liste complète des champs et l'origine de chacun se trouvent dans [Variables de modèle](/docs/template-variables). Si le modèle utilise `{{banner}}` ou `{{logo}}`, une seconde ligne sous l'aperçu vous rappelle que ces jetons sont rendus avec les images choisies pour ce modèle - voir [Bannières et logos](/docs/banners-and-logos).

Quand une cible ne peut pas être rendue, le message est précis :

| Message | Ce qui s'est passé |
|---|---|
| "Aucun utilisateur Workspace trouvé pour {email}. Vérifiez l'adresse et réessayez." | L'adresse ne figure pas dans votre Google Directory. |
| "Cette adresse e-mail ou ce domaine n'est pas valide. Vérifiez et réessayez." | L'adresse ou son domaine est mal formé. |
| "Trop d'actualisations de l'aperçu. Pause d'un instant, puis l'aperçu se rafraîchit." | Trop d'actualisations en peu de temps. L'aperçu reprend de lui-même. |
| "Terminez la configuration de la délégation à l'échelle du domaine pour prévisualiser les signatures." | L'aperçu lit l'annuaire, il a donc besoin d'une délégation vérifiée. Voir [Domain-Wide Delegation](/docs/domain-wide-delegation). |

## La seule vérification totalement fidèle

Votre propre boîte mail est la seule vérification fidèle. Cliquez sur **Me définir une signature de test** dans l'éditeur : SignatureCat rend le modèle à partir de votre propre fiche Directory et l'écrit dans votre propre signature Gmail, personne d'autre n'est donc concerné. Ouvrez ensuite Gmail et regardez le résultat.

Cette vérification répond à une autre question que l'aperçu. L'aperçu montre comment un client dessinerait votre HTML ; la boîte mail montre ce que Gmail a réellement enregistré, et Gmail réécrit les signatures sur ses propres serveurs au moment de l'enregistrement. Si le résultat semble coupé, lisez [Quand Gmail tronque votre signature](/docs/gmail-sanitization).

## Où l'aperçu apparaît

La simulation de client est présente sur les deux surfaces où les signatures sont écrites :

- **L'éditeur de modèle** sur [Signatures](https://app.signature.cat/signatures), pour les niveaux Designer, Editor et Admin - avec les pastilles de clients, le sélecteur clair et sombre, **Rendre comme** et **Me définir une signature de test**. Voir [Modèles](/docs/templates).
- **[Ma signature](https://app.signature.cat/self-service)**, pour les utilisateurs self-service - les mêmes pastilles et le même sélecteur, toujours rendus à partir de la fiche de l'utilisateur connecté ("Rendu à partir de votre propre fiche Directory."). Il n'y a pas de bouton d'application de test sur cette page : l'avertissement indique donc l'autre chemin vers la certitude, "Pour une fidélité totale, enregistrez et regardez la signature dans votre propre boîte mail." Voir [Signatures self-service](/docs/self-service).
