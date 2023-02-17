/**
 * Normalise la chaîne de caractères pour éviter les doublons
 * @param {string} str - Chaîne de caractères à normaliser
 * @returns {string} Chaîne de caractères normalisée
 */
export const normalizeString = (str) => {
  // Retire les accents de la chaîne de caractères
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Convertit la chaîne de caractères en minuscules
  // str = str.toLowerCase();

  // Retire les caractères spéciaux, les chiffres et les ponctuations
  // str = str.replace(/[^a-zA-Z]/g, "");

  return str;
};
