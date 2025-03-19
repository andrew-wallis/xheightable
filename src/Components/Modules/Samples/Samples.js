import Sample from "./Sample";
import Button from "../../Elements/Button";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";
import getABC from "./helpers/getABC";
import updateElement from "../../../helpers/updateElement";

function Samples(store) {

  // Initial 

  const samples = document.createElement('div');
  samples.id = "samples";
  samples.className = "grid columns-2";


  // Appends

  const primary = Sample("primary");
  const secondary = Sample("secondary");

  samples.appendChild(primary);
  samples.appendChild(secondary);

  qDom(primary, "sample-action-left").appendChild(Button({
    label: "Change",
    classes: "primary-action",
    action: activatePrimary,
    icon: "Arrow Left",
    id: "primary"
  }));

  qDom(secondary, "sample-action-left").appendChild(Button({
    label: "Swap",
    action: swap,
    icon: "Swap",
    id: "swap"
  }));

  qDom(secondary, "sample-action-right").appendChild(Button({
    label: "Change",
    classes: "secondary-action button-icon-reverse",
    action: activateSecondary,
    icon: "Arrow Right",
    id: "secondary"
  }));


  // Functions

  function activatePrimary() {
    store.setData({sidebar: "primary"});
  }

  function activateSecondary() {
    store.setData({sidebar: "secondary"});
  }

  function updateSamples() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const viewport = store.getData().viewport;
    const isTablet = viewport >= 768 ? true : false;

    if(primaryFont.label !== primary.dataset.label || parseInt(primary.dataset.viewport) !== viewport) {
      updateFont(primaryFont, primary);
    }

    if(secondaryFont.label !== secondary.dataset.label || parseInt(secondary.dataset.viewport) !== viewport) {
      updateFont(secondaryFont, secondary);
    }

    function updateFont(font, sample) {

      if(isObj(font)) {

        const capHeight = (isTablet ?  33.5 : 27.8) / 16;
        const labelSize = isTablet ? 1.25 : 1;
        const sampleSize = isTablet ? 3 : 2.5;


        // Label

        const labelText = qDom(sample, "label-text");
        const labelLeader = qDom(sample, "label-leader");
    
        labelText.innerText = font.label;

        labelText.style.opacity = 0;
        labelText.style.fontFamily = 'system-ui';
        labelText.style.fontSize = `${labelSize}rem`;
        labelText.style.lineHeight = `${labelSize * 1.33}rem`;

        labelLeader.style.fontFamily = 'system-ui';
        labelLeader.style.opacity = 0;
        labelLeader.style.fontSize = `${labelSize * 1.33}rem`;
        labelLeader.style.lineHeight = `${labelSize * 1.33}rem`;


        // Sample

        const sampleText = qDom(sample, "sample-text");
        const sampleLeader = qDom(sample, "sample-leader");

        sampleText.style.fontFamily = 'system-ui';
        sampleText.style.opacity = 0;
        sampleText.style.fontSize = `${sampleSize}rem`;
        sampleText.style.lineHeight = `${sampleSize * 1.33}rem`;

        sampleLeader.style.fontFamily = 'system-ui';
        sampleLeader.style.opacity = 0;
        sampleLeader.style.fontSize = `${sampleSize * 1.33}rem`;
        sampleLeader.style.lineHeight = `${sampleSize * 1.33}rem`;

        qaDom(sample, "sample-text-abc").forEach((abc) => {
          abc.innerText = getABC(viewport);
        });

        qDom(sample, "sample-text-capline").style.verticalAlign = `${capHeight}rem`;
        qDom(sample, "sample-text-refline").style.verticalAlign = `${capHeight * font.xHeightPct}rem`;
        qDom(sample, "sample-text-xline").style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;


        // Data

        qDom(sample, "sample-xheight-number").innerText = `${Math.round(font.xHeightPct * 100)}`;

        if(sample.dataset.font === "primary") {
          qDom(sample, "sample-xheight").dataset.step = "0";
        } else {
          const difference = Math.round(Math.abs(secondaryFont.xHeightPct - primaryFont.xHeightPct) * 100);
          qDom(sample, "sample-xheight").dataset.step = difference > 10 ? "10" : `${difference}`;
        }

        updateElement(labelText, font, labelSize, font.bold, `${labelSize * 1.33}rem`);
        updateElement(sampleText, font, sampleSize, font.regular, `${sampleSize * 1.33}rem`);

        sample.dataset.label = font.label;
        sample.dataset.viewport = viewport;
      }
    }
  }

  store.subscribe(updateSamples);
  updateSamples();


  function swap() {
    const currentPrimary = store.getData().primaryFont;
    const currentSecondary = store.getData().secondaryFont;

    store.setData({
      primaryFont: currentSecondary,
      secondaryFont: currentPrimary
    })
  }


  // Return

  return samples;

}

export default Samples;