# Version PHP

## Lancer le projet

PHP doit être installé et disponible dans le PATH. Depuis la racine du projet :

```powershell
php -S localhost:8000
```

Ouvrir ensuite `http://localhost:8000/`.

## Architecture

- `index.php` : point d'entrée du site.
- `pages/index.php` : accueil rendu par PHP.
- `pages/boutique.php` : produits générés par PHP.
- `pages/admin.php` : tableau de bord serveur.
- `pages/commandes.php` : tableau des commandes connecté à l'API.
- `api/orders.php` : API JSON CRUD des commandes.
- `config/database.php` : lecture et écriture de la base JSON.
- `data/orders.json` : stockage local serveur de démonstration.

La validation du panier envoie désormais les commandes à `api/orders.php`. Le `localStorage` reste uniquement utilisé pour conserver le panier avant sa validation.

Pour la production, remplacer le fichier JSON par MySQL ou PostgreSQL et ajouter une authentification à l'administration.
