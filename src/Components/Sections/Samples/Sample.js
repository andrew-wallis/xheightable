function Sample(referenceFont) {

  const referenceLineColor = referenceFont ? "#59A6CD" : "transparent";
  const xHeightLineColor = referenceFont ? "#D92854" : "#59A6CD";
  
  const sample = document.createElement('div');
  sample.className = "sample";

  /* html */
  sample.innerHTML = `
    <style data-element="sample-style">

    </style>
    <span data-element="sample-text">
      <!-- Data-sample -->
    </span>
    <div class="sampleWrapper sampleText" style="vertical-align: 0px;">
      <span data-element="sample-text">
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

  return sample;

}

export default Sample;