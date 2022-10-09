import { removeSelected } from "../components/dropdown_ustensils.js";
import { displayRecipes } from "./ui.js";
import { createTagUstensils } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { onClickCloseTagIngredient } from "./research_ingredients.js";
import { onClickCloseTagAppliances } from "./research_appliances.js";
import { normalizeAccents } from "./regex.js";

export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};

export const getUstensilUl = () => {
  return document.querySelector("#filter__ustensils > div > ul");
};

// window.addEventListener("click", (e) => {
//   if (e.target.id !== "filter__dropdown__input__ustensils") {
//     removeSelected();
//   }
// });

export const onClickLiUst = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagUstensils(value);
  divTags.innerHTML += tag;


  removeSelected();
  updateDropdowns();
  onClickCloseTagUstensils();
  onClickCloseTagAppliances();
  onClickCloseTagIngredient();
  getUstensilInput().value = "";

  const recipesStocked = getRecipesStocked();
  const newRecipesToDisplay = recipesStocked.reduce((accumulator, current) => {
    if (current.display) {
      const isAnUstensil = current.ustensils.find(
        (el) => el.toLowerCase() === value.toLowerCase()
      );
      if (!isAnUstensil) {
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

export const onClickCloseTagUstensils = () => {
  const closeTags = document.querySelectorAll(".closeUst");
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
      updateDropdowns();
      displayRecipes();
    });
  });
};

export const getUstensilInputValue = () => {
  const input = getUstensilInput();
  const DATA = getRecipesStocked();
  input.addEventListener("input", (e) => {
    searchUstensil(e.target.value);
    setRecipesStocked(DATA);
  });
};
/**
 *
 * @returns retourne un tableau contenant les ustensils des recettes affichées
 */
export const getAllUstensilsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllUstensils = displayedRecipes.map((recipe) => {
    return recipe.ustensils.map((ustensil) => ustensil);
  });
  return [...new Set(AllUstensils.flat())];
};

// export const searchUstensil = (value) => {
//   const ul = getUstensilUl();
//   const lis = ul.querySelectorAll("li");
//   if (value.length > 2) {
//     lis.forEach((li) => {
//       if (li.innerText.includes(value)) {
//         li.style.display = "block";
//       } else {
//         li.style.display = "none";
//       }
//     });
//   } else {
//     lis.forEach((li) => {
//       li.style.display = "none";
//     });
//   }
// };

// function with for loop

export const searchUstensil = (value) => {
  const ul = getUstensilUl();
  const lis = ul.querySelectorAll("li");
  if (value.length >= 3) {
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
