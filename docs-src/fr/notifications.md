---
title: Notifications
navTitle: Notifications
description: Quelles alertes SignatureCat arrivent par e-mail et lesquelles apparaissent dans l'application - perte de DWD, cibles d'affectation manquantes, événements d'essai et de paiement.
updated: 2026-07-17
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

Les e-mails d'alerte sont dédupliqués (au plus un par sujet et par jour) et envoyés uniquement au passage en état d'échec, pas à chaque nouvelle tentative.

> [!NOTE]
> Ces e-mails produit sont distincts des **factures et reçus** de Stripe, qui vont à l'adresse d'[e-mail de facturation](/docs/invoices/#set-the-invoice-email). Les niveaux Editor et Designer ne reçoivent pas d'e-mails d'alerte - uniquement des notifications dans l'application.

## Qu'est-ce qui apparaît dans l'application ?

L'icône de cloche dans la navigation supérieure (niveaux Admin et Editor) rassemble les notifications opérationnelles ; les non lues affichent un badge, et chaque entrée peut être ignorée.

| Notification dans l'application | Gravité | Déclencheur |
|---|---|---|
| Accès Domain-Wide Delegation perdu | Erreur | La DWD ou un scope requis a cassé ; les synchronisations sont en pause jusqu'à ce qu'un administrateur relance l'[assistant DWD](/docs/domain-wide-delegation/#what-happens-if-dwd-is-removed-or-a-scope-revoked). |
| Le groupe / l'OU n'existe plus | Avertissement | Une [cible d'affectation](/docs/assignments/#when-targets-disappear) a disparu ; le worker réessaie à la prochaine synchronisation. |
| Utilisateurs sans signature self-service | Avertissement | Des utilisateurs self-service n'ont pas encore choisi de modèle (au plus une fois tous les 7 jours). |
| Votre essai se termine bientôt | Avertissement | Environ 3 jours avant la fin de l'essai. |
| Paiement échoué | Erreur | Un prélèvement a échoué ; le délai de grâce court. |

En plus de la cloche, deux bannières peuvent apparaître dans toute l'application : la **bannière d'essai** ambre dans les derniers jours de l'essai, et la **bannière de paiement** rouge ("Mettez à jour votre carte avant le {date}, sinon la gestion des signatures sera suspendue") pendant le délai de grâce du paiement.

## Configuration recommandée

- Assurez-vous qu'au moins une boîte consultée régulièrement a le niveau **Admin** - les e-mails d'alerte ne vont qu'aux administrateurs et au propriétaire. Voir [Gestion des accès](/docs/user-management/).
- Faites pointer l'[e-mail de facturation](/docs/invoices/#set-the-invoice-email) vers la comptabilité pour que les documents ne dépendent jamais d'une boîte d'administrateur.
- Surveillez [status.signature.cat](https://status.signature.cat/) pour les incidents au niveau de la plateforme - voir [État du service](/docs/service-status/).
