---
title: Notifications
navTitle: Notifications
description: Quelles alertes de signature SignatureCat arrivent par e-mail et lesquelles apparaissent dans l'application - accès Google Workspace, cibles d'affectation, images, facturation.
updated: 2026-08-02
---

# Notifications

SignatureCat vous notifie par deux canaux : l'**e-mail** pour les événements au niveau du compte nécessitant une action, et la **cloche de notifications dans l'application** pour les alertes opérationnelles. Les e-mails vont aux administrateurs (et au propriétaire du compte) ; la cloche est visible pour les niveaux Admin et Editor.

## Qu'est-ce qui arrive par e-mail ?

| E-mail | Quand il est envoyé | Qui le reçoit |
|---|---|---|
| Bienvenue sur signature.cat | Première connexion d'un nouvel utilisateur | Le nouvel utilisateur |
| Vous avez maintenant accès à signature.cat | Un administrateur accorde l'accès à un utilisateur sur [Gestion des accès](https://app.signature.cat/user-management) | L'utilisateur concerné |
| Votre essai signature.cat a commencé | L'essai démarre | Admins + propriétaire |
| Votre essai signature.cat se termine bientôt | Environ 3 jours avant la fin de l'essai | Admins + propriétaire |
| Votre forfait signature.cat est actif | Premier prélèvement réussi après l'essai | Admins + propriétaire |
| Action requise - échec du paiement signature.cat | Un prélèvement échoue (le délai de grâce commence) | Admins + propriétaire |
| Une cible d'affectation signature.cat n'existe plus | Un groupe ou une OU affecté a été supprimé dans le Workspace | Admins + propriétaire |
| Action requise - signature.cat a perdu l'accès au Workspace (DWD) | La Domain-Wide Delegation a cassé ou un scope requis a été révoqué | Admins + propriétaire |
| Un logo utilisé par vos signatures a été supprimé | Une image de la bibliothèque a été supprimée alors que des modèles l'utilisaient encore ; pour les bannières, l'objet devient "Une bannière utilisée par vos signatures a été supprimée" | Admins + propriétaire |

Les e-mails d'alerte sont dédupliqués (au plus un par sujet et par jour) et envoyés uniquement au passage en état d'échec, pas à chaque nouvelle tentative. L'e-mail d'image supprimée suit sa propre règle : un e-mail par image supprimée et par destinataire, pour qu'une session de nettoyage n'inonde jamais une boîte.

> [!NOTE]
> Ces e-mails produit sont distincts des **factures et reçus** de Stripe, qui vont à l'adresse d'[e-mail de facturation](/docs/invoices#dfinir-le-mail-de-facturation). Les niveaux Editor et Designer ne reçoivent pas d'e-mails d'alerte - uniquement des notifications dans l'application.

## Qu'est-ce qui apparaît dans l'application ?

L'icône de cloche dans la navigation supérieure (niveaux Admin et Editor) rassemble les notifications opérationnelles ; les non lues affichent un badge, et chaque entrée peut être ignorée.

| Notification dans l'application | Gravité | Déclencheur |
|---|---|---|
| Accès Domain-Wide Delegation perdu | Erreur | La DWD ou un scope requis a cassé ; les synchronisations sont en pause jusqu'à ce qu'un administrateur relance l'[assistant DWD](/docs/domain-wide-delegation#que-se-passe-t-il-si-la-dwd-est-retire-ou-un-scope-rvoqu). |
| Le groupe / l'OU n'existe plus | Avertissement | Une [cible d'affectation](/docs/assignments#quand-les-cibles-disparaissent) a disparu ; le worker réessaie à la prochaine synchronisation. |
| Utilisateurs sans signature self-service | Avertissement | Des utilisateurs self-service n'ont pas encore choisi de modèle (au plus une fois tous les 7 jours). |
| Un logo ou une bannière utilisé par vos signatures a été supprimé | Avertissement | Quelqu'un a supprimé une [image de la bibliothèque](/docs/banners-and-logos#supprimer-des-images) qu'au moins un modèle utilisait encore ; l'entrée nomme qui l'a supprimée et quels modèles continuent de s'appliquer avec un espace réservé. |
| Accès du support activé | Info | Un administrateur a activé l'interrupteur [Accès du support](/docs/support-access) ; l'entrée nomme qui l'a autorisé. |
| Votre essai se termine bientôt | Avertissement | Environ 3 jours avant la fin de l'essai. |
| Paiement échoué | Erreur | Un prélèvement a échoué ; le délai de grâce court. |

En plus de la cloche, trois bannières peuvent apparaître dans toute l'application : la **bannière d'essai** ambre dans les derniers jours de l'essai, la **bannière de paiement** rouge ("Mettez à jour votre carte avant le {date}, sinon la gestion des signatures sera suspendue") pendant le délai de grâce du paiement, et la **bannière d'accès au Workspace** rouge ("La dernière vérification de l'accès à Google Workspace a échoué. Les synchronisations de signatures sont en pause jusqu'à la réparation de l'accès.").

La bannière d'accès au Workspace est réservée aux administrateurs, parce qu'eux seuls peuvent y remédier, et elle n'apparaît qu'après l'échec réel d'une vérification - jamais simplement parce qu'une vérification est ancienne ou absente. Son bouton **Vérifier l'accès maintenant** relance la vérification d'accès sur-le-champ : si elle passe, la bannière disparaît ; si elle échoue de nouveau, vous atterrissez dans l'assistant DWD, vers lequel la bannière renvoie aussi directement avec **Ouvrir l'assistant DWD**. Voir [Domain-Wide Delegation](/docs/domain-wide-delegation).

## Configuration recommandée

- Assurez-vous qu'au moins une boîte consultée régulièrement a le niveau **Admin** - les e-mails d'alerte ne vont qu'aux administrateurs et au propriétaire. Voir [Gestion des accès](/docs/user-management).
- Faites pointer l'[e-mail de facturation](/docs/invoices#dfinir-le-mail-de-facturation) vers la comptabilité pour que les documents ne dépendent jamais d'une boîte d'administrateur.
- Surveillez [status.signature.cat](https://status.signature.cat/) pour les incidents au niveau de la plateforme - voir [État du service](/docs/service-status).
