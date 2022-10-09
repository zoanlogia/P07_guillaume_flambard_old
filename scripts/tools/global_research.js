import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked } from "./storage.js";
import { normalizeAccents } from "./regex.js";
import { updateDropdowns } from "./updateDropdowns.js ";

export const globalSearch = () => {
  const searchbar = document.getElementById("searchbar");
  const recipes = getRecipesStocked();
  const container = document.querySelector(".recipes__container");

  /**
   * @param {string} value - Valeur entrée dans le champ de recherche
   */
  searchbar.addEventListener("input", (e) => {
    if (e.target.value.length >= 3) {
      container.innerHTML = "";
      for (let i = 0; i < recipes.length; i++) {
        if (
          recipes[i].name
            .toLowerCase()
            .includes(normalizeAccents(e.target.value.toLowerCase()))
        ) {
          container.append(card(recipes[i]));
        }

        else if (
          recipes[i].ingredients.some((ingredient) => {
            return ingredient.ingredient
              .toLowerCase()
              .includes(normalizeAccents(e.target.value.toLowerCase()));
          })
        ) {
          container.append(card(recipes[i]));
        } else if (
          normalizeAccents(recipes[i].description)
            .toLowerCase()
            .includes(normalizeAccents(e.target.value.toLowerCase()))
        ) {
          container.append(card(recipes[i]));
        }
      }
      if (container.innerHTML == "") {
        container.append(displayError());
      }
    } else {
      if (document.querySelectorAll(".tags").length > 0) {
        container.innerHTML = "";
        recipes.forEach((recipe) => {
          if (recipe.tags.length > 0) {
            container.append(card(recipe));
          }
        });
      }
    }
    updateDropdowns()
  });
}
