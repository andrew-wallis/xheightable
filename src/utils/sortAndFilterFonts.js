function sortAndFilterFonts(fonts, search, sort) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.toLowerCase().includes(search.toLowerCase()));
  }

  switch(sort) {

    case "Font":
      fonts = fonts.sort((a, b) => a.label.localeCompare(b.label));
      break;

    case "Font Reverse":
      fonts = fonts.sort((a, b) => b.label.localeCompare(a.label));
      break;

    case "X-Height":
      fonts = fonts.sort((a, b) => Number(b.xHeightPct) - Number(a.xHeightPct));
      break;

    case "X-Height Reverse":
      fonts = fonts.sort((a, b) => Number(a.xHeightPct) - Number(b.xHeightPct));
      break;
    
    case "Cap Height":
      fonts = fonts.sort((a, b) => Number(b.capHeightPct) - Number(a.capHeightPct));
      break;

    case "Cap Height Reverse":
      fonts = fonts.sort((a, b) => Number(a.capHeightPct) - Number(b.capHeightPct));
      break;

  }

  return fonts;

}

export default sortAndFilterFonts;