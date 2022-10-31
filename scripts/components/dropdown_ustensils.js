import { getAllUstensils } from "../tools/api.js";
import { onClickLiUst } from "../tools/research_ustensils.js";

export const dropdownUstensilContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__ustensils");
  div.append(dropdownUst());
  return div;
};

export const changePlaceholderUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains('selected') ? input.setAttribute('placeholder', 'Rechercher un ustencil') : input.setAttribute('placeholder', 'ustencils');
}

export const dropdownUst = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownListUst());
  div.append(createInputUst());
  div.append(filterIconDownUst());
  div.append(filterIconUp());
  return div;
};

export const createDropdownListUst = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");

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

export const createInputUst = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input__ustensils");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Ustensils");
  input.setAttribute("autocomplete", "off");
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelectedUst()
    keepOneSelectedUst()
  });
  return input;
};

export const addSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.add("selected");
  return dropdown;
};
export const removeSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.remove("selected");
  changePlaceholderUst();
  return dropdown;
};
export const filterSelectedUst = () => {
  const dropdown = document.querySelector("#filter__ustensils");
  dropdown.classList.toggle("selected");
  changePlaceholderUst();
  return dropdown;
};
export const keepOneSelectedUst = () => {
  const appliances = document.querySelector('#filter__appliances')
  const ingredients = document.querySelector('#filter__ingredients')
  appliances.classList.remove('selected')
  ingredients.classList.remove('selected')
}


export const filterIconDownUst = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");

  img.addEventListener("click", () => {
    filterSelectedUst();
    keepOneSelectedUst()
  });
  return img;
};

export const filterIconUp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelectedUst();
    keepOneSelectedUst()
  });
  return img;
};