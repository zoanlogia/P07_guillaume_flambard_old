
export const card = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.append(headingCard(recipe));
  div.append(bodyCard(recipe));
  div.append(row(recipe));
  return div;
};

export const headingCard = (recipe) => {
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

export const colDesc = (recipe) => {
  const p = document.createElement("p");
  p.classList.add("desc");
  p.innerHTML = recipe.description;
  return p;
};

export const colIngredients = (recipe) => {
  const ul = document.createElement("ul");
  ul.classList.add("ingredients");

  // v2
  const totoingredients = recipe.ingredients.filter((ing) => ing.ingredient);
  totoingredients.forEach((ing) => {
    const li = document.createElement("li");
    li.innerHTML = ing.ingredient;
    ul.append(li);
  });

  // v1
  // const div = document.createElement("ul");
  // div.classList.add("ingredients");
  // let ingr = []
  // recipe.ingredients.forEach(ingredient => {
  //     ingr.push(ingredient.ingredient)
  //     div.innerHTML = ingr
  // })
  // return div

  return ul;
};
