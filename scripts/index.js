import recipes from "../data/recipes.js";
import { globalSearch } from "./tools/global_research.js";
import {createFilter, createSearchBar, displayRecipes } from "./tools/ui.js";

recipes.forEach((recipe) => {
  recipe.display = true;
});

window.localStorage.setItem("recipes", JSON.stringify(recipes));
createSearchBar()
createFilter();
displayRecipes();
globalSearch()
