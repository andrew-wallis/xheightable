import processFont from "../../../helpers/processFont";
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
      <div class="stack-2xs" data-element="test-title" class="unselectable test-title" data-font="primary" data-size="1.5" data-leading="lineMin" data-weight="bold">
        <p>
          ${store.getData().testTitle}
        </p>
        <ul class="cluster">
          <li class="">
            <span class="slub tertiary-text secondary" data-element="font-name"></span>
          </li>
          <li class="">
            <span class="slub tertiary-text tertiary">Font Size</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-size"></span>
          </li>
          <li class="">
            <span class="slub tertiary-text tertiary">Line Height</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-leading"></span>
          </li>
        </ul>
      </div>
      <div class="stack-2xs" data-element="test-paragraph" class="unselectable test-paragraph" data-font="secondary" data-size="1" data-leading="lineMax" data-weight="regular">
        <p>
          ${store.getData().testText}
        </p>
        <ul class="cluster">
          <li class="">
            <span class="slub tertiary-text secondary" data-element="font-name"></span>
          </li>
          <li class="">
            <span class="slub tertiary-text tertiary">Font Size</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-size"></span>
          </li>
          <li class="">
            <span class="slub tertiary-text tertiary">Line Height</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-leading"></span>
          </li>
        </ul>
      </div>
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
    
      const remBase = isTablet ? example.dataset.size : parseFloat(example.dataset.size) * 0.875;
      const paragraph = example.querySelector("p");
  
      paragraph.style.fontFamily = 'system-ui';
      paragraph.style.opacity = 0;
      paragraph.style.fontSize = `${remBase}rem`;
      paragraph.style.lineHeight = font[example.dataset.leading];

      processFont(paragraph, font, remBase, font[example.dataset.weight], font[example.dataset.leading]);

      example.dataset.label = font.label;
      example.dataset.viewport = viewport;

      qDom(example, "font-name").innerText = font.label;
      qDom(example, "font-size").innerText = `${(Math.round(remBase * font.capHeightAdj * 16 * 2) / 2).toFixed(1).replace(/\.0$/, '')}px`;
      qDom(example, "font-leading").innerText = `${font[example.dataset.leading]}`;
  
    }
  }

  store.subscribe(updateTest);
  updateTest();


  // Return

  return test;

}

export default Test;