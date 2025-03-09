import _ from "lodash";

function sortSecondaryFonts({primary, fonts, sort}) {
  
  let fontList = _.cloneDeep(fonts);
  
  fontList = fontList.filter(font => font.id !== primary.id);

  // This is the difference between primary and secondary xHeights (e.g. 2 or -2).
  fontList.forEach(font => {
    font.xHeightDiff = Math.round((font.xHeightPct - primary.xHeightPct) * 100) / 100;
  });

  // This is the difference between primary and secondary xHeights as an absolute value (e.g 2 and -2 are both 2).
  fontList.forEach(font => {
    font.xHeightAbs = Math.round(Math.abs(font.xHeightPct - primary.xHeightPct) * 100) / 100;
  });

  switch(sort) {

    case "Match":

      fontList = fontList.sort((a, b) => a.label.localeCompare(b.label));
      fontList = fontList.sort((a, b) => a.xHeightAbs - b.xHeightAbs);
      break;

    case "A-Z":
      fontList = fontList.sort((a, b) => a.label.localeCompare(b.label));
      break;

    case "Rating":
      fontList = fontList.sort((a, b) => Number(b.Rating) - Number(a.Rating));
      break;
      
  }

  return fontList;

}

export default sortSecondaryFonts;