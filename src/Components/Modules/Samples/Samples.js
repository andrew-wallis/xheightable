import Sample from "./Sample";
import Button from "../../Elements/Button";
import loadFont from "../../../helpers/loadFont";
import setFontStyles from "../../../helpers/setFontStyles";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";

function Samples(store) {

  // Initial 

  const samples = document.createElement('div');
  samples.id = "samples";
  samples.className = "grid columns-2";


  // Appends

  const primary = Sample();
  const secondary = Sample();

  samples.appendChild(primary);
  samples.appendChild(secondary);

  const primaryAction = qDom(primary, "sample-action");
  const secondaryAction = qDom(secondary, "sample-action");

  secondaryAction.classList.add("cluster-right");

  primaryAction.appendChild(Button({
    label: "Change",
    classes: "primary-action slub action-button",
    action: activatePrimary
  }));

  secondaryAction.appendChild(Button({
    label: "Change",
    classes: "secondary-action slub action-button",
    action: activateSecondary
  }));


  // Functions

  function activatePrimary() {
    store.setData({sidebar: "primary"});
  }

  function activateSecondary() {
    store.setData({sidebar: "secondary"});
  }

  function updateSample() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const isTablet = store.getData().isTablet;

    if(primaryFont.label !== primary.dataset.label || (primary.dataset.tablet === "true") !== isTablet) {
      updateFont(primaryFont, primary);
    }

    if(secondaryFont.label !== secondary.dataset.label || (secondary.dataset.tablet === "true") !== isTablet) {
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

        qaDom(sample, "sample-text-abc").forEach((abc) => {
          abc.innerText = isTablet ? "ABCDEF abcdef" : "ABC abc";
        });

        sampleText.style.fontFamily = 'system-ui';
        sampleText.style.opacity = 0;
        sampleText.style.fontSize = `${sampleSize}rem`;
        sampleText.style.lineHeight = `${sampleSize * 1.33}rem`;

        sampleLeader.style.fontFamily = 'system-ui';
        sampleLeader.style.opacity = 0;
        sampleLeader.style.fontSize = `${sampleSize * 1.33}rem`;
        sampleLeader.style.lineHeight = `${sampleSize * 1.33}rem`;

        qDom(sample, "sample-text-capline").style.verticalAlign = `${capHeight}rem`;
        qDom(sample, "sample-text-refline").style.verticalAlign = `${capHeight * font.xHeightPct}rem`;
        qDom(sample, "sample-text-xline").style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;


        // Data

        qDom(sample, "x-height").innerText = `${Math.round(font.xHeightPct * 100)}%`;
        qDom(sample, "cap-height").innerText = `${Math.round(font.capHeightPct * 100)}%`
        qDom(sample, "line-height").innerText = `${font.lineMin}-${font.lineMax}`

        if(!('IntersectionObserver' in window)) {
          console.log('IntersectionObserver not supported');
        } else {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if(entry.isIntersecting) {
                loadFont(font).then(() => {

                  setFontStyles({
                    element: labelText, 
                    font: font, 
                    size: labelSize, 
                    leading: `${labelSize * 1.33}rem`, 
                    weight: 600
                  });

                  setFontStyles({
                    element: sampleText, 
                    font: font, 
                    size: sampleSize, 
                    leading: `${sampleSize * 1.33}rem`, 
                    weight: 400
                  });

                  labelText.style.opacity = 1;
                  sampleText.style.opacity = 1;
                });
                observer.disconnect();
              }
            });
          });

          observer.observe(sample);

          window.addEventListener('beforeunload', () => {
            observer.disconnect();
          });
        }

        sample.dataset.label = font.label;
        sample.dataset.tablet = isTablet;
      }
    }
  }

  store.subscribe(updateSample);
  updateSample();


  // Return

  return samples;

}

export default Samples;