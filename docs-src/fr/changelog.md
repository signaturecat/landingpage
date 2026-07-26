---
title: Changelog
navTitle: Changelog
description: Les nouveautés de SignatureCat - chaque mois, les nouvelles fonctions et améliorations de la gestion des signatures e-mail pour Google Workspace et Gmail.
updated: 2026-07-26
published: 2026-07-24
---

# Changelog

Les nouveautés de SignatureCat, le gestionnaire de signatures e-mail pour Google Workspace. Nous améliorons en continu les modèles de signature, l'intégration Gmail et l'administration Workspace - les points forts sont rassemblés ici, mois par mois.

## Juillet 2026

- **Un éditeur visuel de signatures.** Concevez des modèles de signature Gmail sans écrire de HTML : des puces de variables à glisser-déposer, des mises en page en 2-3 colonnes, des polices web-safe, une palette de couleurs compatible e-mail et des blocs conditionnels que vous voyez - avec un rendu garanti correct dans Gmail. L'éditeur HTML classique reste à un onglet de distance. Voir le nouveau guide [Éditeur visuel](/docs/visual-editor).
- **Redimensionnez les images par modèle.** Faites glisser les coins d'un logo, d'une bannière ou d'une photo de profil directement sur le canevas - chaque modèle de signature garde sa propre taille, et les entrées de bibliothèque de bannières peuvent définir leurs propres dimensions par défaut. Un modèle peut aussi remplacer le lien de clic d'une image sans toucher à la bibliothèque partagée.
- **Une variable {{photo}} plus maligne.** Utilisé seul, `{{photo}}` rend désormais une photo de profil circulaire prête à l'emploi, dimensionnée par modèle - et les utilisateurs sans photo dans l'annuaire Google Workspace n'obtiennent pas d'image cassée, la photo disparaît simplement de leur signature.
- **Validation de modèles plus claire.** Les erreurs d'enregistrement nomment désormais le jeton inconnu exact ou comptent les balises conditionnelles non équilibrées, et l'éditeur explique `{{del}}` vs `{{delete}}` avec deux mini-démos animées.
- **Documentation en quatre langues.** Ce centre d'aide est désormais disponible en anglais, polonais, allemand et français. Le sélecteur de langue dans le pied de page mène au même article, pour que toute votre équipe lise la gestion des signatures Google Workspace dans sa langue.
- **Voir qui a modifié un modèle de signature.** Chaque modèle de signature affiche désormais qui l'a modifié en dernier et quand - dans la liste des modèles et dans l'éditeur de signature. Utile quand plusieurs admins Workspace gèrent les signatures e-mail ensemble.
- **Domaine d'images personnalisé simplifié.** Héberger les bannières et logos de signature sur votre propre domaine ne demande plus qu'un seul enregistrement CNAME. Un assistant vérifie la configuration pour vous - voir [Domaine d'images personnalisé](/docs/custom-image-domain).
- **Résultats de déploiement plus clairs.** La vue des tâches a été repensée : barre de progression colorée, icônes de résultat par utilisateur et une section de détails d'exécution qui montre exactement quels comptes Gmail ont reçu la nouvelle signature.
- **Une page Logs dédiée.** L'historique des attributions de signatures a sa propre page [Logs](/docs/logs) - savoir qui a reçu quelle signature e-mail, et quand, ne prend qu'un clic.
- **Lancement de la documentation publique.** signature.cat/docs est en ligne avec plus de 20 guides - de la [connexion de votre Google Workspace](/docs/connect-google-workspace) à la [création de votre premier modèle de signature](/docs/create-your-first-template). Les liens d'aide dans l'application mènent désormais directement au bon article.
- **De meilleurs messages d'erreur partout.** Chaque écran affiche désormais un message clair dans votre langue en cas de problème, avec les détails techniques à portée de main - utile pour contacter le support.
- **Suppression de modèles plus sûre.** Supprimer un modèle de signature encore attribué à des groupes ou unités organisationnelles affiche d'abord un avertissement avec les décomptes exacts.
- **Mise à jour juridique.** Nouveau hub juridique avec conditions d'utilisation et politique de confidentialité par langue, une bannière cookies respectueuse de la vie privée et l'acceptation des conditions intégrée à l'onboarding.

## Juin 2026

- **Signatures pour les alias d'envoi Gmail.** SignatureCat gère les signatures e-mail des alias Gmail, pas seulement de l'adresse principale. Activez l'autorisation Google Workspace optionnelle et chaque alias d'envoi de votre domaine peut porter sa propre signature de marque.
- **Notifications dans l'application et nouveaux e-mails.** Une cloche de notifications tient les admins Workspace informés des déploiements de signatures, et tous les e-mails transactionnels ont reçu un design clair et responsive.
- **Contrôle du self-service par attribution.** Décidez par groupe ou unité organisationnelle si les utilisateurs peuvent personnaliser leur signature e-mail ou si le modèle de l'entreprise reste verrouillé - voir [Self-service](/docs/self-service).
- **Un essai gratuit pour chaque workspace.** Nouvelle tarification avec essai gratuit : connectez votre Google Workspace, essayez la gestion complète des signatures et choisissez un plan quand vous êtes prêt.
- **Expérience mobile peaufinée.** Infobulles, meilleures mises en page mobiles et un écran de connexion rafraîchi dans toute l'application.

## Mai 2026

- **SignatureCat devient public.** Première version publique : gestion centralisée des signatures e-mail pour Google Workspace. Créez un modèle de signature, déployez-le auprès de chaque utilisateur Gmail de votre domaine et gardez une image de marque cohérente automatiquement.
