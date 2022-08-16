import { getApplianceUl, getAllAppliancesFromDiplayedRecipes, onClickLiApp } from "./research_appliances.js";
import { getIngredientUl, getAllIngredientsFromDiplayedRecipes, onClickLiIng } from "./research_ingredients.js";
import { getUstensilUl, getAllUstensilsFromDiplayedRecipes, onClickLiUst } from "./research_ustensils.js";

export const updateDropdowns = () => {
  updateDropdownIng();
  updateDropdownApp();
  updateDropdownUst();
}

export const updateDropdownApp = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getApplianceUl();
  const appAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  const filteredAppliances = getAllAppliancesFromDiplayedRecipes()
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
    li.innerHTML = keyword;
    li.onclick = () => {
      onClickLiApp(keyword);
    };
    ul.append(li);
  });
};

export const updateDropdownIng = () => {
  // filtrer les appareils et les ustensils
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getIngredientUl();
  const ingAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées
  const filteredIngredients = getAllIngredientsFromDiplayedRecipes();

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
    li.innerHTML = keyword;
    li.onclick = () => {
      onClickLiIng(keyword);
    };
    ul.append(li);
  });
};

export const updateDropdownUst = () => {
  const tags = Array.from(document.querySelectorAll(".tag"));
  const ul = getUstensilUl();
  const appAllreadySelected = tags.map((tag) => {
    return tag.innerText;
  });

  // filtrer les ingrédients pour n'afficher que ceux des recettes montrées

  /**
   * @param {string} value - Valeur entrée dans le champ de recherche
   */
  const filteredUstensils = getAllUstensilsFromDiplayedRecipes();

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
    li.innerHTML = keyword;
    li.onclick = () => {
      onClickLiUst(keyword);
    };
    ul.append(li);
  });
};