import { removeSelectedIng } from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagAppliances } from "./research_appliances.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";
import { normalizeString } from "./regex.js";
import { globalSearch, updateSelectedTags } from "./global_research.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input__ingredients");
};

export const getIngredientUl = () => {
  return document.querySelector("#filter__ingredients > div > ul");
};
export const onClickLiIng = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value.toLowerCase());
  divTags.innerHTML += tag;

  removeSelectedIng();
  updateDropdowns();
  onClickCloseTagIngredient();
  onClickCloseTagAppliances();
  onClickCloseTagUstensils();
  getIngredientInput().value = "";

  const recipesStocked = getRecipesStocked();
  recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnIngredient = current.ingredients.find(
        (el) => el.ingredient.toLowerCase() === value.toLowerCase()
      );
      if (!isAnIngredient) {
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

export const onClickCloseTagIngredient = () => {
  const closeTags = document.querySelectorAll(".closeIng");
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

export const getIngredientInputValue = () => {
  const input = getIngredientInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", (e) => {
    searchIngredient(e.target.value);
    setRecipesStocked(DATA);
    globalSearch();
  });
};

/**
 *
 * @returns retourne les ingrédients stockés dans le locale storage
 */
export const getAllIngredientsFromDisplayedRecipes = () => {
  const recipes = getRecipesStocked();
  const displayedRecipes = recipes.filter((recipe) => {
    return recipe.display;
  });
  const ingredients = displayedRecipes.map((recipe) => {
    return recipe.ingredients.map((ing) => ing.ingredient);
  });
  return [...new Set(ingredients.flat())];
};

// fonction avec boucle for

export const searchIngredient = (value) => {
  const ul = getIngredientUl();
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
