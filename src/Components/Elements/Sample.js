import getFontFamily from "../../utils/getFontFamily";

function Sample({font, referenceFont}) {

  const sampleText = "ABC abc";
  
  const adjustedCapHeight = `${48 * (0.7 / font.capHeightPct)}px`;

  const xHeight = `${33.5 * font.xHeightPct}px`;
  const referenceLineHeight = `${33.5 * referenceFont.xHeightPct}px`;
  const referenceLineColor = font.label !== referenceFont.label ? "red" : "transparent";
  
  const sample = document.createElement('div');
  sample.className = "relative w-1/2 overflow-hidden whitespace-nowrap text-transparent";
  sample.innerText = sampleText;
  sample.style.fontSize = adjustedCapHeight;
  sample.style.fontFamily = getFontFamily(font);

  const sampleTextWrapper = document.createElement('div');
  sampleTextWrapper.className = "absolute inset-0 overflow-hidden whitespace-nowrap sample-test z-50 text-black";
  sampleTextWrapper.style.verticalAlign = 0;
  sampleTextWrapper.innerText = sampleText;
  sampleTextWrapper.style.fontSize = adjustedCapHeight;
  sampleTextWrapper.style.fontFamily = getFontFamily(font);
  sample.appendChild(sampleTextWrapper);

  const blueLineWrapper = document.createElement('div');
  blueLineWrapper.className = "absolute inset-0 z-40";
  const blueLine = document.createElement('hr');
  blueLine.className = "inline-block w-full";
  blueLine.style.verticalAlign = "33.5px";
  blueLine.style.borderColor = "blue";
  blueLineWrapper.appendChild(blueLine);
  sample.appendChild(blueLineWrapper);

  const referenceLineWrapper = document.createElement('div');
  referenceLineWrapper.className = "absolute inset-0 z-30";
  sample.appendChild(referenceLineWrapper);
  const referenceLine = document.createElement('hr');
  referenceLine.className = "inline-block w-full";
  referenceLine.style.verticalAlign = referenceLineHeight;
  referenceLine.style.borderColor = referenceLineColor;
  referenceLineWrapper.appendChild(referenceLine);
  sample.appendChild(referenceLineWrapper);

  const greenLineWrapper = document.createElement('div');
  greenLineWrapper.className = "absolute inset-0 z-40";
  sample.appendChild(greenLineWrapper);
  const greenLine = document.createElement('hr');
  greenLine.className = "inline-block w-full";
  greenLine.style.verticalAlign = xHeight;
  greenLine.style.borderColor = "green";
  greenLineWrapper.appendChild(greenLine);
  sample.appendChild(greenLineWrapper);

  const magentaLineWrapper = document.createElement('div');
  magentaLineWrapper.className = "absolute inset-0 z-40";
  sample.appendChild(magentaLineWrapper);
  const magentaLine = document.createElement('hr');
  magentaLine.className = "inline-block w-full";
  magentaLine.style.verticalAlign = 0;
  magentaLine.style.borderColor = "magenta";
  magentaLineWrapper.appendChild(magentaLine);
  sample.appendChild(magentaLineWrapper);

  return sample;

}

export default Sample;