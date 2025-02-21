import _ from "lodash";

function findPairings({font, fonts, sort}) {
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;
  
  fontList = fontList.filter(font => font.id !== thisFont.id);

  fontList.forEach(font => {
    font.xHeightDiff = Math.abs(font.xHeightPct - thisFont.xHeightPct);
  });

  fontList.forEach(font => {
    font.capHeightDiff = 1 - (font.capHeightPct / 0.7);
  });

  if(sort === "A-Z") {
    fontList = fontList.sort((a, b) => a.label.localeCompare(b.label));
  } else if(sort === "Rating") {
    fontList = fontList.sort((a, b) => Number(b.Rating) - Number(a.Rating));
  } else {

    fontList = fontList.sort((a, b) => {

      if(thisFont.family) {
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

      return Number(b.Rating) - Number(a.Rating);

    });
      
  }

  return fontList;

}

export default findPairings;