import recipes from '../../data/recipes.js'

export const getCleanData = () => {
    return putAllRecipesDisplayTrue([...recipes]);
}

const putAllRecipesDisplayTrue = (data) => {
    data.forEach(recipe => {
        recipe.display = true
    });
    return data
}

export const getAllIngredients = (DATA) => { 
    const ingredients = [];
    DATA.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient)
        })
    });
    return ingredients
}