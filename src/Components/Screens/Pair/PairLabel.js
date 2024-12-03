import styles from "./Pair.module.css";

function PairLabel() {

  const fontLabel = document.createElement('div');
  fontLabel.className = styles.label;

  /* html */
  fontLabel.innerHTML = `
    <div data-element="label-text" class="${styles.text} secondary-text">
      <!-- Label Text -->
    </div>
    <div data-element="label-xHeight" class="${styles.xHeight} secondary-text">
      <!-- Label xHeight -->
    </div>
  `;

  return fontLabel;

}

export default PairLabel;