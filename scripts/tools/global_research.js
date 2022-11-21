import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
import { displayRecipes, removeAllselectedDropdowns } from "./ui.js";

// algo with for loop

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
          const ingredients = recipes[i].ingredients.map(ingredient => ingredient.ingredient);
          const ustensils = recipes[i].ustensils.join(" ");
          const recipeContent = `${recipes[i].name} ${recipes[i].description} ${recipes[i].appliance} ${ingredients.join(" ")} ${ustensils}`
          if (recipeContent.toLowerCase().includes(e.target.value.toLowerCase())) {
            container.append(card(recipes[i]));
          }
        }
      }
      if (container.innerHTML == "") {
        container.append(displayError());
      }
    } else {
      if (e.target.value.length <= 2) {

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
          }

          else {
            DATA[i].display = false;
          }
        }
        setRecipesStocked(DATA);
        displayRecipes();
      }
    }
  })
  removeAllselectedDropdowns();
}