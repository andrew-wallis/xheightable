import styles from "./Pair.module.css";

function PairSample(referenceFont) {

  const referenceLineColor = referenceFont ? "red" : "transparent";
  
  const fontSample = document.createElement('div');
  fontSample.className = styles.sample;

  /* html */
  fontSample.innerHTML = `
    <span data-element="font-sample">
      <!-- Data-sample -->
    </span>
    <div class="${styles.sampleWrapper} ${styles.sampleText}" style="vertical-align: 0px;">
      <span data-element="font-sample">
        <!-- Data-sample -->
      </span>
    </div>
    <div class="${styles.sampleWrapper}">
      <hr data-element="cap-line" class=${styles.sampleLine} style="border-color: blue;">
    </div>
    <div class="${styles.sampleWrapper} ${styles.sampleReference}">
      <hr data-element="reference-line" class=${styles.sampleLine} style="border-color: ${referenceLineColor};">
    </div>
    <div class="${styles.sampleWrapper}">
      <hr data-element="xHeight-line" class=${styles.sampleLine} style="border-color: green;">
    </div>
    <div class="${styles.sampleWrapper}">
      <hr data-element="base-line" class=${styles.sampleLine} style="border-color: magenta;">
    </div>
  `

  return fontSample;

}

export default PairSample;