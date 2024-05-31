# Projet Angular M2 FrontEnd

## Table des matières

- [Projet Angular M2 FrontEnd](#projet-angular-m2-frontend)
  - [Table des matières](#table-des-matières)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Utilisation](#utilisation)
  - [Fonctionnalités](#fonctionnalités)
  - [Contributeurs](#contributeurs)
    - [57 - ETU1340 (noumsfinoana@gmail.com)](#57---etu1340-noumsfinoanagmailcom)
    - [11 - ace34TT (tafinasoa35@gmail.com)](#11---ace34tt-tafinasoa35gmailcom)
  - [Améliorations Possibles](#améliorations-possibles)

## Introduction

Ce projet constitue le frontend pour la gestion des devoirs dans un cadre éducatif. Il offre diverses fonctionnalités, y compris les opérations CRUD pour les devoirs, le défilement infini, les capacités de recherche, les notifications et la gestion des utilisateurs. Le frontend est construit en utilisant Angular et communique avec un backend basé sur Node.js et MongoDB.

## Installation

Pour installer et exécuter ce projet localement :

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/ETU1340/Tp_angular_assignment_front_11_57.git
   ```

2. Accédez au répertoire du projet :
   ```bash
   cd Angular_M2_Front
   ```

3. Installez les dépendances :
   ```bash
   npm install --legacy-peer-deps
   ```

4. Configurez les variables d'environnement nécessaires dans un fichier `.env`.

5. Démarrez l'application :
   ```bash
   ng serve
   ```

## Utilisation

Une fois l'application démarrée, vous pouvez accéder à l'interface utilisateur via un navigateur web pour gérer les devoirs, visualiser les statistiques, utiliser le défilement infini et bien plus encore.

## Fonctionnalités

- **Opérations CRUD pour les Devoirs** : Créer, lire, mettre à jour et supprimer des devoirs.
- **Défilement Infini** : Charger efficacement de grands ensembles de données avec le défilement infini.
- **Fonctionnalité de Recherche** : Capacités de recherche améliorées pour les devoirs à rendre et rendus.
- **Notifications** : Affichage des messages de succès et notifications.
- **Gestion des Utilisateurs** : Authentification et autorisation des utilisateurs, avec gestion des droits des administrateurs.
- **Intégration TailwindCSS** : Utilisation de TailwindCSS pour le design et la mise en page.

## Contributeurs

### 57 - ETU1340 (noumsfinoana@gmail.com)
- **Commit Initial et Configuration** : Configuration initiale du projet et upload des fichiers.
- **Gestion des Professeurs** : Création des classes pour gérer les professeurs.
- **Glisser-Déposer** : Ajout de la fonctionnalité de glisser-déposer pour les devoirs.
- **Défilement Infini** : Implémentation du défilement infini.
- **Fonctions de Recherche** : Création et amélioration des fonctionnalités de recherche pour les devoirs.
- **Messages de Succès** : Ajout de messages de succès pour la remise des devoirs.
- **Notifications** : Ajout de messages de notification.
- **Gestion des Droits Admin** : Déconnexion et gestion des droits spécifiques pour les administrateurs.
- **Formulaire d'Ajout** : Mise en place du formulaire d'ajout par étape des devoirs.
- **Page de Connexion** : Mise en place d'une page de connexion.
- **Déploiement de l'application sur Netlify** : Gestion des étudiants.

### 11 - ace34TT (tafinasoa35@gmail.com)
- **Refonte de Design** : Refonte complète de toutes les pages.
- **Ajout de .htaccess** : Ajout du fichier .htaccess.
- **Modale Admin** : Correction de la modalité d'administration.
- **URL de Base** : Mise à jour de l'URL de base vers le serveur distant.
- **Carte des Devoirs** : Correction de la couleur des cartes des devoirs.
- **Refactorisation du Code** : Refactorisation du code et ajout de l'URL du serveur.
- **Fonctionnalités Admin** : Ajout de l'authentification des administrateurs et rendu du design.
- **Dashboard** : Ajout du tableau de bord.
- **Design et Détails** : Mise à jour et détails du design.
- **Style et Mise en Page** : Refonte du design, ajout de tailwindcss, et mise en page de l'application.
- **Chargement de l'Écran** : Ajout d'un loader pour l'écran.
- **Barre de Navigation** : Stylisation de la barre de navigation.
- **Gestion des Étudiants** : Gestion des étudiants.


## Améliorations Possibles

- **Tests Complètes** : Ajouter des tests unitaires et des tests d'intégration pour garantir la fiabilité de l'application frontend.
- **Documentation de l'API** : Créer une documentation détaillée de l'API en utilisant des outils comme Swagger pour aider les développeurs à comprendre et utiliser l'API.
- **Optimisation des Performances** : Optimiser les requêtes et la logique frontend pour améliorer les performances.
- **Amélioration de l'Expérience Utilisateur** : Ajouter plus d'animations et améliorer l'interface utilisateur pour une meilleure expérience.

Pour toute question ou contribution supplémentaire, n'hésitez pas à ouvrir une issue ou à soumettre une pull request. Merci d'utiliser notre application frontend !