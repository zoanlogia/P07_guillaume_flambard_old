import { getCleanData } from "./tools/api.js";
import { displayRecipes } from "./tools/ui.js";
const DATA = getCleanData()

displayRecipes(DATA)
console.log(DATA);

