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