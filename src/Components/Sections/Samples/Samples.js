import PairData from "./PairData";
import Sample from "./Sample";
import Button from "../../Elements/Button";
import loadFont from "../../../utils/loadFont";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";
import setFontStyles from "../../../utils/setFontStyles";

function Samples(store) {

  // Initial 

  const samples = document.createElement('div');
  samples.id = "samples";
  
  /* html */
  samples.innerHTML = `
      <div class="insulate stack unselectable">
        <div class="grid columns-2">
          <div data-element="primary-header" class="sample-header">
            <div data-element="primary-label">
              <!-- Primary Label -->
            </div>
            <div class="primary-action" data-element="primary-action">
              <!-- Secondary Action -->
            </div>
          </div>
          <div data-element="secondary-header" class="sample-header">
            <div data-element="secondary-label">
              <!-- Secondary Label -->
            </div>
            <div class="secondary-action" data-element="secondary-action">
              <!-- Secondary Action -->
            </div>
          </div>
        </div>
        <div>
          <div class="samplesOuter">
            <div class="samplesMid">
              <div data-element="samples-container" class="samplesInner">
                <!-- Samples -->
              </div>
            </div>
          </div>
          <div class="grid columns-2">
            <div data-element="primary-data">
              <!-- Primary Data -->
            </div>
            <div data-element="secondary-data">
              <!-- Secondary Data -->
            </div>
          </div>
        </div>
      </div>
  `;

  
  // Queries

  const primaryLabel = qDom(samples, "primary-label");
  const secondaryLabel = qDom(samples, "secondary-label");
  const samplesContainer = qDom(samples, "samples-container");


  // Create Page Elements

  const primaryData = PairData();
  const secondaryData = PairData();

  const primarySample = Sample();
  const secondarySample = Sample(true);


  // Appends

  qDom(samples, "primary-action").appendChild(Button({
    label: "Change",
    classes: "slub accent",
    action: activatePrimary
  }));

  qDom(samples, "secondary-action").appendChild(Button({
    label: "Change",
    classes: "slub accent",
    action: activateSecondary
  }));
  
  qDom(samples, "primary-data").appendChild(primaryData);
  qDom(samples, "secondary-data").appendChild(secondaryData);
  samplesContainer.appendChild(primarySample);
  samplesContainer.appendChild(secondarySample);


  // Event Listeners

  primaryLabel.addEventListener("click", activatePrimary);
  primaryData.addEventListener("click", activatePrimary);
  primarySample.addEventListener("click", activatePrimary);

  secondaryLabel.addEventListener("click", activateSecondary);
  secondaryData.addEventListener("click", activateSecondary);
  secondarySample.addEventListener("click", activateSecondary);


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

    if(primaryFont.label !== primaryLabel.dataset.label || (primarySample.dataset.tablet === "true") !== isTablet) {
      updateFont(primaryFont, primaryLabel, primaryData, primarySample);
    }

    if(secondaryFont.label !== secondaryLabel.dataset.label || (secondarySample.dataset.tablet === "true") !== isTablet) {
      updateFont(secondaryFont, secondaryLabel, secondaryData, secondarySample);
    }

    function updateFont(font, label, data, sample) {

      if(Object.keys(font).length > 0) {

        const capHeight = (isTablet ?  33.5 : 27.8) / 16;
        const labelSize = isTablet ? 1.25 : 1;
        const sampleSize = isTablet ? 3 : 2.5;
    
        label.innerText = isTablet ? font.label : font.shortlabel;

        label.style.opacity = 0;
        label.style.fontFamily = 'system-ui';
        label.style.fontSize = `${labelSize}rem`;
        label.style.lineHeight = `${labelSize}rem`;

        sample.style.fontFamily = 'system-ui';
        sample.style.opacity = 0;
        sample.style.fontSize = `${sampleSize}rem`;
        sample.style.lineHeight = `${sampleSize}rem`;
        
        qDom(data, "data-capheight").innerText = Math.round(font.capHeightPct * 100);
        qDom(data, "data-xheight").innerText = Math.round(font.xHeightPct * 100);
        qDom(data, "data-lineheight").innerText = `${font.lineMin}-${font.lineMax}`;

        qDom(sample, "cap-line").style.verticalAlign = `${capHeight}rem`;
        qDom(sample, "reference-line").style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;
        qDom(sample, "xHeight-line").style.verticalAlign = `${capHeight * font.xHeightPct}rem`;

        qaDom(sample, "sample-text").forEach((text) => {
          text.innerText = isTablet ? "ABCDEF abcdef" : "ABC abc";
        });

        if(!('IntersectionObserver' in window)) {
          console.log('IntersectionObserver not supported');
        } else {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if(entry.isIntersecting) {
                loadFont(font).then(() => {
                  setFontStyles({element: label, font: font, size: labelSize, leading: `${labelSize}rem`, weight: "bold"});
                  setFontStyles({element: sample, font: font, size: sampleSize, leading: `${sampleSize}rem`, weight: "normal"});
                  label.style.opacity = 1;
                  sample.style.opacity = 1;
                });
                observer.disconnect();
              }
            });
          });

          observer.observe(label);

          window.addEventListener('beforeunload', () => {
            observer.disconnect();
          });
        }

        label.dataset.label = font.label;
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