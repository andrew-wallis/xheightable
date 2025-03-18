function getFontStylesheet(font, weight) {

  if(font.distribution === "Google") {

    if(weight === "400") {
      return `https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}&display=block`;
    } else {
      return `https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}:wght@${weight}&display=block`;
    }

  } else if (font.distribution === "Adobe" && font.stylesheet) {
     return `https://use.typekit.net/${font.stylesheet}.css`;
  }

}

export default getFontStylesheet;