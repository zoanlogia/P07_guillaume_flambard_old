# P07_guillaume_flambard

## Introduction

Pour ce projet, nous avons utilisé un langage de programmation **Javascript**, **HTML** et **CSS** via le préprocesseur **SCSS**.

## Processus de conception

1. **storage.js**: pour stocker en locale les recettes.
2. **api.js**: pour diviser les recettes en plusieurs catégories `ingredients`, `appareils`, `ustensils`.
4. **research_ingredients.js**, **research_appliances.js**, **research_ustensils.js**: contiennent la logique de la recherche des recettes par ingrédients, appareils et ustensils. **global_research.js** regroupe ces trois logiques.
5. **ui.js**: pour regrouper les différents components.
6. **index.js**: pour générer le DOM.

## Benchmark
voici les résulats du benchmark sur la fonction `searchIngredient`

![Screenshot](assets/screenshots/Capture%20d%E2%80%99%C3%A9cran%202022-07-27%20%C3%A0%2012.33.32.png)
![Screenshot](assets/screenshots/Capture%20d%E2%80%99%C3%A9cran%202022-07-27%20%C3%A0%2012.33.37.png)

## Schéma

![Schema](assets/screenshots/Capture%20d%E2%80%99%C3%A9cran%202022-07-27%20%C3%A0%2013.27.46.png)