import { card } from "../components/card.js";
import { displayError } from "../components/errorMessage.js";
import { getRecipesStocked } from "./storage.js";

export const globalSearch = () => {
    const searchbar = document.getElementById('searchbar');
    const recipes = getRecipesStocked();
    const container = document.querySelector('.recipes__container');

    /**
     * @param {string} value - Valeur entrée dans le champ de recherche
     */
    searchbar.addEventListener('input', (e) => {
        if (e.target.value.length >= 3) {
            container.innerHTML = "";
            recipes.forEach((recipe) => {
                if (recipe.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    container.append(card(recipe));
                }
                // Array.some() permet de vérifier si un élément existe dans un tableau
                else if (recipe.ingredients.some((ingredient) => {
                    return ingredient.ingredient.toLowerCase().includes(e.target.value.toLowerCase());
                })) {
                    container.append(card(recipe));
                }
                else if (recipe.description.toLowerCase().includes(e.target.value.toLowerCase())) {
                    container.append(card(recipe));
                }
            });
            if (container.innerHTML == "") {
                container.append(displayError());
            }
        }
        else {
            container.innerHTML = ""
            recipes.forEach((recipe) => {
                container.append(card(recipe));
            });
        }
    });
}
