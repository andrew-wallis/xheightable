import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import setFontStyles from "../../../helpers/setFontStyles";
import Select from "../../Elements/Select";
import Button from "../../Elements/Button";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.className = "stack-xl";

  
  /* html */
  test.innerHTML = `
    <h2 class="sr-only">Test Fonts</h2>
    <div class="cluster" data-element="test-controls">
      <!-- Test Controls -->
    </div>
    <div class="stack-l">
      <div class="stack-2xs">
        <p data-element="test-title" class="unselectable test-title" data-font="primary" data-size="1.5" data-leading="lineMin" data-weight="600">
          ${store.getData().testTitle}
        </p>
        <ul class="cluster-s label" data-element="test-title-data">
          <!-- Test Title Data -->
        </ul>
      </div>
      <div class="stack-2xs">
        <p data-element="test-paragraph" class="unselectable test-paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="400">
          ${store.getData().testText}
        </p>
        <ul class="cluster-s label" data-element="test-paragraph-data">
          <!-- Test Paragraph Data -->
        </ul>
      </div>
    </div>
  `;


  // Queries

  const controls = qDom(test, "test-controls");


  // Appends

  controls.appendChild(Button({
    action: swap,
    classes: "button slub",
    label: "Swap"
  }))

  controls.appendChild(Select({
    action: changeTitleSize,
    label: "Heading",
    options: store.getData().sizeOptions,
    value: store.getData().testTitleSize
  }));

  controls.appendChild(Select({
    action: changeTextSize,
    label: "Paragraph",
    options: store.getData().sizeOptions,
    value: store.getData().testTextSize
  }));


  // Functions

  function changeTitleSize(value) {
    store.setData({testTitleSize: value});
  }

  function changeTextSize(value) {
    store.setData({testTextSize: value});
  }

  function swap() {
    const currentPrimary = store.getData().primaryFont;
    const currentSecondary = store.getData().secondaryFont;

    store.setData({
      primaryFont: currentSecondary,
      secondaryFont: currentPrimary
    })
  }

  function updateTestScreen() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    processExamples(qaDom(test, "primary", "font"), primaryFont);
    processExamples(qaDom(test, "secondary", "font"), secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {

        const size = example.dataset.element === "test-title" ? store.getData().testTitleSize : store.getData().testTextSize;

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
      weight: example.dataset.weight,
      leading: font[example.dataset.leading]
    });

    example.dataset.fontFamily = font.label;
    example.dataset.size = pxBase;

    const data = qDom(test, `${example.dataset.element}-data`);

    const pxAdj = Math.round(pxBase * font.capHeightAdj);

    data.innerHTML = '';

    Object.entries({
      "Font": font.label,
      "Font Size": `${pxAdj}px ${pxAdj !== pxBase ? `(${pxBase} × ${font.capHeightAdj})` : ""}`,
      "Line Height": font[example.dataset.leading]
    }).map(([key, val]) => {

      const dataItem = document.createElement('li');
  
      if(key === "Font") {
        dataItem.innerHTML = val;
        dataItem.classList = "label-bold"
      } else {
        dataItem.innerHTML = `<span class="label-medium">${key}</span> ${val}`;
        dataItem.className = "";
      }
  
      data.appendChild(dataItem);
    });
  

  }


  // Return

  return test;

}

export default Test;