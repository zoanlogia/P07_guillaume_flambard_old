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

export const handleInputIngredient = (DATA) => {
  const input = getIngredientInput();

  let timeout = null;
  const time = 500;
  input.addEventListener("input", () => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      searchIngredient(input.value, DATA);

      const ingredients = getAllIngredients(DATA);
      addSelected(DATA);

      const keywords = ingredients.filter(ingredient => ingredient.toLowerCase().includes(input.value));
      
      const li = document.createElement("li");
      const ul = document.querySelector(".filter__dropdown__list");
      if (input.value !== "") {
        
        keywords.forEach(keyword => {
          
          li.classList.add("filter__dropdown__list__item");
          li.innerHTML = keyword
          ul.append(li);
          console.log(keywords);
        })
      }
      
    }, time);
  });
};

export const searchIngredient = (value, DATA) => {
  if (value.length >= 3) {
    DATA.forEach((recipe) => {
      recipe.display = false;
      const regex = new RegExp(value.toLowerCase(), "g");

      recipe.ingredients.forEach(ing => {
        if (ing.ingredient.toLowerCase().search(regex) >= 0) {
          recipe.display = true
        }
      });
    });
  } else {
    DATA = getCleanData();
  }
  displayRecipes(DATA);
};

