import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
import { normalizeAccents } from "./regex.js";
import { updateDropdowns } from "./updateDropdowns.js ";
import { displayRecipes, removeAllselectedDropdowns } from "./ui.js";

export const globalSearch = () => {
  const searchbar = document.getElementById("searchbar");
  const container = document.querySelector(".recipes__container");

  /**
   * @param {string} value - Valeur entrée dans le champ de recherche
   */
  searchbar.addEventListener("input", (e) => {
    if (e.target.value.length >= 3) {
      const recipes = getRecipesStocked();
      container.innerHTML = "";
      for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].display) {
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
      }
      if (container.innerHTML == "") {
        container.append(displayError());
      }
    } else {
      updateDropdowns();

      const ingsTags = Array.from(
        document.querySelectorAll(".tag_ingredients > span")
      ).map((ing) => ing.innerText.toLowerCase());
      const ustsTags = Array.from(
        document.querySelectorAll(".tag_ustensils > span")
      ).map((ust) => ust.innerText.toLowerCase());
      const appsTags = Array.from(
        document.querySelectorAll(".tag_appliances > span")
      ).map((app) => app.innerText.toLowerCase());

      const DATA = getRecipesStocked();

      for (let i = 0; i < DATA.length; i++) {
        const recipeIngredients = DATA[i].ingredients.map((ing) =>
          ing.ingredient.toLowerCase()
        );
        const recipeUstensils = DATA[i].ustensils.map((ustensil) =>
          ustensil.toLowerCase()
        );
        const recipeAppliance = DATA[i].appliance.toLowerCase();

        const recipeData = [
          ...recipeIngredients,
          recipeAppliance,
          ...recipeUstensils,
        ];
        const tagsData = [...ingsTags, ...appsTags, ...ustsTags];

        const allFounded = tagsData.every((el) => recipeData.includes(el.toLowerCase()));

        if (allFounded) {
          DATA[i].display = true;
        } else {
          DATA[i].display = false;
        }
        console.log(DATA);
      }
      setRecipesStocked(DATA);
      displayRecipes();
    }
  })
  removeAllselectedDropdowns();
  updateDropdowns();
}


