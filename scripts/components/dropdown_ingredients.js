import { getAllIngredients } from "../tools/api.js";
import { onClickLiIng } from "../tools/research_ingredients.js";

export const dropdownIngredientContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__ingredients");
  div.append(dropdown());
  return div;
};

export const changePlaceholder = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains('selected') ? input.setAttribute('placeholder', 'Rechercher un ingrédient') : input.setAttribute('placeholder', 'Ingredient');
}

export const dropdown = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownList());
  div.append(createInput());
  div.append(filterIconDown());
  div.append(filterIconUp());
  return div;
};

export const createDropdownList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");

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

export const createInput = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input__ingredients");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Ingredients");
  input.setAttribute("autocomplete", "off");
  input.addEventListener("click", addSelected);
  return input;
};

export const addSelected = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.add("selected");
  return dropdown;
};
export const removeSelected = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.remove("selected");
  return dropdown;
};
export const filterSelected = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.toggle("selected");
  changePlaceholder();
  return dropdown;
};
export const keepOneSelected = () => {
  const appliances = document.querySelector("#filter__appliances");
  const ustensils = document.querySelector("#filter__ustensils");
  appliances.classList.remove("selected");
  ustensils.classList.remove("selected");
};

export const filterIconDown = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");

  img.addEventListener("click", () => {
    filterSelected();
    keepOneSelected();
  });
  return img;
};

export const filterIconUp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", () => {
    filterSelected();
  });
  return img;
};
