export const displayError = () => {
    const error = document.createElement("div");
    error.classList.add("error");
    error.innerText = "Aucunes recettes ne correspondent à votre recherche...";
    return error;
}