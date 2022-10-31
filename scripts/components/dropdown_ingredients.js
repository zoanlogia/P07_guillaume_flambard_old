import { getAllIngredients } from "../tools/api.js";
import { onClickLiIng } from "../tools/research_ingredients.js";

export const dropdownIngredientContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__ingredients");
  div.append(dropdownIng());
  return div;
};

export const changePlaceholderIng = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains('selected') ? input.setAttribute('placeholder', 'Rechercher un ingrédient') : input.setAttribute('placeholder', 'Ingredient');
}

export const dropdownIng = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownListIng());
  div.append(createInputIng());
  div.append(filterIconDownIng());
  div.append(filterIconUpIng());
  return div;
};

export const createDropdownListIng = () => {
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
  });
  return input;
};

export const addSelectedIng = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.add("selected");
  return dropdown;
};
export const removeSelectedIng = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.remove("selected");
  changePlaceholderIng()
  return dropdown;
};
export const filterSelected = () => {
  const dropdown = document.querySelector("#filter__ingredients");
  dropdown.classList.toggle("selected");
  changePlaceholderIng();
  return dropdown;
};
export const keepOneSelectedIng = () => {
  const appliances = document.querySelector("#filter__appliances");
  const ustensils = document.querySelector("#filter__ustensils");
  appliances.classList.remove("selected");
  ustensils.classList.remove("selected");
};

export const filterIconDownIng = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");

  img.addEventListener("click", (e) => {
    e.stopPropagation()
    filterSelected();
    keepOneSelectedIng();
  });
  return img;
};

export const filterIconUpIng = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", (e) => {
    e.stopPropagation()
    keepOneSelectedIng()
    filterSelected();
  });
  return img;
};
