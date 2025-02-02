import getFontStylesheet from "../../../utils/getFontStylesheet";
import qu from "../../../utils/qu";
import Icons from "../../Elements/Icons";

function ImportGoogle(font) {

  const importGoogle = document.createElement('div');
  importGoogle.className = "stack";

  /* html */
  importGoogle.innerHTML = `
    <div class="with-sidebar">
      <h3 data-element="google-label">
        <!-- Google Label -->
      </h3>
      <a class="button slim-button label" href="#" data-element="copy-stylesheet">
        <div data-element="copy-label">Copy</div>
        <div data-element="copy-icon"></div>
      </a>
    </div>
    <code class="data horizontal-scroll " data-code="stylesheet">${getFontStylesheet(font)}</code>
    <div class="embed-footer">
      <p>
        <a class="caption" href=${font.link} target="_blank">
          Visit Google Fonts for more information.
        </a>
      </p>
    </div>
  `;

  qu(importGoogle, "google-label").innerText = font.label;

  const copyStylesheet = qu(importGoogle, "copy-stylesheet");
  copyStylesheet.addEventListener("click", function(e) {
    e.preventDefault();
    const label = qu(copyStylesheet, "copy-label");
    navigator.clipboard.writeText(getFontStylesheet(font)).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  qu(importGoogle, "copy-icon").appendChild(Icons("Copy"));

  return importGoogle;

}

export default ImportGoogle;