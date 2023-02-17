import { removeSelectedApp } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";
import { normalizeString } from "./regex.js";
import { globalSearch, updateSelectedTags } from "./global_research.js";

export const getApplianceInput = () => {
  return document.getElementById("filter__dropdown__input__appliances");
};

export const getApplianceUl = () => {
  return document.querySelector("#filter__appliances > div > ul");
};

export const onClickLiApp = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagAppliances(value.toLowerCase());
  divTags.innerHTML += tag;

  removeSelectedApp();
  updateDropdowns();
  onClickCloseTagAppliances();
  onClickCloseTagUstensils();
  onClickCloseTagIngredient();
  getApplianceInput().value = "";

  const recipesStocked = getRecipesStocked();
  recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnAppliance =
        current.appliance.toLowerCase() === value.toLowerCase();
      if (!isAnAppliance) {
        current.display = false;
      }
    }
    accumulator.push(current);
    return accumulator;
  }, []);
  setRecipesStocked(recipesStocked);
  displayRecipes();
  updateDropdowns();
};

export const onClickCloseTagAppliances = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      updateSelectedTags();

      const ingsTags = Array.from(
        document.querySelectorAll(".tag_ingredients > span")
      ).map((ing) => ing.innerText.toLowerCase());
      const ustsTags = Array.from(
        document.querySelectorAll(".tag_ustensils > span")
      ).map((ust) => ust.innerText.toLowerCase());
      const appsTags = Array.from(
        document.querySelectorAll(".tag_appliances > span")
      ).map((app) => app.innerText.toLowerCase());

      const selectedTags = [...ingsTags, ...appsTags, ...ustsTags];

      const recipes = getRecipesStocked();
      const filteredRecipes = recipes.filter((recipe) => {
        const recipeData = [
          ...recipe.ingredients.map((ing) => ing.ingredient.toLowerCase()),
          recipe.appliance.toLowerCase(),
          ...recipe.ustensils.map((ust) => ust.toLowerCase()),
        ];
        return selectedTags.every((tag) => recipeData.includes(tag));
      });

      setRecipesStocked(filteredRecipes);
      globalSearch();
      updateDropdowns();
      displayRecipes();
    });
  });
};

export const getApplianceInputValue = () => {
  const input = getApplianceInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", (e) => {
    searchAppliance(e.target.value);
    setRecipesStocked(DATA);
    globalSearch(); // Relance la recherche globale
  });
};

/**
 *
 * @returns retourne un tableau contenant les appareils des recettes affichées
 */
export const getAllAppliancesFromDisplayedRecipes = () => {
  const recipes = getRecipesStocked();
  const displayedRecipes = recipes.filter((recipe) => recipe.display);
  const appliances = displayedRecipes.map((recipe) => recipe.appliance);
  return [...new Set(appliances)];
};

// search appliance with for loop

export const searchAppliance = (value) => {
  const ul = getApplianceUl();
  const lis = ul.querySelectorAll("li");
  if (value.length >= 3) {
    for (let i = 0; i < lis.length; i++) {
      if (
        normalizeString(lis[i].innerText.toLowerCase()).includes(
          normalizeString(value).toLowerCase()
        )
      ) {
        lis[i].style.display = "block";
      } else {
        lis[i].style.display = "none";
      }
    }
  } else {
    if (value.length === 0) {
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.display = "block";
      }
    }
  }
};
