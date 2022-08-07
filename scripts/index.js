import recipes from "../data/recipes.js";
import { globalSearch } from "./tools/global_research.js";
import { getApplianceInputValue } from "./tools/research_appliances.js";
import { getIngredientInputValue } from "./tools/research_ingredients.js";
import { getUstensilInputValue } from "./tools/research_ustensils.js";
import {createFilter, createSearchBar, displayRecipes } from "./tools/ui.js";

recipes.forEach((recipe) => {
  recipe.display = true;
});

window.localStorage.setItem("recipes", JSON.stringify(recipes));
createSearchBar()
createFilter()
getIngredientInputValue()
getUstensilInputValue()
getApplianceInputValue()
displayRecipes()
globalSearch()
