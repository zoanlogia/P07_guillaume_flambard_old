import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";

export const getApplianceInput = () => {
  return document.getElementById("filter__dropdown__input__appliances");
};
export const getApplianceUl = () => {
  return document.querySelector("#filter__appliances > div > ul");
};

export const handleInputAppliance = () => {
  getApplianceInput();
  getApplianceUl();
};

export const getApplianceInputValue = () => {
  const input = getApplianceInput()
  const DATA = getRecipesStocked();
  input.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
      searchAppliance(e.target.value);
    } else {
      const appliances = getAllAppliancesFromDiplayedRecipes();
      displayRecipes(appliances);
    }
    setRecipesStocked(DATA);
  })
}

export const onClickLiApp = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagAppliances(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchAppliance(value);
  updateDropdowns()
  getApplianceInput().value = value;
  onClickCloseTagAppliances()
  onClickCloseTagUstensils()
  onClickCloseTagIngredient()
  getApplianceInput().value = "";
};

export const onClickCloseTagAppliances = () => {
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
      const tag_ustensils = document.querySelectorAll(".tag_ustensils > span");
      const tag_ingredients = document.querySelectorAll(".tag_ingredients > span");

      const DATA = getRecipesStocked();

      DATA.forEach((recipe) => {
        if (tag_ustensils.length == 0 || tag_ingredients.length == 0) {
          recipe.display = true;
        }
        setRecipesStocked(DATA);
        displayRecipes(DATA);
        searchAppliance(getApplianceInput().value);
      });
      if (allApps.length > 0) {
        allApps.forEach((app) => {
          searchAppliance(app.innerText);
        });
      } else {
        displayRecipes(DATA);
      }
      updateDropdowns()
    });
  });
};

/**
 * 
 * @returns retourne un tableau contenant les appareils des recettes affichées
 */
export const getAllAppliancesFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllAppliances = displayedRecipes.map((recipe) => {
    return recipe.appliance
  });
  return [...new Set(AllAppliances.flat())];
};

/**
 * 
 * @param {string} value Affichage des recettes correspondant à l'appareil
 */
export const searchAppliance = (value) => {
  const DATA = getRecipesStocked();

  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnAppliance = recipe.appliance.toLowerCase().includes(value.toLowerCase());
      if (!isAnAppliance) {
        recipe.display = false;
      }
    }
    return recipe;
  });
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};
