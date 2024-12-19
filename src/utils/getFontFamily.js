function getFontFamily(font) {

  let idName = font.name;
  let fallback = "";

  switch (font.superclass) {
    case "Sans":
      fallback = "sans-serif";
      break;
    
    case "Serif":
      fallback = "serif";
      break;

    case "Mono":
      fallback = "monospace";
      break; 
  }

  if(font.distribution === "Google") {
    return `"${idName}", ${fallback}`;
  } else if (font.distribution === "Adobe") {
    const dataName = idName.toLowerCase().replace(/\s+/g, '-');
    return `"${dataName}", ${fallback}`;
  } else {
    return false;
  }
}

export default getFontFamily;