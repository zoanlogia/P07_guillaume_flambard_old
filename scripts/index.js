import { getCleanData } from "./tools/api.js";
import { createFilter, displayRecipes } from "./tools/ui.js";
import { handleInputIngredient } from "./tools/research.js";
const DATA = getCleanData()

createFilter(DATA)
displayRecipes(DATA)
handleInputIngredient(DATA)
