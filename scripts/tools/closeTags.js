import { removeSelected } from "../components/dropdown_ustensils.js";
import {
  getApplianceInput,
  searchAppliance,
  updateDropdownApp,
} from "./research_appliances.js";
import {
  getIngredientInput,
  searchIngredient,
  updateDropdownIng,
} from "./research_ingredients.js";
import {
  getUstensilInput,
  searchUstensil,
  updateDropdownUst,
} from "./research_ustensils.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
import { displayRecipes } from "./ui.js";

const onClickCloseTagIngredient = () => {
  console.log("onClickCloseTag");
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getIngredientInput().value = "";
      removeSelected();
      updateDropdownIng();

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
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      } else {
        displayRecipes();
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      }
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
      updateDropdownApp();

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
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      } else {
        displayRecipes();
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      }
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
      updateDropdownUst();
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
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      } else {
        displayRecipes();
        updateDropdownIng();
        updateDropdownApp();
        updateDropdownUst();
      }
    });
  });
};

export const closeTags = () => {
    onClickCloseTagIngredient();
    onClickCloseTagAppliances();
    onClickCloseTagUstensils();
}