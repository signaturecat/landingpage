---
title: Signatures self-service
navTitle: Self-service
description: Laissez les utilisateurs finaux choisir et appliquer leur propre signature Gmail à partir des modèles SignatureCat approuvés par les administrateurs - configuration, parcours et règles de priorité.
updated: 2026-07-17
---

# Signatures self-service

Le self-service permet à chaque utilisateur de choisir sa propre signature parmi les modèles que vous approuvez, et de l'appliquer immédiatement à sa propre boîte - sans toucher à celle de qui que ce soit d'autre. Les utilisateurs le trouvent sous **Ma signature** sur [app.signature.cat/self-service](https://app.signature.cat/self-service).

## Ce que les administrateurs configurent

Deux interrupteurs rendent le self-service disponible :

1. **Activer des modèles pour le self-service.** Sur [Signatures](https://app.signature.cat/signatures), activez le self-service pour chaque modèle que les utilisateurs peuvent choisir. Seuls ces modèles sont visibles sur la page self-service.
2. **Accorder l'accès aux utilisateurs.** Sur [Gestion des accès](https://app.signature.cat/user-management), accordez aux utilisateurs ou aux groupes le niveau **Self-service** (ou **Self-service + édition** pour autoriser aussi leur propre HTML personnalisé). Voir [Gestion des accès](/docs/user-management/) - y compris l'avertissement sur les accès de groupe qui couvrent les futurs membres.

> [!WARNING]
> Désactiver le self-service sur un modèle efface les choix de chaque utilisateur qui l'avait sélectionné, et leurs tâches en attente sont annulées. L'application demande d'abord une confirmation.

## Ce que fait l'utilisateur

1. Se connecter sur [app.signature.cat](https://app.signature.cat) et ouvrir **Ma signature**.
2. Choisir un **Modèle de l'organisation** dans la liste déroulante. Un aperçu en direct est rendu à partir de la fiche Directory de l'utilisateur.
3. Les utilisateurs avec le niveau d'édition peuvent passer en **HTML personnalisé** et ajuster le balisage, avec les mêmes [variables](/docs/template-variables/) disponibles ; **Réinitialiser au modèle** restaure l'original.
4. Cliquer sur **Enregistrer la signature**. La signature est appliquée immédiatement à la boîte de l'utilisateur (« Enregistré - appliqué à votre boîte mail »), y compris à ses alias send-as acceptés.

Si la liste déroulante est vide, aucun modèle n'a encore le self-service activé : « Votre organisation n'a encore publié aucun modèle self-service. Demandez à un administrateur d'en activer un. »

## Comment le self-service interagit avec les affectations

Le choix self-service d'un utilisateur se situe au **sommet** de l'échelle de priorité : il l'emporte sur les affectations de groupe, d'OU et pour tous. La seule exception est une affectation avec **Remplacer le self-service** activé, qui inverse la règle pour les utilisateurs qu'elle couvre. Détails : [Affectations](/docs/assignments/#how-precedence-works).

> [!NOTE]
> Les utilisateurs self-service ne peuvent jamais définir que leur **propre** signature. Ils ne voient que les modèles que vous avez activés, jamais les données des autres utilisateurs ni les pages d'administration.
