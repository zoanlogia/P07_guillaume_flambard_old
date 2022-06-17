import { dropdownIngredientContainer } from "../components/dropdown_ingredients.js";
import { card } from "../components/card.js";
import { getRecipesStocked } from "./storage.js";
import { dropdownApplianceContainer } from "../components/dropdown_appliances.js";
import { dropdownUstensilContainer } from "../components/dropdown_ustensils.js";

export const createFilter = () => {
  const container = document.querySelector(".filter__container");
  container.append(dropdownIngredientContainer());
  container.append(dropdownApplianceContainer())
  container.append(dropdownUstensilContainer())
}

export const displayRecipes = () => {
  const recipes = getRecipesStocked();
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    if (recipe.display) {
      container.append(card(recipe));
    }
  });
};

// main function
