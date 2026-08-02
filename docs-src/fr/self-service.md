---
title: Signatures self-service
navTitle: Self-service
description: Laissez les utilisateurs finaux choisir et appliquer leur propre signature Gmail à partir des modèles SignatureCat approuvés par les administrateurs - configuration, parcours, données personnelles et règles de priorité.
updated: 2026-08-02
---

# Signatures self-service

Le self-service permet à chaque utilisateur de choisir sa propre signature parmi les modèles que vous approuvez, et de l'appliquer immédiatement à sa propre boîte - sans toucher à celle de qui que ce soit d'autre. Les utilisateurs le trouvent sous **Ma signature** sur [app.signature.cat/self-service](https://app.signature.cat/self-service).

## Ce que les administrateurs configurent

Deux interrupteurs rendent le self-service disponible :

1. **Activer des modèles pour le self-service.** Sur [Signatures](https://app.signature.cat/signatures), activez le self-service pour chaque modèle que les utilisateurs peuvent choisir. Seuls ces modèles sont visibles sur la page self-service.
2. **Accorder l'accès aux utilisateurs.** Sur [Gestion des accès](https://app.signature.cat/user-management), accordez aux utilisateurs ou aux groupes le niveau **Self-service** (ou **Self-service + édition** pour autoriser aussi leur propre HTML personnalisé). Voir [Gestion des accès](/docs/user-management) - y compris l'avertissement sur les accès de groupe qui couvrent les futurs membres.

> [!WARNING]
> Désactiver le self-service sur un modèle efface les choix de chaque utilisateur qui l'avait sélectionné, et leurs tâches en attente sont annulées. L'application demande d'abord une confirmation.

## Ce que fait l'utilisateur

1. Se connecter sur [app.signature.cat](https://app.signature.cat) et ouvrir **Ma signature**.
2. Choisir un **Modèle de l'organisation** dans la liste déroulante. Un aperçu en direct est rendu à partir de la fiche Directory de l'utilisateur.
3. Les utilisateurs avec le niveau d'édition peuvent passer en **HTML personnalisé** et ajuster le balisage, avec les mêmes [variables](/docs/template-variables) disponibles ; **Réinitialiser au modèle** restaure l'original.
4. Cliquer sur **Enregistrer la signature**. La signature est appliquée immédiatement à la boîte de l'utilisateur ("Enregistré - appliqué à votre boîte mail"), y compris à ses alias send-as acceptés.

Si la liste déroulante est vide, aucun modèle n'a encore le self-service activé : "Votre organisation n'a encore publié aucun modèle self-service. Demandez à un administrateur d'en activer un."

## Mes données de signature

**Mes données de signature** est un bouton sur la page **Ma signature** où un utilisateur saisit ses propres valeurs pour les variables de sa signature - poste, téléphone, adresse et le reste. Il apparaît une fois qu'un Admin a activé les données utilisateur pour l'organisation et ouvert le cadenas **Édition en self-service** ; voir [Données utilisateur](/docs/user-data).

Pour l'utilisateur, cela se passe ainsi :

1. Ouvrir [Ma signature](https://app.signature.cat/self-service) et cliquer sur **Mes données de signature**.
2. La fenêtre **Complétez vos données** s'ouvre : "Ces valeurs remplissent les variables de votre signature."
3. Chaque champ affiche la valeur issue de l'annuaire de votre entreprise jusqu'à ce que vous cliquiez sur l'icône à côté et saisissiez la vôtre.
4. Cliquer sur **Enregistrer mes données**. **Utiliser les données de l'annuaire** fait l'inverse : cela supprime tout ce que vous avez saisi et remet chaque champ sur la valeur de l'annuaire.

Ce que cela change :

- Les valeurs alimentent les mêmes [variables de modèle](/docs/template-variables) que partout ailleurs - le modèle de l'organisation que vous avez choisi, l'aperçu sur la page et la signature dans votre boîte mail les utilisent tous.
- L'enregistrement réapplique immédiatement votre signature à votre boîte mail ("Enregistré. Votre signature est en cours de mise à jour."). Si rien ne peut être appliqué à cet instant, le changement partira avec la prochaine mise à jour de la signature.
- Vous ne pouvez jamais modifier que votre **propre** fiche. La fenêtre travaille toujours sur votre propre adresse.
- Votre Admin voit chaque entrée, y compris qui l'a modifiée en dernier, et peut l'écraser ou la supprimer.

> [!NOTE]
> Pas de bouton **Mes données de signature** sur la page ? Alors les données utilisateur sont désactivées pour votre organisation, ou l'édition en self-service est encore verrouillée. Demandez à un Admin.

## Comment le self-service interagit avec les affectations

Le choix self-service d'un utilisateur se situe au **sommet** de l'échelle de priorité : il l'emporte sur les affectations de groupe, d'OU et pour tous. La seule exception est une affectation avec **Remplacer le self-service** activé, qui inverse la règle pour les utilisateurs qu'elle couvre. Détails : [Affectations](/docs/assignments#fonctionnement-de-la-priorit).

> [!NOTE]
> Les utilisateurs self-service ne peuvent jamais définir que leur **propre** signature. Ils ne voient que les modèles que vous avez activés, jamais les données des autres utilisateurs ni les pages d'administration.
