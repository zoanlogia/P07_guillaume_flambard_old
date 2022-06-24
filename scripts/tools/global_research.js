import { card } from "../components/card.js";
import { getRecipesStocked } from "./storage.js";

export const globalSearch = () => {
    const searchbar = document.getElementById('searchbar');

    searchbar.addEventListener('keyup', (e) => {
        const recipes = getRecipesStocked();
        const container = document.querySelector('.recipes__container');

        container.innerHTML = "";
        
        recipes.forEach((recipe) => {
            if (recipe.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                container.append(card(recipe));
            }
        });
    });
}