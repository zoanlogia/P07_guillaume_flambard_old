import { removeSelected } from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagAppliances } from "./research_appliances.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input__ingredients");
};

export const getIngredientUl = () => {
  return document.querySelector("#filter__ingredients > div > ul");
};

export const onClickLiIng = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchIngredient(value);
  updateDropdowns()
  getIngredientInput().value = value;
  onClickCloseTagIngredient()
  onClickCloseTagAppliances()
  onClickCloseTagUstensils()
  getIngredientInput().value = "";
};

export const onClickCloseTagIngredient = () => {
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getIngredientInput().value = "";
      removeSelected();
      updateDropdowns()

      const allIngs = document.querySelectorAll(".tag_ingredients > span");
      const allUsts = document.querySelectorAll(".tag_ustensils > span");
      const allApps = document.querySelectorAll(".tag_appliances > span");

      const DATA = getRecipesStocked();

      DATA.forEach((recipe) => {
        if (allUsts.length === 0 || allApps.length === 0) {
          recipe.display = true;
        }
        setRecipesStocked(DATA);
        displayRecipes(DATA);
      });
      
      if (allIngs.length > 0) {
        allIngs.forEach((ing) => {
          searchIngredient(ing.innerText);
        });
      } else {
        displayRecipes(DATA);
      }
      updateDropdowns()
    });
  });
};

export const getIngredientInputValue = () => {
  const input = getIngredientInput()
  const DATA = getRecipesStocked();
  input.addEventListener('input', (e) => {
    if (e.target.value.length >= 3) {
      searchIngredient(e.target.value);
    } else {
      const ingredients = getAllIngredientsFromDiplayedRecipes();
      displayRecipes(ingredients);
    }
    setRecipesStocked(DATA);
  })
}

/**
 * 
 * @returns retourne les ingrédients stockés dans le locale storage
 */
export const getAllIngredientsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllIngredients = displayedRecipes.map((recipe) => {
    return recipe.ingredients.map((ingredient) =>
      ingredient.ingredient
    );
  });
  return [...new Set(AllIngredients.flat())];
};

/**
 * 
 * @param {string} value Affiche les recettes qui contiennent l'ingrédient
 */

// first function to search the ingredient

// export const searchIngredient = (value) => {
//   const DATA = getRecipesStocked();
//   const newRecipesToDisplay = DATA.map((recipe) => {
//     if (recipe.display) {
//       const isAnIngredient = recipe.ingredients.find(
//         (el) => el.ingredient.toLowerCase() == value.toLowerCase()
//       );
//       if (!isAnIngredient) {
//         recipe.display = false;
//       }
//     }
//     return recipe;
//   });
//   setRecipesStocked(newRecipesToDisplay);
//   displayRecipes();
// };

// second function to search the ingredient

export const searchIngredient = (value) => {
  const DATA = getRecipesStocked();
  const newRecipesToDisplay = DATA.reduce((accumulator, current) => {
    if (current.display) {
      const isAnIngredient = current.ingredients.find(
        (el) => el.ingredient.toLowerCase() == value.toLowerCase()
      );
      if (!isAnIngredient) {
        current.display = false;
      }
    }
    accumulator.push(current);
    return accumulator;
  }, []);
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};
