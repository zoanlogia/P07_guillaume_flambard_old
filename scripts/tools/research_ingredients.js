import { removeSelected } from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdownApp, updateDropdownIng, updateDropdowns, updateDropdownUst } from "./updateDropdowns.js";
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
  updateDropdowns()
  onClickCloseTagIngredient()
  onClickCloseTagAppliances()
  onClickCloseTagUstensils()
  getIngredientInput().value = "";
  
  const recipesStocked = getRecipesStocked();
  const newRecipesToDisplay = recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnIngredient = current.ingredients.find(
        (el) => el.ingredient.toLowerCase().includes(value.toLowerCase())
      );
      if (!isAnIngredient) {
        current.display = false;
      }
    }
    accumulator.push(current);
    return accumulator;
  }, []);

  setRecipesStocked(newRecipesToDisplay);
  updateDropdownIng()
  updateDropdownUst()
  updateDropdownApp()
  displayRecipes();
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
    searchIngredient(e.target.value);
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


export const searchIngredient = (value) => {
  const ul = getIngredientUl();
  const lis = ul.querySelectorAll("li");
  if (value.length > 2) {
    lis.forEach(li => {
      if (li.innerHTML.toLowerCase().includes(value.toLowerCase())) {
        li.style.display = "block";
      } else {
        li.style.display = "none";
      }
    })
  } else {
    lis.forEach(li => {
      li.style.display = "block";
    })
  }
};