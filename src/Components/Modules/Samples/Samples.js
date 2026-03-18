import Sample from "./SampleTemplate";
import Icons from "../../Elements/Icons";
import processFont from "../../../helpers/processFont";
import setFontStyling from "../../../helpers/setFontStyling";
import isObj from "../../../utils/isObj";

function Samples(store) {

  
  // Initial 

  const samples = document.createElement('section');
  samples.id = "samples";
  samples.className = "grid columns-2";


  // Appends

  const primary = Sample("primary");
  const secondary = Sample("secondary");

  samples.appendChild(primary.template);
  samples.appendChild(secondary.template);


  // Functions

  function updateSamples() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const viewport = store.getData().viewport;
    const isTablet = viewport >= 768 ? true : false;

    if(primaryFont.label !== primary.template.dataset.label || parseInt(primary.template.dataset.viewport) !== viewport) {
      updateFont(primaryFont, primary, "Primary", true);
    }

    if(secondaryFont.label !== secondary.template.dataset.label || primaryFont.label !== secondary.template.dataset.primary || parseInt(secondary.template.dataset.viewport) !== viewport) {
      updateFont(secondaryFont, secondary, "Secondary", !store.getData().lock);
    }

    if(store.getData().lock.toString() !== secondary.template.dataset.lock) {
      secondary.lock.innerHTML = '';

      if(store.getData().lock) {
        sampleLock.appendChild(Icons("Lock"))
        secondary.template.dataset.lock = "true";
      } else {
        secondary.template.dataset.lock = "false";
      }
    }

    function updateFont(font, sample, header, updateLabel) {

      if(isObj(font)) {

        const capHeight = (isTablet ?  33.5 : 27.8) / 16;
        const labelSize = isTablet ? 1.25 : 1;
        const sampleSize = isTablet ? 3 : 2.5;

        // Update Lines

        sample.capline.style.verticalAlign = `${capHeight}rem`;
        sample.refline.style.verticalAlign = `${capHeight * font.xHeightPct}rem`;
        sample.xline.style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;
        
        if(header === "Primary") {
          sample.xheightCircle.dataset.step = 0;
        } else if (header === "Secondary") {
          const difference = Math.round(Math.abs(primaryFont.xHeightPct - secondaryFont.xHeightPct) * 100);
          sample.xheightCircle.dataset.step = (difference > 10) ? "10" : difference;
        }

        if(updateLabel) {

          // Label
      
          sample.header.innerText = header;
          sample.label.innerText = font.label;

          setFontStyling(sample.label, "system-ui", labelSize, labelSize * 1.33, "0");
          setFontStyling(sample.labelLeader, "system-ui", labelSize * 1.33, labelSize * 1.33, "0");
          setFontStyling(sample.text, "system-ui", sampleSize, sampleSize * 1.33, "0");
          setFontStyling(sample.textLeader, "system-ui", sampleSize * 1.33, sampleSize * 1.33, "0");

          sample.abcs.forEach((abc) => {
            abc.innerText = getABC(viewport);
          });

          sample.xHeightNumber.innerText = Math.round(font.xHeightPct * 100);

          sample.xHeight.innerText = Math.round(font.xHeightPct * 100);

          sample.capHeight.innerText = Math.round(font.capHeightPct * 100);
          
          sample.getLink.href = font.link;
          sample.getLink.dataset.umamiEvent = "Get Font";
          sample.getLink.dataset.umamiEventDistribution = font.distribution;
          sample.getLink.dataset.umamiEventFont = font.label;
          sample.getLinkDistribution.innerHTML = `from ${font.distribution}`;

          sample.template.dataset.label = font.label;
          sample.template.dataset.primary = primaryFont.label;
          sample.template.dataset.viewport = viewport;

          processFont(sample.label, font, labelSize, font.bold, `${labelSize * 1.33}rem`);
          processFont(sample.text, font, sampleSize, font.regular, `${sampleSize * 1.33}rem`);

          
        }
      }
    }
  }
  store.subscribe(updateSamples);
  updateSamples();


  // Helper functions

  function getABC(viewport) {
    if (viewport >= 0 && viewport < 512) {
      return "ABC abc"
    } else if (viewport >= 512 && viewport < 840) {
      return "ABCDE abcde";
    } else if (viewport >= 840 && viewport <= 1024) {
      return "ABCDEFG abcdefg";
    } else {
      return "ABCDE abcde";
    }
  }

  // Return

  return samples;

}

export default Samples;