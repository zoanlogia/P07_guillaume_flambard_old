import {
    getAllUstensils
  } from "../tools/api.js";
  import {
    onClickLi
  } from "../tools/research_ustensils.js";
  
  export const dropdownUstensilContainer = () => {
    const div = document.createElement("div");
    div.classList.add("filter");
    div.setAttribute("id", "filter__ustensils");
    div.append(dropdown());
    return div;
  };
  
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
  
    getAllUstensils().forEach((ust) => {
      const li = document.createElement("li");
      li.classList.add("filter__dropdown__list__item");
      li.innerHTML = ust;
      li.onclick = () => {
        onClickLi(li.innerHTML);
      };
      ul.append(li);
    });
    return ul;
  };
  
  export const createInput = () => {
    const input = document.createElement("input");
    input.classList.add("filter__dropdown__input");
    input.setAttribute("id", "filter__dropdown__input__ustensils");
    input.setAttribute("type", "list");
    input.setAttribute("placeholder", "Ustensils");
    input.setAttribute("autocomplete", "off");
    input.addEventListener("click", addSelected);
    return input;
  };
  
  export const addSelected = () => {
    const dropdown = document.querySelector("#filter__ustensils");
    dropdown.classList.add("selected");
    return dropdown;
  };
  export const removeSelected = () => {
    const dropdown = document.querySelector("#filter__ustensils");
    dropdown.classList.remove("selected");
    return dropdown;
  };
  export const filterSelected = () => {
    const dropdown = document.querySelector("#filter__ustensils");
    dropdown.classList.toggle("selected");
    return dropdown;
  };
  
  
  export const filterIconDown = () => {
    const img = document.createElement("img");
    img.classList.add("filter__dropdown__icon__down");
    img.src = "../../assets/img/angle-down.svg";
    img.setAttribute("src", "../../assets/img/angle-down.svg");
    img.setAttribute("alt", "filter");
  
    img.addEventListener("click", () => {
      filterSelected();
      
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