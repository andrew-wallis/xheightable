import getFontStylesheet from "../../../utils/getFontStylesheet";
import Icons from "../../Elements/Icons";

function ImportGoogle(font) {

  const importGoogle = document.createElement('div');
  importGoogle.className = "embed-details";

  /* html */
  importGoogle.innerHTML = `
    <code data-code="stylesheet">${getFontStylesheet(font)}</code>
    <div class="embed-footer">
      <a class="tertiary-text" href=${font.link} target="_blank">
        Visit Google Fonts for more information.
      </a>
      <a class="button copy-button secondary-text" href="#" data-element="copy-stylesheet">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
  `;

  const copyStylesheet = importGoogle.querySelector('[data-element="copy-stylesheet"]');
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

  const copyIcon = importGoogle.querySelector('[data-element="copy-icon"]');
  copyIcon.appendChild(Icons("Copy"));

  return importGoogle;

}

export default ImportGoogle;