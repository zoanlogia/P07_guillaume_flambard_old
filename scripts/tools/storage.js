/**
 * Retourne les recettes stockées dans le local storage
 * @returns {Array} Les recettes stockées
 */
export const getRecipesStocked = () => {
  return JSON.parse(localStorage.getItem("recipes")) || [];
};

/**
 * Stocke les recettes dans le local storage
 * @param {Array} recipes Les recettes à stocker
 */
export const setRecipesStocked = (recipes) => {
  if (Array.isArray(recipes)) {
    window.localStorage.setItem("recipes", JSON.stringify(recipes));
  } else {
    console.error("setRecipesStocked: Invalid parameter 'recipes'");
  }
};
