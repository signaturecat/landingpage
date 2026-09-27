# Politique de confidentialité de Signature.Cat

Version 1.3 - en vigueur à compter du 27.09.2026

**La présente Politique de confidentialité est disponible en polonais à l'adresse https://signature.cat/privacy en tant que version juridiquement contraignante. Le présent document est une traduction automatique de l'original polonais, fournie à titre purement informatif, et peut contenir des erreurs ou des inexactitudes. En cas de divergence, la version polonaise prévaut.**

---

## 1. Responsable du traitement et contact

Le responsable du traitement des données personnelles dans le périmètre décrit dans la présente Politique est **Tomasz Piasecki**, exerçant une activité économique sous la raison sociale **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (ci-après : « nous », « le Prestataire »).

Contact pour toutes les questions relatives aux données personnelles : **contact@signature.cat**.

## 2. Champ d'application du document

La Politique concerne :

- l'application **app.signature.cat** (le service Signature.Cat - gestion centralisée des signatures Gmail dans Google Workspace, ci-après : « le Service »),
- le site d'information **signature.cat** avec ses sous-pages linguistiques, sa documentation ainsi que les formulaires et outils disponibles sur ce site (formulaire de contact, formulaire d'aide, générateur de bannières),
- la liste de diffusion (informations commerciales envoyées par e-mail aux personnes qui y ont consenti),
- l'hébergement des images de signatures (adresses mises à disposition par le Prestataire ainsi que sous-domaines configurés par les Clients),
- la correspondance échangée avec nous (e-mail, demandes, réclamations).

Le Service est destiné exclusivement aux entrepreneurs (B2B). Les termes commençant par une majuscule ont le sens qui leur est donné dans les Conditions (https://signature.cat/terms).

## 3. Deux rôles : responsable du traitement et sous-traitant

Selon la catégorie de données, nous intervenons dans l'un des deux rôles suivants :

**a) Responsable du traitement** - en ce qui concerne :
- les données des Utilisateurs se connectant au Service (personnes agissant au nom du Client),
- les données de facturation et de contact du Client,
- les données des personnes visitant le site signature.cat et utilisant les formulaires disponibles sur celui-ci,
- les données des personnes qui nous contactent ainsi que des personnes inscrites à notre liste de diffusion.

**b) Sous-traitant (processeur)** - en ce qui concerne les données personnelles des employés et collaborateurs du Client, traitées dans le cadre du Service sur instruction du Client. Le responsable du traitement de ces données est le Client. Le traitement consiste en :
- la lecture des données du répertoire des utilisateurs Google Workspace du Client (prénom, nom, adresse e-mail avec les alias, poste, service, numéros de téléphone, adresse, adresse URL de la photo de profil) **exclusivement en temps réel, au moment de l'aperçu ou du déploiement de la signature** - ces valeurs ne sont pas conservées par nous après la fin de l'opération ;
- la conservation des valeurs des champs de signature saisies par le Client dans le cadre de la fonction **Données des utilisateurs** - fonction optionnelle, désactivée par défaut, activée par une décision autonome de l'administrateur du Client (description ci-dessous) ;
- l'écriture de la signature rendue dans les paramètres Gmail de l'utilisateur concerné (la signature reste dans l'environnement Google du Client) ;
- la lecture de la signature enregistrée dans les paramètres Gmail de l'utilisateur concerné - automatiquement après chaque déploiement ainsi qu'à la demande d'une personne autorisée par le Client (description ci-dessous) ;
- la conservation de courte durée des adresses e-mail concernées par le déploiement dans l'historique des tâches (30 jours, aux fins du rapport de déploiement) ;
- la conservation des contenus que le Client place lui-même dans les modèles de signatures ou les images.

**Données des utilisateurs (valeurs saisies par le Client).** La fonction est désactivée par défaut et son activation nécessite une décision expresse de l'administrateur du Client. Une fois la fonction activée, nous conservons dans notre base de données les valeurs des champs de signature relatives aux personnes désignées par le Client : prénom, nom, adresse e-mail affichée, domaine affiché, poste, service, adresse URL de la photo, adresse et numéro de téléphone, ainsi que l'indication de la personne ayant effectué la dernière modification et de la date de celle-ci. Les valeurs sont saisies par l'administrateur du Client, par l'utilisateur lui-même (si le Client l'y autorise) ou par l'import d'un fichier CSV ; elles remplacent les données du répertoire Google Workspace exclusivement aux fins du rendu de la signature. Une entrée n'existe que pour les personnes pour lesquelles le Client a saisi au moins une valeur. La désactivation de la fonction par le Client supprime définitivement toutes les valeurs conservées, et les entrées des personnes supprimées du Google Workspace du Client sont effacées automatiquement par nos soins (pt 8). Dans le journal d'audit, nous consignons qui a modifié quels champs et quand - jamais les valeurs elles-mêmes.

**Lecture de la signature enregistrée.** Google peut modifier de lui-même la signature lors de son enregistrement, c'est pourquoi, après chaque déploiement, nous vérifions quel contenu de signature Gmail a enregistré. Cette même lecture est disponible à la demande d'une personne autorisée par le Client (aperçu de la signature actuellement définie dans la boîte aux lettres de l'utilisateur indiqué). Le contenu de la signature ainsi lue n'est ni conservé ni mis en cache par nous - nous le présentons exclusivement dans le navigateur de la personne qui effectue la lecture. Dans le journal d'audit, nous consignons l'adresse de la boîte aux lettres vérifiée, le moment de la lecture et la longueur de la signature.

La sous-traitance du traitement est régie par un contrat de sous-traitance (DPA), conclu exclusivement en langue anglaise - sa conclusion intervient à la demande du Client adressée à contact@signature.cat. La liste complète des sous-traitants ultérieurs est mise à la disposition des Clients dans le cadre du DPA ainsi que sur demande.

## 4. Catégories de données traitées (en tant que responsable du traitement)

**Données du compte de l'Utilisateur** - obtenues de Google lors de la connexion (Google OAuth) : identifiant du compte Google, adresse e-mail, prénom et nom, adresse URL de la photo de profil, domaine Workspace ; ainsi que le Niveau d'accès attribué et le rôle dans le Compte.

**Données de facturation** - adresse e-mail de facturation (conservée dans le Service) ; le nom de l'entreprise, l'adresse de facturation, le numéro NIP/VAT ID ainsi que les données de la carte de paiement sont saisis dans les formulaires de l'opérateur de paiement et conservés exclusivement par cet opérateur - nous n'avons pas accès aux données des cartes.

**Contenus du Compte** - modèles de signatures (HTML), configuration des attributions, images (logos, bannières) avec leurs adresses URL. Les images utilisées dans les signatures sont accessibles publiquement à leurs adresses URL (elles sont visibles pour les destinataires des e-mails).

**Journal d'audit** - enregistrement des actions effectuées dans le Compte : type d'action, identifiant de l'Utilisateur, horodatage et métadonnées de l'événement (pouvant inclure l'adresse e-mail de l'Utilisateur). Le journal d'audit **ne contient ni adresses IP ni informations sur le navigateur**.

**Données techniques** - nous traitons l'adresse IP exclusivement de manière éphémère (en mémoire) aux fins de la limitation du trafic et de la protection contre les abus - **nous n'enregistrons pas les adresses IP dans la base de données**. Les journaux techniques standard de l'infrastructure d'hébergement (y compris les journaux HTTP) sont traités au sein de la plateforme d'hébergement à des fins de diagnostic. Nous décrivons ci-dessous ainsi qu'aux pts 6 et 11 le traitement de l'adresse IP par les fournisseurs du site signature.cat, y compris par Cloudflare et Google en tant que responsables du traitement distincts.

**Communication** - les e-mails que nous envoyons (notifications relatives aux événements du Compte, à la Période d'essai, aux paiements, aux accès, ainsi que confirmations des demandes envoyées via le formulaire de contact et le formulaire d'aide sur le site signature.cat) contiennent l'adresse e-mail du destinataire, son prénom et nom ou sa dénomination ainsi que des informations sur l'événement ; la correspondance entrante est traitée aux fins du traitement de la demande.

**Registre des Périodes d'essai** - domaine Workspace et date d'utilisation de la période d'essai (sans données de personnes physiques), tenu à des fins de prévention des abus ; l'inscription reste effective également après la suppression du Compte.

**Site signature.cat** - préférences enregistrées dans le navigateur (notamment la langue choisie et le choix effectué dans la bannière de consentement) et - après consentement - données statistiques Google Analytics (pt 11). Les pages de la documentation récupèrent l'état actuel du Service depuis la page de statut (status.signature.cat) gérée par un fournisseur externe, qui reçoit à cette occasion l'adresse IP et les données du navigateur.

**Formulaire de contact** (planification d'un appel, tarif sur mesure) - prénom et nom, adresse e-mail professionnelle, numéro de téléphone, nom de l'entreprise, taille de l'organisation, description facultative de la requête, objet de la requête, langue du site et date d'envoi ainsi que l'information indiquant si un consentement marketing a été donné. Nous enregistrons la requête dans la base des requêtes commerciales (CRM) et la transmettons sous forme de notification à l'outil de communication interne de l'équipe. Une fois la requête acceptée, le site affiche automatiquement le calendrier de réservation d'appels Google Calendar intégré (pt 11) ; effectuer une réservation est volontaire, et les données fournies lors de la réservation (notamment prénom, nom, adresse e-mail et créneau choisi) sont transmises directement à Google et à notre calendrier, la confirmation de la réservation étant envoyée par Google.

**Formulaire d'aide** (bouton « Aide » dans la documentation) - prénom et nom, adresse e-mail, numéro de téléphone facultatif, degré d'urgence de la demande, description du problème, adresse de la page de la documentation depuis laquelle le formulaire a été ouvert, ainsi que langue du site. Nous transmettons la demande sous forme de notification à l'outil de communication interne de l'équipe, sur un canal distinct, celui de l'équipe support ; nous ne l'enregistrons pas dans la base des requêtes commerciales et n'ajoutons pas l'adresse e-mail fournie à la liste de diffusion.

**Confirmations des demandes** - après l'envoi du formulaire de contact ou du formulaire d'aide, nous envoyons à l'adresse e-mail indiquée une confirmation de réception de la demande avec une copie des données transmises (dans le cas du formulaire de contact, également avec un lien vers le calendrier de réservation). La confirmation ne contient aucun contenu marketing, et nous limitons le nombre de confirmations envoyées à une même adresse (en principe à une par minute).

**Générateur de bannières** - l'utilisation du générateur est volontaire. La bannière est créée entièrement dans le navigateur (la photo ajoutée au générateur ne quitte pas l'appareil). Le téléchargement ou la copie de la bannière finalisée nécessite la fourniture d'une adresse e-mail et le consentement à recevoir de notre part des informations commerciales par e-mail ; dans un navigateur donné, nous ne le demandons qu'une seule fois. Nous ajoutons l'adresse à la liste de diffusion et enregistrons dans le navigateur l'information indiquant que cette étape a été effectuée (pt 11). Le retrait du consentement ne limite pas la possibilité d'utiliser les bannières déjà téléchargées.

**Liste de diffusion** - adresse e-mail (et, en cas d'inscription via le formulaire de contact, également prénom et nom) des personnes ayant consenti à recevoir de notre part des informations commerciales par e-mail : dans le formulaire de contact (champ distinct, à caractère volontaire) ou dans le générateur de bannières. Nous envoyons des informations commerciales exclusivement aux personnes ayant donné ce consentement.

**Protection des formulaires** - nous protégeons les formulaires du site signature.cat au moyen du mécanisme Cloudflare Turnstile qui, afin de distinguer les humains des bots, analyse notamment l'adresse IP ainsi que les caractéristiques du navigateur et de la connexion (p. ex. l'en-tête User-Agent, les paramètres de la connexion TLS) ; le mécanisme ne lit pas le contenu saisi dans les formulaires. Nous utilisons en outre, pendant 60 secondes, l'adresse IP et, dans le cas des confirmations des demandes, également l'adresse e-mail du destinataire dans les compteurs de limitation du trafic en périphérie du réseau.

## 5. Finalités du traitement et bases juridiques

| Finalité | Base juridique (RGPD) |
|---|---|
| Conclusion et exécution du Contrat : tenue du Compte, fourniture des fonctions du Service, Période d'essai, notifications transactionnelles | art. 6, par. 1, point b) |
| Traitement des paiements et de la facturation (y compris la transmission des données à l'opérateur de paiement) | art. 6, par. 1, point b) |
| Exécution des obligations fiscales et comptables | art. 6, par. 1, point c) |
| Sécurité du Service et du site signature.cat ainsi que prévention des abus : limitation du trafic, protection des formulaires (Cloudflare Turnstile), sanitisation des contenus, journal d'audit, registre des Périodes d'essai, notifications internes relatives aux événements sur les comptes | art. 6, par. 1, point f) (intérêt légitime : protection du Service, du site et des clients) |
| Mise à disposition du site signature.cat et de la documentation, y compris l'affichage de l'état actuel du Service récupéré depuis la page de statut (status.signature.cat) | art. 6, par. 1, point f) (intérêt légitime : mise à disposition du site et information sur la disponibilité du Service) |
| Traitement des demandes, questions et réclamations, y compris des demandes envoyées via le formulaire d'aide, ainsi que confirmation par e-mail de la réception de la demande envoyée via le formulaire d'aide | art. 6, par. 1, point b) (lorsque la demande concerne un Contrat auquel la personne à l'origine de la demande est partie) ou point f) (intérêt légitime : traitement de la demande et assistance au Client et à ses Utilisateurs) |
| Traitement des requêtes envoyées via le formulaire de contact : réponse, préparation d'une offre, planification d'un appel (y compris la réservation d'un créneau dans le calendrier), conduite de discussions commerciales, enregistrement dans la base des requêtes commerciales ainsi que confirmation par e-mail de la réception de la requête | art. 6, par. 1, point f) (intérêt légitime : réponse à la requête et conduite de discussions commerciales avec l'entité représentée par la personne à l'origine de la requête) ; lorsque la personne formule la requête en son nom propre en tant qu'entrepreneur - art. 6, par. 1, point b) (mesures prises à sa demande avant la conclusion d'un contrat) |
| Envoi d'informations commerciales par e-mail (liste de diffusion) | art. 6, par. 1, point a) (consentement) ; le consentement à l'envoi d'informations commerciales à l'adresse e-mail indiquée est également exigé par l'article 398, paragraphe 1, de la loi polonaise du 12 juillet 2024 sur les communications électroniques (Prawo komunikacji elektronicznej, Dz.U. 2024, position 1221, telle que modifiée) |
| Démonstration de l'octroi et du retrait du consentement ainsi que garantie qu'après une désinscription nous n'enverrons plus d'informations commerciales | art. 6, par. 1, point f) (intérêt légitime : responsabilité et respect de la désinscription) |
| Constatation, exercice ou défense de droits en justice | art. 6, par. 1, point f) |
| Statistiques de fréquentation du site signature.cat, y compris la mesure agrégée du nombre de formulaires de contact envoyés (Google Analytics) | art. 6, par. 1, point a) (consentement) |

La fourniture des données du compte et des données de facturation est volontaire, mais nécessaire à l'utilisation du Service. La fourniture des données dans le formulaire de contact et le formulaire d'aide est volontaire : les champs marqués comme facultatifs peuvent être omis, tandis que, si les autres champs ne sont pas remplis, nous ne pouvons pas accepter la demande ; le consentement marketing dans le formulaire de contact est entièrement volontaire et n'a pas d'incidence sur le traitement de la requête. L'utilisation du générateur de bannières est volontaire, étant entendu que le téléchargement ou la copie d'une bannière nécessite la fourniture d'une adresse e-mail et le consentement à recevoir des informations commerciales (pt 4). Nous ne prenons pas de décisions fondées exclusivement sur un traitement automatisé qui produiraient des effets juridiques ou qui affecteraient de manière significative de façon similaire la personne concernée ; la protection automatique des formulaires (Cloudflare Turnstile) peut uniquement empêcher l'envoi d'un formulaire - dans ce cas, il est possible de nous écrire à l'adresse contact@signature.cat. Nous n'utilisons pas les données pour entraîner des modèles d'intelligence artificielle.

## 6. Destinataires des données et sous-traitants ultérieurs

Nous ne transmettons les données qu'aux entités soutenant la fourniture du Service, le fonctionnement du site signature.cat ainsi que le traitement des requêtes et des demandes, dans la mesure nécessaire à leurs missions ; une partie des données est en outre traitée par des responsables du traitement distincts dans la mesure décrite sous le tableau. Nous faisons appel aux catégories de fournisseurs suivantes :

| Catégorie | Périmètre des données | Localisation du traitement |
|---|---|---|
| Fournisseur d'hébergement de l'application et de la base de données | toutes les données du Service | UE (Amsterdam) |
| Fournisseur de services réseau, de CDN, de stockage d'images et de protection des formulaires (Cloudflare, y compris Cloudflare Turnstile) | trafic réseau, images des Clients, données transmises via les formulaires du site signature.cat, signaux de protection contre les bots (adresse IP, caractéristiques du navigateur et de la connexion) | stockage des images : juridiction UE ; réseau : infrastructure de périphérie mondiale |
| Fournisseur de services cloud (gestion des secrets, archive du journal d'audit) | clés techniques des comptes de service, archive d'audit | archive : région UE ; secrets : réplication multirégionale |
| Opérateur de paiement (certification PCI-DSS Level 1) | données de facturation, données des cartes (exclusivement chez l'opérateur) | UE/USA |
| Fournisseur de services e-mail (messages transactionnels, confirmations des demandes, liste de diffusion) | adresse e-mail du destinataire, prénom et nom ou dénomination, contenu du message (dans les confirmations des demandes : copie des données du formulaire), données de la liste de diffusion (adresse e-mail, prénom et nom, statut d'inscription) | USA |
| Google (services et interfaces API Google Workspace) | connexion OAuth, opérations dans le Workspace du Client | selon la configuration du Workspace du Client |
| Google (calendrier de réservation d'appels intégré au site signature.cat ; Google Analytics - exclusivement après consentement) | données fournies lors de la réservation, adresse IP et données du navigateur, cookies Google, données relatives aux visites et aux événements sur le site associées à l'identifiant des cookies Google Analytics | USA et infrastructure mondiale de Google |
| Outil de tenue de la base des requêtes commerciales (CRM) | données du formulaire de contact (à l'exclusion des demandes envoyées via le formulaire d'aide) | USA |
| Outils de communication interne de l'équipe (notifications opérationnelles, notifications relatives aux requêtes et aux demandes) | événements relatifs aux comptes (notamment domaine Workspace et adresse e-mail de l'administrateur du Client), données et contenu des requêtes envoyées via le formulaire de contact ainsi que des demandes envoyées via le formulaire d'aide | UE/USA |
| Fournisseur d'hébergement des fichiers du site signature.cat | données techniques des requêtes HTTP | USA/mondial |
| Fournisseur de la page de statut du Service (status.signature.cat) | adresse IP et données du navigateur lors de l'affichage des pages de la documentation | UE/USA |

Nous mettons la liste complète et nominative des sous-traitants ultérieurs, avec leurs rôles, à la disposition des Clients dans le cadre du DPA ainsi que sur demande (contact@signature.cat) ; à la personne concernée qui en fait la demande, nous indiquons également les noms des destinataires de ses données (art. 15, par. 1, point c) du RGPD). Les données peuvent en outre être communiquées aux entités habilitées en vertu des dispositions légales (p. ex. les autorités publiques) ainsi qu'aux conseillers juridiques et comptables du Prestataire dans la mesure nécessaire.

Cloudflare (en ce qui concerne l'amélioration des mécanismes de détection des bots, voir https://www.cloudflare.com/turnstile-privacy-policy/) ainsi que Google Ireland Limited (en ce qui concerne ses propres cookies et le compte Google de la personne effectuant la réservation, voir https://policies.google.com/privacy) traitent une partie des données indiquées dans le tableau ci-dessus en tant que responsables du traitement distincts, selon les règles de leurs propres politiques de confidentialité.

## 7. Transferts de données hors EEE

L'infrastructure de base du Service (application, base de données, stockage des images, archive d'audit) fonctionne dans des régions de l'Union européenne. Une partie des fournisseurs indiqués au pt 6 (opérateur de paiement, fournisseur de services réseau, fournisseur de services e-mail, Google, outils de communication interne, outil de tenue de la base des requêtes commerciales, fournisseur d'hébergement des fichiers du site signature.cat, fournisseur de la page de statut) a son siège aux USA ou utilise une infrastructure mondiale - en conséquence, les données peuvent être transférées en dehors de l'Espace économique européen, en particulier vers les États-Unis.

Ces transferts sont fondés sur les clauses contractuelles types (SCC) adoptées par la Commission européenne, incluses dans les contrats conclus avec ces fournisseurs (y compris dans les contrats de sous-traitance) et, pour les fournisseurs certifiés dans le cadre du programme EU-US Data Privacy Framework, sur la décision d'exécution (UE) 2023/1795 de la Commission du 10 juillet 2023 constatant un niveau de protection adéquat. Dans la mesure où Cloudflare et Google traitent les données en tant que responsables du traitement distincts (pt 6), ils les transfèrent hors de l'EEE selon les règles décrites dans leurs politiques de confidentialité. Des informations sur les garanties applicables aux transferts, y compris une copie des garanties que nous appliquons, peuvent être obtenues à l'adresse contact@signature.cat.

## 8. Durées de conservation des données

| Données | Durée de conservation |
|---|---|
| Données du Compte (Utilisateurs, modèles, attributions, images, paramètres) | pendant la durée du Contrat ; après l'expiration de l'abonnement - jusqu'à la suppression du Compte à la demande du Client, au plus tard jusqu'à l'expiration des délais de prescription des droits liés au Contrat (en principe 6 ans) |
| Suppression du Compte (en libre-service, dans les paramètres) | la suppression définitive des données intervient après un délai de 7 jours à compter de la soumission de la demande |
| Sessions de connexion | 7 jours à compter de la dernière activité, au maximum 14 jours à compter de la connexion |
| Historique des déploiements de signatures (y compris les adresses e-mail concernées par le déploiement) | 30 jours à compter de la fin de la tâche |
| Valeurs des champs de signature saisies par le Client (fonction Données des utilisateurs) | pendant la durée d'utilisation de la fonction par le Client ; la suppression intervient immédiatement après l'effacement de l'entrée ou la désactivation de la fonction par le Client, et les entrées des personnes supprimées du Google Workspace du Client sont effacées automatiquement lors du balayage quotidien |
| Journal d'audit | 365 jours dans la base de production ; copie d'archive à des fins de sécurité et de défense de droits - au plus 6 ans |
| Résultats des tests automatiques de connexion au Workspace (preflight) | 90 jours |
| Événements opérationnels internes (notifications de l'équipe) | 30 jours à compter de la remise |
| File d'attente des notifications e-mail de l'application (adresse du destinataire, données de la notification) | 90 jours à compter de l'envoi (notifications n'ayant pas pu être envoyées : 90 jours à compter de leur création) |
| Téléversements d'images inachevés (sans validation) | 30 minutes, puis suppression automatique |
| Registre des Périodes d'essai (domaine Workspace + date) | pendant la durée de fourniture du service Signature.Cat (prévention des abus) |
| Documents de facturation et comptables | 5 ans, à compter de la fin de l'année fiscale (obligation légale) |
| Correspondance et demandes (y compris les demandes envoyées via le formulaire d'aide) | pendant la durée du traitement de la demande, puis jusqu'à l'expiration des délais de prescription des droits |
| Requêtes envoyées via le formulaire de contact (base des requêtes commerciales, notifications dans l'outil de communication interne, réservations d'appels dans le calendrier) | jusqu'à 12 mois à compter du dernier contact, si les discussions ne se poursuivent pas ou si aucune collaboration n'est engagée ; après la conclusion du Contrat - comme les Données du Compte ainsi que la correspondance et les demandes |
| E-mails chez le fournisseur de services e-mail (confirmations des demandes et notifications de l'application : contenu et données d'envoi) | jusqu'à 30 jours à compter de l'envoi (sauvegardes du fournisseur : jusqu'à 7 jours de plus) |
| Liste de diffusion | jusqu'au retrait du consentement ; après son retrait, nous conservons une entrée marquée comme désinscrite (adresse e-mail et, s'ils ont été fournis, également prénom et nom, ainsi que la date d'inscription) afin de ne pas envoyer de nouveaux messages et de pouvoir démontrer l'octroi et le retrait du consentement - jusqu'à l'expiration des délais de prescription des droits |
| Compteurs de limitation du trafic en périphérie du réseau (adresse IP, adresse e-mail du destinataire de la confirmation) | 60 secondes |
| Données statistiques Google Analytics | jusqu'à 14 mois |
| Données pendant la Période d'essai | comme les données du Compte (pt 10) |

Les données des employés du Client récupérées depuis le répertoire Workspace ne sont pas conservées - nous les traitons exclusivement au moment du rendu ou du déploiement de la signature (pt 3, let. b). Font exception les valeurs que le Client saisit lui-même dans le cadre de la fonction Données des utilisateurs ; leur durée de conservation est indiquée dans le tableau ci-dessus.

## 9. Droits des personnes concernées

Toute personne dont nous traitons les données en tant que responsable du traitement dispose des droits suivants : accès aux données, rectification, effacement, limitation du traitement, portabilité des données, opposition au traitement fondé sur l'intérêt légitime ainsi que retrait du consentement à tout moment (sans incidence sur la licéité du traitement fondé sur le consentement effectué avant son retrait).

**Droit d'opposition.** Toute personne a le droit de s'opposer à tout moment - pour des raisons tenant à sa situation particulière - au traitement de ses données fondé sur l'intérêt légitime (art. 6, par. 1, point f) du RGPD), y compris des données issues du formulaire de contact et du formulaire d'aide. L'opposition au traitement des données issues du formulaire de contact aux fins de la conduite de discussions commerciales ne nécessite pas de justification. L'opposition peut être adressée à contact@signature.cat.

**Retrait du consentement marketing.** Le consentement à recevoir des informations commerciales peut être retiré à tout moment, sans indication de motif : en cliquant sur le lien de désinscription figurant dans le message marketing, en répondant à notre message ou en écrivant à l'adresse contact@signature.cat. Le retrait du consentement n'affecte pas la licéité des envois effectués antérieurement et ne limite pas la possibilité d'utiliser les bannières déjà téléchargées.

Les demandes peuvent être adressées à **contact@signature.cat**. Nous répondons sans retard injustifié, au plus tard dans un délai d'un mois (avec possibilité de prolongation de deux mois pour les affaires complexes, ce dont nous informerons).

Toute personne dispose également du droit d'introduire une réclamation auprès de l'autorité de contrôle : **le Président de l'Office polonais de protection des données personnelles (UODO), autorité de contrôle polonaise**, ul. Stawki 2, 00-193 Warszawa (uodo.gov.pl).

Si la demande concerne des données que nous traitons en qualité de sous-traitant (données des employés du Client - pt 3, let. b), le destinataire approprié de la demande est l'employeur (le Client) en tant que responsable du traitement de ces données. Nous transmettrons une telle demande au Client et soutiendrons sa mise en oeuvre.

## 10. Période d'essai

La Période d'essai constitue un contrat pleinement contraignant de fourniture de services par voie électronique. Les données collectées pendant la Période d'essai sont traitées selon des règles identiques à celles applicables après le passage à l'abonnement payant. Si la Période d'essai ne se termine pas par le passage à un plan payant, le Compte perd l'accès aux fonctions du Service et les données sont conservées conformément au pt 8 - le Client peut à tout moment supprimer lui-même le Compte (suppression définitive après 7 jours).

## 11. Cookies et analyse

**L'application app.signature.cat** utilise exclusivement des cookies nécessaires à son fonctionnement :

| Cookie | Finalité | Durée |
|---|---|---|
| `__Secure-next-auth.session-token` (et cookies techniques de connexion) | maintien de la session connectée (HTTP-only) | jusqu'à 7 jours à compter de la dernière activité, max. 14 jours |
| `NEXT_LOCALE` | mémorisation de la langue d'interface choisie | 12 mois |

L'application n'utilise pas de cookies analytiques ni marketing. Dans le stockage local du navigateur (localStorage), l'application enregistre exclusivement les paramètres de l'interface (p. ex. l'aperçu de client de messagerie sélectionné ou l'information indiquant que le message relatif à la Période d'essai a été masqué) ainsi que l'entrée technique `nextauth.message`, qui, après la déconnexion, synchronise l'état de la session entre les onglets ouverts (sans données personnelles).

**Le site signature.cat** utilise les cookies et les entrées de stockage du navigateur suivants :

| Nom | Finalité | Durée |
|---|---|---|
| `sigcat_consent` (cookie) | mémorisation du choix effectué dans la bannière de consentement | 12 mois |
| `sigcat_locale` (cookie et stockage local) | mémorisation de la langue du site choisie manuellement | cookie : 12 mois ; stockage local : jusqu'à l'effacement des données du navigateur |
| `sigcat-theme` (stockage local) | mémorisation du thème clair ou sombre de la documentation | jusqu'à l'effacement des données du navigateur ou le retour au paramètre du système |
| `sc.cf.from` (stockage de session) | conservation de l'adresse de la page de la documentation depuis laquelle le formulaire d'aide a été ouvert, en cas de changement de langue du formulaire | jusqu'à la fermeture de l'onglet du navigateur |
| `sigcat_bg_lead` (cookie) | mémorisation du fait qu'une adresse e-mail a déjà été fournie dans le générateur de bannières dans ce navigateur, afin de ne pas la demander à nouveau | 12 mois |
| `_ga`, `_ga_*` (Google Analytics 4) | statistiques de fréquentation, exclusivement après consentement | jusqu'à 24 mois |

Toutes les entrées du tableau, à l'exception de Google Analytics, servent exclusivement au fonctionnement du site et des fonctions utilisées, et ne sont pas utilisées à des fins de suivi ni de publicité ; nous les enregistrons sans consentement distinct en tant qu'éléments nécessaires à la fourniture du service utilisé (article 399, paragraphe 3, point 2, de la loi polonaise sur les communications électroniques, Prawo komunikacji elektronicznej), et les cookies Google Analytics - exclusivement après consentement. L'enregistrement de cookies et de données dans le stockage du navigateur peut être limité ou bloqué dans les paramètres du navigateur ; le blocage des entrées nécessaires peut empêcher le fonctionnement de certaines fonctions du site.

**Google Analytics 4** (fournisseur : Google Ireland Limited) sert exclusivement à des statistiques agrégées de fréquentation du site signature.cat (notamment nombre de visites, sources de trafic, localisation approximative au niveau de la ville, ainsi que nombre de formulaires de contact envoyés avec l'objet de la requête - sans le contenu des formulaires ni les données qui y sont saisies, telles que prénom et nom, adresse e-mail ou numéro de téléphone). L'outil n'est activé **qu'après le consentement** donné dans la bannière de consentement du site ; le consentement peut être retiré à tout moment en modifiant les paramètres de consentement sur le site ou en supprimant les cookies. Google Analytics 4 n'enregistre pas les adresses IP complètes. Les données d'événements sont conservées dans l'outil pendant 14 mois au maximum. Google Analytics n'est pas intégré dans l'application app.signature.cat.

**Protection des formulaires (Cloudflare Turnstile).** Le mécanisme n'est chargé qu'à la première interaction avec le formulaire de contact ou le formulaire d'aide, ou après l'ouverture de la fenêtre de saisie de l'adresse e-mail dans le générateur de bannières (lors de la première tentative de téléchargement ou de copie d'une bannière) ; le script et le cadre de vérification proviennent des serveurs de Cloudflare (challenges.cloudflare.com), et le cadre peut utiliser le stockage du navigateur aux fins de la vérification. Nous ne déposons pas nos propres cookies pour ses besoins. Les règles de traitement des données par Cloudflare sont décrites dans le Turnstile Privacy Addendum : https://www.cloudflare.com/turnstile-privacy-policy/.

**Calendrier de réservation (Google).** Après l'envoi réussi du formulaire de contact, le site affiche automatiquement, sans clic supplémentaire, le calendrier de réservation d'appels Google Calendar intégré. Dès son affichage, même si aucune réservation n'est effectuée, Google reçoit l'adresse IP et les données du navigateur et peut enregistrer ou lire dans le navigateur ses propres cookies (p. ex. `NID`, utilisé par Google également à des fins publicitaires) selon les règles de la politique de confidentialité de Google (https://policies.google.com/privacy) ; si la personne visitant le site est connectée à un compte Google, Google peut également compléter les données de réservation sur la base de ce compte. Directement sous le calendrier, nous indiquons que Google peut enregistrer ses propres cookies dans le navigateur. Effectuer une réservation est volontaire et ne constitue pas une condition du traitement de la requête ; l'ouverture de la page de réservation dans un nouvel onglet entraîne également la transmission de ces données à Google.

Nous n'utilisons pas nous-mêmes de cookies marketing et ne vendons pas de données personnelles ; nous décrivons ci-dessus les cookies que Google peut enregistrer dans le calendrier de réservation intégré.

## 12. Données issues des interfaces API Google

Le Service utilise les interfaces API Google (connexion Google OAuth ainsi que les interfaces Google Workspace : paramètres Gmail - écriture et lecture de la signature - et répertoire des utilisateurs, dans les périmètres indiqués dans les Conditions ; le Service n'utilise aucune autorisation donnant accès au contenu des messages). L'utilisation des informations reçues des interfaces API Google est conforme à la Google API Services User Data Policy, y compris aux exigences d'utilisation limitée (Limited Use) : nous utilisons ces données exclusivement pour fournir et améliorer les fonctions du Service visibles pour l'utilisateur (gestion des signatures), nous ne les utilisons pas à des fins publicitaires, nous ne les vendons pas, nous ne les transmettons pas à des tiers au-delà de ce qui est nécessaire à la fourniture du Service et nous ne les utilisons pas pour entraîner des modèles d'intelligence artificielle.

## 13. Sécurité des données (mesures techniques et organisationnelles)

Nous appliquons notamment les mesures suivantes :

- chiffrement TLS de la transmission sur l'ensemble du trafic, avec HTTPS forcé (HSTS) ;
- chiffrement des jetons OAuth au repos avec l'algorithme AES-256-GCM, la clé de chiffrement étant conservée en dehors de la base de données ;
- clés privées des comptes de service conservées exclusivement dans le service de gestion des secrets (jamais dans la base de données, les journaux ni les réponses API), avec un cache en mémoire expirant au bout de 5 minutes au maximum ainsi qu'une rotation automatique et périodique des clés ;
- isolation des clients : un compte de service Google dédié par Client ainsi que la limitation de chaque opération sur les données à l'environnement du Client concerné ;
- contrôle d'accès fondé sur des niveaux de droits, appliqué côté serveur pour chaque opération ;
- accès de service par le personnel de SignatureCat : toute modification des paramètres du Compte par notre équipe support nécessite le consentement préalable du Client, accordé par un administrateur au moyen d'un interrupteur dédié dans les paramètres de l'application ; le même consentement est requis pour l'aperçu de la signature enregistrée dans la boîte aux lettres de l'utilisateur indiqué, bien qu'il s'agisse d'une simple lecture ; chaque action du support, chaque aperçu de ce type ainsi que chaque activation ou désactivation du consentement est consignée dans le journal d'audit du Compte avec le nom du collaborateur, et l'accès en lecture (diagnostic) est limité à ce qui est nécessaire au maintien du Service ;
- authentification exclusivement via Google OAuth (le Service ne stocke pas de mots de passe) ; les protections de connexion supplémentaires, y compris la MFA, relèvent de la politique Google Workspace du Client ;
- en-têtes de sécurité du navigateur, y compris une politique Content Security Policy appliquée ;
- limitation du trafic par adresse IP en périphérie du réseau et, sur le site signature.cat, également protection des formulaires au moyen du mécanisme Cloudflare Turnstile, limite du nombre de confirmations par e-mail envoyées à une même adresse ainsi que neutralisation des liens dans le contenu renvoyé dans les confirmations ;
- sanitisation du contenu des signatures côté serveur (blocage des scripts et des constructions dangereuses) ainsi que vérification des fichiers graphiques téléversés (exclusivement PNG, JPEG et GIF, contrôle du type réel du fichier, limite de 5 Mo pour PNG et JPEG et de 20 Mo pour GIF, blocage du SVG) ;
- base de données dans un réseau privé, sans point d'accès public ; sauvegardes avec possibilité de restauration à un point dans le temps ;
- journal d'audit en mode « ajout uniquement » (append-only) ainsi que notifications internes relatives aux événements importants sur les comptes ;
- minimisation des données : les attributs des employés du Client récupérés depuis le répertoire Workspace ne sont pas conservés et les données des cartes de paiement sont traitées exclusivement par l'opérateur de paiement ;
- la fonction Données des utilisateurs, qui constitue une exception assumée à la règle ci-dessus, est désactivée par défaut, n'est activée que par une décision de l'administrateur du Client, ne couvre que les personnes désignées par le Client, et sa désactivation supprime définitivement toutes les valeurs conservées.

## 14. Violations de la protection des données

En cas de violation de la protection des données personnelles, nous procédons à une évaluation du risque et - lorsque cela est requis - nous notifions la violation au Président de l'UODO dans un délai de 72 heures à compter de sa constatation et informons les personnes concernées si la violation est susceptible d'engendrer un risque élevé pour leurs droits et libertés. En qualité de sous-traitant, nous informons le Client (responsable du traitement) de toute violation concernant les données confiées, sans retard injustifié après sa constatation.

## 15. Modifications de la Politique

Nous informons des modifications de la Politique avec un préavis d'au moins **14 jours** - par une notification affichée dans l'application après connexion. Si aucun Utilisateur du Client ne s'est connecté à l'application au cours des 30 jours précédant la publication de la notification, nous pouvons en outre envoyer une notification par e-mail (envoi auxiliaire, non garanti). Les modifications résultant de dispositions légales peuvent entrer en vigueur immédiatement. Entrent également en vigueur à la date de leur publication les modifications qui consistent exclusivement à compléter ou à rectifier les informations sur le traitement des données (y compris sur le traitement dans le cadre de nouvelles fonctions), qui ne modifient ni les finalités, ni les bases juridiques, ni les destinataires du traitement des données collectées antérieurement et qui ne restreignent pas les droits des personnes concernées ; l'art. 13 du RGPD exige la fourniture des informations relatives à un nouveau traitement lors de la collecte des données personnelles. Cela ne s'applique pas aux modifications étendant le traitement des données qui nous sont confiées par le Client (pt 3, let. b) ni à l'ajout ou au remplacement d'un sous-traitant ultérieur - à de telles modifications s'applique le préavis indiqué dans la première phrase ou, si un DPA a été conclu, à sa place les règles définies dans le DPA. Nous mettons à disposition l'archive des versions antérieures avec leurs dates d'application, sur demande envoyée à contact@signature.cat.

La version 1.3 (en vigueur à compter du 27.09.2026) complète la Politique par la description du traitement des données sur le site signature.cat en lien avec le formulaire de contact et le formulaire d'aide, les confirmations des demandes, la base des requêtes commerciales, le calendrier de réservation, le générateur de bannières, la liste de diffusion, la protection des formulaires, la page de statut et l'hébergement des fichiers du site ainsi que les cookies et le stockage du navigateur (y compris dans l'application) ; elle présente de manière distincte les informations sur le droit d'opposition et le retrait du consentement (pt 9), corrige la localisation du traitement chez le fournisseur de services e-mail (USA), met à jour la description des formats des images téléversées, ajoute les durées de conservation des messages dans la file d'attente des notifications e-mail de l'application et chez le fournisseur de services e-mail, et précise au pt 15 les règles d'entrée en vigueur des modifications consistant exclusivement à compléter ou à rectifier les informations. Les modifications ne restreignent pas les droits des personnes concernées.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
