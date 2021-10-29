window.addEventListener('load', init);

function init() {
  localStorage.setItem('fCC_null_hide', false);
  const shadow = document.querySelector('#fcc_test_suite_wrapper').shadowRoot;
  const childNodes = Array.from(shadow.childNodes);

  childNodes.forEach((childNode) => {
    if (childNode.nodeName === 'STYLE') {
      const StyleSheet = childNode.sheet;
      StyleSheet.insertRule(
        'div.fcc_test_ui, #fcc_test_suite_indicator_wrapper {top: 4rem;}',
        StyleSheet.cssRules.length
      );
      StyleSheet.insertRule(
        '#fcc_test_suite_indicator {background-color: #fbf9f2;}',
        StyleSheet.cssRules.length
      );
      StyleSheet.insertRule(
        ' #fcc_foldout_menu {background-color: #fbf9f2;border-radius: 0 .5rem .5rem 0;}',
        StyleSheet.cssRules.length
      );
    }

    if (childNode.nodeName === 'DIV') {
      childNode.style.display = 'none';
    }
  });
}
