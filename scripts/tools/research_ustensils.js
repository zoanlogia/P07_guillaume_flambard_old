import {
  addSelected,
  removeSelected,
} from "../components/filter_ustensils.js";
import {
  displayRecipes
} from "./ui.js";
import {
  getAllUstensils,
  getCleanData
} from "./api.js";
import {
  createTagUstensils
} from "../components/tags.js";

export const getUstensilInput = () => {
  return document.getElementById("filter__dropdown__input__ustensils");
};
export const getUstensilUl = () => {
  return document.querySelector("#filter__ustensils > div > ul");
};

export const handleInputUstensil = () => {
  const input = getUstensilInput();
  const ustensils = getAllUstensils();
  const ul = getUstensilUl();

  input.addEventListener("input", () => {
    addSelected();

    if (input.value.length >= 3) {
      searchUstensil(input.value);
      ul.innerHTML = "";
      const keywords = ustensils.filter((ustensil) =>
        ustensil.includes(input.value),
      );
      const tags = Array.from(document.querySelectorAll(".tag"));
      const ingAllreadySelected = tags.map((tag) => {
        return tag.innerText;
      });
      const ustToDisplay = keywords.filter((ustTag) => {
        return !ingAllreadySelected.includes(ustTag);
      });
      ustToDisplay.forEach((keyword) => {
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

export const onClickLi = (value) => {
  const divTags = document.querySelector(".tags__container");
  const tag = createTagUstensils(value);
  divTags.innerHTML += tag;

  removeSelected();
  razDropdown();
  getUstensilInput().value = value;
  onClickCloseTag();
  getUstensilInput().value = "";
}
export const razDropdown = () => {
  const ul = getUstensilUl();
  const allIng = getAllUstensils();
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ustAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });
  const ustToDisplay = allIng.filter((ustTag) => {
    return !ustAllreadySelected.includes(ustTag);
  });
  ul.innerHTML = "";
  ustToDisplay.forEach((ustensil) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = ustensil;
    li.onclick = () => {
      onClickLi(ustensil);
    };
    ul.append(li);
  });
};

export const onClickCloseTag = () => {
  const closeTags = document.querySelectorAll(".closeUst");
  closeTags.forEach((closeTag) => {
    closeTag.addEventListener("click", () => {
      const tag = closeTag.parentElement;
      tag.remove();
      getUstensilInput().value = "";
      displayRecipes(getCleanData());
      removeSelected();
    });
  });
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