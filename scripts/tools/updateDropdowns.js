import {
  getApplianceUl,
  getAllAppliancesFromDisplayedRecipes,
  onClickLiApp,
} from "./research_appliances.js";
import {
  getIngredientUl,
  getAllIngredientsFromDisplayedRecipes,
  onClickLiIng,
} from "./research_ingredients.js";
import {
  getUstensilUl,
  getAllUstensilsFromDisplayedRecipes,
  onClickLiUst,
} from "./research_ustensils.js";

import { normalizeString } from "./regex.js";

export const updateDropdowns = () => {
  updateDropdownIng();
  updateDropdownApp();
  updateDropdownUst();

  // remove li from dropdowns if tags are already created
  const ingsTags = Array.from(
    document.querySelectorAll(".tag_ingredients > span")
  ).map((ing) => normalizeString(ing.innerText).toLowerCase());
  const appsTags = Array.from(
    document.querySelectorAll(".tag_appliances > span")
  ).map((app) => normalizeString(app.innerText).toLowerCase());
  const ustsTags = Array.from(
    document.querySelectorAll(".tag_ustensils > span")
  ).map((ust) => normalizeString(ust.innerText).toLowerCase());
  const ingsLi = Array.from(getIngredientUl().children);
  const appsLi = Array.from(getApplianceUl().children);
  const ustsLi = Array.from(getUstensilUl().children);

  ingsLi.forEach((li) => {
    if (ingsTags.includes(normalizeString(li.innerText.toLowerCase()))) {
      li.remove();
    }
  });
  appsLi.forEach((li) => {
    if (appsTags.includes(normalizeString(li.innerText.toLowerCase()))) {
      li.remove();
    }
  });
  ustsLi.forEach((li) => {
    if (ustsTags.includes(normalizeString(li.innerText.toLowerCase()))) {
      li.remove();
    }
  });
  // if there's no li in dropdowns add the empty class to the ul parent

  if (getIngredientUl().children.length === 0) {
    getIngredientUl().parentNode.style.width = "11em";
  }

  if (getApplianceUl().children.length === 0) {
    getApplianceUl().parentNode.style.width = "11em";
  }
  if (getUstensilUl().children.length === 0) {
    getUstensilUl().parentNode.style.width = "11em";
  }
};

export const updateDropdownApp = () => {
  const searchbar = document.querySelector("#searchbar");
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getApplianceUl();
  const appAllreadySelected = tags.map((tag) => {
    return normalizeString(tag.innerText).toLowerCase();
  });

  const filteredAppliances = getAllAppliancesFromDisplayedRecipes();
  const reduced = filteredAppliances.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const appToDisplay = reduced.filter((appTag) => {
    return !appAllreadySelected.includes(appTag);
  });

  ul.innerHTML = "";
  appToDisplay.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = normalizeString(keyword).toLowerCase();
    li.onclick = () => {
      onClickLiApp(keyword);
    };
    ul.append(li);
  });

  const filterIng = document.getElementById("filter__ingredients");
  const filterApp = document.getElementById("filter__appliances");
  const filterUst = document.getElementById("filter__ustensils");
  const li = Array.from(ul.children);
  searchbar.addEventListener("keyup", (e) => {
    const search = normalizeString(e.target.value.toLowerCase());
    li.forEach((li) => {
      if (normalizeString(li.innerText.toLowerCase()).includes(search)) {
        filterApp.addEventListener("click", () => {
          if (filterApp.classList.contains("selected")) {
            li.style.display = "block";
            filterIng.classList.remove("selected");
            filterUst.classList.remove("selected");
            document
              .querySelectorAll("#filter__ustensils > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
            document
              .querySelectorAll("#filter__ingredients > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
          } else {
            li.style.display = "none";
            document
              .querySelectorAll("#filter__ustensils > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
            document
              .querySelectorAll("#filter__ingredients > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
          }
        });
      } else {
        li.style.display = "none";
      }
    });
  });
};

export const updateDropdownIng = () => {
  // filtrer les appareils et les ustensils
  const searchbar = document.querySelector("#searchbar");
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getIngredientUl();
  const ingAllreadySelected = tags.map((tag) => {
    return normalizeString(tag.innerText);
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredIngredients = getAllIngredientsFromDisplayedRecipes();

  const reduced = filteredIngredients.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const ingToDisplay = reduced.filter((ingTag) => {
    return !ingAllreadySelected.includes(ingTag);
  });

  ul.innerHTML = "";
  ingToDisplay.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = normalizeString(keyword).toLowerCase();
    li.onclick = () => {
      onClickLiIng(keyword);
    };
    ul.append(li);
  });

  const filterIng = document.getElementById("filter__ingredients");
  const filterApp = document.getElementById("filter__appliances");
  const filterUst = document.getElementById("filter__ustensils");
  const li = Array.from(ul.children);
  searchbar.addEventListener("keyup", (e) => {
    const search = normalizeString(e.target.value.toLowerCase());
    li.forEach((li) => {
      if (normalizeString(li.innerText.toLowerCase()).includes(search)) {
        filterIng.addEventListener("click", () => {
          if (filterIng.classList.contains("selected")) {
            filterUst.classList.remove("selected");
            filterApp.classList.remove("selected");
            document
              .querySelectorAll("#filter__ustensils > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
            document
              .querySelectorAll("#filter__appliances > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
            li.style.display = "block";
          } else {
            li.style.display = "none";
            document
              .querySelectorAll("#filter__ustensils > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
            document
              .querySelectorAll("#filter__appliances > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
          }
        });
      } else {
        li.style.display = "none";
      }
    });
  });
};

export const updateDropdownUst = () => {
  const searchbar = document.querySelector("#searchbar");
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getUstensilUl();
  const appAllreadySelected = tags.map((tag) => {
    return normalizeString(tag.innerText);
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées

  /**
   * @param {string} value - Valeur entrée dans le champ de recherche
   */
  const filteredUstensils = getAllUstensilsFromDisplayedRecipes();

  /**
   *
   */
  const reduced = filteredUstensils.reduce((accumulator, current) => {
    if (!accumulator.includes(current)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  const ustToDisplay = reduced.filter((ustTag) => {
    return !appAllreadySelected.includes(ustTag);
  });
  ul.innerHTML = "";
  ustToDisplay.forEach((keyword) => {
    const li = document.createElement("li");
    li.classList.add("filter__dropdown__list__item");
    li.innerHTML = normalizeString(keyword).toLowerCase();
    li.onclick = () => {
      onClickLiUst(keyword);
    };
    ul.append(li);
  });

  const filterIng = document.getElementById("filter__ingredients");
  const filterApp = document.getElementById("filter__appliances");
  const filterUst = document.getElementById("filter__ustensils");

  const li = Array.from(ul.children);
  searchbar.addEventListener("keyup", (e) => {
    const search = normalizeString(e.target.value.toLowerCase());
    li.forEach((li) => {
      if (normalizeString(li.innerText.toLowerCase()).includes(search)) {
        filterUst.addEventListener("click", () => {
          if (filterUst.classList.contains("selected")) {
            li.style.display = "block";
            filterIng.classList.remove("selected");
            filterApp.classList.remove("selected");
            document
              .querySelectorAll("#filter__appliances > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
            document
              .querySelectorAll("#filter__ingredients > div > ul > li")
              .forEach((li) => {
                li.style.display = "none";
              });
          } else {
            li.style.display = "none";
            document
              .querySelectorAll("#filter__appliances > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
            document
              .querySelectorAll("#filter__ingredients > div > ul > li")
              .forEach((li) => {
                li.style.display = "block";
              });
          }
        });
      } else {
        li.style.display = "none";
      }
    });
    // if (searchbar.value === "") {
    //   li.forEach((li) => {
    //     li.style.display = "block";
    //   });
    // }
  });
};
