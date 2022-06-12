/** @format */

import {
  addSelected,
  removeSelected,
} from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input__ingredients");
};
export const getIngredientUl = () => {
  return document.querySelector("#filter__ingredients > div > ul");
};

export const handleInputIngredient = () => {
  const input = getIngredientInput();
  const ul = getIngredientUl();

  // input.addEventListener("input", () => {
  //   addSelected();

  //   if (input.value.length >= 3) {
  //     searchIngredient(input.value);
  //     ul.innerHTML = "";
  //     const keywords = ingredients.filter((ingredient) =>
  //       ingredient.includes(input.value),
  //     );
  //     const tags = Array.from(document.querySelectorAll(".tag"));
  //     const ingAllreadySelected = tags.map((tag) => {
  //       return tag.innerText;
  //     });
  //     const ingToDisplay = keywords.filter((ingTag) => {
  //       return !ingAllreadySelected.includes(ingTag);
  //     });
  //     ingToDisplay.forEach((keyword) => {
  //       const li = document.createElement("li");
  //       li.classList.add("filter__dropdown__list__item");
  //       li.innerHTML = keyword;
  //       li.onclick = () => {
  //         onClickLi(keyword);
  //       };
  //       ul.append(li);
  //     });
  //   } else if (input.value.length == 2) {
  //     ul.innerHTML = "";
  //     ingredients.forEach((ingredient) => {
  //       const li = document.createElement("li");
  //       li.classList.add("filter__dropdown__list__item");
  //       li.innerHTML = ingredient;
  //       ul.append(li);
  //     });
  //     displayRecipes(getRecipesStocked());
  //     removeSelected();
  //   }
  // });
};

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchIngredient(value);
  updateDropdown();
  getIngredientInput().value = value;
  onClickCloseTag();
  getIngredientInput().value = "";
};

export const updateDropdown = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getIngredientUl();
  const ingAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredIngredients = getAllIngredientsFromDiplayedRecipes();

  const reduced = filteredIngredients.reduce((accumulator, current) => {
    if (!accumulator.includes(current.toLocaleLowerCase())) {
      accumulator.push(current.toLocaleLowerCase());
    }
    return accumulator;
  }, []);

  const ingToDisplay = reduced.filter((ingTag) => {
    return !ingAllreadySelected.includes(ingTag);
  });
  ul.innerHTML = "";
  ingToDisplay.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = keyword;
    li.onclick = () => {
      onClickLi(keyword);
    };
    ul.append(li);
  });
};

const getAllIngredientsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllIngredients = displayedRecipes.map((recipe) => {
    return recipe.ingredients.map((ingredient) =>
      ingredient.ingredient.toLowerCase(),
    );
  });
  return [...new Set(AllIngredients.flat())];
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeIng");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getIngredientInput().value = "";
      displayRecipes(getRecipesStocked());
      removeSelected();
    });
  });
};

export const searchIngredient = (value) => {
  const DATA = getRecipesStocked();
  const regex = new RegExp(value.toLowerCase(), "g");

  // filtrer les recettes (display = true) pour n'afficher que ceux qui contiennent l'ingrédient (value)
  DATA.forEach((recipe) => {
    if (recipe.display) {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.toLowerCase().match(regex)) {
          recipe.display = true;
        } else {
          recipe.display = false;
        }
      });
    }
  });
  setRecipesStocked(DATA);
  displayRecipes();
};
