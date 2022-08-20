/** @format */

import { removeSelected } from "../components/dropdown_ustensils.js";
import { displayRecipes } from "./ui.js";
import { createTagUstensils } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";
import { onClickCloseTagAppliances } from "./research_appliances.js";

/**
 * 
 * @returns retourne un tableau contenant les ustensils des recettes stockées
 */
export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};

/**
 * 
 * @returns retourne un tableau contenant les ustensils des recettes stockées
 */
export const getUstensilUl = () => {
  return document.querySelector("#filter__ustensils > div > ul");
};

export const handleInputUstensil = () => {
  getUstensilInput();
  getUstensilUl();
};

export const getUstensilInputValue = () => {
  const input = getUstensilInput()
  const DATA = getRecipesStocked()
  input.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
      searchUstensil(e.target.value);
    } else {
      const ingredients = getAllUstensilsFromDiplayedRecipes();
      displayRecipes(ingredients);
    }
    setRecipesStocked(DATA);
  })
}

/**
 * 
 * @param {string} value - Valeur entrée dans le champ de recherche
 */
export const onClickLiUst = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagUstensils(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchUstensil(value);
  updateDropdowns()
  getUstensilInput().value = value;
  onClickCloseTagUstensils()
  onClickCloseTagAppliances()
  onClickCloseTagIngredient()
  getUstensilInput().value = "";
};

export const onClickCloseTagUstensils = () => {
  const closeTags = document.querySelectorAll(".closeUst");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getUstensilInput().value = "";
      removeSelected();
      updateDropdowns()

      const allUsts = document.querySelectorAll(".tag_ustensils > span");
      const allApps = document.querySelectorAll(".tag_appliances > span");
      const allIngs = document.querySelectorAll(".tag_ingredients > span");

      const DATA = getRecipesStocked();

      DATA.forEach((recipe) => {
        if (allIngs.length === 0 || allApps.length === 0) {
          recipe.display = true;
        }
        setRecipesStocked(DATA);
        displayRecipes(DATA);
      });

      allUsts.forEach((ust) => {
        searchUstensil(ust.innerText);
      })

      if (allUsts.length > 0) {
        allUsts.forEach((ust) => {
          searchUstensil(ust.innerText);
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
 * @returns retourne un tableau contenant les ustensils des recettes affichées
 */
export const getAllUstensilsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllUstensils = displayedRecipes.map((recipe) => {
    return recipe.ustensils.map((ustensil) => ustensil);
  });
  return [...new Set(AllUstensils.flat())];
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * 
 * @param {string} value Affiche les recettes qui contiennent le ustensil passé en paramètre 
 */
export const searchUstensil = (value) => {
  const DATA = getRecipesStocked()

  // filtrer les recettes (display = true) pour n'afficher que ceux qui contiennent l'ingrédient (value)
  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnUstensil = recipe.ustensils.find((el) => el.toLowerCase() === value.toLowerCase());
      if (!isAnUstensil) {
        recipe.display = false;
      }
    }
    return recipe;
  });
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};
