import recipes from "../data/recipes.js";
import { handleInputIngredient } from "./tools/research_ingredients.js";
import { createFilter, displayRecipes } from "./tools/ui.js";

recipes.forEach((recipe) => {
  recipe.display = true;
});

window.localStorage.setItem("recipes", JSON.stringify(recipes));
createFilter();
displayRecipes();
handleInputIngredient()
// handleInputUstensil(DATA);
