/** @format */

import { removeSelected } from "../components/dropdown_ustensils.js";
import { displayRecipes } from "./ui.js";
import { createTagUstensils } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdownApp } from "./research_appliances.js";
import { updateDropdownIng } from "./research_ingredients.js";

export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};
export const getUstensilUl = () => {
  return document.querySelector("#filter__ustensils > div > ul");
};

export const handleInputUstensil = () => {
  getUstensilInput();
  getUstensilUl();
};

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagUstensils(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchUstensil(value);
  updateDropdownUst();
  updateDropdownApp();
  updateDropdownIng();
  getUstensilInput().value = value;
  onClickCloseTag();
  getUstensilInput().value = "";
};

export const updateDropdownUst = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getUstensilUl();
  const appAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredUstensils = getAllUstensilsFromDiplayedRecipes();

  const reduced = filteredUstensils.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
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

const getAllUstensilsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllUstensils = displayedRecipes.map((recipe) => {
    return recipe.ustensils.map((ustensil) => ustensil);
  });
  return [...new Set(AllUstensils.flat())];
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeUst");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getUstensilInput().value = "";
      displayRecipes(getRecipesStocked());
      removeSelected();
    });
  });
};

export const searchUstensil = (value) => {
  const DATA = getRecipesStocked();

  // filtrer les recettes (display = true) pour n'afficher que ceux qui contiennent l'ingrédient (value)
  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnUstensil = recipe.ustensils.find((el) => el === value);
      if (!isAnUstensil) {
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
