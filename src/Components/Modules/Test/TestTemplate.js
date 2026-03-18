import queryByData from "../../../utils/queryByData";

function TestTemplate(element, font, size, leading, weight) {

  const template = document.createElement('section');
  template.classList = `stack-2xs unselectable test-${element}`;
  template.dataset.element = `test-${element}`;
  template.dataset.font = font;
  template.dataset.size = size;
  template.dataset.leading = leading;
  template.dataset.weight = weight;

  /* html */
  template.innerHTML = `
    <p data-element="test-text"></p>
    <ul class="cluster">
      <li class="desktop-only">
        <span class="slub tertiary-text secondary" data-element="font-name"></span>
      </li>
      <li class="">
        <span class="slub tertiary-text tertiary">Font Size</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-size"></span>
      </li>
      <li class="">
        <span class="slub tertiary-text tertiary">Line Height</span> <span class="accent-text accent-tertiary-text tertiary" data-element="font-leading"></span>
      </li>
    </ul>
  `

  const text = queryByData(template, "test-text");
  const fontName = queryByData(template, "font-name");
  const fontSize = queryByData(template, "font-size")
  const fontLeading = queryByData(template, "font-leading");


  return {
    template,
    text,
    fontName,
    fontSize,
    fontLeading
  };
}

export default TestTemplate;