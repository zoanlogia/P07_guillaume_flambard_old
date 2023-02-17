import { getAllIngredients } from "../tools/api.js";
import { onClickLiIng } from "../tools/research_ingredients.js";
import { changePlaceholderAppliancesDropdown } from "./dropdown_appliances.js";
import { changePlaceholderUstensilsDropdown } from "./dropdown_ustensils.js";

/**
 * Crée et retourne le container du dropdown des ingrédients
 * @returns {HTMLElement} Element HTML correspondant au container du dropdown des ingrédients
 */
export const dropdownIngredientContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__ingredients");
  div.append(dropdownIng());
  return div;
};

/**
 * Modifie le placeholder de l'input du dropdown des ingrédients en fonction de si le dropdown est sélectionné ou non
 */
export const changePlaceholderIngredientsDropdown = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains('selected') ? input.setAttribute('placeholder', 'Rechercher un ingrédient') : input.setAttribute('placeholder', 'Ingredient');
}

/**
 * Crée et retourne le dropdown des ingrédients
 * @returns {HTMLElement} Element HTML correspondant au dropdown des ingrédients
 */
export const dropdownIng = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownListIng());
  div.append(createInputIng());
  div.append(filterIconDownIng());
  div.append(filterIconUpIng());
  return div;
};

/**
 * Crée et retourne la liste des ingrédients du dropdown des ingrédients
 * @returns {HTMLElement} Element HTML correspondant à la liste des ingrédients du dropdown des ingrédients
 */
export const createDropdownListIng = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");

  // Récupération de tous les ingrédients stockés dans le localStorage
  getAllIngredients().forEach((ing) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = ing;
    li.onclick = () => {
      onClickLiIng(li.innerHTML);
    };
    ul.append(li);
  });
  return ul;
};

/**
 * Crée et retourne l'input du dropdown des ingrédients
 * @returns {HTMLElement} Element HTML correspondant à l'input du dropdown des ingrédients
 */
export const createInputIng = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input__ingredients");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Ingredients");
  input.setAttribute("autocomplete", "off");
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelected();
    keepOneSelectedIng();
    changePlaceholderAppliancesDropdown()
    changePlaceholderUstensilsDropdown()
  });
  return input;
};

/**
 * Ajoute la classe "selected" au dropdown des ingrédients et renvoie le dropdown
 * @returns {HTMLElement} Element HTML correspondant au dropdown des ingrédients
 */
export const addSelectedIng = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.add("selected");
  return dropdown;
};

/**
 * Supprime la classe "selected" du dropdown des ingrédients et renvoie le dropdown
 * @returns {HTMLElement} Element
 * HTML correspondant au dropdown des ingrédients
 * */


// Supprime la classe "selected" pour le dropdown
export const removeSelectedIng = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.remove("selected");
  changePlaceholderIngredientsDropdown();
  return dropdown;
};

// Active ou désactive la classe "selected" pour le dropdown
export const filterSelected = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.toggle("selected");
  changePlaceholderIngredientsDropdown();
  return dropdown;
};

// Désactive la classe "selected" pour les autres dropdowns
export const keepOneSelectedIng = () => {
  const appliances = document.querySelector("#filter__appliances");
  const ustensils = document.querySelector("#filter__ustensils");
  appliances.classList.remove("selected");
  ustensils.classList.remove("selected");
};

// Ajoute l'icone de filtre pour ouvrir le dropdown
/**
 * Crée une icône de flèche vers le bas ou vers le haut pour le dropdown des ingrédients
 * @param {boolean} isUp - Détermine si l'icône de flèche doit pointer vers le haut
 * @returns L'élément img de l'icône de flèche
 */
export const createFilterIcon = (isUp) => {
  const img = document.createElement("img");
  img.classList.add(`filter__dropdown__icon__${isUp ? "up" : "down"}`);
  img.src = isUp ? "../../assets/img/angle-up.svg" : "../../assets/img/angle-down.svg";
  img.setAttribute("src", isUp ? "../../assets/img/angle-up.svg" : "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");
  return img;
};

/**
 * Crée une icône de flèche vers le bas pour le dropdown des ingrédients
 * @returns L'élément img de l'icône de flèche vers le bas
 */
export const filterIconDownIng = () => {
  const img = createFilterIcon(false);
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelected();
    keepOneSelectedIng();
  });
  return img;
};

/**
 * Crée une icône de flèche vers le haut pour le dropdown des ingrédients
 * @returns L'élément img de l'icône de flèche vers le haut
 */
export const filterIconUpIng = () => {
  const img = createFilterIcon(true);
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    keepOneSelectedIng();
    filterSelected();
  });
  return img;
};
