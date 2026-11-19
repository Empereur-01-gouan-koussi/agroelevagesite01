# Guide du site Prés Vivants

## Pages publiques

- `index.html` : page d'accueil, présentation de la ferme, élevages, agriculture, produits, visites et contact.
- `elevages.html` : présentation détaillée des vaches, moutons et poules pondeuses.
- `agriculture.html` : cultures saisonnières, sols, eau, biodiversité et circuits courts.
- `boutique.html` : catalogue des produits disponibles. Les boutons ajoutent les articles au panier.
- `visites.html` : présentation des visites pédagogiques et accès à la réservation.
- `contact.html` : formulaire de contact général.

## Parcours panier et commandes

1. Un visiteur clique sur `Ajouter au panier` dans `boutique.html`.
2. `script.js` enregistre les produits dans `localStorage` sous la clé `pres-vivants-cart`.
3. `panier.html` affiche les produits, les quantités et le total.
4. `panier.js` collecte les coordonnées du client et transforme le panier en commande.
5. La commande est enregistrée dans `localStorage` sous la clé `pres-vivants-orders`.
6. `commandes.html` lit cette même clé et affiche le tableau de gestion.

## Espace de gestion

- `commandes.html` : tableau des commandes, formulaire de création et indicateurs.
- `commandes.js` : recherche, filtre par statut, changement d'état, suppression et ajout.
- `commandes.css` : styles du tableau, des statistiques et de la fenêtre de création.

Les statuts disponibles sont `Nouvelle`, `En préparation`, `Prête` et `Retirée`.

## Fichiers partagés

- `styles.css` : charte graphique globale, navigation, boutons, sections de l'accueil et responsive design.
- `styles-pages.css` : styles complémentaires des pages internes.
- `script.js` : navigation mobile, panier depuis la boutique et confirmation du formulaire de contact.
- `panier.css` : mise en page du panier et du formulaire de validation.
- `panier.js` : gestion des quantités et transmission de la commande.

## Remplacement par une vraie base de données

Le fonctionnement actuel est local au navigateur et sert de prototype fonctionnel. Pour une mise en production, il faudra remplacer les appels à `localStorage` par une API sécurisée reliée à une base de données serveur, avec authentification de l'espace de gestion et validation côté serveur.
