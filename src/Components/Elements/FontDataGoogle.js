import getFontFamily from "../../utils/getFontFamily";
import getFontStylesheet from "../../utils/getFontStylesheet";
import Icons from "./Icons";

function FontDataGoogle(font) {

  const fontDataGoogle = document.createElement('div');

  /* html */
  fontDataGoogle.innerHTML = `
    <div class="flex justify-between mb-2">
      <h3 class="font-semibold text-xs uppercase tracking-wider">Stylesheet</h3>
      <a href="#" data-element="copy-stylesheet" class="font-medium text-xs uppercase tracking-wider flex gap-2 opacity-60">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code data-code="stylesheet" class="text-sm block rounded p-2 mb-4 overflow-x-auto">
      ${getFontStylesheet(font)}
    </code>
    <div class="flex justify-between mb-2">
      <h3 class="font-semibold text-xs uppercase tracking-wider">CSS</h3>
      <a href="#" data-element="copy-css" class="font-medium text-xs uppercase tracking-wider flex gap-2 opacity-60">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code data-code="css" class="text-sm block rounded p-2 mb-4 overflow-x-auto">
      font-family: ${getFontFamily(font)}
    </code>
    <a class="block rounded py-3 px-4 border text-sm leading-4 uppercase tracking-wider text-center font-semibold mt-6" href=${font.link} target="_blank">
      More at Google Fonts
    </a>
  `;

  const copyStylesheet = fontDataGoogle.querySelector('[data-element="copy-stylesheet"]');
  copyStylesheet.addEventListener("click", function(e) {
    e.preventDefault();
    const label = copyStylesheet.querySelector('[data-element="copy-label"]')
    navigator.clipboard.writeText(getFontStylesheet(font)).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  const copyCSS = fontDataGoogle.querySelector('[data-element="copy-css"]');
  copyCSS.addEventListener("click", function(e) {
    e.preventDefault();
    const label = copyCSS.querySelector('[data-element="copy-label"]')
    navigator.clipboard.writeText(`font-family: ${getFontFamily(font)}`).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  const copyIcons = fontDataGoogle.querySelectorAll('[data-element="copy-icon"]');
  copyIcons.forEach((icon) => {
    icon.appendChild(Icons("Copy"));
  });

  return fontDataGoogle;

}

export default FontDataGoogle;