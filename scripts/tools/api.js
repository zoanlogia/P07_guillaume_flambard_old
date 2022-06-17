import { getRecipesStocked } from "./storage.js";

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

export const getAllUstensils = () => {
  const ustensils = [];
  const DATA = getRecipesStocked()
  DATA.forEach((recipe) => {
    if (recipe.display) {
      recipe.ustensils.forEach((ustensil) => {
        ustensils.push(ustensil)
      });
    }
  });
  return [...new Set(ustensils)]; // enlève les doublons (253 -> 123)
};
