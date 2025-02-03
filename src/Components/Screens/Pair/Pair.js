import PairData from "./PairData";
import PairSample from "./PairSample";
import PairList from "./PairList";
import ImportFonts from "../Test/Test";
import Test from "../ImportFonts/ImportFonts";
import Header from "../../Global/Header";
import Button from "../../Elements/Button";
import loadFont from "../../../utils/loadFont";
import qu from "../../../utils/qu";
import qua from "../../../utils/qua";
import setFontStyles from "../../../utils/setFontStyles";

function Pair(store) {

  // Initial 

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
            <div class="cluster-s-baseline">
              <div class="" data-element="pair-primary-label">
                <!-- Pair Primary Label -->
              </div>
              <div data-element="pair-change">
                <!-- Pair Change -->
              </div>
            </div>
            <div data-element="pair-secondary-label">
              <!-- Pair Secondary Label -->
            </div>
          </div>
          <div>
            <div class="samplesOuter">
              <div class="samplesMid">
                <div data-element="pair-samples" class="samplesInner">
                  <!-- Pair Samples -->
                </div>
              </div>
            </div>
            <div class="grid columns-2">
              <div data-element="data-primary">
                <!-- Data Primary  -->
              </div>
              <div data-element="data-secondary">
                <!-- Data Secondary -->
              </div>
            </div>
          </div>
        </div>
        <nav data-element="nav" class="center">
          <ul>
            <li data-element="nav-item" data-label="Pair">
              <!-- Nav Pair -->
            </li>
            <li data-element="nav-item" data-label="Test">
              <!-- Nav Test -->
            </li>
            <li data-element="nav-item" data-label="Import">
              <!-- Nav Import -->
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <main data-element="pair-main" class="wrap">
      <!-- Pair main" -->
    </main>
  `;

  
  // Queries

  const primaryLabel = qu(pair, "pair-primary-label");
  const secondaryLabel = qu(pair, "pair-secondary-label");
  const pairSamples = qu(pair, "pair-samples");
  const pairMain = qu(pair, "pair-main");


  // Create Page Elements

  const primaryData = PairData();
  const secondaryData = PairData();

  const primarySample = PairSample();
  const secondarySample = PairSample(true);


  // Appends
  
  qu(pair, "top-bar").appendChild(Header());
  qu(pair, "data-primary").appendChild(primaryData);
  qu(pair, "data-secondary").appendChild(secondaryData);
  
  qu(pair, "pair-change").appendChild(Button({
    label: "Change", 
    action: openTable, 
    type: "accent slub slim-button"
  }));

  pairSamples.appendChild(primarySample);
  pairSamples.appendChild(secondarySample);
  pairMain.appendChild(PairList(store));
  pairMain.appendChild(Test(store));
  pairMain.appendChild(ImportFonts(store));

  qua(pair, "nav-item").forEach(item => {
    item.appendChild(Button({label: item.dataset.label, icon: item.dataset.label, type: "nav-button", action: changeSection}));
  });


  // Functions

  function updatePairingSample() {

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
        
        qu(data, "data-capheight").innerHTML = Math.round(font.capHeightPct * 100);
        qu(data, "data-xheight").innerHTML = Math.round(font.xHeightPct * 100);
        qu(data, "data-lineheight").innerHTML = `${font.lineMin}-${font.lineMax}`;

        qu(sample, "cap-line").style.verticalAlign = `${capHeight}rem`;
        qu(sample, "reference-line").style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;
        qu(sample, "xHeight-line").style.verticalAlign = `${capHeight * font.xHeightPct}rem`;

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

    const currentSection = pairMain.getAttribute('data-active');
    const activeSection = store.getData().activeSection;

    if(currentSection !== activeSection) {

      qua(pairMain, "section").forEach(section => {
        section.style.display = section.getAttribute('data-section') === activeSection ? "block" : "none";
      });

      const nav = qu(pair, "nav");
      qua(nav, "button").forEach(button => {
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
      store.setData({
        pairScroll: scroll,
        activeSection: section
      });
    } else {
      store.setData({activeSection: section});
    }
  }


  function openTable() {
    store.setData({
      pairScroll: window.scrollY,
      activeScreen: "Table"
    });
  }


  // Return

  return pair;

}

export default Pair;