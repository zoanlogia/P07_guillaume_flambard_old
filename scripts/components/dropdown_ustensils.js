import { getAllUstensils } from "../tools/api.js";
import { onClickLiUst } from "../tools/research_ustensils.js";
import { changePlaceholderAppliancesDropdown } from "./dropdown_appliances.js";
import { changePlaceholderIngredientsDropdown } from "./dropdown_ingredients.js";

/**

Crée et retourne le container du dropdown des ustensils
@returns {HTMLElement} Element HTML correspondant au container du dropdown des ustensils
*/
export const dropdownUstensilContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__ustensils");
  div.append(dropdownUst());
  return div;
};
/**

Modifie le placeholder de l'input du dropdown des ustensils en fonction de si le dropdown est sélectionné ou non
*/
export const changePlaceholderUstensilsDropdown = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains("selected")
    ? input.setAttribute("placeholder", "Rechercher un ustencil")
    : input.setAttribute("placeholder", "ustencils");
};
/**

Crée et retourne le dropdown des ustensils
@returns {HTMLElement} Element HTML correspondant au dropdown des ustensils
*/
export const dropdownUst = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownListUst());
  div.append(createInputUst());
  div.append(filterIconDownUst());
  div.append(filterIconUp());
  return div;
};
/**

Crée et retourne la liste des ustensils du dropdown des ustensils
@returns {HTMLElement} Element HTML correspondant à la liste des ustensils du dropdown des ustensils
*/
export const createDropdownListUst = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");
  // Récupération de tous les ustensils stockés dans le localStorage
  getAllUstensils().forEach((ust) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = ust;
    li.onclick = () => {
      onClickLiUst(li.innerHTML);
    };
    ul.append(li);
  });
  return ul;
};

/**

Crée et retourne l'input du dropdown des ustensils
@returns {HTMLElement} Element HTML correspondant à l'input du dropdown des ustensils
*/
export const createInputUst = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input__ustensils");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Ustensils");
  input.setAttribute("autocomplete", "off");
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelectedUst();
    keepOneSelectedUst();
    changePlaceholderAppliancesDropdown();
    changePlaceholderIngredientsDropdown();
  });
  return input;
};
/**

Ajoute la classe "selected" au dropdown des ustensils et renvoie le dropdown
@returns {HTMLElement} Element HTML correspondant au dropdown des ustensils
*/
export const addSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.add("selected");
  return dropdown;
};
/**
  
  Supprime la classe "selected" du dropdown des ustensils et renvoie le dropdown
  @returns {HTMLElement} Element HTML correspondant au dropdown des ustensils
  */
export const removeSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.remove("selected");
  changePlaceholderUstensilsDropdown();
  return dropdown;
};
/**
  
  Active ou désactive la classe "selected" pour le dropdown des ustensils
  @returns {HTMLElement} Element HTML correspondant au dropdown des ustensils
  */
export const filterSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.toggle("selected");
  changePlaceholderUstensilsDropdown();
  return dropdown;
};
/**
  
  Désactive la classe "selected" pour les autres dropdowns
  */
export const keepOneSelectedUst = () => {
  const appliances = document.querySelector("#filter__appliances");
  const ingredients = document.querySelector("#filter__ingredients");
  appliances.classList.remove("selected");
  ingredients.classList.remove("selected");
};
/**
  
  Crée une icône de flèche vers le bas pour le dropdown des ustensils
  @returns L'élément img de l'icône de flèche vers le bas
  */
export const filterIconDownUst = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", () => {
    filterSelectedUst();
    keepOneSelectedUst();
  });
  return img;
};

/**
  
  Crée une icône de flèche vers le haut pour le dropdown des ustensils
  @returns L'élément img de l'icône de flèche vers le haut
  */
export const filterIconUp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelectedUst();
    keepOneSelectedUst();
  });
  return img;
};
