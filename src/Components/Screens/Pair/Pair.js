import PairLabel from "./PairLabel";
import PairSample from "./PairSample";
import setFontStyles from "../../../utils/setFontStyles";
import Header from "../../Global/Header";
import PairList from "./PairList";
import Button from "../../Elements/Button";
import ImportFonts from "../Test/Test";
import Test from "../ImportFonts/ImportFonts";
import Icons from "../../Elements/Icons";
import { round } from "lodash";
import PairMatch from "./PairMatch";
import loadFont from "../../../utils/loadFont";

function Pair(store) {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.className = "screen";
  pair.style.display = "none";
  pair.dataset.screen = "Pair";
  pair.dataset.element = "screen";
  
  /* html */
  pair.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">
        <!-- Pair Topbar -->
      </div>
      <div class="wrap insulate stack-l">
        <div class="insulate-s stack">
          <div class="grid columns-2">
            <div class="cluster pair-label">
              <div class="" data-element="pair-primary-label">
                <!-- Pair Primary -->
              </div>
              <div data-element="pair-change">
                <!-- Pair Change -->
              </div>
            </div>
            <div class="cluster pair-label">
              <div data-element="pair-secondary-label">
                <!-- Pair Secondary -->
              </div>
              <div class="desktop" data-element="pair-match">
                <!-- Pair Match -->
              </div>
            </div>
          </div>
          <div>
            <div class="samplesOuter">
              <div class="samplesMid">
                <div data-element="pair-samples" data-label="" class="samplesInner">
                  <!-- Pair Samples -->
                </div>
              </div>
            </div>
            <div data-element="pair-labels" class="grid columns-2">
              <div>
                <div data-element="data-primary">
                  <!-- Data Primary  -->
                </div>
              </div>
              <div class="pair-data" >
                <div data-element="data-secondary">
                  <!-- Data Secondary -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div class="navbar" data-element="pair-nav">
            <!-- Pair Nav -->
          </div>
        </nav>
      </div>
    </div>
    <main data-element="pair-main" class="wrap">
      <!-- Pair main" -->
    </main>
  `;
  
  const topBar = pair.querySelector('[data-element="top-bar"]');
  topBar.appendChild(Header());

  const primaryLabel = pair.querySelector('[data-element="pair-primary-label"]');
  const secondaryLabel = pair.querySelector('[data-element="pair-secondary-label"]');

  const primaryData = PairLabel();
  const secondaryData = PairLabel();

  const dataPrimary = pair.querySelector('[data-element="data-primary"]');
  dataPrimary.appendChild(primaryData);

  const dataSecondary = pair.querySelector('[data-element="data-secondary"]');
  dataSecondary.appendChild(secondaryData);

  const primarySample = PairSample();
  const secondarySample = PairSample(true);

  const pairSamples = pair.querySelector('[data-element="pair-samples"]');
  pairSamples.appendChild(primarySample);
  pairSamples.appendChild(secondarySample);

  const navButtons = ["Pair", "Test", "Import"];
  const navBar = pair.querySelector('[data-element="pair-nav"]');
  navButtons.map(button => {
    navBar.appendChild(Button({label: button, icon: button, type: "nav-button", action: changeSection}));
  });


  const pairMain = pair.querySelector('[data-element="pair-main"]');
  pairMain.appendChild(PairList(store));
  pairMain.appendChild(Test(store));
  pairMain.appendChild(ImportFonts(store));


  function updatePairingSample() {

    console.log("Update Pairing Triggered!");

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const capHeight = (isMobile ? 27.8 : 33.5) / 16;
    const labelSize = isMobile ? 1 : 1.25;
    const sampleSize = isMobile ? 2.5 : 3;

    if(primaryFont.label !== primaryLabel.dataset.label) {
      updateFont(primaryFont, primaryLabel, primaryData, primarySample);
    }

    if(secondaryFont.label !== secondaryLabel.dataset.label) {
      updateFont(secondaryFont, secondaryLabel, secondaryData, secondarySample);
    }
    const sampleText = pair.querySelectorAll('[data-element="font-sample"]');
    sampleText.forEach((text) => {
      text.innerText = isMobile ? "ABC abc" : "ABCDEF abcdef 123";
    });


/*     const pairMatches = pair.querySelectorAll('[data-element="pair-match"]');

    pairMatches.forEach((match) => {
      match.innerHTML = "";
      match.appendChild(PairMatch(primaryFont, secondaryFont));
    }); */

    function updateFont(font, label, data, sample) {

      if(Object.keys(font).length > 0) {
    
        label.innerText = font.shortlabel;
        label.style.opacity = 0;
        label.style.fontFamily = 'system-ui';
        label.style.fontSize = `${labelSize}rem`;
        label.style.lineHeight = `${labelSize}rem`;

        sample.style.fontFamily = 'system-ui';
        sample.style.opacity = 0;
        sample.style.fontSize = `${sampleSize}rem`;
        sample.style.lineHeight = `${sampleSize}rem`;
        
        const capHeightLabel = data.querySelector('[data-element="label-capheight"]');
        capHeightLabel.innerHTML = Math.round(font.capHeightPct * 100);
  
        const xHeight = data.querySelector('[data-element="label-xheight"]');
        xHeight.innerHTML = Math.round(font.xHeightPct * 100);
  
        const lineHeight = data.querySelector('[data-element="label-lineheight"]');
        lineHeight.innerHTML = `${font.lineMin}-${font.lineMax}`;

        const capLine = sample.querySelector('[data-element="cap-line"]');
        capLine.style.verticalAlign = `${capHeight}rem`;

        const referenceLine = sample.querySelector('[data-element="reference-line"]');
        referenceLine.style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;

        const xHeightLine = sample.querySelector('[data-element="xHeight-line"]');
        xHeightLine.style.verticalAlign = `${capHeight * font.xHeightPct}rem`;

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
      }
    }
  }

  store.subscribe(updatePairingSample);
  updatePairingSample();

  function updateSection() {

    console.log("Update Section Triggered!");

    const currentSection = pairMain.getAttribute('data-active');
    const activeSection = store.getData().activeSection;

    if(currentSection !== activeSection) {

      const sections = pairMain.querySelectorAll('[data-element="section"');
      sections.forEach(section => {
        section.style.display = section.getAttribute('data-section') === activeSection ? "block" : "none";
      });

      const buttons = pair.querySelectorAll('[data-element="nav-button"]');
      buttons.forEach(button => {
        button.getAttribute('data-target') === activeSection ? button.classList.add("active") : button.classList.remove("active");
      });

      let pos = 0;

      if(activeSection === "Pair") {
        pos = store.getData().pairScroll;
      }

      window.scrollTo(0, pos);
      pairMain.dataset.active = activeSection;
    }
  }

  store.subscribe(updateSection);
  updateSection();

  function changeSection(section) {

    const currentSection = pairMain.getAttribute('data-active');
    const scroll = window.scrollY;

    if(currentSection === "Pair") {
      store.setData({pairScroll: scroll});
    }

    store.setData({activeSection: section});

  }

  return pair;

}

export default Pair;