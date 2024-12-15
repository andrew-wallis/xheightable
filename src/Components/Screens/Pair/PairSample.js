import styles from "./Pair.module.css";

function PairSample(referenceFont) {

  const referenceLineColor = referenceFont ? "#d02c04" : "transparent";
  
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
      <hr data-element="cap-line" class=${styles.sampleLine} style="border-color: #515159;">
    </div>
    <div class="${styles.sampleWrapper} ${styles.sampleReference}">
      <hr data-element="reference-line" class=${styles.sampleLine} style="border-color: ${referenceLineColor};">
    </div>
    <div class="${styles.sampleWrapper}">
      <hr data-element="xHeight-line" class=${styles.sampleLine} style="border-color: #8C7C69;">
    </div>
    <div class="${styles.sampleWrapper}">
      <hr data-element="base-line" class=${styles.sampleLine} style="border-color: #515159;">
    </div>
  `

  return fontSample;

}

export default PairSample;