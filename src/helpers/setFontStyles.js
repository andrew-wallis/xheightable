import getFontFamily from "./getFontFamily";

function setFontStyles({element, font, size, leading, weight}) {

  if(element && font) {

    element.style.fontFamily = getFontFamily(font);

    if(size) {
      element.style.fontSize = `${size * font.capHeightAdj}rem`;
    }

    if(leading) {
      element.style.lineHeight = leading;
    }

    if(weight) {
      element.style.fontWeight = weight;
    }
    
  }

}


export default setFontStyles;
