function sortAndFilterFonts({fonts, search, sort, licences, classifications}) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.toLowerCase().includes(search.toLowerCase()));
  }

  if(licences.length > 0) {
    fonts = fonts.filter(font => licences.includes(font.distribution));
  }

  if(classifications.length > 0) {
    fonts = fonts.filter(font => classifications.includes(font.superclass));
  }

  switch(sort) {

    case "A-Z":
      fonts = fonts.sort((a, b) => a.label.localeCompare(b.label));
      break;

    case "Rating":
      fonts = fonts.sort((a, b) => Number(b.Rating) - Number(a.Rating));
      break;

    case "X-Height":
      fonts = fonts.sort((a, b) => Number(b.xHeightPct) - Number(a.xHeightPct));
      break;

  }

  return fonts;

}

export default sortAndFilterFonts;