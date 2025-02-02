import qu from "../../../utils/qu";
import Icons from "../../Elements/Icons";

function ImportAdobe(font) {

  const importAdobe = document.createElement('div');
  importAdobe.className = "stack";

  /* html */
  importAdobe.innerHTML = `
    <div>
      <h3 data-element="adobe-label">
        <!-- Adobe Label -->
      </h3>
    </div>
    <a data-element="adobe-cta" href="${font.link}" target="_blank" class="button cta-button accent slub">
      <span data-element="adobe-cta-text">Get This Font From Adobe</span>
    </a>
    <div class="embed-footer">
      <p class="caption">
        We have partnered with Adobe and get a percentage from each licence sold through x-heightable.
      </p>
    </div>
  `;

  qu(importAdobe, "adobe-label").innerText = font.label;
  qu(importAdobe, "adobe-cta").insertBefore(Icons("Adobe"), qu(importAdobe, "adobe-cta-text"));

  return importAdobe;

}

export default ImportAdobe;