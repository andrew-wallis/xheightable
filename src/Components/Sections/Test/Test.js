import getFontSize from "../../../utils/getFontSize";
import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import roundToTwoDecimals from "../../../utils/roundToTwoDecimals";
import setFontStyles from "../../../utils/setFontStyles";

function Test(store) {


  // Initial

  const test = document.createElement('div');
  test.id = "test";
  test.classList = "insulate stack-l";

  
  /* html */
  test.innerHTML = `
    <div class="stack-2xs">
      <p data-element="test-title" class="clickable strong" data-font="primary" data-size="1.5" data-leading="lineMin">
        ${store.getData().testTitle}
      </p>
      <ul class="caption cluster-s tertiary moderate" data-element="test-title-data">
        <!-- Test Title Data -->
      </ul>
    </div>
    <div class="stack-2xs">
      <p data-element="test-paragraph" class="clickable" data-font="secondary" data-size="1.125" data-leading="lineMax">
        ${store.getData().testText}
      </p>
      <ul class="caption cluster-s tertiary moderate" data-element="test-paragraph-data">
        <!-- Test Paragraph Data -->
      </ul>
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

    processExamples(qaDom(test, "primary", "font"), primaryFont);
    processExamples(qaDom(test, "secondary", "font"), secondaryFont);

    function processExamples(examples, font) {
      examples.forEach((example) => {
        if(example.dataset.fontFamily !== font.label) {
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
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const fontSize = isMobile ? 0.875 : 1;

    setFontStyles({
      element: example,
      font: font, 
      size: example.dataset.size * fontSize, 
      weight: example.dataset.weight,
      leading: font[example.dataset.leading]
    });
    example.dataset.fontFamily = font.label;

    const data = qDom(test, `${example.dataset.element}-data`);

    const pxSide = Math.round((example.dataset.size * fontSize * (0.7 / font.capHeightPct)) * 16)

      /* html */
    data.innerHTML = `
      <li class="secondary-text">${font.label}</li>
      <li>
        Font Size <span class="data" data-element="data-capheight">${pxSide}px</span>
      </li>
      <li>
        Line Height <span class="data" data-element="data-capheight">${font[example.dataset.leading]}</span>
      </li>
    `;
  }


  // Return

  return test;

}

export default Test;