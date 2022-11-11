import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked, setRecipesStocked } from "./storage.js";
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
          const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
          const ustensils = recipe.ustensils.join(" ");
          const recipeContent = `${recipe.name} ${recipe.description} ${recipe.appliance} ${ingredients.join(" ")} ${ustensils}`
          if (recipeContent.toLowerCase().includes(e.target.value.toLowerCase())) {
            container.append(card(recipe));
          }

          // pour chaques ul on vide les li et on en crée de nouveaux avec les recettes qui matchent

          const ulIng = document.querySelector("#filter__ingredients > div > ul");
          ulIng.innerHTML = "";

          const ulApp = document.querySelector("#filter__appliances > div > ul");
          ulApp.innerHTML = "";

          const ulUst = document.querySelector("#filter__ustensils > div > ul");
          ulUst.innerHTML = "";

          const createLi = (ul, value) => {
            const li = document.createElement("li");
            li.innerText = value;
            ul.append(li);
          }

          recipes.forEach((recipe) => {
            if (recipe.display) {
              const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
              const ustensils = recipe.ustensils.join(" ");
              const recipeContent = `${recipe.name} ${recipe.description} ${recipe.appliance} ${ingredients.join(" ")} ${ustensils}`
              if (recipeContent.toLowerCase().includes(e.target.value.toLowerCase())) {

                recipe.ingredients.forEach((ingredient) => {
                  createLi(ulIng, ingredient.ingredient);
                });
                
                createLi(ulApp, recipe.appliance);
                recipe.ustensils.forEach((ustensil) => {
                  createLi(ulUst, ustensil);
                });
              }
            }
          });
        }
      });
      if (container.innerHTML == "") {
        container.append(displayError());
      }
    } else {
      if(e.target.value.length <= 2){

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
  removeAllselectedDropdowns();
}



