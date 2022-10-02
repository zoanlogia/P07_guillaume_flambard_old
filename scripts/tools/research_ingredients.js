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

export const onClickLiIng = value => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value);
  divTags.innerHTML += tag;

  removeSelected();
  updateDropdowns();
  onClickCloseTagIngredient();
  onClickCloseTagAppliances();
  onClickCloseTagUstensils();
  getIngredientInput().value = "";

  const recipesStocked = getRecipesStocked();
  const newRecipesToDisplay = recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnIngredient = current.ingredients.find(
        el => el.ingredient.toLowerCase() === value.toLowerCase()
      );
      if (!isAnIngredient) {
        current.display = false;
      }
    }

    accumulator.push(current);
    return accumulator;
  }, []);
  setRecipesStocked(newRecipesToDisplay);
  updateDropdowns();
  displayRecipes();
};

export const onClickCloseTagIngredient = () => {
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach(closeTag => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();

      const ingsTags = Array.from(
        document.querySelectorAll(".tag_ingredients > span")
      ).map(ing => ing.innerText.toLowerCase());
      const ustsTags = Array.from(
        document.querySelectorAll(".tag_ustensils > span")
      ).map(ust => ust.innerText.toLowerCase());
      const appsTags = Array.from(
        document.querySelectorAll(".tag_appliances > span")
      ).map(app => app.innerText.toLowerCase());

      const DATA = getRecipesStocked();
      DATA.forEach(recipe => {
        // on récupére tous les data de la recette
        const recipeIngredients = recipe.ingredients.map(ing => ing.ingredient.toLowerCase());
        const recipeUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
        const recipeAppliance = recipe.appliance.toLowerCase();

        // on fait des tableau avec tout dedans
        const recipeData = [
          ...recipeIngredients,
          recipeAppliance,
          ...recipeUstensils
        ];
        const tagsData = [...ingsTags, ...appsTags, ...ustsTags];
        // on compare les deux tableaux
        const allFounded = tagsData.every(el => recipeData.includes(el));
        if (allFounded) {
          recipe.display = true;
        } else {
          recipe.display = false;
        }
      });
      setRecipesStocked(DATA);
      updateDropdowns();
      displayRecipes();
    });
  });
};

export const getIngredientInputValue = () => {
  const input = getIngredientInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", e => {
    searchIngredient(e.target.value);
    setRecipesStocked(DATA);
  });
};

/**
 *
 * @returns retourne les ingrédients stockés dans le locale storage
 */
export const getAllIngredientsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter(recipe => {
    return recipe.display;
  });
  const AllIngredients = displayedRecipes.map(recipe => {
    return recipe.ingredients.map(ingredient => ingredient.ingredient);
  });
  return [...new Set(AllIngredients.flat())];
};

// fonction avec foreach
// export const searchIngredient = value => {
//   const ul = getIngredientUl();
//   const lis = ul.querySelectorAll("li");
//   if (value.length > 2) {
//     lis.forEach(li => {
//       if (li.innerText.includes(value)) {
//         li.style.display = "block";
//       } else {
//         li.style.display = "none";
//       }
//     });
//   } else {
//     lis.forEach(li => {
//       li.style.display = "block";
//     });
//   }
// };

// fonction avec accumulator

export const searchIngredient = value => {
  const ul = getIngredientUl();
  const lis = Array.from(ul.querySelectorAll("li"));

if (value.length > 2) {
    lis.reduce((accumulator, current) => {
      if (current.innerText.includes(value)) {
        current.style.display = "block";
        accumulator.push(current);
      } else {
        current.style.display = "none";
      }
      return accumulator;
    }, []);
  } else {
    lis.reduce((accumulator, current) => {
      current.style.display = "block";
      accumulator.push(current);
      return accumulator;
    }, []);
  }
} 

