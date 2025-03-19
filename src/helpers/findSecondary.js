import isObj from "../utils/isObj";

function findSecondary(primary, secondaryFonts) {

  let secondary = {};

  if(primary.family) {
    let familyFonts = secondaryFonts.filter(font => font.family === primary.family);
    familyFonts.sort((a, b) => Number(b.Rating) - Number(a.Rating));
    secondary = familyFonts.length ? familyFonts[0] : {};
  }
  
  if(!isObj(secondary)) {

    for (let i = 0; i <= 0.5; ) {
      
      let xHeightFonts = secondaryFonts.filter(font => font.xHeightAbs === i);

      if(primary.superclass === "Sans") {
        xHeightFonts = xHeightFonts.filter(font => font.superclass === "Serif");
      } else {
        xHeightFonts = xHeightFonts.filter(font => font.superclass === "Sans");
      }
  
      if(xHeightFonts.length) {

        let vibeFonts = xHeightFonts.filter(font => font.vibe === primary.vibe);
        let neutralFonts = xHeightFonts.filter(font => font.vibe === "Neutral");
        let returnFonts = vibeFonts.length ? vibeFonts : neutralFonts;

        returnFonts = returnFonts.sort((a, b) => Number(b.Rating) - Number(a.Rating));
        secondary = returnFonts.length ? returnFonts[0] : secondaryFonts[0];
        break;
      } else {
        i += 0.02;
      }
      
    }
  }

  return secondary;
}

export default findSecondary;