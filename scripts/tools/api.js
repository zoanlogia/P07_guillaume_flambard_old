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
