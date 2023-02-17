import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked } from "./storage.js";
import { normalizeString } from "./regex.js";
import { updateDropdowns } from "./updateDropdowns.js ";
import {
  getApplianceInputValue,
  onClickCloseTagAppliances,
} from "./research_appliances.js";
import {
  getIngredientInputValue,
  onClickCloseTagIngredient,
} from "./research_ingredients.js";
import {
  getUstensilInputValue,
  getUstensilUl,
  onClickCloseTagUstensils,
} from "./research_ustensils.js";

// Algo with a forEach
let searchValue = "";
let selectedTags = [];

export const updateSelectedTags = () => {
  // Met à jour les tags sélectionnés
  const ingsTags = Array.from(
    document.querySelectorAll(".tag_ingredients > span")
  ).map((ing) => ing.innerText.toLowerCase());
  const appsTags = Array.from(
    document.querySelectorAll(".tag_appliances > span")
  ).map((app) => app.innerText.toLowerCase());
  const ustsTags = Array.from(
    document.querySelectorAll(".tag_ustensils > span")
  ).map((ust) => ust.innerText.toLowerCase());
  selectedTags = [...ingsTags, ...appsTags, ...ustsTags];

  // Réapplique la recherche en utilisant la valeur de recherche globale et les tags sélectionnés
  const recipes = getRecipesStocked();
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  const filteredRecipes = recipes.filter((recipe) => {
    // Vérifie si la recette est affichée
    if (!recipe.display) return false;

    // Vérifie si la recette correspond à la recherche globale
    if (
      searchValue &&
      !recipe.name.toLowerCase().includes(searchValue) &&
      !recipe.description.toLowerCase().includes(searchValue)
    )
      return false;

    // Vérifie si la recette correspond aux tags sélectionnés
    const recipeIngredients = recipe.ingredients.map((ing) =>
      ing.ingredient.toLowerCase()
    );
    const recipeAppliance = recipe.appliance.toLowerCase();
    const recipeUstensils = recipe.ustensils.map((ust) => ust.toLowerCase());
    const recipeData = [
      ...recipeIngredients,
      recipeAppliance,
      ...recipeUstensils,
    ];
    return selectedTags.every((tag) => recipeData.includes(tag));
  });
  if (filteredRecipes.length === 0) {
    container.append(displayError());
  } else {
    filteredRecipes.forEach((recipe) => {
      container.append(card(recipe));
    });
  }

  function createDropdownLi(data) {
    const ul = document.createElement("ul");
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    return ul;
  }

  const filteredUstensils = filteredRecipes.reduce((acc, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (!acc.includes(ustensil)) {
        acc.push(ustensil);
      }
    });
    return acc;
  }, []);

  // Met à jour la liste des ustensiles dans la dropdown
  const ul = getUstensilUl();
  ul.innerHTML = "";
  filteredUstensils.forEach((ustensil) => {
    const li = createDropdownLi(ustensil);
    ul.append(li);
  });

  onClickCloseTagAppliances();
  onClickCloseTagIngredient();
  onClickCloseTagUstensils();
  updateDropdowns();
};

export const globalSearch = () => {
  const searchbar = document.getElementById("searchbar");
  const handleRecipeClick = (e) => {
    e.preventDefault();
    const value = normalizeString(searchbar.value.toLowerCase());
    searchValue = value;
    updateSelectedTags();
  };

  const handleTagClick = () => {
    const value = normalizeString(searchbar.value.toLowerCase());
    updateSelectedTags(value);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const value = normalizeString(e.target.value.toLowerCase());
    searchValue = value;
    updateSelectedTags();
  };

  searchbar.addEventListener("input", handleInput);

  const recipeLinks = document.querySelectorAll(".recipe__link");
  recipeLinks.forEach((link) => {
    link.addEventListener("click", handleRecipeClick);
  });

  const closeTagButtons = document.querySelectorAll(".close__tag");
  closeTagButtons.forEach((button) => {
    button.addEventListener("click", handleTagClick);
  });
  getApplianceInputValue();
  getUstensilInputValue();
  getIngredientInputValue();
};
