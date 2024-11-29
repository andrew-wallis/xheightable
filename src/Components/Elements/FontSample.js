function FontSample(referenceFont) {

  const referenceLineColor = referenceFont ? "red" : "transparent";
  
  const fontSample = document.createElement('div');
  fontSample.className = "relative w-1/2 whitespace-nowrap text-transparent overflow-hidden h-16";

  /* html */
  fontSample.innerHTML = `
    <span data-element="font-sample">
      <!-- Data-sample -->
    </span>
    <div class="absolute inset-0 whitespace-nowrap text-black z-50" style="vertical-align: 0px;">
      <span data-element="font-sample">
        <!-- Data-sample -->
      </span>
    </div>
    <div class="absolute inset-0 z-40">
      <hr data-element="cap-line" class="inline-block w-full" style="border-color: blue;">
    </div>
    <div class="absolute inset-0 z-30">
      <hr data-element="reference-line" class="inline-block w-full" style="border-color: ${referenceLineColor};">
    </div>
    <div class="absolute inset-0 z-40">
      <hr data-element="xHeight-line" class="inline-block w-full" style="border-color: green;">
    </div>
    <div class="absolute inset-0 z-40">
      <hr data-element="base-line" class="inline-block w-full" style="border-color: magenta;">
    </div>
  `

  return fontSample;

}

export default FontSample;