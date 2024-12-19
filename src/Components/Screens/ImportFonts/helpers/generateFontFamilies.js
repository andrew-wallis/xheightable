import getFontFamily from "../../../../utils/getFontFamily";

function generateFontFamilies(primary, secondary, format) {

  const primaryFont = getFontFamily(primary);
  const secondaryFont = getFontFamily(secondary);
  const returnArray = [];

  if(format === "Variables") {
    returnArray.push(`  --primary-font: ${primaryFont};`);
    returnArray.push(`  --secondary-font: ${secondaryFont};`);
  } else {
    returnArray.push(`.primary-font {`);
    returnArray.push(`  font-family: ${primaryFont};`);
    returnArray.push(`}`);
    returnArray.push("");
    returnArray.push(`.secondary-font {`);
    returnArray.push(`  font-family: ${secondaryFont};`);
    returnArray.push(`}`);
    returnArray.push("");
  }

  return returnArray;

}

export default generateFontFamilies;