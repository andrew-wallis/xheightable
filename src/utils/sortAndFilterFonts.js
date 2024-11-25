function sortAndFilterFonts(fonts, search) {

  delete fonts.columns;

  if(search) {
    fonts = fonts.filter(font => font.name.toLowerCase().includes(search.toLowerCase()));
  }
  
  return fonts.sort((a, b) => a.label.localeCompare(b.label));

}

export default sortAndFilterFonts;