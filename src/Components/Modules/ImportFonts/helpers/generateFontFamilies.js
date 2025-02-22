import getFontFamily from "../../../../helpers/getFontFamily";

function generateFontFamilies(primary, secondary, format, capAdjusts, lineHeights) {

  const primaryFont = getFontFamily(primary);
  const secondaryFont = getFontFamily(secondary);

  const fontFamilies = [];

  if(format === "Variables") {
    
    fontFamilies.push(`  --primary-font: ${primaryFont};`);
    fontFamilies.push(`  --secondary-font: ${secondaryFont};`);
    fontFamilies.push("");

    if(capAdjusts) {
      fontFamilies.push(`  --primary-adjust: ${primary.capHeightAdj}`);
      fontFamilies.push(`  --secondary-adjust: ${secondary.capHeightAdj}`);
      fontFamilies.push("");
    }

    if(lineHeights) {
      fontFamilies.push(`  --primary-long-line-height: ${primary.lineMax}`);
      fontFamilies.push(`  --primary-short-line-height: ${primary.lineMin}`);
      fontFamilies.push("");
      fontFamilies.push(`  --secondary-long-line-height: ${secondary.lineMax}`);
      fontFamilies.push(`  --secondary-short-line-height: ${secondary.lineMin}`);
    }

  } else {

    fontFamilies.push(`.primary-font {`);
    fontFamilies.push(`  font-family: ${primaryFont};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    fontFamilies.push(`.secondary-font {`);
    fontFamilies.push(`  font-family: ${secondaryFont};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    
    if(lineHeights || capAdjusts) {

      fontFamilies.push(`.primary-font-paragraph {`)
      if(capAdjusts) fontFamilies.push(`  font-size: calc(1rem * ${primary.capHeightAdj});`);
      if(lineHeights) fontFamilies.push(`  line-height: ${primary.lineMax};`);
      fontFamilies.push(`}`);
      fontFamilies.push("");
      fontFamilies.push(`.primary-font-heading {`)
      if(capAdjusts) fontFamilies.push(`  font-size: calc(1.5rem * ${primary.capHeightAdj});`);
      if(lineHeights) fontFamilies.push(`  line-height: ${primary.lineMin};`);
      fontFamilies.push(`}`);
      fontFamilies.push("");
      fontFamilies.push(`.secondary-font-paragraph {`)
      if(capAdjusts) fontFamilies.push(`  font-size: calc(1rem * ${secondary.capHeightAdj});`);
      if(lineHeights) fontFamilies.push(`  line-height: ${secondary.lineMax};`);
      fontFamilies.push(`}`);
      fontFamilies.push("");
      fontFamilies.push(`.secondary-font-heading {`)
      if(capAdjusts) fontFamilies.push(`  font-size: calc(1.5rem * ${secondary.capHeightAdj});`);
      if(lineHeights) fontFamilies.push(`  line-height: ${secondary.lineMin};`);
      fontFamilies.push(`}`);

    }
    
  }

  return fontFamilies;

}

export default generateFontFamilies;