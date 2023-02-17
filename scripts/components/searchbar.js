export const createInput = () => {
  // create the div element
  const div = document.createElement("div");

  // create the input element using template literals
  const input = document.createElement("input");
  input.id = "searchbar";
  input.placeholder = "Rechercher une recette";

  // create the label and icon elements
  const label = document.createElement("label");
  label.htmlFor = "searchbar";
  const icon = document.createElement("img");
  icon.src = "./assets/img/search_icon.svg";
  icon.classList.add("search__icon");

  // append the elements to the div
  div.append(label, input, icon);

  // return the div
  return div;
};
