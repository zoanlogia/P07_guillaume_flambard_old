import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";
import { normalizeAccents } from "./regex.js";
import {globalSearch} from "./global_research.js";

export const getApplianceInput = () => {
  return document.getElementById("filter__dropdown__input__appliances");
};
export const getApplianceUl = () => {
  return document.querySelector("#filter__appliances > div > ul");
};

// window.addEventListener("click", (e) => {
//   if (e.target.id !== "filter__dropdown__input__appliances") {
//     removeSelected();
//   }
// });

export const onClickLiApp = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagAppliances(value);
  divTags.innerHTML += tag;

  removeSelected();
  updateDropdowns();
  onClickCloseTagAppliances();
  onClickCloseTagUstensils();
  onClickCloseTagIngredient();
  getApplianceInput().value = "";

  const recipesStocked = getRecipesStocked();
  const newRecipesToDisplay = recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnAppliance =
        current.appliance.toLowerCase() === value.toLowerCase();
      if (!isAnAppliance) {
        current.display = false;
      }
    }
    accumulator.push(current);
    return accumulator;
  }, []);
  updateDropdowns();
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};

export const onClickCloseTagAppliances = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();

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
        // on récupére tous les data de la recette
        const recipeIngredients = recipe.ingredients.map((ing) =>
          ing.ingredient.toLowerCase()
        );
        const recipeUstensils = recipe.ustensils.map((ustensil) =>
          ustensil.toLowerCase()
        );
        const recipeAppliance = recipe.appliance.toLowerCase();

        // on fait des tableau avec tout dedans
        const recipeData = [
          ...recipeIngredients,
          recipeAppliance,
          ...recipeUstensils,
        ];
        const tagsData = [...ingsTags, ...appsTags, ...ustsTags];

        // on compare les deux tableaux
        const allFounded = tagsData.every((el) => recipeData.includes(el));

        if (allFounded) {
          recipe.display = true;
        } else {
          recipe.display = false;
        }
      });

      setRecipesStocked(DATA);
      globalSearch();
      updateDropdowns();
      displayRecipes();
    });
  });
};

export const getApplianceInputValue = () => {
  const input = getApplianceInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", (e) => {
    searchAppliance(e.target.value);
    setRecipesStocked(DATA);
  });
};

/**
 *
 * @returns retourne un tableau contenant les appareils des recettes affichées
 */
export const getAllAppliancesFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllAppliances = displayedRecipes.map((recipe) => {
    return recipe.appliance;
  });
  return [...new Set(AllAppliances.flat())];
};

// search appliance with for loop

export const searchAppliance = (value) => {
  const ul = getApplianceUl();
  const lis = ul.querySelectorAll("li");
  if (value.length >= 3) {
    console.log("value", value);
    for (let i = 0; i < lis.length; i++) {
      if (
        normalizeAccents(lis[i].innerText).includes(normalizeAccents(value))
      ) {
        lis[i].style.display = "block";
      } else {
        lis[i].style.display = "none";
      }
    }
  } else {
    if (value.length === 0) {
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.display = "block";
      }
    }
  }
};
