import Detail from "./Detail";
import Icons from "../../Elements/Icons";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";

function Details(store) {

  const details = document.createElement('div');
  details.id = "details";
  details.className = "grid-xl";
  

  // Queries / Appends

  const primary = Detail();
  const secondary = Detail();

  details.appendChild(primary);
  details.appendChild(secondary);


  // Functions
  
  function updateDetails() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    if(primaryFont.label !== primary.dataset.label) {
      updateEmbed(primaryFont, primary);
    }

    if(secondaryFont.label !== secondary.dataset.label) {
      updateEmbed(secondaryFont, secondary);
    }

    function updateEmbed(font, element) {
      if(isObj(font)) {

        qDom(element, "detail-label").innerText = font.label;

        const cta = qDom(element, "detail-cta");

        cta.innerHTML = "";
        cta.href = font.link;
        cta.appendChild(Icons(font.distribution));

        const ctaLabel = document.createElement('div');
        ctaLabel.innerText = `Get This Font From ${font.distribution}`;
        ctaLabel.className = "button-label";
        cta.appendChild(ctaLabel);
        
        qDom(element, "x-height").innerText = `${Math.round(font.xHeightPct * 100)}%`;
        qDom(element, "cap-height").innerText = `${Math.round(font.capHeightPct * 100)}%`;
        qDom(element, "line-height").innerText = `${font.lineMax}`;

        element.dataset.label = font.label;

      }
    }
  
  }

  store.subscribe(updateDetails);


  // Return

  return details;

}

export default Details;