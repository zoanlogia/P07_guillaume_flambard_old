export const card = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.append(headingCard(recipe));
  div.append(bodyCard(recipe));
  div.append(row(recipe));
  return div;
};

// *Code à décommenter lorsque liens src seront ajoutés  * 

// export const headingCard = (recipe) => {
export const headingCard = () => {
  const img = document.createElement("img");
  img.classList.add("img");
  // img.setAttribute("src", recipe.image);
  // img.setAttribute("alt", recipe.name);
  return img;
};

export const bodyCard = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
    <div class="col">${recipe.name}</div>
    <div class="col icon">
      <img class="clock" src="../../assets/img/clock.svg" alt="clock" />
      <p class="time">${recipe.time}</p>
    </div>
  `;
  return div;
};

export const row = (recipe) => {
  const div = document.createElement("div");
  div.classList.add("row_ingredients");
  div.innerHTML = `
    <ul class="ingredients">
      ${recipe.ingredients
        .filter((ing) => ing.ingredient)
        .map((ing) => {
          const quantity = ing.quantity || "";
          const unit = ing.unit || "";
          const formattedQuantity = quantity ? `<span class="small">${quantity}</span>` : "";
          const formattedUnit = unit ? `<span class="small">${unit}</span>` : "";
          return `<li class="ingredient"><b>${ing.ingredient}</b> : ${formattedQuantity}${formattedUnit}</li>`;
        })
        .join("")}
    </ul>
    <p class="desc"><span class="small">${recipe.description}</span></p>
  `;
  return div;
};
