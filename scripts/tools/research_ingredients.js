/** @format */

import {
  removeSelected,
} from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input__ingredients");
};
export const getIngredientUl = () => {
  return document.querySelector("#filter__ingredients > div > ul");
};

export const handleInputIngredient = () => {
  getIngredientInput();
  getIngredientUl();
};

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchIngredient(value);
  updateDropdown();
  getIngredientInput().value = value;
  onClickCloseTag();
  getIngredientInput().value = "";
};

export const updateDropdown = () => {
  // filtrer les appareils et les ustensils 
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getIngredientUl();
  const ingAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredIngredients = getAllIngredientsFromDiplayedRecipes();

  const reduced = filteredIngredients.reduce((accumulator, current) => {
    if (!accumulator.includes(current.toLocaleLowerCase())) {
      accumulator.push(current.toLocaleLowerCase());
    }
    return accumulator;
  }, []);

  const ingToDisplay = reduced.filter((ingTag) => {
    return !ingAllreadySelected.includes(ingTag);
  });
  ul.innerHTML = "";
  ingToDisplay.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = keyword;
    li.onclick = () => {
      onClickLi(keyword);
    };
    ul.append(li);
  });
};

const getAllIngredientsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllIngredients = displayedRecipes.map((recipe) => {
    return recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase(),
    );
  });
  return [...new Set(AllIngredients.flat())];
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getIngredientInput().value = "";
      displayRecipes(getRecipesStocked());
      removeSelected();
    });
  });
};

export const searchIngredient = (value) => {
  const DATA = getRecipesStocked();

  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnIngredient = recipe.ingredients.find((el) => el.ingredient.toLowerCase() == value.toLowerCase());
      if (!isAnIngredient) {
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
