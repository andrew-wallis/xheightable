import Icons from "../../Elements/Icons";
import qDom from "../../../utils/qDom";

function EmbedCTA(font, affiliate) {

  const embedCTA = document.createElement('div');
  embedCTA.className = "stack";

  /* html */
  embedCTA.innerHTML = `
    <div>
      <h3 class="heading">${font.label}</h3>
    </div>
    <a data-element="cta" href="${font.link}" target="_blank" class="button slub cta-button">
      <span data-element="cta-text">Get This Font From ${font.distribution}</span>
    </a>
    <div>
      <p class="caption">
        ${affiliate ? "We have partnered with Adobe and get a percentage from each licence sold through x-heightable." : ""}
      </p>
    </div>
  `;

  qDom(embedCTA, "cta").insertBefore(Icons("Adobe"), qDom(embedCTA, "cta-text"));

  return embedCTA;

}

export default EmbedCTA;