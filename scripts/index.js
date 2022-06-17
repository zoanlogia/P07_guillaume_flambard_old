import recipes from "../data/recipes.js";
import { createFilter, displayRecipes } from "./tools/ui.js";

recipes.forEach((recipe) => {
  recipe.display = true;
});

window.localStorage.setItem("recipes", JSON.stringify(recipes));
createFilter();
displayRecipes();
// handleInputUstensil(DATA);
