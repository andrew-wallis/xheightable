import getFontStylesheet from "../../../utils/getFontStylesheet";
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";

function ImportGoogle(font) {

  const importGoogle = document.createElement('div');
  importGoogle.className = "embed";

  /* html */
  importGoogle.innerHTML = `
    <div class="embed-header">
      <h2 data-element="data-label">
        <!-- Data-Label -->
      </h2>
      <a class="button copy-button secondary-text" href="#" data-element="copy-stylesheet">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <div class="embed-details">
      <div class="embed-designers">${(font.designer.split(";").join(", "))}</div>
      <code data-code="stylesheet">${getFontStylesheet(font)}</code>
      <div class="embed-footer">
        <p class="tertiary-text">
          <a href=${font.link} target="_blank">
            Visit Google Fonts for more information.
          </a>
        </p>
      </div>
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