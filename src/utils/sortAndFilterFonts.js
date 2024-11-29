function sortAndFilterFonts(fonts, search, sort) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.toLowerCase().includes(search.toLowerCase()));
  }

  switch(sort) {

    case "A-Z":
      fonts = fonts.sort((a, b) => a.label.localeCompare(b.label));
      break;

    case "Z-A":
      fonts = fonts.sort((a, b) => b.label.localeCompare(a.label));
      break;

    case "xHiLo":
      fonts = fonts.sort((a, b) => Number(b.xHeightPct) - Number(a.xHeightPct));
      break;

    case "xLoHi":
      fonts = fonts.sort((a, b) => Number(a.xHeightPct) - Number(b.xHeightPct));
      break;
    
    case "RatingHiLo":
      fonts = fonts.sort((a, b) => Number(b.Score) - Number(a.Score));
      break;

    case "RatingLoHi":
      fonts = fonts.sort((a, b) => Number(a.Score) - Number(b.Score));
      break;

  }

  return fonts;

}

export default sortAndFilterFonts;