import { getCleanData } from "./tools/api.js";
import { handleInputIngredient } from "./tools/research.js";
import { displayRecipes } from "./tools/ui.js";
const DATA = getCleanData()

displayRecipes(DATA)
handleInputIngredient(DATA)
