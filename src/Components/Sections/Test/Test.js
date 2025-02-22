import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import roundToTwoDecimals from "../../../utils/roundToTwoDecimals";
import setFontStyles from "../../../utils/setFontStyles";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";

  
  /* html */
  test.innerHTML = `
    <hr />
    <h2 class="sr-only">Test Fonts</h2>
    <div class="insulate stack-l">
      <div class="stack-2xs">
        <p data-element="test-title" class="clickable strong test-title" data-font="primary" data-size="1.5" data-leading="lineMin">
          ${store.getData().testTitle}
        </p>
        <ul class="caption cluster moderate" data-element="test-title-data">
          <!-- Test Title Data -->
        </ul>
      </div>
      <div class="stack-2xs">
        <p data-element="test-paragraph" class="clickable test-paragraph" data-font="secondary" data-size="1" data-leading="lineMax">
          ${store.getData().testText}
        </p>
        <ul class="caption cluster moderate" data-element="test-paragraph-data">
          <!-- Test Paragraph Data -->
        </ul>
      </div>
    </div>
  `;


  // Queries
  const title = qDom(test, "test-title");
  const paragraph = qDom(test, "test-paragraph");


  title.addEventListener('click', handleClick);
  title.addEventListener('keydown', handleKeyDown);
  paragraph.addEventListener('click', handleClick);
  paragraph.addEventListener('keydown', handleKeyDown);




  // Functions

  function updateTestScreen() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const isTablet = store.getData().isTablet;
    
/*     if(test.dataset.primary !== primaryFont.label) {
      const title = qDom(test, "test-title");
      const paragraph = qDom(test, "test-paragraph");
      title.dataset.font = title.dataset.default;
      paragraph.dataset.font = paragraph.dataset.default;
      test.dataset.primary = primaryFont.label;
    } */

    processExamples(qaDom(test, "primary", "font"), primaryFont);
    processExamples(qaDom(test, "secondary", "font"), secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {
        if(example.dataset.fontFamily !== font.label || (example.dataset.tablet === "true") !== isTablet) {
          updateFont(example, font);
        }
      });
    }
  }

  store.subscribe(updateTestScreen);
  updateTestScreen();

  function handleClick(e) {
    const element = e.target;
    if(element.dataset.font === "primary") {
      element.dataset.font = "secondary";
      updateFont(element, store.getData().secondaryFont);
    } else {
      element.dataset.font = "primary";
      updateFont(element, store.getData().primaryFont);
    }
  }
  
  function handleKeyDown(e) {
    if(e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  }

  function updateFont(example, font) {
    
    const isTablet = store.getData().isTablet;
    const fontSize = isTablet ? 1 : 0.875;
    const remBase = example.dataset.size * fontSize;
    const pxBase = (example.dataset.size * fontSize) * 16;
    const capAdj = roundToTwoDecimals(0.7 / font.capHeightPct);

    setFontStyles({
      element: example,
      font: font, 
      size: remBase, 
      weight: example.dataset.weight,
      leading: font[example.dataset.leading]
    });
    example.dataset.fontFamily = font.label;
    example.dataset.tablet = isTablet;

    const data = qDom(test, `${example.dataset.element}-data`);

    const pxAdj = Math.round(pxBase * capAdj);

      /* html */
    data.innerHTML = `
      <li>${font.label}</li>
      <li class="tertiary">
        Font Size <span class="data">${pxAdj}px</span> (<span class="data">${pxBase}*${capAdj}</span>)
      </li>
      <li class="tertiary">
        Line Height <span class="data">${font[example.dataset.leading]}</span>
      </li>
    `;
  }


  // Return

  return test;

}

export default Test;