import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";

function ImportAdobe(font) {

  const importAdobe = document.createElement('div');
  importAdobe.className = "embed-details";

  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const label = document.createElement('h2');
  label.innerText = font.label;
  setFontStyles({element: label, font: font, size: isMobile ? 1.3 : 1.5, leading: "2.25rem", weight: "bold"});
  importAdobe.appendChild(label);

  const designers = document.createElement('div');
  designers.innerText = font.designer.split(";").join(", ");
  designers.className = "embed-designers"
  importAdobe.appendChild(designers);

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