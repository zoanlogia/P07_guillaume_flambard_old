export const createTagIngredients = (value) => {
  const tag = `<div class="tag">
    <span>${value}</span>
    <img class="close__tag closeIng" src="../../assets/img/close.svg" alt="close" />
  </div> `;
  return tag;
};

export const createTagAppliances = (value) => {
  const tag = `<div class="tag green">
    <span>${value}</span>
    <img class="close__tag closeApp" src="../../assets/img/close.svg" alt="close" />
  </div> `;
  return tag;
};

export const createTagUstensils = (value) => {
  const tag = `<div class="tag orange">
    <span>${value}</span>
    <img class="close__tag closeUst" src="../../assets/img/close.svg" alt="close" />
  </div> `;
  return tag;
};




