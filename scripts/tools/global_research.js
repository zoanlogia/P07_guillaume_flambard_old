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

// fonction searchbar utilisant la boucle foreach

    searchbar.addEventListener('input', (e) => {
        if (e.target.value.length >= 3) {
            container.innerHTML = "";
            recipes.forEach((recipe) => {
                if (recipe.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    container.append(card(recipe));
                }
                // Array.some() permet de vérifier si un élément existe dans un tableau
                else if (recipe.ingredients.some((e) => {
                    return e.ingredient.toLowerCase().includes(e.target.value.toLowerCase());
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

    // fonction searchbar utilisant la boucle for

    // searchbar.addEventListener('input', (e) => {
    //     if (e.target.value.length >= 3) {
    //         container.innerHTML = "";
    //         for (let i = 0; i < recipes.length; i++) {
    //             if (recipes[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
    //                 container.append(card(recipes[i]));
    //             }
    //             // Array.some() permet de vérifier si un élément existe dans un tableau
    //             else if (recipes[i].ingredients.some((e) => {
    //                 return e.ingredient.toLowerCase().includes(e.target.value.toLowerCase());
    //             })) {
    //                 container.append(card(recipes[i]));
    //             }
    //             else if (recipes[i].description.toLowerCase().includes(e.target.value.toLowerCase())) {
    //                 container.append(card(recipes[i]));
    //             }
    //         }
    //         if (container.innerHTML == "") {
    //             container.append(displayError());
    //         }
    //     }
    //     else {
    //         container.innerHTML = ""
    //         recipes.forEach((recipe) => {
    //             container.append(card(recipe));
    //         });
    //     }
    // });

    // fonction searchbar utilisant la boucle for

    searchbar.addEventListener('input', (e) => {
        if (e.target.value.length >= 3) {
            container.innerHTML = "";
            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    container.append(card(recipes[i]));
                }
                // Array.some() permet de vérifier si un élément existe dans un tableau
                else if (recipes[i].ingredients.some((e) => {
                    return e.ingredient.toLowerCase().includes(e.target.value.toLowerCase());
                })) {
                    container.append(card(recipes[i]));
                }
                else if (recipes[i].description.toLowerCase().includes(e.target.value.toLowerCase())) {
                    container.append(card(recipes[i]));
                }
            }
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
