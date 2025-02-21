import _ from "lodash";

function findPairings({font, fonts, sort}) {
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;
  
  fontList = fontList.filter(font => font.id !== thisFont.id);

  fontList.forEach(font => {
    font.xHeightAbs = Math.round(Math.abs(font.xHeightPct - thisFont.xHeightPct) * 100) / 100;
  });

  fontList.forEach(font => {
    font.xHeightDiff = Math.round((font.xHeightPct - thisFont.xHeightPct) * 100) / 100;
  });


  if(sort === "A-Z") {
    fontList = fontList.sort((a, b) => a.label.localeCompare(b.label));
  } else if(sort === "Rating") {
    fontList = fontList.sort((a, b) => Number(b.Rating) - Number(a.Rating));
  } else {

    fontList = fontList.sort((a, b) => a.label.localeCompare(b.label));
    fontList = fontList.sort((a, b) => a.xHeightAbs - b.xHeightAbs);

    fontList = fontList.sort((a, b) => {

/*       const diffA = Math.abs(a.xHeightPct - thisFont.xHeightPct);
      const diffB = Math.abs(b.xHeightPct - thisFont.xHeightPct);

      if (diffA !== diffB) {
        return diffA - diffB;
      } */

/*       if(thisFont.family) {
        const familyA = a.family === thisFont.family ? 1 : 0;
        const familyB = b.family === thisFont.family ? 1 : 0;
  
        if (familyA !== familyB) {
          return familyB - familyA;
        }
      }


      // Sort by xHeights
      const diffA = Math.abs(a.xHeightPct - thisFont.xHeightPct);
      const diffB = Math.abs(b.xHeightPct - thisFont.xHeightPct);

      if (diffA !== diffB) {
        return diffA - diffB;
      }

      // Determine superclass order
      const orderMap = {
        Sans: { Serif: 0, Mono: 2, Sans: 1 },
        Serif: { Sans: 0, Mono: 2, Serif: 1 },
        Mono: { Sans: 0, Serif: 1, Mono: 2 },
      };

      const superclassOrder = orderMap[thisFont.superclass];
      const orderA = superclassOrder[a.superclass] ?? 3; // Default to 3 if not in map
      const orderB = superclassOrder[b.superclass] ?? 3;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return Number(b.Rating) - Number(a.Rating); */

    });

    /* Find the first  */
      
  }

  return fontList;

}

export default findPairings;