import { getCleanData } from "./tools/api.js";
import { createFilter, displayRecipes } from "./tools/ui.js";
import { handleInputIngredient } from "./tools/research_ingredients.js";
import { handleInputUstensil } from "./tools/research_ustensils.js";
const DATA = getCleanData()

createFilter(DATA)
displayRecipes(DATA)
handleInputIngredient(DATA)
handleInputUstensil(DATA)
