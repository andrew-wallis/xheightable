import getFontFamily from "../../../utils/getFontFamily";
import getFontStylesheet from "../../../utils/getFontStylesheet";
import Icons from "../../Elements/Icons";
import styles from "./GetFonts.module.css";

function GetFontGoogle(font) {

  const getFontGoogle = document.createElement('div');

  /* html */
  getFontGoogle.innerHTML = `
    <div class=${styles.codeHeader}>
      <h3 class="label">Stylesheet</h3>
      <a href="#" data-element="copy-stylesheet" class="${styles.copy} label">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code data-code="stylesheet" class=${styles.code}>
      ${getFontStylesheet(font)}
    </code>
    <div class=${styles.codeHeader}>
      <h3 class="label">Stylesheet</h3>
      <a href="#" data-element="copy-css" class="${styles.copy} label">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code data-code="css" class=${styles.code}>
      font-family: ${getFontFamily(font)}
    </code>
    <a class="${styles.button} button-text" href=${font.link} target="_blank">
      More at Google Fonts
    </a>
  `;

  const copyStylesheet = getFontGoogle.querySelector('[data-element="copy-stylesheet"]');
  copyStylesheet.addEventListener("click", function(e) {
    e.preventDefault();
    const label = copyStylesheet.querySelector('[data-element="copy-label"]')
    navigator.clipboard.writeText(getFontStylesheet(font)).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  const copyCSS = getFontGoogle.querySelector('[data-element="copy-css"]');
  copyCSS.addEventListener("click", function(e) {
    e.preventDefault();
    const label = copyCSS.querySelector('[data-element="copy-label"]')
    navigator.clipboard.writeText(`font-family: ${getFontFamily(font)}`).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  const copyIcons = getFontGoogle.querySelectorAll('[data-element="copy-icon"]');
  copyIcons.forEach((icon) => {
    icon.appendChild(Icons("Copy"));
  });

  return getFontGoogle;

}

export default GetFontGoogle;