import { displayRecipes } from "./ui.js"

export const getIngredientInput = () => {
    return document.getElementById('ingredient_input')
}

export const handleInputIngredient = (DATA) => {
    const input = getIngredientInput()
    input.addEventListener('input', () => {
        searchIngredient(input.value, DATA)
    })
}

export const searchIngredient = (value, DATA) => {
    if (value.length < 3) return
    
    DATA.forEach(recipe => {
        recipe.display = false
        const regex = new RegExp(value, "g");
        recipe.ingredients.forEach(ingredient => {
            if (ingredient.ingredient.search(regex)) {
                recipe.display = true;
            }
        })
        console.log(recipe);
    });
    displayRecipes(DATA)
}