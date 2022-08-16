/** @format */

import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { closeTags } from "./closeTags.js";
import { updateDropdowns } from "./updateDropdowns.js";

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
  closeTags()
  getApplianceInput().value = "";
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
