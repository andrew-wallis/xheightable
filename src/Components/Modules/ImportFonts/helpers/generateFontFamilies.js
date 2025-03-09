import getFontFamily from "../../../../helpers/getFontFamily";

function generateFontFamilies({primary, secondary, format, titleSize, textSize, units}) {

  const primaryFont = getFontFamily(primary);
  const secondaryFont = getFontFamily(secondary);

  const titleFontSize = `${units === "PX" ? titleSize : titleSize / 16}${units.toLowerCase()}`;
  const textFontSize = `${units === "PX" ? textSize : textSize / 16}${units.toLowerCase()}`;

  const fontFamilies = [];

  if(format === "Variables") {
    
    fontFamilies.push(`  --primary-font: ${primaryFont};`);
    fontFamilies.push(`  --secondary-font: ${secondaryFont};`);
    fontFamilies.push("");
    fontFamilies.push(`  --primary-adjust: ${primary.capHeightAdj};`);
    fontFamilies.push(`  --secondary-adjust: ${secondary.capHeightAdj};`);
    fontFamilies.push("");
    fontFamilies.push(`  --primary-short-line-height: ${primary.lineMin};`);
    fontFamilies.push(`  --primary-long-line-height: ${primary.lineMax};`);
    fontFamilies.push(`  --secondary-short-line-height: ${secondary.lineMin};`);
    fontFamilies.push(`  --secondary-long-line-height: ${secondary.lineMax};`);
    fontFamilies.push("");
    fontFamilies.push(`  --primary-heading-size: calc(${titleFontSize} * var(--primary-adjust));`);
    fontFamilies.push(`  --primary-paragraph-size: calc(${textFontSize} * var(--primary-adjust));`);
    fontFamilies.push(`  --secondary-heading-size: calc(${titleFontSize} * var(--secondary-adjust));`);
    fontFamilies.push(`  --secondary-paragraph-size: calc(${textFontSize} * var(--secondary-adjust));`);

  } else {

    fontFamilies.push(`.primary-heading {`);
    fontFamilies.push(`  font-family: ${primaryFont};`);
    fontFamilies.push(`  font-size: calc(${titleFontSize} * ${primary.capHeightAdj});`);
    fontFamilies.push(`  line-height: ${primary.lineMin};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    fontFamilies.push(`.primary-paragraph {`);
    fontFamilies.push(`  font-family: ${primaryFont};`);
    fontFamilies.push(`  font-size: calc(${textFontSize} * ${primary.capHeightAdj});`);
    fontFamilies.push(`  line-height: ${primary.lineMax};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    fontFamilies.push(`.secondary-heading {`);
    fontFamilies.push(`  font-family: ${secondaryFont};`);
    fontFamilies.push(`  font-size: calc(${titleFontSize} * ${secondary.capHeightAdj});`);
    fontFamilies.push(`  line-height: ${secondary.lineMin};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    fontFamilies.push(`.secondary-paragraph {`);
    fontFamilies.push(`  font-family: ${secondaryFont};`);
    fontFamilies.push(`  font-size: calc(${textFontSize} * ${secondary.capHeightAdj});`);
    fontFamilies.push(`  line-height: ${secondary.lineMax};`);
    fontFamilies.push(`}`);
    
  }

  return fontFamilies;

}

export default generateFontFamilies;