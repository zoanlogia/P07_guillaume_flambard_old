/** @format */

import { card } from "../components/card.js";

export const displayRecipes = (recipes) => {
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    if (recipe.display) {
      container.append(card(recipe));
    }
  });
};

// main function
