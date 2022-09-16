import { getRecipesStocked } from "./storage.js";

/**
 * 
 * @returns retourne un tableau contenant les ingredients des recettes stockées
 */
export const getAllIngredients = () => {
  const ingredients = [];
  const DATA = getRecipesStocked()
  DATA.forEach((recipe) => {
    if (recipe.display) {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.push(ingredient.ingredient.toLowerCase());
      });
    }
  });

  return [...new Set(ingredients)]; // enlève les doublons (253 -> 123)
};

/**
 * 
 * @returns retourne un tableau contenant les appareils des recettes stockées
 */
export const getAllAppliances = () => {
  const appliances = [];
  const DATA = getRecipesStocked()
  DATA.forEach((recipe) => {
    if (recipe.display) {
      appliances.push(recipe.appliance.toLowerCase());
    }
  });
  return [...new Set(appliances)]; // enlève les doublons (253 -> 123)
};

/**
 * 
 * @returns retourne un tableau contenant les ustensils des recettes stockées
 */
export const getAllUstensils = () => {
  const ustensils = [];
  const DATA = getRecipesStocked()
  DATA.forEach((recipe) => {
    if (recipe.display) {
      recipe.ustensils.forEach((ustensil) => {
        ustensils.push(ustensil.toLowerCase());
      });
    }
  });
  return [...new Set(ustensils)]; // enlève les doublons (253 -> 123)
};
