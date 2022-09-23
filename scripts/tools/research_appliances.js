import { removeSelected } from "../components/dropdown_appliances.js";
import { displayRecipes } from "./ui.js";
import { createTagAppliances } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagUstensils } from "./research_ustensils.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";

export const getApplianceInput = () => {
  return document.getElementById("filter__dropdown__input__appliances");
};
export const getApplianceUl = () => {
  return document.querySelector("#filter__appliances > div > ul");
};

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
      const isAnAppliance = current.appliance.toLowerCase() === value.toLowerCase();
      if (!isAnAppliance) {
        current.display = false;
      }
    }
    accumulator.push(current);
    return accumulator;
  }, []);
  setRecipesStocked(newRecipesToDisplay);
  updateDropdowns();
  displayRecipes();
};

export const onClickCloseTagAppliances = () => {
  const closeTags = document.querySelectorAll(".closeApp");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();

      const ingsTags = Array.from(
        document.querySelectorAll(".tag_ingredients > span"),
      ).map((ing) => ing.innerText);
      const ustsTags = Array.from(
        document.querySelectorAll(".tag_ustensils > span"),
      ).map((ust) => ust.innerText);
      const appsTags = Array.from(
        document.querySelectorAll(".tag_appliances > span"),
      ).map((app) => app.innerText);

      const DATA = getRecipesStocked();

      DATA.forEach((recipe) => {
        // on récupére tous les data de la recette
        const recipeIngredients = recipe.ingredients.map(
          (ing) => ing.ingredient,
        );
        const recipeUstensils = recipe.ustensils.map((ustensil) => ustensil);
        const recipeAppliance = recipe.appliance;

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

export const searchAppliance = (value) => {
  const ul = getApplianceUl();
  const lis = ul.querySelectorAll("li");
  if (value.length > 2) {
    lis.forEach((li) => {
      if (li.innerHTML.includes(value)) {
        li.style.display = "block";
      } else {
        li.style.display = "none";
      }
    });
  } else {
    lis.forEach((li) => {
      li.style.display = "block";
    });
  }
};
