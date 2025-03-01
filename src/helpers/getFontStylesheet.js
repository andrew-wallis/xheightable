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

/*     if(weightArray[0].includes("..")) {
      processedArray.push(weightArray[0]);
    } else {
      if(!weightArray.includes("400") && weightArray.includes("300")) {
        processedArray.push("0,300");
      } else {
        processedArray.push("0,400");
      }

      if(!weightArray.includes("600") && weightArray.includes("700")) {
        processedArray.push("0,700");
      } else {
        processedArray.push("0,600");
      }

    } */

    return `https://fonts.googleapis.com/css2?family=${font.name.replace(/\s+/g, '+')}:${weightVar}@${processedArray.join(";")}&display=block`;

  } else if (font.distribution === "Adobe" && font.stylesheet) {
     return `https://use.typekit.net/${font.stylesheet}.css`;
  }

}

export default getFontStylesheet;