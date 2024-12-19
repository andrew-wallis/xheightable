import _ from "lodash";

function findPairings(font, fonts) {

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;
  
  fontList = fontList.filter(font => font.id !== thisFont.id);

/*   const exactMatch = fontList.filter(font => font.xHeightPct === thisFont.xHeightPct);

  const closeMatch = fontList.filter(font => 
    roundToTwoDecimals(Math.abs(font.xHeightPct - thisFont.xHeightPct)) === 0.02
  );

  const nearMatch = fontList.filter(font => 
    roundToTwoDecimals(Math.abs(font.xHeightPct - thisFont.xHeightPct)) === 0.04
  );

  const distantMatch = fontList.filter(font => 
    roundToTwoDecimals(Math.abs(font.xHeightPct - thisFont.xHeightPct)) > 0.04
  );

  const renderArray = [
    exactMatch,
    closeMatch,
    nearMatch,
    distantMatch
  ];
  
  return renderArray; */

  fontList.forEach(font => {
    font.xHeightDiff = Math.abs(font.xHeightPct - thisFont.xHeightPct);
  });

  fontList.forEach(font => {
    font.capHeightDiff = 1 - (font.capHeightPct / thisFont.capHeightPct);
  });

  
  fontList = fontList.sort((a, b) => {

    // Sort by xHeights
    const diffA = Math.abs(a.xHeightPct - thisFont.xHeightPct);
    const diffB = Math.abs(b.xHeightPct - thisFont.xHeightPct);

    if (diffA !== diffB) {
      return diffA - diffB;
    }

    // Promote fonts with the same family
    const sameFamilyA = (a.family === thisFont.family) ? 0 : 1;
    const sameFamilyB = (b.family === thisFont.family) ? 0 : 1;
    if (sameFamilyA !== sameFamilyB) {
      return sameFamilyA - sameFamilyB;
    }

    // Deweight fonts based on superclass
    const isSansOrSerif = (thisFont.superclass === 'Sans' || thisFont.superclass === 'Serif');
    const isMono = (thisFont.superclass === 'Mono');

    let deweightA = 0;
    let deweightB = 0;

    if (isSansOrSerif) {
      deweightA = (a.superclass === 'Mono') ? 1 : 0;
      deweightB = (b.superclass === 'Mono') ? 1 : 0;
    } else if (isMono) {
      deweightA = (a.superclass === 'Serif' || a.superclass === 'Sans') ? 1 : 0;
      deweightB = (b.superclass === 'Serif' || b.superclass === 'Sans') ? 1 : 0;
    }

    if (deweightA !== deweightB) {
      return deweightA - deweightB;
    }

    // Then sort by superclass
    const superclassA = (a.superclass !== thisFont.superclass) ? 1 : 0;
    const superclassB = (b.superclass !== thisFont.superclass) ? 1 : 0;
    if(superclassA !== superclassB) {
      return superclassB - superclassA;
    }

    // Then sort by classification
    const classA = (a.classification !== thisFont.classification) ? 1 : 0;
    const classB = (b.classification !== thisFont.classification) ? 1 : 0;
    if(classA !== classB) {
      return classB - classA;
    }

    // Then sort by subclass
    const subclassA = (a.subclass !== thisFont.subclass) ? 1 : 0;
    const subclassB = (b.subclass !== thisFont.subclass) ? 1 : 0;
    if(subclassA !== subclassB) {
      return subclassB - subclassA;
    } else {
      return b.Score - a.Score;
    }
  });

  return fontList;

}

export default findPairings;