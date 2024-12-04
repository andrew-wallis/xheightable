import styles from "./GetFonts.module.css";

function GetFont() {

  const getFont = document.createElement('div');
  getFont.className = styles.getFont;

  /* html */
  getFont.innerHTML = `
    <h2 data-element="data-label" class=${styles.label}>
      <!-- Data-Label -->
    </h2>
    <div class="${styles.details} secondary-text">
      <div data-element="data-distribution" class=${styles.distribution}></div>
      <div class="">
        <span data-element="data-designers">
          <!-- Data-Designers -->
        </span>
        <span data-element="data-year" class=${styles.year}>
          <!-- Data-Year -->
        </span>
      </div>
    </div>
    <div data-element="data-details">
      <!-- Data-Get -->
    </div>
  `;

  return getFont;

}

export default GetFont;