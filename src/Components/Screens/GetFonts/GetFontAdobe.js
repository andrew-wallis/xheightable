import styles from "./GetFonts.module.css";

function GetFontAdobe(font) {

  const getFontAdobe = document.createElement('div');

  /* html */
  getFontAdobe.innerHTML = `
    <a class="${styles.button} button-text" href="${font.link}" target="_blank">
      Get This Font From Adobe
    </a>
    <p class="small-text">
      We have partnered with Adobe and get a percentage from each licence sold through xHeightable.
    </p>
  `;

  return getFontAdobe;

}

export default GetFontAdobe;