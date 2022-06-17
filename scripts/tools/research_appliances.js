/** @format */

import {
  removeSelected,
} from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";

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
  updateDropdown();
  getApplianceInput().value = value;
  onClickCloseTag();
  getApplianceInput().value = "";
};

export const updateDropdown = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getApplianceUl();
  const appAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredAppliances = getAllAppliancesFromDiplayedRecipes();

  const reduced = filteredAppliances.reduce((accumulator, current) => {
    if (!accumulator.includes(current.toLocaleLowerCase())) {
      accumulator.push(current.toLocaleLowerCase());
    }
    return accumulator;
  }, []);

  const appToDisplay = reduced.filter((ingTag) => {
    return !appAllreadySelected.includes(ingTag);
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

const getAllAppliancesFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllAppliances = displayedRecipes.map((recipe) => {
    return recipe.appliances.map((appliance) =>
      appliance.appliance.toLowerCase(),
    );
  });
  return [...new Set(AllAppliances.flat())];
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getApplianceInput().value = "";
      displayRecipes(getRecipesStocked());
      removeSelected();
    });
  });
};

export const searchAppliance = (value) => {
  const DATA = getRecipesStocked();

  // eslint-disable-next-line max-len
  // filtrer les recettes (display = true) pour n'afficher que ceux qui contiennent l'ingrédient (value)
  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnAppliance = recipe.appliances.find((el) => el.appliance.toLowerCase() == value.toLowerCase());
      if (!isAnAppliance) {
        recipe.display = false;
      }
    }
    return recipe;
  });
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};

// même logique pour les autres filtres

// 
