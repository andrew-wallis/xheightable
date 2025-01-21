function PairSample(referenceFont) {

  const referenceLineColor = referenceFont ? "#59A6CD" : "transparent";
  const xHeightLineColor = referenceFont ? "#D92854" : "#59A6CD";
  
  const fontSample = document.createElement('div');
  fontSample.className = "sample";

  /* html */
  fontSample.innerHTML = `
    <span data-element="font-sample">
      <!-- Data-sample -->
    </span>
    <div class="sampleWrapper sampleText" style="vertical-align: 0px;">
      <span data-element="font-sample">
        <!-- Data-sample -->
      </span>
    </div>
    <div class="sampleWrapper">
      <hr data-element="cap-line" class="sampleLine">
    </div>
    <div class="sampleWrapper sampleReference">
      <hr data-element="reference-line" class="sampleLine" style="border-color: ${referenceLineColor};">
    </div>
    <div class="sampleWrapper">
      <hr data-element="xHeight-line" class="sampleLine" style="border-color: ${xHeightLineColor};">
    </div>
    <div class="sampleWrapper">
      <hr data-element="base-line" class="sampleLine">
    </div>
  `

  return fontSample;

}

export default PairSample;