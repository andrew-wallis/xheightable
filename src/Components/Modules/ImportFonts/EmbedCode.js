import Icons from "../../Elements/Icons";
import qDom from "../../../utils/qDom";
import getGoogleEmbed from "./helpers/getGoogleEmbed";

function EmbedCode(font) {

  const embed = document.createElement('div');
  embed.className = "stack";

  /* html */
  embed.innerHTML = `
    <div class="with-sidebar">
      <h3 class="heading not-sidebar">${font.label}</h3>
      <div>
        <a class="copy-button label-medium" href="#" data-element="copy-stylesheet">
          <div data-element="copy-label">Copy</div>
          <div data-element="copy-icon"></div>
        </a>
      </div>
    </div>
    <code class="horizontal-scroll " data-code="stylesheet">${getGoogleEmbed(font)}</code>
    <div>
      <p class="caption">
        <a href=${font.link} target="_blank">
          Visit ${font.distribution} for more information.
        </a>
      </p>
    </div>
  `;

  const copyStylesheet = qDom(embed, "copy-stylesheet");

  copyStylesheet.addEventListener("click", function(e) {
    handleClick(e);
  });
  
  copyStylesheet.removeEventListener("click", function(e) {
    handleClick(e);
  });

  function handleClick(e) {
    e.preventDefault();
    const label = qDom(copyStylesheet, "copy-label");
    navigator.clipboard.writeText(getGoogleEmbed(font)).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  }

  qDom(embed, "copy-icon").appendChild(Icons("Copy"));

  return embed;

}

export default EmbedCode;