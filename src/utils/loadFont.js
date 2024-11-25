import getFontStylesheet from "./getFontStylesheet";

function loadFont(font) {

  const href = getFontStylesheet(font);

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