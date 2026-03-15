import isObj from "../utils/isObj";

function findSecondary(primary, secondaryFonts) {

  const blacklist = ["Lato", "Noto Sans", "Nunito Sans", "Open Sans"];
  const filteredFonts = secondaryFonts.filter(font => !blacklist.includes(font.name));

  let secondary = {};

  if(primary.family) {
    let familyFonts = filteredFonts.filter(font => font.family === primary.family);

    if(primary.superclass === "Sans") {
      familyFonts = familyFonts.filter(font => font.superclass === "Serif");
    } else {
      familyFonts = familyFonts.filter(font => font.superclass === "Sans");
    }

    familyFonts.sort((a, b) => Number(b.Rating) - Number(a.Rating));
    secondary = familyFonts.length ? familyFonts[0] : {};
  }
  
  if(!isObj(secondary)) {

    for (let i = 0; i <= 0.5; ) {
      
      let xHeightFonts = filteredFonts.filter(font => font.xHeightAbs === i);

      if(primary.superclass === "Sans") {
        xHeightFonts = xHeightFonts.filter(font => font.superclass === "Serif");
      } else {
        xHeightFonts = xHeightFonts.filter(font => font.superclass === "Sans");
      }
  
      if(xHeightFonts.length) {
        
        let distributionFonts = {};

        if(primary.distribution === "Adobe") {
          distributionFonts = xHeightFonts.filter(font => font.distribution === "Adobe");
        } else {
          distributionFonts = xHeightFonts.filter(font => font.distribution !== "Adobe");
        }

        xHeightFonts = distributionFonts.length ? distributionFonts : xHeightFonts;

        let vibeFonts = xHeightFonts.filter(font => font.vibe === primary.vibe);
        let neutralFonts = xHeightFonts.filter(font => font.vibe === "Neutral");
        let returnFonts = vibeFonts.length ? vibeFonts : neutralFonts;

        returnFonts = returnFonts.sort((a, b) => Number(b.Rating) - Number(a.Rating));
        secondary = returnFonts.length ? returnFonts[0] : xHeightFonts[0];
        break;
      } else {
        i += 0.02;
      }
      
    }
  }

  return secondary;
}

export default findSecondary;