/** @jsxImportSource solid-js */
import { createSignal, createEffect, onMount } from "solid-js";
import { checkNonDesktopBrowsers } from "../utils/index";

function Button() {
  const [isMobileBrowsers, setIsMobileBrowsers] = createSignal(true);

  const fCCModScript = () => {
    localStorage.setItem("fCC_null_hide", false);
    const shadow = document.querySelector("div#fcc_test_suite_wrapper").shadowRoot;
    const childNodes = Array.from(shadow.childNodes);
    !childNodes.length && setTimeout(() => fCCModScript(), 100);

    if (childNodes.length) {
      childNodes.forEach(childNode => {
        if (childNode.nodeName === "STYLE") {
          const StyleSheet = childNode.sheet;
          StyleSheet.insertRule(
            "div.fcc_test_ui, #fcc_test_suite_indicator_wrapper {top: 4rem;}",
            StyleSheet.cssRules.length
          );
          StyleSheet.insertRule(
            "#fcc_test_suite_indicator {background-color: #fbf9f2;}",
            StyleSheet.cssRules.length
          );
          StyleSheet.insertRule(
            " #fcc_foldout_menu {background-color: #fbf9f2;border-radius: 0 .5rem .5rem 0;}",
            StyleSheet.cssRules.length
          );
        }

        if (childNode.nodeName === "DIV") {
          childNode.style.display = "none";
        }
      });
    }
  };

  const loadScripts = () => {
    const fccTestSuiteScript = document.createElement("script");
    fccTestSuiteScript.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    fccTestSuiteScript.defer = true;
    fccTestSuiteScript.onload = fCCModScript;
    document.body.appendChild(fccTestSuiteScript);
  };

  const buttonHandler = () => {
    const BUTTON = document.querySelector("#fcc_test_toggle");
    const defaultText = "Show FCC Test Suite";

    const SHADOW = document.querySelector("#fcc_test_suite_wrapper").shadowRoot;

    const FCC_TEST_UI = SHADOW.querySelectorAll("div.fcc_test_ui");

    FCC_TEST_UI.forEach(Node => {
      Node.style.display = Node.style.display === "none" ? "" : "none";
    });

    BUTTON.textContent = BUTTON.textContent === defaultText ? "hide FCC Test Suite" : defaultText;
  };

  createEffect(() => {
    setIsMobileBrowsers(checkNonDesktopBrowsers());
  });

  onMount(() => {
    !checkNonDesktopBrowsers() && loadScripts();
  });

  return (
    <>
      <div class={`${isMobileBrowsers() && "hidden"} flex mb-20`}>
        <button
          id="fcc_test_toggle"
          type="button"
          onclick={buttonHandler}
          class="btn md:px-6 text-xs md:text-base capitalize leading-snug tracking-tight border-solid border-base-300"
        >
          Show FCC Test Suite
        </button>
      </div>
    </>
  );
}

export default Button;
