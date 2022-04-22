import {
  addSelected,
  removeSelected,
} from "../components/filter_ustensils.js";
import { displayRecipes } from "./ui.js";
import { getAllUstensils, getCleanData } from "./api.js";
import { createTag } from "../components/tag.js";

export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};

export const handleInputUstensil = () => {
  const input = getUstensilInput();
  const ustensils = getAllUstensils();
  const ul = document.querySelector("#filter__ustensils > div > ul");

  input.addEventListener("input", () => {
    addSelected();

    if (input.value.length >= 3) {
      searchUstensil(input.value);
      ul.innerHTML = "";
      const keywords = ustensils.filter((ustensil) =>
        ustensil.includes(input.value),
      );
      keywords.forEach((keyword) => {
        const li = document.createElement("li");
        li.classList.add("filter__dropdown__list__item");
        li.innerHTML = keyword;
        li.onclick = () => {
          onClickLi(keyword);
        };
        ul.append(li);
      });
    } else if (input.value.length == 2) {
      ul.innerHTML = "";
      ustensils.forEach((ustensil) => {
        const li = document.createElement("li");
        li.classList.add("filter__dropdown__list__item");
        li.innerHTML = ustensil;
        ul.append(li);
      });
      displayRecipes(getCleanData());
      removeSelected();
    }
  });
};

const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTag(value);
  divTags.innerHTML += tag;

  removeSelected();
  getUstensilInput().value = value;
  onClickCloseTag();

};

export const searchUstensil = (value) => {
  const DATA = getCleanData();
  DATA.forEach((recipe) => {
    recipe.display = false;
    const regex = new RegExp(value.toLowerCase(), "g");

    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().search(regex) >= 0) {
        recipe.display = true;
      }
    });
  });
  displayRecipes(DATA)
};
