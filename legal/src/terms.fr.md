# Conditions d'utilisation de Signature.Cat

Version 1.2 - en vigueur à compter du 02.08.2026

**Les présentes Conditions d'utilisation sont disponibles en polonais à l'adresse https://signature.cat/terms en tant que version juridiquement contraignante. Le présent document est une traduction automatique de l'original polonais, fournie à titre purement informatif, et peut contenir des erreurs ou des inexactitudes. En cas de divergence, la version polonaise prévaut.**

Les présentes Conditions constituent un règlement de fourniture de services par voie électronique au sens de l'art. 8 de la loi polonaise du 18 juillet 2002 relative à la fourniture de services par voie électronique.

---

## § 1. Prestataire

1. Le Prestataire est **Tomasz Piasecki**, exerçant une activité économique sous la raison sociale **SystemAdmin Tomasz Piasecki**, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439 (ci-après : « le Prestataire »).
2. Contact avec le Prestataire : e-mail **contact@signature.cat**.
3. Le Service est fourni aux adresses : **https://app.signature.cat** (application) et **https://signature.cat** (site d'information).

## § 2. Définitions

1. **Service / Plateforme** - le service Signature.Cat fourni par voie électronique en mode SaaS, décrit au § 4.
2. **Client** - un entrepreneur (personne morale, entité organisationnelle ou personne physique exerçant une activité économique) qui a conclu un Contrat avec le Prestataire en lien avec son activité économique ou professionnelle.
3. **Contrat** - le contrat de fourniture du Service conclu entre le Prestataire et le Client aux conditions prévues par les présentes Conditions.
4. **Workspace** - l'environnement Google Workspace du Client, enregistré sur le domaine du Client, que le Client gère dans sa propre console d'administration Google.
5. **Compte** - le compte du Client dans la Plateforme, associé à un seul domaine Workspace.
6. **Utilisateur** - une personne physique agissant au nom du Client, qui se connecte à la Plateforme avec un compte Google appartenant au Workspace du Client.
7. **Administrateur Workspace** - un Utilisateur disposant, dans le Workspace du Client, des droits de super administrateur Google.
8. **Niveau d'accès** - l'étendue des droits de l'Utilisateur dans la Plateforme, attribuée conformément au § 6, al. 6.
9. **Période d'essai (Trial)** - la période de test de 7 jours décrite au § 7.
10. **Plan d'abonnement** - un abonnement mensuel renouvelable, facturé selon le nombre de Seats, décrit au § 8.
11. **Seat** - un utilisateur actif (non suspendu) dans le Workspace du Client, déterminé sur la base du répertoire des utilisateurs Google (Directory).
12. **DWD (Domain-Wide Delegation)** - un mécanisme de Google consistant en l'autorisation, par l'Administrateur Workspace, d'un compte de service dédié à agir dans le Workspace du Client dans des périmètres strictement définis (§ 5, al. 3).
13. **Opérateur de paiement** - Stripe, prestataire de services de paiement traitant les paiements et les données de facturation (certification PCI-DSS Level 1).
14. **DPA** - le contrat de sous-traitance du traitement des données personnelles au sens de l'art. 28 du RGPD, conclu entre le Client et le Prestataire.
15. **Conditions** - le présent document.

## § 3. Nature du service - exclusivement B2B

1. Le Service est destiné **exclusivement aux entrepreneurs** et ne peut être utilisé qu'en lien avec l'activité économique ou professionnelle du Client. Le Prestataire ne fournit pas le Service aux consommateurs.
2. En concluant le Contrat, le Client déclare qu'il le conclut dans le cadre de son activité économique ou professionnelle et que le Contrat revêt pour lui un caractère professionnel. L'exigence de disposer d'un Google Workspace enregistré sur un domaine d'entreprise (§ 5, al. 1) constitue une confirmation technique de ce caractère.
3. Les dispositions relatives à la protection des consommateurs, y compris le droit légal de rétractation de 14 jours applicable aux contrats conclus à distance, ne s'appliquent pas au Contrat - dans toute la mesure permise par la loi.
4. La personne qui accepte les Conditions au nom du Client déclare être habilitée à contracter des obligations au nom du Client.

## § 4. Étendue et description du Service

1. Le Service consiste en la gestion centralisée des signatures d'e-mail des utilisateurs de Gmail au sein du Workspace du Client. À la date d'entrée en vigueur des Conditions, le Service comprend :
   1. la création et la modification de modèles de signatures au format HTML, avec des variables de personnalisation (notamment prénom, nom, poste, service, téléphone, photo) et des blocs conditionnels ; les valeurs des variables sont récupérées en temps réel depuis le répertoire des utilisateurs du Workspace du Client ;
   2. l'attribution de modèles à des utilisateurs individuels, à des groupes Google ou à des unités organisationnelles (OU) ; les attributions sont développées vers les personnes concernées au moment du déploiement ;
   3. la synchronisation automatique et quotidienne des attributions, maintenant les signatures à jour ;
   4. le déploiement optionnel des signatures sur les alias d'envoi (send-as), à condition que le Client y consente en autorisant un périmètre DWD supplémentaire et optionnel (§ 5, al. 3, pt 5) ;
   5. une page en libre-service pour les utilisateurs finaux (aperçu et, selon le Niveau d'accès attribué, également modification de leur propre signature) ;
   6. une bibliothèque d'images d'entreprise (logos, bannières) avec leur hébergement à une adresse mise à disposition par le Prestataire ou - après configuration par le Client d'un enregistrement CNAME - sous un sous-domaine du propre domaine du Client ;
   7. la gestion des Niveaux d'accès des Utilisateurs (§ 6, al. 6) ;
   8. un registre des événements (journal d'audit) documentant les actions effectuées dans le Compte ;
   9. une interface dans les langues suivantes : anglais, polonais, allemand et français ;
   10. des notifications par e-mail concernant les événements relatifs au Compte (notamment inscription, attribution d'accès, perte de l'autorisation DWD, événements de facturation).
2. Le Service ne comporte pas de limite du nombre de modèles de signatures ni d'images dans le cadre d'un usage raisonnable ; les limitations techniques sont indiquées au § 5, al. 5. Le seul paramètre de facturation est le nombre de Seats (§ 8).
3. Le Prestataire développe le Service en permanence. Les modifications qui ne dégradent pas les fonctionnalités essentielles pour le Client ne constituent pas une modification du Contrat.

## § 5. Exigences techniques et règles d'utilisation

1. L'utilisation du Service requiert, du côté du Client :
   1. un abonnement actif **Google Workspace** enregistré sur le domaine du Client ; la connexion à la Plateforme n'est possible qu'avec un compte Google appartenant au Workspace (les comptes privés, p. ex. @gmail.com, ne sont pas pris en charge) ;
   2. un Administrateur Workspace (super administrateur Google) - lui seul peut effectuer l'autorisation DWD dans la console d'administration Google et procéder à la première inscription du Compte ;
   3. une version à jour de l'un des navigateurs web couramment utilisés (notamment Chrome, Firefox, Safari, Edge) avec JavaScript et les cookies activés ;
   4. un compte e-mail actif pour la réception des notifications et de la correspondance de facturation.
2. Les signatures sont déployées dans le service **Gmail** (paramètre de signature d'envoi de l'utilisateur). Le Service ne prend pas en charge d'autres clients ni serveurs de messagerie.
3. Le fonctionnement du Service requiert le maintien par le Client de l'autorisation DWD pour le compte de service dédié dans les périmètres suivants :
   1. `https://www.googleapis.com/auth/gmail.settings.basic` (écriture des signatures) - requis ;
   2. `https://www.googleapis.com/auth/admin.directory.user.readonly` (lecture du répertoire des utilisateurs) - requis ;
   3. `https://www.googleapis.com/auth/admin.directory.group.member.readonly` (lecture de l'appartenance aux groupes) - requis ;
   4. `https://www.googleapis.com/auth/admin.directory.customer.readonly` (lecture des données de base du Workspace) - requis ;
   5. `https://www.googleapis.com/auth/gmail.settings.sharing` (signatures sur les alias send-as) - optionnel ; son absence désactive uniquement la fonction des alias.
   La révocation ou la limitation de l'autorisation DWD par le Client rend impossible la fourniture d'une partie essentielle du Service et ne constitue pas une inexécution du Contrat par le Prestataire.
4. Le contenu des signatures fait l'objet d'une sanitisation automatique côté serveur : sont interdits les scripts, les événements JavaScript ainsi que certaines constructions CSS pouvant servir au pistage ou à l'injection de code. Les images sont acceptées exclusivement aux formats PNG et JPEG (le format SVG est bloqué pour des raisons de sécurité), d'une taille maximale de 5 Mo, dans la limite de 200 par type de ressource ; les fichiers sont vérifiés quant à leur type de contenu réel.
5. Il est interdit au Client de fournir des contenus à caractère illicite, notamment : des contenus portant atteinte aux droits de tiers (notamment les droits d'auteur sur les logotypes et graphismes), du code malveillant, des contenus servant à l'envoi d'informations commerciales non sollicitées (spam) ainsi que des contenus induisant les destinataires en erreur.
6. Sont en outre interdits : les tentatives de contournement des protections ou des limites de la Plateforme, les tests de sécurité sans accord écrit préalable du Prestataire, le téléchargement automatisé du contenu de la Plateforme (scraping), le partage du Compte avec des tiers ainsi que la revente du Service sans contrat distinct.

## § 6. Inscription, Compte et Utilisateurs

1. L'inscription du Compte s'effectue par connexion avec un compte Google Workspace (Google OAuth). La Plateforme ne stocke pas les mots de passe des Utilisateurs ; l'authentification est réalisée exclusivement par Google.
2. **Le Contrat est conclu au moment de l'acceptation des Conditions lors de l'inscription du Compte, et au plus tard au moment de l'activation de la Période d'essai ou du Plan d'abonnement.** La Période d'essai constitue un contrat à part entière de fourniture de services par voie électronique.
3. Le Compte est associé à un seul domaine Workspace. La première inscription du Compte ne peut être effectuée que par l'Administrateur Workspace.
4. Le Client garantit que les données fournies lors de l'inscription et dans le cadre de la facturation sont exactes et à jour.
5. Le Client répond des actions et omissions de tous ses Utilisateurs comme de ses propres actions et est tenu de veiller à ce que seules les personnes autorisées aient accès au Compte.
6. L'accès des Utilisateurs aux fonctions de la Plateforme est déterminé par les Niveaux d'accès (de l'accès en libre-service, en passant par les droits de projet et d'édition, jusqu'aux pleins droits d'administration), attribués dans la Plateforme par les Utilisateurs habilités du Client. Les Administrateurs Workspace disposent toujours du niveau d'administration complet, qui ne peut pas leur être retiré dans la Plateforme.
7. **Accès de service (support).** L'équipe support du Prestataire ne peut modifier les paramètres du Compte (p. ex. les modèles de signatures, les attributions ou les droits) qu'après le consentement préalable du Client, donné au moyen d'un interrupteur dédié dans les paramètres de la Plateforme, accessible aux Utilisateurs disposant du niveau d'administration. Le consentement peut être retiré à tout moment. L'activation et la désactivation du consentement, ainsi que chaque modification effectuée par le support, sont consignées dans le journal d'audit du Compte avec le nom du membre de l'équipe support. Indépendamment du consentement, le Prestataire conserve un accès en lecture dans la mesure nécessaire au maintien du Service et au diagnostic des erreurs (conformément au DPA et à la Politique de confidentialité).

## § 7. Période d'essai

1. Tout nouveau Client bénéficie d'une seule Période d'essai gratuite de **7 jours** à compter de l'activation, comprenant - à la date d'entrée en vigueur des Conditions - la pleine fonctionnalité du Service, sous réserve de l'al. 8.
2. L'activation de la Période d'essai requiert la saisie d'une carte de paiement valide dans le formulaire de l'Opérateur de paiement. **Pendant la Période d'essai, la carte n'est pas débitée.**
3. **À l'expiration de la Période d'essai, l'abonnement se transforme automatiquement en Plan d'abonnement payant et la carte du Client est débitée de la première redevance mensuelle** - sauf si le Client annule l'abonnement avant l'expiration de la Période d'essai. L'annulation avant la fin de la Période d'essai n'entraîne aucuns frais.
4. Le Prestataire rappelle l'approche de la fin de la Période d'essai par un e-mail envoyé environ 3 jours avant son expiration.
5. Si, au moment de la fin de la Période d'essai, le Compte ne dispose pas d'une méthode de paiement valide, l'abonnement est automatiquement annulé sans facturation, et l'accès aux fonctions de la Plateforme est bloqué jusqu'à la souscription d'un Plan d'abonnement.
6. **La Période d'essai n'est accordée qu'une seule fois par domaine Workspace.** L'utilisation de la Période d'essai est consignée dans un registre tenu par le Prestataire et reste effective également après la suppression du Compte ; une nouvelle inscription du même domaine commence directement par le Plan d'abonnement payant.
7. La fin de la Période d'essai sans conversion en Plan d'abonnement n'entraîne pas la suppression automatique des données du Compte ; les règles de conservation et de suppression des données sont définies au § 15 et dans la Politique de confidentialité.
8. **La Période d'essai est fournie « en l'état » (as-is), dans toute la mesure permise par la loi.** Pendant la Période d'essai :
   1. l'objectif de disponibilité visé au § 9, al. 1 ne s'applique pas, et le Client n'a droit ni à des crédits de service ni à une indemnisation pour l'indisponibilité du Service ;
   2. le Prestataire n'accorde aucune garantie ni assurance quant au fonctionnement, à la disponibilité et à l'adéquation du Service aux objectifs du Client ;
   3. le support technique est fourni exclusivement par e-mail (contact@signature.cat), sans délai de réponse garanti ;
   4. le Prestataire peut limiter ou modifier l'étendue des fonctions disponibles pendant la Période d'essai.
   Les dispositions du présent alinéa ne limitent ni la procédure de réclamation (§ 13) ni la responsabilité pour les dommages causés par faute intentionnelle.

## § 8. Redevances et facturation

1. Le Service est facturé selon le modèle d'un **abonnement mensuel payable d'avance**, en dollars américains (USD). Aucun plan annuel n'est proposé.
2. Le montant de la redevance dépend du nombre de Seats, selon des paliers appliqués de manière **progressive (graduated)** - chaque Seat est facturé au tarif du palier auquel il appartient :

   | Nombre de Seats | Tarif par Seat / mois |
   |---|---|
   | 1 - 50 | 0,80 USD |
   | 51 - 120 | 0,70 USD |
   | 121 - 300 | 0,60 USD |
   | à partir de 301 | 0,55 USD |

   Exemple : 60 Seats = 50 x 0,80 USD + 10 x 0,70 USD = 47,00 USD par mois.
3. Le nombre de Seats correspond au nombre d'utilisateurs actifs (non suspendus) dans le Workspace du Client, avec un minimum de 1, et est **mis à jour automatiquement** sur la base du répertoire des utilisateurs du Workspace : l'augmentation du nombre de Seats est facturée immédiatement, avec un complément proportionnel pour la partie restante de la période de facturation, tandis que la diminution du nombre de Seats est prise en compte à partir de la période de facturation suivante (le Client ne reçoit pas de remboursement pour la période en cours).
4. Les paiements sont traités par l'Opérateur de paiement. **Le Prestataire ne stocke pas les données des cartes de paiement.** Les données de facturation (nom de l'entreprise, adresse, le cas échéant NIP/VAT ID) sont saisies dans le formulaire de l'Opérateur de paiement et y sont conservées ; dans la Plateforme, le Client gère uniquement l'adresse e-mail de facturation.
5. Les prix indiqués à l'al. 2 s'entendent hors taxes. Le Client est responsable du règlement des taxes dues conformément aux dispositions de la juridiction dont il relève, y compris - pour les assujettis à la TVA dans l'UE - en tenant compte du mécanisme d'autoliquidation, s'il trouve à s'appliquer.
6. Les confirmations de paiement et les documents de facturation sont envoyés à l'adresse e-mail de facturation indiquée par le Client.
7. **L'abonnement se renouvelle automatiquement chaque mois** jusqu'à son annulation. Le Client peut annuler l'abonnement à tout moment - dans les paramètres de la Plateforme ou dans le portail de facturation de l'Opérateur de paiement - avec effet à la fin de la période de facturation en cours, déjà payée. Jusqu'à la fin de cette période, le Service reste pleinement accessible.
8. En cas d'échec du débit de la carte :
   1. l'accès au Service est maintenu pendant une **période de régularisation de 3 jours**, comptée à partir de la première tentative de débit infructueuse ; le Client en est informé par e-mail et par un message dans la Plateforme, et peut pendant ce temps mettre à jour sa méthode de paiement ;
   2. de nouvelles tentatives de débit sont effectuées automatiquement par l'Opérateur de paiement ;
   3. après l'expiration infructueuse de la période de régularisation, l'accès aux fonctions de la Plateforme est suspendu jusqu'au règlement des arriérés ; un débit réussi rétablit l'accès automatiquement.
9. **Les redevances pour une période de facturation entamée ne sont pas remboursables**, y compris en cas d'annulation de l'abonnement ou de suppression du Compte en cours de période. Cela n'exclut pas les prétentions du Client au titre de l'inexécution du Contrat par le Prestataire.
10. Le Prestataire est en droit de modifier la grille tarifaire, notamment en cas de modification des coûts de fourniture du Service, de l'étendue des fonctions, des tarifs des fournisseurs externes ou de l'environnement du marché. La modification de la grille tarifaire requiert la notification du Client par e-mail avec un préavis d'au moins **30 jours** (§ 14, al. 5) et prend effet au plus tôt à partir de la période de facturation suivante commençant après l'expiration de ce délai. Les prix ne changent pas au cours d'une période déjà payée. Le Client qui n'accepte pas les nouveaux prix peut annuler l'abonnement conformément à l'al. 7.

## § 9. Disponibilité du Service

1. Le Prestataire met en oeuvre la diligence requise pour que la disponibilité de la Plateforme soit d'au moins **99% par mois calendaire**. Cet objectif ne s'applique pas pendant la Période d'essai (§ 7, al. 8).
2. La disponibilité de la Plateforme est mesurée et publiée sur la page de statut du Prestataire accessible à l'adresse **https://status.signature.cat/** (la « Page de Statut »). Les indications de la Page de Statut servent de base pour déterminer la disponibilité de la Plateforme au cours d'un mois calendaire donné, y compris la réalisation de l'objectif visé à l'al. 1 - à l'exclusion des interruptions et événements visés à l'al. 3.
3. Ne sont pas comptabilisées comme indisponibilité les interruptions résultant :
   1. d'interruptions techniques planifiées et de travaux de maintenance, annoncés à l'avance sur la Page de Statut à l'adresse **https://status.signature.cat/maintenance** ;
   2. de pannes ou de limitations du côté des fournisseurs externes d'infrastructure et de services utilisés par la Plateforme (notamment hébergement, réseau de diffusion de contenu, opérateur de paiement, services et interfaces API de Google) ;
   3. d'un cas de force majeure ;
   4. de causes imputables au Client, en particulier la révocation de l'autorisation DWD, des modifications de la configuration du Workspace ou le non-respect des exigences techniques du § 5.
4. Le déploiement des signatures dépend de la disponibilité et des règles de fonctionnement des interfaces API de Google ; le Prestataire ne répond ni des modifications apportées par Google à ces interfaces ni des décisions de Google concernant le Workspace du Client.
5. Les informations actuelles sur les pannes, incidents et travaux de maintenance planifiés sont publiées sur la Page de Statut. Les pannes et anomalies peuvent être signalées à l'adresse contact@signature.cat. Les Conditions ne prévoient pas de crédits de service ; des garanties SLA individuelles peuvent être convenues dans un contrat distinct.

## § 10. Responsabilité

1. Le Prestataire répond de l'inexécution ou de la mauvaise exécution du Contrat selon les règles générales, avec les limitations indiquées ci-dessous, admissibles dans les relations professionnelles (B2B).
2. **La responsabilité totale du Prestataire**, à quelque titre que ce soit en lien avec le Contrat, est limitée à l'équivalent d'**une redevance mensuelle d'abonnement** pour le Compte concerné par le dommage - à hauteur de la redevance pour la période de facturation au cours de laquelle s'est produit l'événement à l'origine du dommage et, si la redevance pour cette période n'a pas été facturée (en particulier pendant la Période d'essai), à hauteur du montant calculé selon le nombre de Seats du Client et la grille tarifaire en vigueur au jour de l'événement.
3. Le Prestataire ne répond ni du manque à gagner ni des dommages indirects et consécutifs, y compris la perte de revenus, de réputation ou de données traitées en dehors de la Plateforme.
4. Les limitations des al. 2 et 3 ne s'appliquent pas aux dommages causés par faute intentionnelle.
5. Le Client répond :
   1. des contenus introduits dans la Plateforme (modèles, images, adresses URL), y compris de la détention des droits nécessaires à leur utilisation ;
   2. de la conformité du contenu des signatures avec le droit applicable au Client (y compris les exigences relatives au marquage de la correspondance commerciale) ;
   3. des conséquences des actions des personnes auxquelles il a permis l'accès au Compte, ainsi que des conséquences d'un accès non autorisé résultant du non-respect par le Client des règles de sécurité de son côté ;
   4. du maintien de l'autorisation DWD et de l'exactitude de la configuration du Workspace.
6. En cas de violation substantielle des Conditions, le Prestataire peut - après une mise en demeure de cesser les violations restée sans effet, et dans les cas flagrants (p. ex. distribution de code malveillant, spam) immédiatement - suspendre l'accès au Compte jusqu'à clarification de l'affaire. La suspension ne dispense pas le Client de l'obligation de payer la période de facturation en cours.

## § 11. Propriété intellectuelle et licence

1. La Plateforme, y compris son code, son interface, sa documentation, les marques et logotypes Signature.Cat, est la propriété du Prestataire ou fait l'objet de droits lui appartenant.
2. Pendant la durée du Contrat, le Prestataire accorde au Client une licence d'utilisation de la Plateforme non exclusive, non transférable, limitée territorialement à la zone de fonctionnement du Service, exclusivement pour les besoins de l'activité propre du Client. La licence ne comprend pas le droit d'accorder des sous-licences.
3. Sont interdits la décompilation, la rétro-ingénierie (reverse engineering), la copie ou la création d'oeuvres dérivées de la Plateforme, sauf dans les cas autorisés par des dispositions légales impératives.
4. **Les contenus du Client** (modèles de signatures, images, configuration) restent la propriété du Client. Le Client accorde au Prestataire une licence limitée à l'étendue nécessaire à la fourniture du Service (stockage, traitement, rendu et publication des images aux adresses d'hébergement, déploiement des signatures dans le Workspace du Client).
5. Le Prestataire **n'utilise pas les contenus ni les données du Client pour entraîner des modèles d'intelligence artificielle** ni à des fins autres que la fourniture et la maintenance du Service.

## § 12. Données personnelles et DPA

1. En ce qui concerne les données personnelles des Utilisateurs, les données de facturation et les données collectées par les sites du Prestataire - le responsable du traitement est le Prestataire. Les règles de traitement sont définies dans la Politique de confidentialité disponible à l'adresse https://signature.cat/privacy.
2. En ce qui concerne les données personnelles des employés et collaborateurs du Client traitées dans le cadre du Service (données du répertoire Workspace utilisées dans les signatures) - le responsable du traitement est le Client, et le Prestataire agit en qualité de sous-traitant (processeur) sur instruction documentée du Client.
3. Les parties concluent un DPA régissant la sous-traitance visée à l'al. 2. La conclusion du DPA intervient à la demande du Client adressée à contact@signature.cat. Le DPA est conclu exclusivement en langue anglaise et la version anglaise en est la seule version contraignante. Jusqu'à la conclusion d'un DPA individuel, la sous-traitance s'effectue selon les règles décrites dans la Politique de confidentialité et les Conditions.
4. Le Prestataire met à la disposition du Client la liste des sous-traitants ultérieurs dans le cadre du DPA ainsi que sur demande.

## § 13. Réclamations

1. Les réclamations concernant le Service peuvent être adressées à **contact@signature.cat**.
2. La réclamation doit contenir : le domaine Workspace, la description du problème, la date et l'heure de survenance ainsi que - dans la mesure du possible - l'identifiant de la requête ou une capture d'écran du message d'erreur.
3. Le Prestataire accuse réception de la réclamation dans un délai de 3 jours ouvrables et l'examine dans un délai de **14 jours** à compter de la réception d'une réclamation complète. Le Client est informé du résultat à l'adresse e-mail depuis laquelle la réclamation a été envoyée ou à une autre adresse indiquée.
4. Si l'examen de la réclamation nécessite des informations complémentaires, le délai visé à l'al. 3 court à compter du jour de leur fourniture.

## § 14. Modifications des Conditions et de la grille tarifaire, notifications

1. Le Prestataire est en droit de modifier les Conditions, notamment en cas de : modification de l'étendue ou du mode de fonctionnement du Service, modification des dispositions légales ou de leur interprétation, modification des conditions des fournisseurs externes, raisons de sécurité, ainsi qu'aux fins d'introduire des modifications rédactionnelles. Le droit de modifier la grille tarifaire est régi par le § 8, al. 10.
2. Les modifications entrent en vigueur moyennant les préavis suivants, comptés à partir du jour de la publication de la notification :
   1. **modifications de la grille tarifaire** - au moins **30 jours**, avec effet au plus tôt à partir de la période de facturation suivante (§ 8, al. 10) ;
   2. **modifications fonctionnelles** (concernant l'étendue ou le mode de fonctionnement du Service ou les droits et obligations des parties) - au moins **10 jours** ;
   3. **modifications rédactionnelles ou cosmétiques**, sans incidence sur les droits et obligations du Client - au moins **7 jours** ;
   4. **modifications résultant de dispositions légales impératives ou de décisions d'autorités** - **immédiatement**, y compris sans respect des délais indiqués aux pts 1-3, si le délai résultant de la disposition ou de la décision l'exige.
3. Les notifications relatives aux modifications visées à l'al. 2, pts 2-4 sont affichées dans l'interface de l'application après connexion. L'Utilisateur est tenu de se connecter régulièrement et de consulter les notifications. L'utilisation de l'application après la date d'entrée en vigueur d'une modification vaut acceptation de celle-ci.
4. Si aucun Utilisateur du Client ne s'est connecté à la Plateforme au cours des 30 jours précédant la publication de la notification visée à l'al. 3, le Prestataire peut en outre envoyer la notification à l'adresse e-mail du Client ; cet envoi a un caractère auxiliaire, n'est pas garanti et son absence n'affecte pas l'effectivité de la notification publiée dans la Plateforme.
5. **Le Prestataire informe des modifications de la grille tarifaire (al. 2, pt 1) par e-mail**, envoyé depuis l'adresse **alerts@signature.cat** à l'adresse e-mail de facturation et, à défaut, à l'adresse e-mail de l'Administrateur Workspace. La notification est réputée délivrée au moment de son envoi à l'adresse appropriée. Le Prestataire n'est pas responsable de la non-remise ou du retard de remise du message pour des raisons imputables au Client ou à son fournisseur de messagerie, en particulier du fait : du classement du message comme spam, de sa mise en quarantaine, de son rejet au niveau du serveur de réception ou des règles de filtrage configurées dans le domaine du Client. Afin d'assurer la délivrabilité, le Client devrait ajouter l'adresse alerts@signature.cat à la liste des expéditeurs de confiance (liste blanche) dans son domaine et maintenir à jour l'adresse e-mail de facturation ; les conséquences de l'omission de ces actions sont à la charge du Client. Les règles de remise définies dans le présent alinéa s'appliquent par analogie aux autres notifications par e-mail prévues par les Conditions.
6. Le Client qui n'accepte pas les modifications peut, avant leur date d'entrée en vigueur, résilier le Contrat sans frais supplémentaires - en annulant l'abonnement avec effet à la fin de la période de facturation en cours.
7. Le Prestataire tient une archive des versions antérieures des Conditions et la met à disposition sur demande envoyée à contact@signature.cat.

## § 15. Résiliation du Contrat, données après la fin du Contrat et migration

1. Le Contrat est conclu pour une durée indéterminée, avec des périodes de facturation mensuelles.
2. **Le Client peut résilier le Contrat à tout moment** en annulant l'abonnement (§ 8, al. 7), avec effet à la fin de la période de facturation en cours, sans pénalités contractuelles et sans frais de résiliation. Le délai de préavis n'excède donc pas une période de facturation mensuelle.
3. Le Prestataire peut résilier le Contrat moyennant un préavis de 30 jours, mais au plus tôt à la fin de la période de facturation payée, notamment en cas de cessation de la fourniture du Service. En cas de violation flagrante des Conditions par le Client, le Prestataire peut résilier le Contrat avec effet immédiat, après application préalable du § 10, al. 6, à moins que la nature de la violation ne le rende impossible.
4. Après l'expiration de l'abonnement, l'accès aux fonctions de la Plateforme est bloqué et les données du Compte sont conservées conformément à la Politique de confidentialité - jusqu'à leur suppression à la demande du Client ou jusqu'à l'expiration des délais qui y sont indiqués. Les signatures déployées antérieurement dans les boîtes aux lettres des utilisateurs du Client restent inchangées (le Service ne les supprime pas).
5. **La suppression du Compte** est disponible en libre-service dans les paramètres de la Plateforme pour l'Utilisateur disposant de droits d'administration et requiert une confirmation par la saisie du domaine Workspace. Dès la soumission de la demande, l'abonnement est annulé avec effet immédiat et, après un délai de **7 jours**, les données du Compte sont définitivement supprimées (y compris les modèles, les attributions, les images, les comptes des Utilisateurs ainsi que les ressources cloud dédiées du Client), sous réserve des données dont une conservation plus longue est prévue par la Politique de confidentialité ou les dispositions légales.
6. **Export des données :** sur demande adressée à contact@signature.cat, le Prestataire met à la disposition du Client un export des données du Compte (en particulier des modèles de signatures et de la configuration des attributions) dans un format ouvert, couramment utilisé et lisible par machine (JSON ou CSV) - pendant la durée du Contrat ainsi que dans un délai de **30 jours** après sa fin, à condition que les données n'aient pas été définitivement supprimées auparavant à la demande du Client. L'export est gratuit.
7. Le Prestataire n'applique pas de frais de changement de fournisseur ni d'obstacles techniques à la migration des données vers un autre fournisseur ou vers l'infrastructure propre du Client.
8. Après la fin du Contrat, le Client devrait supprimer lui-même l'entrée d'autorisation DWD dans la console d'administration Google - le Prestataire n'a pas la possibilité technique de le faire à la place du Client.

## § 16. Dispositions finales

1. Le droit applicable au Contrat est **le droit polonais**.
2. Le tribunal compétent pour les litiges découlant du Contrat est le tribunal de droit commun territorialement compétent pour le siège du Prestataire. La phrase précédente ne porte pas atteinte aux dispositions impératives en matière de compétence juridictionnelle.
3. Si certaines dispositions des Conditions s'avèrent nulles ou inefficaces, les autres dispositions restent en vigueur et la disposition nulle est remplacée par une disposition valable la plus proche de son objectif économique.
4. La présente version (1.1) des Conditions entre en vigueur le **17.07.2026** ; la version 1.0 était en vigueur à compter du 16.07.2026.

---

SystemAdmin Tomasz Piasecki, ul. Aleje Jerozolimskie 190, 02-486 Warszawa, NIP 1231455439
contact@signature.cat
