import { dropdownIngredientContainer } from "../components/dropdown_ingredients.js";
import { card } from "../components/card.js";
import { getRecipesStocked } from "./storage.js";
import { dropdownApplianceContainer } from "../components/dropdown_appliances.js";
import { dropdownUstensilContainer } from "../components/dropdown_ustensils.js";
import { createInput } from "../components/searchbar.js";
import { displayError } from "../components/errorMessage.js";

/**
 * @description Creates a dropdown menu for the ingredients
 */
export const createSearchBar = () => {
  const container = document.querySelector(".search__container");
  container.append(createInput())
}


/**
 * @description Creates a dropdown with all the ingredients
 */
export const createFilter = () => {
  const container = document.querySelector(".filter__container");
  container.append(dropdownIngredientContainer());
  container.append(dropdownApplianceContainer());
  container.append(dropdownUstensilContainer());
};

/**
 * @param {Array} recipes - Array of recipes
 */
export const displayRecipes = () => {
  const recipes = getRecipesStocked();
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    if (recipe.display) {
      container.append(card(recipe));
    }
  });
  // display an error message if no recipe is found
  if (container.innerHTML === "") {
    container.append(displayError());
  }
};

export const removeAllselectedDropdowns = () => {
  window.addEventListener('click', () => {
    const dropdowns = document.querySelectorAll('.filter')
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('selected')
    }
    )
  })
}

