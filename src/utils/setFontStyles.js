import getFontFamily from "./getFontFamily";
import getFontSize from "./getFontSize";

function setFontStyles({element, font, size, leading}) {

  if(element && font) {

    element.style.fontFamily = getFontFamily(font);

    if(size) {
      element.style.fontSize = getFontSize(font, size);
    }

    if(leading) {
      element.style.lineHeight = `${leading}rem`;
    }
    
  }

}


export default setFontStyles;
