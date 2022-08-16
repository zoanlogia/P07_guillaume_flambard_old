import { removeSelected } from "../components/dropdown_ustensils.js";
import {
  getApplianceInput,
  searchAppliance,
} from "./research_appliances.js";
import {
  getIngredientInput,
  searchIngredient,
} from "./research_ingredients.js";
import {
  getUstensilInput,
  searchUstensil,
} from "./research_ustensils.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
import { displayRecipes } from "./ui.js";
import { updateDropdowns } from "./updateDropdowns.js";

const onClickCloseTagIngredient = () => {
  console.log("onClickCloseTag");
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getIngredientInput().value = "";
      removeSelected();
      updateDropdowns()

      const allIngs = document.querySelectorAll(".tag_ingredients > span");
      const DATA = getRecipesStocked();
      DATA.forEach((recipe) => {
        recipe.display = true;
      });
      setRecipesStocked(DATA);
      if (allIngs.length > 0) {
        allIngs.forEach((ing) => {
          searchIngredient(ing.innerText);
        });
      } else {
        displayRecipes();
      }
      updateDropdowns()
    });
  });
};

const onClickCloseTagAppliances = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      displayRecipes(getRecipesStocked());
      tag.remove();
      getApplianceInput().value = "";
      removeSelected();
      updateDropdowns()

      const allApps = document.querySelectorAll(".tag_appliances > span");
      const DATA = getRecipesStocked();
      DATA.forEach((recipe) => {
        recipe.display = true;
      });
      setRecipesStocked(DATA);
      if (allApps.length > 0) {
        allApps.forEach((app) => {
          searchAppliance(app.innerText);
        });
      } else {
        displayRecipes();
      }
      updateDropdowns()
    });
  });
};

const onClickCloseTagUstensils = () => {
  const closeTags = document.querySelectorAll(".closeUst");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getUstensilInput().value = "";
      removeSelected();
      updateDropdowns()
      const allUsts = document.querySelectorAll(".tag_ustensils > span");
      const DATA = getRecipesStocked();
      DATA.forEach((recipe) => {
        recipe.display = true;
      });
      setRecipesStocked(DATA);
      if (allUsts.length > 0) {
        allUsts.forEach((ing) => {
          searchUstensil(ing.innerText);
        });
      } else {
        displayRecipes();
      }
      updateDropdowns()
    });
  });
};

export const closeTags = () => {
    onClickCloseTagIngredient();
    onClickCloseTagAppliances();
    onClickCloseTagUstensils();
}