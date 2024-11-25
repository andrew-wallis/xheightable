function getFontFamily(font) {

  let idName = font.name;

  if(font.distribution === "Google") {
    return `"${idName}", system-ui`;
  } else if (font.distribution === "Adobe") {
    const dataName = idName.toLowerCase().replace(/\s+/g, '-');
    return `"${dataName}", system-ui`;
  } else {
    return false;
  }
}

export default getFontFamily;