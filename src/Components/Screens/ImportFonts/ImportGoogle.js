import getFontStylesheet from "../../../utils/getFontStylesheet";
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";

function ImportGoogle(font) {

  const importGoogle = document.createElement('div');
  importGoogle.className = "stack";

  /* html */
  importGoogle.innerHTML = `
    <h2 data-element="data-label">
      <!-- Data-Label -->
    </h2>
    <div class="with-sidebar">
      <div class="small strong">${(font.designer.split(";").join(", "))}</div>
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

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const label = importGoogle.querySelector('[data-element="data-label"]');
  label.innerText = font.label;
  setFontStyles({element: label, font: font, size: isMobile ? 1.3 : 1.5, leading: "2.25rem", weight: "bold"});

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