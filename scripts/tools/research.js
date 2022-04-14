import {
  addSelected,

} from "../components/filter.js";
import {
  displayRecipes
} from "./ui.js";
import {
  getAllIngredients,
  getCleanData
} from "./api.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input");
};

export const handleInputIngredient = () => {
  const input = getIngredientInput();
  const ingredients = getAllIngredients();
  const ul = document.querySelector(".filter__dropdown__list");

  let timeout = null;
  const time = 500;
  
  input.addEventListener("input", () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      
    }
    timeout = setTimeout(() => {
      // display
      addSelected();

      if (input.value.length >= 3) {

        // ================================
        // a mettre dans une fonction
        // on l'appelera lors du clic sur les li
        searchIngredient(input.value);
        ul.innerHTML = ''
        const keywords = ingredients.filter(ingredient => ingredient.includes(input.value));
        keywords.forEach(keyword => {
          const li = document.createElement("li");
          li.classList.add("filter__dropdown__list__item");
          li.innerHTML = keyword
          ul.append(li);
        // ================================

        })

      } else {

        // ============================================
        // trouver un moyen de déclancher ça 1 seul fois pour enlever le setimeout
        ul.innerHTML = ''
        ingredients.forEach(ingredient => {
          const li = document.createElement("li");
          li.classList.add("filter__dropdown__list__item");
          li.innerHTML = ingredient
          ul.append(li);
        })
        displayRecipes(getCleanData())
        // ============================================
      }

    }, time);
  });
};

export const searchIngredient = (value) => {
  const DATA = getCleanData()
  DATA.forEach((recipe) => {
    recipe.display = false;
    const regex = new RegExp(value.toLowerCase(), "g");

    recipe.ingredients.forEach(ing => {
      if (ing.ingredient.toLowerCase().search(regex) >= 0) {
        recipe.display = true
      }
    });
  });
  displayRecipes(DATA);
};

