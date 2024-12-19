import getFontFamily from "../../../../utils/getFontFamily";

function generateFontFamilies(primary, secondary, format) {

  const primaryFont = getFontFamily(primary);
  const secondaryFont = getFontFamily(secondary);
  const fontFamilies = [];

  if(format === "Variables") {
    fontFamilies.push(`  --primary-font: ${primaryFont};`);
    fontFamilies.push(`  --secondary-font: ${secondaryFont};`);
  } else {
    fontFamilies.push(`.primary-font {`);
    fontFamilies.push(`  font-family: ${primaryFont};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
    fontFamilies.push(`.secondary-font {`);
    fontFamilies.push(`  font-family: ${secondaryFont};`);
    fontFamilies.push(`}`);
    fontFamilies.push("");
  }

  return fontFamilies;

}

export default generateFontFamilies;