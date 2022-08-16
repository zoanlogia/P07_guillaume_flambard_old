import { removeSelected } from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { closeTags } from "./closeTags.js";
import { updateDropdowns } from "./updateDropdowns.js";

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
  closeTags()
  getIngredientInput().value = "";
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
  console.log(newRecipesToDisplay);
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};
