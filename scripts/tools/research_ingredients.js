import { removeSelected } from "../components/dropdown_ingredients.js";
import { displayRecipes } from "./ui.js";
import { createTagIngredients } from "../components/tags.js";
import { setRecipesStocked, getRecipesStocked } from "./storage.js";
import { updateDropdownApp } from "./research_appliances.js";
import { updateDropdownUst } from "./research_ustensils.js";

export const getIngredientInput = () => {
  return document.getElementById("filter__dropdown__input__ingredients");
};
export const getIngredientUl = () => {
  return document.querySelector("#filter__ingredients > div > ul");
};

export const handleInputIngredient = () => {
  getIngredientInput();
  getIngredientUl();
};

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagIngredients(value);
  divTags.innerHTML += tag;

  removeSelected();
  searchIngredient(value);
  updateDropdownIng();
  updateDropdownApp();
  updateDropdownUst();
  getIngredientInput().value = value;
  onClickCloseTag();
  getIngredientInput().value = "";
};

export const updateDropdownIng = () => {
  // filtrer les appareils et les ustensils
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getIngredientUl();
  const ingAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredIngredients = getAllIngredientsFromDiplayedRecipes();

  const reduced = filteredIngredients.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
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

/**
 * 
 * @returns retourne les ingrédients stockés dans le locale storage
 */
const getAllIngredientsFromDiplayedRecipes = () => {
  const DATA = getRecipesStocked();
  const displayedRecipes = DATA.filter((recipe) => {
    return recipe.display;
  });
  const AllIngredients = displayedRecipes.map((recipe) => {
    return recipe.ingredients.map((ingredient) =>
      ingredient.ingredient
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
      removeSelected();
      updateDropdownIng();

      const allIngs = document.querySelectorAll(".tag_ingredients > span");
      const DATA = getRecipesStocked();
      DATA.forEach((recipe) => {
        recipe.display = true;
      })
      setRecipesStocked(DATA);
      if (allIngs.length > 0) {
        allIngs.forEach((ing) => {
          searchIngredient(ing.innerText) 
        })
        updateDropdownIng()
        updateDropdownApp();
        updateDropdownUst();
      } else {
        displayRecipes();
        updateDropdownIng()
        updateDropdownApp();
        updateDropdownUst();
      }
    });
  });
};

/**
 * 
 * @param {string} value Affiche les recettes qui contiennent l'ingrédient
 */
export const searchIngredient = (value) => {
  const DATA = getRecipesStocked();
  const newRecipesToDisplay = DATA.map((recipe) => {
    if (recipe.display) {
      const isAnIngredient = recipe.ingredients.find(
        (el) => el.ingredient.toLowerCase() == value.toLowerCase(),
      );
      if (!isAnIngredient) {
        recipe.display = false;
      }
    }
    return recipe;
  });
  setRecipesStocked(newRecipesToDisplay);
  displayRecipes();
};
