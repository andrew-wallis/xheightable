import _ from "lodash";

function findPairings({font, fonts, sort, licences, classifications}) {

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }
  
  let fontList = _.cloneDeep(fonts);
  const thisFont = font;
  
  fontList = fontList.filter(font => font.id !== thisFont.id);

  if(licences.length > 0) {
    fontList = fontList.filter(font => licences.includes(font.distribution));
  }

  if(classifications.length > 0) {
    fontList = fontList.filter(font => classifications.includes(font.superclass));
  }

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

      return Number(b.Rating) - Number(a.Rating);

    });
      
  }

  return fontList;

}

export default findPairings;