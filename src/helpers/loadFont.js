import getFontStylesheet from "./getFontStylesheet";

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

export default loadFont;