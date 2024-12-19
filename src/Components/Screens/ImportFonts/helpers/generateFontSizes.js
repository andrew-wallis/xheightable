function generateFontSizes(base, scale, format, primaryFont, secondaryFont) {

  base = parseInt(base);

  const degrees = ["2xs", "xs", "s", "m", "l", "xl", "2xl"];
  const fontSizes = [];

  const adjustFactor = (primaryFont.capHeightPct / secondaryFont.capHeightPct).toFixed(2);
  if(format === "Variables") {
    fontSizes.push(`  --cap-adjust: ${adjustFactor};`);
    fontSizes.push("");
  }
  
  setSizes("primary-font");
  fontSizes.push("");
  setSizes("secondary-font", adjustFactor);
  fontSizes.push("");

  function setSizes(prefix, adjustFactor) {
    let currentSize = base;

    currentSize /= (scale * scale);

    if(format === "Variables") {
      for (let i = 0; i < degrees.length; i++) {

        const remSize = currentSize / 16;
        const calculatedSize = (remSize % 1 === 0) ? remSize.toFixed(0) : remSize.toFixed(2);

        if(adjustFactor) {
          fontSizes.push(`  --${prefix}-${degrees[i]}: calc(${calculatedSize} * var(--cap-adjust))rem;`);
        } else {
          fontSizes.push(`  --${prefix}-${degrees[i]}: ${calculatedSize}rem;`);
        }
        currentSize *= scale;
      }
    } else {
      for (let i = 0; i < degrees.length; i++) {

        const remSize = currentSize / 16;
        const calculatedSize = (remSize % 1 === 0) ? remSize.toFixed(0) : remSize.toFixed(2);

        fontSizes.push(`.${prefix}-${degrees[i]} {`);

        if(adjustFactor) {
          fontSizes.push(`  font-size: calc(${calculatedSize} * ${adjustFactor})rem;`);
        } else {
          fontSizes.push(`  font-size: ${calculatedSize}rem;`);
        }

        fontSizes.push(`}`);
        fontSizes.push("");
        currentSize *= scale;
      }
    }
  }
  

  
  return fontSizes;

}

export default generateFontSizes;