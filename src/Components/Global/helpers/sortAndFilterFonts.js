function sortAndFilterFonts({fonts, sort}) {

  delete fonts.columns;

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