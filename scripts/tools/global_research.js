import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
import { normalizeAccents } from "./regex.js";
import { updateDropdowns } from "./updateDropdowns.js ";
import { displayRecipes, removeAllselectedDropdowns } from "./ui.js";

// Algo with a forEach

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
      recipes.forEach((recipe) => {
        if (recipe.display) {
          if (
            recipe.name
              .toLowerCase()
              .includes(normalizeAccents(e.target.value.toLowerCase()))
          ) {
            container.append(card(recipe));
          }
          else if (
            recipe.ingredients.some((ingredient) => {
              return ingredient.ingredient
                .toLowerCase()
                .includes(normalizeAccents(e.target.value.toLowerCase()));
            })
          ) {
            container.append(card(recipe));
          } else if (
            normalizeAccents(recipe.description)
              .toLowerCase()
              .includes(normalizeAccents(e.target.value.toLowerCase()))
          ) {
            container.append(card(recipe));
          }
        }
      });
      if (container.innerHTML == "") {
        container.append(displayError());
      }
    } else {
      // updateDropdowns();
      if(e.target.value.length <= 3){

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
  
        DATA.forEach((recipe) => {
          const recipeIngredients = recipe.ingredients.map((ing) =>
            ing.ingredient.toLowerCase()
          );
          const recipeUstensils = recipe.ustensils.map((ustensil) =>
            ustensil.toLowerCase()
          );
          const recipeAppliance = recipe.appliance.toLowerCase();
  
          const recipeData = [
            ...recipeIngredients,
            recipeAppliance,
            ...recipeUstensils,
          ];
          const tagsData = [...ingsTags, ...appsTags, ...ustsTags];
  
          const allFounded = tagsData.every((el) => recipeData.includes(el.toLowerCase()));
  
          if (allFounded) {
            recipe.display = true;
          } else {
            recipe.display = false;
          }
        });
        setRecipesStocked(DATA);
        displayRecipes();
      }
    }
  })
  updateDropdowns();
  removeAllselectedDropdowns();
}



