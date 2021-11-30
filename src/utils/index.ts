/**
 * Convert string to lowercase and replace non-word and non-digit characters with hyphen.
 * @param {string} str
 * @returns {string} lowercase string with non-word and non-digit characters replaced with hyphen
 */
const toSlug = (str): string =>
  str
    .trim()
    .replace(/[^a-zA-Z0-9]/gi, '-')
    .toLowerCase();

/**
 * Toggle classes on element.
 *
 * @param {HTMLElement} element target element.
 * @param {Array<string>} classes classes to toggle.
 * @returns {void}
 */
const toggleClasses = (element, ...classes): void => {
  for (const className of classes) {
    element.classList.toggle(className);
  }
};

/**
 * Check if string is a website url.
 * @param {string} str
 * @returns {boolean} true if string is a website url
 */
const isUrl = (str): boolean => {
  try {
    return !!new URL(str);
  } catch (error) {
    return false;
  }
};

export * from './browsers';
export { toSlug, toggleClasses, isUrl };
