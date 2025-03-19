function updateElement(element, font, size, weight, leading) {

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

  function loadFont(font, weight) {

    const href = getFontStylesheet(font, weight);
  
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }
      
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      
      link.onload = () => resolve();
      
      link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
      
      document.head.appendChild(link);
    });
  
  }

  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font, weight).then(() => {

            if(element && font) {
              if(size) element.style.fontSize = `${size * font.capHeightAdj}rem`;
              if(leading) element.style.lineHeight = leading;
              if(weight) element.style.fontWeight = weight;
              element.style.fontFamily = getFontFamily(font);
              element.style.opacity = 1;
            }
          });

          observer.disconnect();
        }
      });
    });

    observer.observe(element);

    window.addEventListener('beforeunload', () => {
      observer.disconnect();
    });
  }

}

export default updateElement;