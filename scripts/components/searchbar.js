export const createInput = () => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "searchbar");
    const input = document.createElement("input");
    input.setAttribute("id", "searchbar");
    input.setAttribute("placeholder", "rechercher une recette")
    const icon = document.createElement('img')
    icon.src = './assets/img/search_icon.svg'
    icon.classList.add('search__icon')
    div.append(label, input, icon);
    return div
}
