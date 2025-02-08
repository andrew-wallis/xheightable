import Data from "./Data";
import Sample from "./Sample";
import Pair from "../../Sections/Pair/Pair";
import ImportFonts from "../../Sections/Test/Test";
import Test from "../../Sections/ImportFonts/ImportFonts";
import Header from "../../Global/Header";
import Button from "../../Elements/Button";
import loadFont from "../../../utils/loadFont";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";
import setFontStyles from "../../../utils/setFontStyles";

function Secondary(store) {

  // Initial 

  const secondary = document.createElement('div');
  secondary.id = "secondary";
  secondary.className = "screen";
  secondary.style.display = "none";
  secondary.dataset.screen = "Secondary";
  secondary.dataset.element = "screen";
  
  /* html */
  secondary.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">
        <!-- Top Bar -->
      </div>
      <h1 data-element="screen-title" class="sr-only" tabindex="-1">x-Heightable</h1>
      <div class="wrap insulate stack-l">
        <div class="insulate-s stack unselectable">
          <div class="grid columns-2">
            <div class="cluster-s-baseline">
              <div class="" data-element="primary-label">
                <!-- Primary Label -->
              </div>
              <div data-element="primary-change">
                <!-- Primary Change -->
              </div>
            </div>
            <div class="cluster-s-baseline">
            <div data-element="secondary-label">
              <!-- Secondary Label -->
            </div>
              <div data-element="secondary-swap">
                <!-- Primary Change -->
              </div>
            </div>
          </div>
          <div>
            <div class="samplesOuter">
              <div class="samplesMid">
                <div data-element="samples" class="samplesInner">
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
        <div class="center">
          <nav role="tablist" data-element="nav">
            <!-- Nav -->
          </nav>
        </div>
      </div>
    </div>
    <main data-element="secondary-main" class="wrap">
      <!-- Secondary main" -->
    </main>
  `;

  
  // Queries

  const primaryLabel = qDom(secondary, "primary-label");
  const secondaryLabel = qDom(secondary, "secondary-label");
  const samples = qDom(secondary, "samples");
  const main = qDom(secondary, "secondary-main");


  // Create Page Elements

  const primaryData = Data();
  const secondaryData = Data();

  const primarySample = Sample();
  const secondarySample = Sample(true);


  // Appends
  
  qDom(secondary, "top-bar").appendChild(Header(true));
  qDom(secondary, "primary-data").appendChild(primaryData);
  qDom(secondary, "secondary-data").appendChild(secondaryData);
  
  qDom(secondary, "primary-change").appendChild(Button({
    label: "Change", 
    action: openPrimary, 
    classes: "accent slub slim-button"
  }));
  
/*   qDom(secondary, "secondary-swap").appendChild(Button({
    label: "Swap", 
    action: swapSecondary, 
    type: "accent slub slim-button"
  })); */

  samples.appendChild(primarySample);
  samples.appendChild(secondarySample);
  main.appendChild(Pair(store));
  main.appendChild(Test(store));
  main.appendChild(ImportFonts(store));

  const nav = qDom(secondary, "nav");
  ["Pair", "Test", "Import"].forEach(item => {
    nav.appendChild(Button({label: item, icon: item, classes: "nav-button", action: changeSection, type: "tab"}));
  });


  // Functions

  function updateSample() {

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

    qaDom(secondary, "sample-text").forEach((text) => {
      /* html */
      text.innerHTML = `
        ABC<span class="desktop">DEF</span> abc<span class="desktop">def 123</span>
      `;
    });

    function updateFont(font, label, data, sample) {

      if(Object.keys(font).length > 0) {
    
        /* html */
        label.innerHTML = `
          <span class="desktop">${font.labelprefix}</span>
          ${font.shortlabel}
          <span class="desktop">${font.labelsuffix}</span>
        `
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

  store.subscribe(updateSample);
  updateSample();


  function updateSection() {

    const currentSection = main.getAttribute('data-active');
    const activeSection = store.getData().activeSection;

    if(activeSection && currentSection !== activeSection) {

      qaDom(main, "section").forEach(section => {
        section.style.display = "none";
      });

      const newSection = qDom(main, activeSection, "Section");
      newSection.style.display = "block";
      qDom(newSection, "section-title").focus();

      const nav = qDom(secondary, "nav");
      qaDom(nav, "button").forEach(button => {
        button.classList.remove("active");
        button.ariaSelected = "false";
      });

      const newTab = qDom(nav, activeSection, "target");
      newTab.classList.add("active");
      newTab.ariaSelected = "true";

      let pos = 0;

      if(activeSection === "Pair") {
        pos = store.getData().pairScroll;
      }

      window.scrollTo(0, pos);
      main.dataset.active = activeSection;
    }
  }

  store.subscribe(updateSection);
  updateSection();
  store.setData({activeSection: "Pair"});


  function changeSection(section) {

    const currentSection = main.getAttribute('data-active');
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

  function openPrimary() {
    store.setData({
      pairScroll: window.scrollY,
      activeScreen: "Primary"
    });
  }

  function swapSecondary() {
    store.setData({
      primaryFont: store.getData().secondaryFont
      // Retain original secondary
    })
  }


  // Return

  return secondary;

}

export default Secondary;