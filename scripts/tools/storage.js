export const getRecipesStocked = () => {
  return JSON.parse(localStorage.getItem("recipes"));
};

export const setRecipesStocked = (recipes) => {
  window.localStorage.setItem("recipes", JSON.stringify(recipes));
};
