function Sample({font, referenceFont}) {

  const sampleText = "ABC abc";
  
  const adjustedCapHeight = 48 * (0.7 / font.capHeightPct);

  const xHeight = 33.5 * font.xHeightPct;
  const referenceLine = 33.5 * referenceFont.xHeightPct;

  const referenceLineColor = font.label !== referenceFont.label ? "red" : "transparent";


  // Render

  const sample = document.createElement('div');
  sample.className = "relative w-1/2 overflow-hidden whitespace-nowrap text-transparent";
  sample.innerText = {sampleText};

  const sampleTextWrapper = document.createElement('div');
  sampleTextWrapper.className = "absolute inset-0 overflow-hidden whitespace-nowrap sample-test z-50";
  sampleTextWrapper.style.verticalAlign = 0;
  sampleTextWrapper.innerText = {sampleText}
  sample.appendChild(sampleTextWrapper);

  const blueLineWrapper = document.createElement('div');
  blueLineWrapper.className = "absolute inset-0 z-40";
  sample.appendChild(blueLineWrapper);
  const blueLine = document.createElement('hr');
  blueLine.className = "inline-block w-full";
  blueLine.style.verticalAlign = 33.5;
  blueLine.style.borderColor = "blue";


  return sample;

}

export default Sample;