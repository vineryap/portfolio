// https://github.com/yousifalraheem/browser-detector/blob/master/index.js
/**
 * Return Boolean value that indicates whether or not a pattern exists in user agent.
 * @param {string} keyword keyword to search
 * @returns {boolean} true if keyword is found in user agent
 */
function agentHas(keyword): boolean {
  return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
}

/**
 * Check if browser is IE.
 * @returns {boolean} True if browser is IE
 */
function isIE(): boolean {
  return 'documentMode' in document;
}

/**
 * Check if browser is Safari.
 * @returns {boolean} True if browser is Safari
 */
function isSafari(): boolean {
  return (
    (!!window.ApplePaySetupFeature || 'safari' in window) &&
    agentHas('Safari') &&
    !agentHas('Chrome') &&
    !agentHas('CriOS')
  );
}

/**
 * Check if browser is Chrome.
 * @returns {boolean} True if browser is Chrome
 */
function isChrome(): boolean {
  return agentHas('CriOS') || agentHas('Chrome') || 'chrome' in window;
}

/**
 * Check if browser is Firefox.
 * @returns {boolean} True if browser is Firefox
 */
function isFirefox(): boolean {
  return agentHas('Firefox') || agentHas('FxiOS') || agentHas('Focus');
}

/**
 * Check if browser is Edge.
 * @returns {boolean} True if browser is Edge
 */
function isEdge(): boolean {
  return agentHas('Edg');
}

/**
 * Check if browser is Opera.
 * @returns {boolean} True if browser is Opera
 */
function isOpera(): boolean {
  return agentHas('OPR');
}

/**
 * Check if browser is Vivaldi.
 * @returns {boolean} True if browser is Vivaldi
 */
function isVivaldi(): boolean {
  return agentHas('Vivaldi');
}

/**
 * Check if browser is Brave.
 * @returns {boolean} True if browser is Brave
 */
const isBrave = (): boolean => {
  return 'brave' in navigator;
};

/**
 * Check if browser is mobile.
 * @returns {boolean} True if browser is mobile
 */
const isMobile = (): boolean => {
  return (
    agentHas('Mobi') ||
    agentHas('Android') ||
    agentHas('iPhone') ||
    agentHas('iPad') ||
    agentHas('iPod') ||
    agentHas('Windows Phone') ||
    agentHas('BlackBerry')
  );
};

/**
 * check if browser is console.
 * @returns {boolean} True if browser is console
 */
const isConsole = (): boolean => {
  return (
    agentHas('Console') ||
    agentHas('Nintendo') ||
    agentHas('PlayStation') ||
    agentHas('Xbox') ||
    agentHas('Wii')
  );
};

/**
 * Get safari browser version from client browser.
 * @returns {(string|null)} Version of safari browser or null if user agent is undefined.
 */
const getSafariVersion = (): string | null => {
  return isSafari() && navigator.userAgent.match(/version\/(\d+[.]?\d+)/i)[1];
};

export {
  agentHas,
  isIE,
  isSafari,
  isChrome,
  isFirefox,
  isEdge,
  isOpera,
  isVivaldi,
  isBrave,
  isMobile,
  isConsole,
  getSafariVersion
};
