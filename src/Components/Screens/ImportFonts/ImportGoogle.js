import getFontStylesheet from "../../../utils/getFontStylesheet";
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";

function ImportGoogle(font) {

  const importGoogle = document.createElement('div');
  importGoogle.className = "stack";

  /* html */
  importGoogle.innerHTML = `
    <div class="with-sidebar">
      <h3>
        <strong data-element="data-label">
          <!-- Data-Label -->
        </strong>
      </h3>
      <a class="button copy-button" href="#" data-element="copy-stylesheet">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code class="embed-code" data-code="stylesheet">${getFontStylesheet(font)}</code>
    <div class="embed-footer">
      <p class="small">
        <a href=${font.link} target="_blank">
          Visit Google Fonts for more information.
        </a>
      </p>
    </div>
  `;

  const label = importGoogle.querySelector('[data-element="data-label"]');
  label.innerText = font.label;

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