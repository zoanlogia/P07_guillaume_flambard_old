export const createTagIngredients = (value) => {
  return `<div class="tag tag_ingredients">
    <span>${value}</span>
    <img class="close__tag closeIng" src="../../assets/img/close.svg" alt="close"/>
  </div> `;
};

export const createTagAppliances = (value) => {
  return `<div class="tag green tag_appliances">
    <span>${value}</span>
    <img class="close__tag closeApp" src="../../assets/img/close.svg" alt="close" />
  </div> `;
};

export const createTagUstensils = (value) => {
  return `<div class="tag orange tag_ustensils">
    <span>${value}</span>
    <img class="close__tag closeUst" src="../../assets/img/close.svg" alt="close" />
  </div> `;
};




