/** @format */

import recipes from "../../data/recipes.js";

// get recipes stocked in localStorage

export const getRecipesStocked = () => {
  return JSON.parse(localStorage.getItem("recipes"));
};

export const getCleanData = () => {
  return putAllRecipesDisplayTrue(recipes);
};

const putAllRecipesDisplayTrue = (data) => {
  data.forEach((recipe) => {
    recipe.display = true;
  });
  return data;
};

export const getAllIngredients = () => {
  const ingredients = [];
  getCleanData().forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.push(ingredient.ingredient.toLowerCase());
    });
  });

  return [...new Set(ingredients)]; // enlève les doublons (253 -> 123)
};

export const getAllUstensils = () => {
  const ustensils = [];
  getCleanData().forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.push(ustensil.toLowerCase());
    });
  });
  return [...new Set(ustensils)]; // enlève les doublons (253 -> 123)
};
