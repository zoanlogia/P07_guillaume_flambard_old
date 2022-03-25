export const displayRecipes = (recipes) => {
    const container = document.querySelector('.recipes__container')
    recipes[0].display = false
    recipes.forEach(recipe => {
        if (recipe.display) {
            container.append(card(recipe))
        }
    });
}

const card = (recipe) => {
    const div = document.createElement('div')
    div.innerHTML = recipe.name
    return div
}