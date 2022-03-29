/** @format */

export const displayRecipes = (recipes) => {
  const container = document.querySelector(".recipes__container");
  container.innerHTML = "";
  recipes.forEach((recipe) => {
    if (recipe.display) {
      container.append(card(recipe));
    }
  });
};

const card = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.append(headingCard(recipe));
  div.append(bodyCard(recipe));
  div.append(row(recipe));
  return div;
};

const headingCard = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("img");
  return div;
};

const bodyCard = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row");
  div.append(colCardName(recipe));
  div.append(colCardTime(recipe));
  return div;
};

const colCardName = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = recipe.name;
  return div;
};

const colCardTime = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("col");
  div.classList.add("icon");
  div.innerHTML =
    `<img class='clock' src='../../assets/img/clock.svg' alt='clock' />` +
    `<p class='time'>${recipe.time}</p>`;
  return div;
};

const row = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row");
  div.append(colIngredients(recipe));
  div.append(colDesc(recipe));
  return div;
};

const colDesc = (recipe) => {
  const p = document.createElement("p");
  p.classList.add("desc");
  p.innerHTML = recipe.description;
  return p;
};

const colIngredients = (recipe) => {
  const div = document.createElement("div");
    div.classList.add("ingredients");
    let ingr = []
    recipe.ingredients.forEach(ingredient => {
        ingr.push(ingredient)
        div.innerHTML = ingr
    })
    return div
};
