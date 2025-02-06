import Icons from "../../Elements/Icons";
import qDom from "../../../utils/qDom";

function EmbedCTA(font, affiliate) {

  const embedCTA = document.createElement('div');
  embedCTA.className = "stack";

  /* html */
  embedCTA.innerHTML = `
    <div>
      <h3>
        ${font.label}
      </h3>
    </div>
    <a data-element="cta" href="${font.link}" target="_blank" class="button cta-button accent slub">
      <span data-element="cta-text">Get This Font From ${font.distribution}</span>
    </a>
    <div class="embed-footer">
      <p class="caption">
        ${affiliate ? "We have partnered with Adobe and get a percentage from each licence sold through x-heightable." : ""}
      </p>
    </div>
  `;

  qDom(embedCTA, "cta").insertBefore(Icons("Adobe"), qDom(embedCTA, "cta-text"));

  return embedCTA;

}

export default EmbedCTA;