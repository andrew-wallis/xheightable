function getFontStylesheet(font) {

  if(font.distribution === "Google") {
    const weightVar = (font["weight"].includes("i") ? "ital,wght" : "wght");
    const weightArray = font["weight"].split(";");
    const processedArray = [];

    weightArray.forEach((val) => {
      if(font.weight.includes("i")) {
        if(!val.includes("i")) {
          processedArray.push(`0,${val}`);
        }
      } else {
        processedArray.push(val);
      }
    });

    weightArray.forEach((val) => {
      if(val.includes("i")) {
        processedArray.push(`1,${val.substring(0, val.length - 1)}`)
      }
    });

    return `https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}:${weightVar}@${processedArray.join(";")}&display=block`;

  } else if (font.distribution === "Adobe" && font.stylesheet) {
     return `https://use.typekit.net/${font.stylesheet}.css`;
  }

}

export default getFontStylesheet;