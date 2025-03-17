import qaDom from "../../../utils/qaDom";
import setFontStyles from "../../../helpers/setFontStyles";

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


  function updateTestScreen() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    processExamples(qaDom(test, "primary", "font"), primaryFont);
    processExamples(qaDom(test, "secondary", "font"), secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {

        const size = example.dataset.element === "test-title" ? "24" : "16";

        if(example.dataset.fontFamily !== font.label || example.dataset.size !== size) {
          updateFont(example, font, size);
        }
      });
    }
  }

  store.subscribe(updateTestScreen);
  updateTestScreen();


  function updateFont(example, font, pxBase) {
    
    const remBase = pxBase / 16;

    setFontStyles({
      element: example,
      font: font, 
      size: remBase, 
      weight: font[example.dataset.weight],
      leading: font[example.dataset.leading]
    });

    example.dataset.fontFamily = font.label;
    example.dataset.size = pxBase;
  

  }


  // Return

  return test;

}

export default Test;