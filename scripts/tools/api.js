// Importe la fonction getRecipesStocked depuis le module storage.js
import { getRecipesStocked } from "./storage.js";

/**
 * Retourne un tableau contenant toutes les valeurs de la propriété spécifiée pour toutes les recettes stockées qui ont été marquées pour être affichées.
 * @param {string} propName - Le nom de la propriété de la recette à extraire.
 * @param {function} valueConverter - La fonction convertisseur qui sera utilisée pour convertir les valeurs de propriété en minuscules et enlever les doublons.
 * @returns {Array} - Le tableau contenant toutes les valeurs de la propriété spécifiée.
 */
export const getAllItems = (propName, valueConverter) => {
  const items = [];
  const DATA = getRecipesStocked();
  DATA.forEach((recipe) => {
    if (recipe.display) { // Vérifie si la recette doit être affichée
      const propValue = recipe[propName];
      if (propValue) {
        if (Array.isArray(propValue)) {
          propValue.forEach((item) => {
            items.push(valueConverter(item)); // Ajoute la valeur de propriété convertie au tableau d'éléments
          });
        } else {
          items.push(valueConverter(propValue)); // Ajoute la valeur de propriété convertie au tableau d'éléments
        }
      }
    }
  });
  return [...new Set(items)]; // Retourne un tableau contenant toutes les valeurs uniques de la propriété spécifiée
};

/**
 * Retourne un tableau contenant tous les ingrédients de toutes les recettes stockées qui ont été marquées pour être affichées.
 * @returns {Array} - Le tableau contenant tous les ingrédients.
 */
export const getAllIngredients = () => {
  return getAllItems('ingredients', (ingredient) => ingredient.ingredient.toLowerCase());
};

/**
 * Retourne un tableau contenant tous les appareils de toutes les recettes stockées qui ont été marquées pour être affichées.
 * @returns {Array} - Le tableau contenant tous les appareils.
 */
export const getAllAppliances = () => {
  return getAllItems('appliance', (appliance) => appliance.toLowerCase());
};

/**
 * Retourne un tableau contenant tous les ustensiles de toutes les recettes stockées qui ont été marquées pour être affichées.
 * @returns {Array} - Le tableau contenant tous les ustensiles.
 */
export const getAllUstensils = () => {
  return getAllItems('ustensils', (ustensil) => ustensil.toLowerCase());
};
