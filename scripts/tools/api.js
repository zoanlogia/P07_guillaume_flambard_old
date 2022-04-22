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

export const getAllIngredients = () => {
    const ingredients = [];
    getCleanData().forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.toLowerCase())
        })
    });

    return [...new Set(ingredients)] // enlève les doublons (253 -> 123)
}