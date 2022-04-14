export const filterSelected = () => {
  const dropdown = document.querySelector(".filter");
  dropdown.classList.toggle("selected");
  return dropdown;
};

export const addSelected = () => {
  const dropdown = document.querySelector(".filter");
  dropdown.classList.add("selected");
  return dropdown;
};
export const removeSelected = () => {
  const dropdown = document.querySelector(".filter");
  dropdown.classList.remove("selected");
  return dropdown;
};

export const filterContainer = (DATA) => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.append(filterDropdown(DATA));
  return div;
};

export const filterDropdown = (DATA) => {
  const div = document.createElement("div");
  div.classList.add("filter__dropdown");
  div.append(filterDropdownList(DATA));
  div.append(filterInput(DATA));
  div.append(filterIconDown());
  div.append(filterIconUp());
  return div;
};

export const filterDropdownList = () => {
  const ul = document.createElement("ul");
  ul.classList.add("filter__dropdown__list");
  return ul;
};


export const filterInput = () => {
  const input = document.createElement("input");
  input.classList.add("filter__dropdown__input");
  input.setAttribute("id", "filter__dropdown__input");
  input.setAttribute("type", "list");
  input.setAttribute("placeholder", "Ingredients");
  return input;
};

export const filterIconDown = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__down");
  img.src = "../../assets/img/angle-down.svg";
  img.setAttribute("src", "../../assets/img/angle-down.svg");
  img.setAttribute("alt", "filter");

  img.addEventListener("click", () => {
    filterSelected();
  });
  return img;
};

export const filterIconUp = () => {
  const img = document.createElement("img");
  img.classList.add("filter__dropdown__icon__up");
  img.src = "../../assets/img/angle-up.svg";
  img.setAttribute("src", "../../assets/img/angle-up.svg");
  img.setAttribute("alt", "filter");
  img.addEventListener("click", () => {
    filterSelected();
  });
  return img;
};