import getFontFamily from "./getFontFamily";
import getFontSize from "./getFontSize";

function setFontStyles({element, font, size, leading, weight}) {

  if(element && font) {

    element.style.fontFamily = getFontFamily(font);

    if(size) {
      element.style.fontSize = getFontSize(font, size);
    }

    if(leading) {
      element.style.lineHeight = leading;
    }

    if(weight) {
      element.style.fontWeight = font[weight];
    }
    
  }

}


export default setFontStyles;
