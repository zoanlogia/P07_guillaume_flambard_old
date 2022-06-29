/** @format */

import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdownIng } from "./research_ingredients.js";
import { updateDropdownUst } from "./research_ustensils.js";

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
  onClickCloseTag();
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
  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
};

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

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      displayRecipes(getRecipesStocked());
      tag.remove();
      getApplianceInput().value = "";
      removeSelected();
    });
  });
};

export const searchAppliance = (value) => {
  const DATA = getRecipesStocked();

  // filtrer les recettes (display = true) pour n'afficher que ceux qui contiennent l'ingrédient (value)
  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnAppliance = recipe.appliance.includes(value);
      if (!isAnAppliance) {
        recipe.display = false;
      }
    }
    return recipe;
  });
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};

