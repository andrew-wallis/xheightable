import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";

function ImportAdobe(font) {

  const importAdobe = document.createElement('div');
  importAdobe.className = "stack";

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const labelWrapper = document.createElement('h3');
  const label = document.createElement('strong');
  label.innerText = font.label;
  labelWrapper.appendChild(label);
  importAdobe.appendChild(labelWrapper);

  const cta = document.createElement('a');
  cta.href = font.link;
  cta.target = "_blank";
  cta.className = "button cta-button slub";

  cta.appendChild(Icons("Adobe"));

  const ctaLabel = document.createElement('div');
  ctaLabel.innerHTML = "Get This Font From Adobe";
  cta.appendChild(ctaLabel);

  importAdobe.appendChild(cta);

  const disclaimer = document.createElement('p');
  disclaimer.className = "small";
  disclaimer.innerHTML = "We have partnered with Adobe and get a percentage from each licence sold through x-heightable."
  importAdobe.appendChild(disclaimer);

  return importAdobe;

}

export default ImportAdobe;