import {
  getAllAppliances
} from "../tools/api.js";
import {
  onClickLiApp
} from "../tools/research_appliances.js";

export const dropdownApplianceContainer = () => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.setAttribute("id", "filter__appliances");
  div.append(dropdownApp());
  return div;
};

export const dropdownApp = () => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(createDropdownListApp());
  div.append(createInputApp());
  div.append(filterIconDownApp());
  div.append(filterIconUpApp());
  return div;
};

export const changePlaceholderApp = () => {
  const dropdown = document.querySelector("#filter__appliances");
  const input = dropdown.querySelector("input");
  dropdown.classList.contains('selected') ? input.setAttribute('placeholder', 'Rechercher un appareil') : input.setAttribute('placeholder', 'Appareils');
}

// onclick outside the dropdown to close it


export const createDropdownListApp = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");

  getAllAppliances().forEach((app) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = app;
    li.onclick = () => {
      onClickLiApp(li.innerHTML);
    };
    ul.append(li);
  });
  return ul;
};

export const createInputApp = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input__appliances");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Appareils");
  input.setAttribute("autocomplete", "off");
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    filterSelectedApp()
    keepOneSelectedApp()
  })
  return input;
};

export const addSelectedApp = () => {
  const dropdown = document.querySelector("#filter__appliances");
  dropdown.classList.add("selected");
  return dropdown;
};
export const removeSelectedApp = () => {
  const dropdown = document.querySelector("#filter__appliances");
  dropdown.classList.remove("selected");
  return dropdown;
};
export const filterSelectedApp = () => {
  const dropdown = document.querySelector("#filter__appliances");
  dropdown.classList.toggle("selected");
  changePlaceholderApp();
  return dropdown;
};
export const keepOneSelectedApp = () => {
  console.log('toto');
  const ustensils = document.querySelector('#filter__ustensils')
  const ingredients = document.querySelector('#filter__ingredients')
  ustensils.classList.remove('selected')
  ingredients.classList.remove('selected')
}

export const filterIconDownApp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    keepOneSelectedApp()
    filterSelectedApp()
  })
  return img;
};

export const filterIconUpApp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", (e) => {
    e.stopPropagation()
    keepOneSelectedApp()
    filterSelectedApp();
  });
  return img;
};