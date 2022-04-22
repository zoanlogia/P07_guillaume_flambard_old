/** @format */

import { addSelected, removeSelected } from "../components/filter.js";
import { displayRecipes } from "./ui.js";
import { getAllIngredients, getCleanData } from "./api.js";
import { createTag } from "../components/tag.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input");
};

export const handleInputIngredient = () => {
  const input = getIngredientInput();
  const ingredients = getAllIngredients();
  const ul = document.querySelector(".filter__dropdown__list");

  input.addEventListener("input", () => {
    addSelected();

    if (input.value.length >= 3) {
      searchIngredient(input.value);
      ul.innerHTML = "";
      const keywords = ingredients.filter((ingredient) =>
        ingredient.includes(input.value),
      );
      keywords.forEach((keyword) => {
        const li = document.createElement("li");
        li.classList.add("filter__dropdown__list__item");
        li.innerHTML = keyword;
        li.onclick = () => {
          onClickLi(keyword);
        };
        ul.append(li);
      });
    } else if (input.value.length == 2) {
      ul.innerHTML = "";
      ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.classList.add("filter__dropdown__list__item");
        li.innerHTML = ingredient;
        ul.append(li);
      });
      displayRecipes(getCleanData());
      removeSelected();
    }
  });
};

const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTag(value);
  divTags.innerHTML += tag;

  removeSelected();
  getIngredientInput().value = value
  onClickCloseTag();

  // 1 - fermer la dropdown
  // 2 - afficher dans la dropdown la value
  // 3 - filtrer les card en fonction de la value ==> searchIngredient(value)
  // 4 - quand on click sur la croix du tag => log tu tag !!
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".close__tag");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      console.log(tag.textContent);
      tag.remove();
      getIngredientInput().value = "";
      displayRecipes(getCleanData());
      removeSelected();
    });
  });

 }

// export const closeTag = () => { 
//    const img = document.querySelector(".close__tag");
//    img.addEventListener("click", () => {
//      getIngredientInput().value = "";
//    });
// }

export const searchIngredient = (value) => {
  const DATA = getCleanData();
  DATA.forEach((recipe) => {
    recipe.display = false;
    const regex = new RegExp(value.toLowerCase(), "g");

    recipe.ingredients.forEach((ing) => {
      if (ing.ingredient.toLowerCase().search(regex) >= 0) {
        recipe.display = true;
      }
    });
  });
  displayRecipes(DATA);
};
