import { removeSelectedUst } from "../components/dropdown_ustensils.js";
import { displayRecipes } from "./ui.js";
import { createTagUstensils } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";
import { onClickCloseTagAppliances } from "./research_appliances.js";
import { normalizeString } from "./regex.js";
import { globalSearch, updateSelectedTags } from "./global_research.js";

export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};

export const getUstensilUl = () => {
  return document.querySelector("#filter__ustensils > div > ul");
};

export const onClickLiUst = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagUstensils(value.toLowerCase());
  divTags.innerHTML += tag;

  removeSelectedUst();
  updateDropdowns();
  onClickCloseTagUstensils();
  onClickCloseTagAppliances();
  onClickCloseTagIngredient();
  getUstensilInput().value = "";

  const recipesStocked = getRecipesStocked();
  recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnUstensil = current.ustensils.find(
        (el) => el.toLowerCase() === value.toLowerCase()
      );
      if (!isAnUstensil) {
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

export const onClickCloseTagUstensils = () => {
  const closeTags = document.querySelectorAll(".closeUst");
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

export const getUstensilInputValue = () => {
  const input = getUstensilInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", (e) => {
    searchUstensil(e.target.value);
    setRecipesStocked(DATA);
    globalSearch();
  });
};
/**
 *
 * @returns retourne un tableau contenant les ustensils des recettes affichées
 */
export const getAllUstensilsFromDisplayedRecipes = () => {
  const recipes = getRecipesStocked();
  const displayedRecipes = recipes.filter((recipe) => recipe.display);
  const ustensils = displayedRecipes.map((recipe) => recipe.ustensils).flat();
  return [...new Set(ustensils)];
};

// function with for loop and find and remove doublons

export const searchUstensil = (value) => {
  const ul = getUstensilUl();
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
