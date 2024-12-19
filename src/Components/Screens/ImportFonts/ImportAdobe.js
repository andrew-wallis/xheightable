import Icons from "../../Elements/Icons";

function ImportAdobe(font) {

  const importAdobe = document.createElement('div');
  importAdobe.className = "embed-details";

  const cta = document.createElement('a');
  cta.href = font.link;
  cta.target = "_blank";
  cta.className = "button cta-button";

  cta.appendChild(Icons("Adobe"));

  const ctaLabel = document.createElement('div');
  ctaLabel.innerHTML = "Get This Font From Adobe";
  cta.appendChild(ctaLabel);

  importAdobe.appendChild(cta);

  const disclaimer = document.createElement('p');
  disclaimer.className = "tertiary-text";
  disclaimer.innerHTML = "We have partnered with Adobe and get a percentage from each licence sold through x-heightable."
  importAdobe.appendChild(disclaimer);

  return importAdobe;

}

export default ImportAdobe;