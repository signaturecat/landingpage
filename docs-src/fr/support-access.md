---
title: Accès du support
navTitle: Accès du support
description: Ce que le support SignatureCat peut et ne peut pas faire sur votre compte Google Workspace, y compris consulter la signature Gmail actuelle d'un utilisateur, et comment tout cela est consigné.
updated: 2026-08-02
---

# Accès du support

Par défaut, le support SignatureCat **ne peut rien modifier sur votre compte**. Si vous souhaitez que notre équipe vous aide de façon opérationnelle - par exemple pendant l'intégration ou pour traquer une affectation qui se comporte mal - un Admin peut accorder cette permission d'un simple interrupteur, et la révoquer tout aussi facilement.

## Où se trouve l'interrupteur

Allez dans [Paramètres](https://app.signature.cat/settings) et trouvez la section **Accès du support**. Elle n'est visible que pour les utilisateurs disposant du niveau d'accès **Admin**. Activez l'interrupteur pour autoriser les modifications, désactivez-le pour les bloquer à nouveau - le changement prend effet immédiatement.

## Ce qu'il débloque

Avec l'accès du support **activé**, notre équipe support peut travailler sur les parties de votre compte sur lesquelles elle intervient habituellement, plus une vue de diagnostic qui est bloquée sinon :

| Domaine | Exemples |
|---|---|
| Modèles de signature | Réparer du HTML cassé, ajuster des variables |
| Affectations | Recibler un groupe ou une OU, changer le modèle affecté |
| Accès des utilisateurs | Ajouter ou corriger des accès |
| E-mail de facturation | Corriger l'adresse à laquelle vos factures sont envoyées |
| Diagnostic de signature | Consulter la signature actuellement définie dans le Gmail d'un utilisateur |

Avec l'interrupteur **désactivé**, le support peut toujours *lire* les données du compte nécessaires au diagnostic d'un problème (journaux des tâches, configuration), mais chaque modification est rejetée par le système - pas simplement masquée dans l'interface. Consulter la signature Gmail actuelle d'un utilisateur est l'exception parmi les lectures : cela va chercher dans une boîte mail, c'est donc refusé dès que l'interrupteur est désactivé.

## Ce qu'il n'autorise jamais

Quel que soit l'état de l'interrupteur, le personnel de SignatureCat ne peut pas :

- se connecter en tant que vous ou l'un de vos utilisateurs ;
- modifier ou annuler votre abonnement, ni émettre des prélèvements ;
- supprimer votre compte ;
- lire les e-mails de qui que ce soit - SignatureCat ne détient aucun scope de contenu de messagerie, les e-mails, les pièces jointes et les brouillons sont donc hors de portée, que l'interrupteur soit activé ou non (voir [Domain-Wide Delegation](/docs/domain-wide-delegation)) ;
- accéder aux secrets ou identifiants stockés.

## Tout est consigné

La transparence est intégrée :

- L'activation ou la désactivation de l'interrupteur est écrite dans le journal d'activité de votre compte, et les autres Admins reçoivent une notification dans l'application lorsque l'accès du support est activé.
- Chaque modification effectuée par notre équipe apparaît dans le journal d'activité dans [Paramètres](https://app.signature.cat/settings) sous le nom du collaborateur suivi de "(SignatureCat Support)" - la même piste que celle des modifications de vos propres administrateurs.
- Chaque fois que notre équipe consulte la signature actuellement définie dans le Gmail d'un utilisateur, cette consultation est écrite dans le même journal d'activité. L'entrée enregistre l'adresse vérifiée, jamais la signature elle-même.
- Ces entrées font partie des données de votre compte, elles sont donc incluses dans les exports de données.

> [!TIP]
> Activez l'accès du support pour la durée d'un dossier de support et désactivez-le une fois le dossier clos. Rien ne casse si vous le laissez désactivé - il limite seulement ce que notre équipe peut faire pour vous de façon opérationnelle.

Le mécanisme est décrit dans les [Conditions d'utilisation et la Politique de confidentialité](/legal) (accès au service avec le consentement du Client).
