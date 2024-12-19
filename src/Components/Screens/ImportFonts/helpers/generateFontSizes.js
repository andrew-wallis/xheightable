function generateFontSizes(base, scale, format, adjust) {

  base = parseInt(base);

  const degrees = ["2xs", "xs", "s", "m", "l", "xl", "2xl"];
  const fontSizes = [];

  if(Array.isArray(adjust)) {
    setSizes(base, "primary-font");
    setSizes(base * (adjust[0].capHeightPct / adjust[1].capHeightPct), "secondary-font");
  } else {
    setSizes(base, "font");
  }

  function setSizes(localBase, prefix) {
    let currentSize = localBase;

    currentSize /= (scale * scale);

    if(format === "Variables") {
      for (let i = 0; i < degrees.length; i++) {
        fontSizes.push(`  --${prefix}-${degrees[i]}: ${currentSize.toFixed(2)}px`);
        currentSize *= scale;
      }
    } else {
      for (let i = 0; i < degrees.length; i++) {
        fontSizes.push(`.${prefix}-${degrees[i]} {`)
        fontSizes.push(`  font-size: ${currentSize.toFixed(2)}px`);
        fontSizes.push(`}`);
        fontSizes.push("");
        currentSize *= scale;
      }
    }
  }
  

  
  return fontSizes;

}

export default generateFontSizes;