import { addSelected, filterDropdownListItemSpan } from "../components/filter.js"
import { displayRecipes } from "./ui.js"

export const getIngredientInput = () => {
    return document.getElementById('filter__dropdown__input')
}

export const getSpan = () => { 
    return document.querySelector('.filter__dropdown__list__item__span')
}

export const handleInputIngredient = (DATA) => {
    const input = getIngredientInput()
    input.addEventListener('input', () => {
        searchIngredient(input.value, DATA)
        addSelected(DATA)
        getSpan().innerHTML = input.value
    })
}

export const searchIngredient = (value, DATA) => {
    
    if (value.length < 3) return
    DATA.forEach(recipe => {
        recipe.display = false
        const regex = new RegExp(value, "g");
        recipe.ingredients.forEach(ing => {
            if (ing.ingredient.search(regex)) {
                recipe.display = true;
            } 
        })
        // console.log(recipe);
    });
    displayRecipes(DATA)
}