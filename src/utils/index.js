/**
 * Convert string to lowercase and replace non-word and non-digit characters with hyphen.
 * @param {string} str
 * @returns {string} lowercase string with non-word and non-digit characters replaced with hyphen
 */
const toSlug = (str) =>
  str
    .trim()
    .replace(/[^a-zA-Z0-9]/gi, '-')
    .toLowerCase();

/**
 * Get image dimensions from image.
 * @param {string} image url or path of image
 * @returns {object} object with width and height of image
 */
const getImageDimension = (image) => {
  const img = new Image();
  img.src = image;
  return {
    width: img.width,
    height: img.height
  };
};

/**
 *
 * @returns
 */
const getCurrentfilePath = (currentPage) => {
  const currentFile = `src/pages${currentPage.replace(/\/$/, '')}`;
  return currentFile;
};

/**
 * Toggle classes on element.
 *
 * @param {HTMLElement} element target element.
 * @param {Array<string>} classes classes to toggle.
 * @returns {void}
 */
const toggleClasses = (element, ...classes) => {
  for (const className of classes) {
    element.classList.toggle(className);
  }
};

export * from './browsers';
export { toSlug, getImageDimension, getCurrentfilePath, toggleClasses };
