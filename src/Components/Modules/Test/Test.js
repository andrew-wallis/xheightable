import TestTemplate from "./TestTemplate";
import processFont from "../../../helpers/processFont";
import setFontStyling from "../../../helpers/setFontStyling";
import isObj from "../../../utils/isObj";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.className = "stack-l";

  const heading = document.createElement("h2");
  heading.className = "sr-only";
  test.appendChild(heading);

  const title = TestTemplate("title", "primary", "1.5", "lineMin", "bold");
  const paragraph = TestTemplate("paragraph", "secondary", "1", "lineMax", "regular");

  test.appendChild(title.template);
  test.appendChild(paragraph.template);

  title.text.innerText = store.getData().testTitle;
  paragraph.text.innerText = store.getData().testText;


  function updateTest() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const viewport = store.getData().viewport;
    const isTablet = viewport >= 768 ? true : false;

    if(primaryFont.label !== title.template.dataset.label || parseInt(title.template.dataset.viewport) !== viewport) {
      if(isObj(primaryFont)) {
        updateFont(primaryFont, title);
      }
    }

    if(secondaryFont.label !== paragraph.template.dataset.label || parseInt(paragraph.template.dataset.viewport) !== viewport) {
      if(isObj(secondaryFont)) {
        updateFont(secondaryFont, paragraph);
      }
    }

    function updateFont(font, example) {
    
      const remBase = isTablet ? example.template.dataset.size : parseFloat(example.template.dataset.size) * 0.875;

      setFontStyling(example.text, 'system-ui', `${remBase}rem`, font[example.template.dataset.leading], "0");
      processFont(example.text, font, remBase, font[example.template.dataset.weight], font[example.template.dataset.leading]);

      example.template.dataset.label = font.label;
      example.template.dataset.viewport = viewport;

      const adjustedFontSize = (Math.round(remBase * font.capHeightAdj * 16 * 2) / 2).toFixed(1).replace(/\.0$/, '');
      const pxBase = remBase * 16;

      const fontSizeLabel = [];
      fontSizeLabel.push(`${adjustedFontSize}px`);
      if(adjustedFontSize != pxBase) fontSizeLabel.push(`(${pxBase}px × ${font.capHeightAdj})`);
      
      example.fontName.innerText = font.label;
      example.fontSize.innerText = fontSizeLabel.join(" ");
      example.fontLeading.innerText = `${font[example.template.dataset.leading]}`;
  
    }
  }

  store.subscribe(updateTest);
  updateTest();


  // Return

  return test;

}

export default Test;