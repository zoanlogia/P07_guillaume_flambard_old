
/**
 * 
 * @returns retourne les recettes stockées dans le locale storage
 */
export const getRecipesStocked = () => {
  return JSON.parse(localStorage.getItem("recipes"));
};

/**
 * 
 * @param {*} recipes Les recettes à stocker dans le locale storage
 */
export const setRecipesStocked = (recipes) => {
  window.localStorage.setItem("recipes", JSON.stringify(recipes));
};
