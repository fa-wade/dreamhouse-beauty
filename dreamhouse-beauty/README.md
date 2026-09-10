# Dreamhouse Beauty Co.

Site e-commerce (démo statique) pour une marque de beauté rose et glamour :
rouge à lèvres, teint, yeux, ongles, parfums.

## Aperçu

- Catalogue filtrable par catégorie
- Panier latéral avec quantités et total
- Simulation de commande (aucun paiement réel)
- 100% HTML / CSS / JS vanilla, aucune dépendance à installer

## Lancer le projet en local

Aucun build n'est nécessaire. Ouvrez simplement `index.html` dans un
navigateur, ou servez le dossier :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Structure

```
dreamhouse-beauty/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── products.js   # données du catalogue
│   └── script.js     # rendu, filtres, panier
└── README.md
```

## Roadmap possible

- Page produit détaillée
- Paiement réel (Stripe)
- Back-office d'administration du catalogue
- Persistance du panier (backend + base de données)
