import setFontStyles from "../../../helpers/setFontStyles";
import loadFont from "../../../helpers/loadFont";
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

    if(primaryFont.label !== title.dataset.label || parseInt(primary.dataset.viewport) !== viewport) {
      updateFont(primaryFont, title);
    }

    if(secondaryFont.label !== paragraph.dataset.label || parseInt(secondary.dataset.viewport) !== viewport) {
      updateFont(secondaryFont, paragraph);
    }

    function updateFont(font, example) {
    
      const remBase = isTablet ? example.dataset.size : parseFloat(example.dataset.size) * 0.875;
  
      example.style.fontFamily = 'system-ui';
      example.style.opacity = 0;
      example.style.fontSize = `${remBase}rem`;
      example.style.lineHeight = font[example.dataset.leading];
  
      if(!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported');
      } else {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if(entry.isIntersecting) {
              loadFont(font, font[example.dataset.weight]).then(() => {
  
                setFontStyles({
                  element: example,
                  font: font, 
                  size: remBase, 
                  weight: font[example.dataset.weight],
                  leading: font[example.dataset.leading]
                });
  
                example.style.opacity = 1;
              });
  
              observer.disconnect();
            }
          });
        });
  
        observer.observe(example);
  
        window.addEventListener('beforeunload', () => {
          observer.disconnect();
        });
      }
  
      example.dataset.fontFamily = font.label;
      example.dataset.viewport = viewport;
  
    }
  }

  store.subscribe(updateTest);
  updateTest();


  // Return

  return test;

}

export default Test;