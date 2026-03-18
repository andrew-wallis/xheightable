function setFontStyling(element, fontFamily, size, leading, opacity) {

  element.style.opacity = opacity;
  element.style.fontFamily = fontFamily;
  element.style.fontSize = `${size}rem`;
  element.style.lineHeight = `${leading}rem`;

}

export default setFontStyling;