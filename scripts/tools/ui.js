import {
  changePlaceholderIngredientsDropdown,
  dropdownIngredientContainer,
} from "../components/dropdown_ingredients.js";
import { card } from "../components/card.js";
import { getRecipesStocked } from "./storage.js";
import {
  changePlaceholderAppliancesDropdown,
  dropdownApplianceContainer,
} from "../components/dropdown_appliances.js";
import {
  changePlaceholderUstensilsDropdown,
  dropdownUstensilContainer,
} from "../components/dropdown_ustensils.js";
import { createInput } from "../components/searchbar.js";
import { displayError } from "../components/errorMessage.js";

/**
 * Creates the search bar element
 */
export const createSearchBar = () => {
  const container = document.querySelector(".search__container");
  container.append(createInput());
};

/**
 * Creates the filter dropdowns for ingredients, appliances, and ustensils
 */
export const createFilter = () => {
  const container = document.querySelector(".filter__container");
  container.append(dropdownIngredientContainer());
  container.append(dropdownApplianceContainer());
  container.append(dropdownUstensilContainer());
};

/**
 * Displays the recipes that should be displayed based on the `display` property
 * @param {Array} recipes - Array of recipes
 */
export const displayRecipes = () => {
  const recipes = getRecipesStocked().filter((recipe) => recipe.display);
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      container.append(card(recipe));
    });
  } else {
    container.append(displayError());
  }
};

/**
 * Removes the "selected" class from all dropdowns and updates the placeholder text
 */
export const removeAllselectedDropdowns = () => {
  const dropdowns = document.querySelectorAll(".filter");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    document.addEventListener("click", () => {
      dropdown.classList.remove("selected");
      changePlaceholderAppliancesDropdown();
      changePlaceholderIngredientsDropdown();
      changePlaceholderUstensilsDropdown();
    });
  });
};
