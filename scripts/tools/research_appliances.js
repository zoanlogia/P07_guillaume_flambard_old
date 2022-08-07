/** @format */

import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdownIng } from "./research_ingredients.js";
import { updateDropdownUst } from "./research_ustensils.js";
import { closeTags } from "./closeTags.js";

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

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagAppliances(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchAppliance(value);
  updateDropdownApp();
  updateDropdownIng();
  updateDropdownUst();
  getApplianceInput().value = value;
  closeTags()
  getApplianceInput().value = "";
};

export const updateDropdownApp = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getApplianceUl();
  const appAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

    const filteredAppliances = getAllAppliancesFromDiplayedRecipes();
    const reduced = filteredAppliances.reduce((accumulator, current) => {
      if (!accumulator.includes(current)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
  
    const appToDisplay = reduced.filter((appTag) => {
      return !appAllreadySelected.includes(appTag);
    });
    ul.innerHTML = "";
    appToDisplay.forEach((keyword) => {
      const li = document.createElement("li");
      li.classList.add("filter__dropdown__list__item");
      li.innerHTML = keyword;
      li.onclick = () => {
        onClickLi(keyword);
      };
      ul.append(li);
    });
};

/**
 * 
 * @returns retourne un tableau contenant les appareils des recettes affichées
 */
const getAllAppliancesFromDiplayedRecipes = () => {
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
