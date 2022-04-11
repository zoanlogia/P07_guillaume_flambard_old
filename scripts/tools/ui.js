import { filterContainer } from "../components/filter.js";
import { card } from "../components/card.js";

export const createFilter = (DATA) => { 
  const container = document.querySelector('.filter__container')
  container.append(filterContainer(DATA))
  // container.append(filterContainer(DATA))
  // container.append(filterContainer(DATA))
}

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
