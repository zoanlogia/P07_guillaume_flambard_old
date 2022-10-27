// template des cards contenant les recettes

export const card = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.append(headingCard(recipe));
  div.append(bodyCard(recipe));
  div.append(row(recipe));
  return div;
};

export const headingCard = () => {
  const div = document.createElement("div");
  div.classList.add("img");
  return div;
};

export const bodyCard = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row");
  div.append(colCardName(recipe));
  div.append(colCardTime(recipe));
  return div;
};

export const colCardName = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = recipe.name;
  return div;
};

export const colCardTime = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("col");
  div.classList.add("icon");
  div.innerHTML =
    `<img class='clock' src='../../assets/img/clock.svg' alt='clock' />` +
    `<p class='time'>${recipe.time}</p>`;
  return div;
};

export const row = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row_ingredients");
  div.append(colIngredients(recipe));
  div.append(colDesc(recipe));
  return div;
};

/**
 * 
 * @param {*} recipe 
 * @returns retourne la description de la recette
 */
export const colDesc = (recipe) => {
  const p = document.createElement("p");
  p.classList.add("desc");
  p.innerHTML = "<span class='small'>" + recipe.description + "</span>";
  return p;
};

export const colIngredients = (recipe) => {
  const ul = document.createElement("ul");
  ul.classList.add("ingredients");

  const ingredients = recipe.ingredients.filter((ing) => ing.ingredient);
  ingredients.forEach((ing) => {
    const li = document.createElement("li");
    li.classList.add("ingredient");
  
    if (ing.quantity === undefined) {
      ing.quantity = "";
    }
    if (ing.unit === undefined) {
      ing.unit = "";
    }
    if (ing.quantity === "" && ing.unit === "") {
      li.innerHTML ="<b>" + ing.ingredient + "</b>";
    } else {
      li.innerHTML = "<b>" + ing.ingredient + "</b>" + " : " + "<span class='small'>" + ing.quantity + "</span>" + "<span class='small'>" + ing.unit + "</span>";
    }

    ul.append(li);
  });
  return ul;
};