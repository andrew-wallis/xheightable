import Sample from "./Sample";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";
import getABC from "./helpers/getABC";
import processFont from "../../../helpers/processFont";

function Samples(store) {

  
  // Initial 

  const samples = document.createElement('div');
  samples.id = "samples";
  samples.className = "grid columns-2";


  // Appends

  const primary = Sample("primary", "Primary");
  const secondary = Sample("secondary", "Secondary");

  samples.appendChild(primary);
  samples.appendChild(secondary);


  // Functions

  function updateSamples() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const viewport = store.getData().viewport;
    const isTablet = viewport >= 768 ? true : false;

    if(primaryFont.label !== primary.dataset.label || parseInt(primary.dataset.viewport) !== viewport) {
      updateFont(primaryFont, primary, "Primary");
    }

    if(secondaryFont.label !== secondary.dataset.label || primaryFont.label !== secondary.dataset.primary || parseInt(secondary.dataset.viewport) !== viewport) {
      updateFont(secondaryFont, secondary, "Secondary");
    }

    function updateFont(font, sample, header) {

      if(isObj(font)) {

        const capHeight = (isTablet ?  33.5 : 27.8) / 16;
        const labelSize = isTablet ? 1.25 : 1;
        const sampleSize = isTablet ? 3 : 2.5;


        // Label

        const sampleHeader = qDom(sample, "sample-header");
        const labelText = qDom(sample, "label-text");
        const labelLeader = qDom(sample, "label-leader");
    
        sampleHeader.innerText = header;
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

        processFont(labelText, font, labelSize, font.bold, `${labelSize * 1.33}rem`);
        processFont(sampleText, font, sampleSize, font.regular, `${sampleSize * 1.33}rem`);

        qDom(sample, "x-height").innerText = `${Math.round(font.xHeightPct * 100)}%`;
        qDom(sample, "cap-height").innerText = `${Math.round(font.capHeightPct * 100)}%`;


        const getLink = qDom(sample, "get-link");
        getLink.href = font.link;

        const getLinkDistribution = qDom(sample, "get-link-distribution");
        getLinkDistribution.innerHTML = `from ${font.distribution}`;

        sample.dataset.label = font.label;
        sample.dataset.primary = primaryFont.label;
        sample.dataset.viewport = viewport;
      }
    }
  }

  store.subscribe(updateSamples);
  updateSamples();


  // Return

  return samples;

}

export default Samples;