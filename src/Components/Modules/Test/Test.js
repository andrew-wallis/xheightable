import updateElement from "../../../helpers/updateElement";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.className = "stack-xl";

  
  /* html */
  test.innerHTML = `
    <h2 class="sr-only">Test Fonts</h2>
    <div class="stack-l">
      <p data-element="test-title" class="unselectable test-title" data-font="primary" data-size="1.5" data-leading="lineMin" data-weight="bold">
        ${store.getData().testTitle}
      </p>
      <p data-element="test-paragraph" class="unselectable test-paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="regular">
        ${store.getData().testText}
      </p>
    </div>
  `;

  // Queries

  const title = qDom(test, "test-title");
  const paragraph = qDom(test, "test-paragraph");



  function updateTest() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const viewport = store.getData().viewport;
    const isTablet = viewport >= 768 ? true : false;

    if(primaryFont.label !== title.dataset.label || parseInt(title.dataset.viewport) !== viewport) {
      if(isObj(primaryFont)) {
        updateFont(primaryFont, title);
      }
    }

    if(secondaryFont.label !== paragraph.dataset.label || parseInt(paragraph.dataset.viewport) !== viewport) {
      if(isObj(secondaryFont)) {
        updateFont(secondaryFont, paragraph);
      }
    }

    function updateFont(font, example) {

      console.log("Update");
    
      const remBase = isTablet ? example.dataset.size : parseFloat(example.dataset.size) * 0.875;
  
      example.style.fontFamily = 'system-ui';
      example.style.opacity = 0;
      example.style.fontSize = `${remBase}rem`;
      example.style.lineHeight = font[example.dataset.leading];

      updateElement(example, font, remBase, font[example.dataset.weight], font[example.dataset.leading]);
  
      example.dataset.label = font.label;
      example.dataset.viewport = viewport;
  
    }
  }

  store.subscribe(updateTest);
  updateTest();


  // Return

  return test;

}

export default Test;