import EmbedCode from "./EmbedCode";
import EmbedCTA from "./EmbedCTA";
import StyleCalculator from "./StyleCalculator";
import Button from "../../Elements/Button";
import Checkbox from "../../Elements/Checkbox";
import generateFontFamilies from "./helpers/generateFontFamilies";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";

function ImportFonts(store) {

  const importFonts = document.createElement('div');
  importFonts.id = "import";
  
  /* html */
  importFonts.innerHTML = `
    <div class="stack grid-l columns-1-2">
      <div class="stack-l">
        <div class="stack-l">
          <div data-element="primary-embed">
            <!-- Primary Embed -->
          </div>
          <div data-element="secondary-embed">
            <!-- Secondary Embed -->
          </div>
        </div>
      </div>
      <div class="insulate stack" data-element="import-code">
        <!-- Import Code -->
      </div>
    </div>
  `;


  // Appends


  const codeContainer = qDom(importFonts, "import-code");
  codeContainer.appendChild(StyleCalculator());

  const controlContainer = qDom(importFonts, "import-controls");

  controlContainer.appendChild(Checkbox({label: "Include cap height adjusts", action: toggleCapAdjusts, value: store.getData().capAdjusts}));
  controlContainer.appendChild(Checkbox({label: "Include line heights", action: toggleLineHeights, value: store.getData().lineHeights}));

  qDom(importFonts, "Variables", "tab").appendChild(Button({label: "Variables", classes: "slub", action: changeTab}));
  qDom(importFonts, "Classes", "tab").appendChild(Button({label: "Classes", classes: "slub", action: changeTab}));


  // Queries

  const primaryEmbed = qDom(importFonts, "primary-embed");
  const secondaryEmbed = qDom(importFonts, "secondary-embed");
  const tabs = qDom(importFonts, "tabs");


  // Functions
  
  function updateImport() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    if(primaryFont.label !== primaryEmbed.dataset.label) {
      updateEmbed(primaryFont, primaryEmbed);
    }

    if(secondaryFont.label !== secondaryEmbed.dataset.label) {
      updateEmbed(secondaryFont, secondaryEmbed);
    }

    updateCode(primaryFont, secondaryFont);


    function updateEmbed(font, element) {
      if(Object.keys(font).length > 0) {
        element.innerHTML = '';

        if(store.getData().embedLicence.includes(font.distribution)) {
          element.appendChild(EmbedCode(font));
        } else {
          const affiliate = store.getData().affiliateLicence.includes(font.distribution);
          element.appendChild(EmbedCTA(font, affiliate));
        }

        element.dataset.label = font.label;
      }
    }

    function updateCode(primaryFont, secondaryFont) {
      
      const format = store.getData().codeTab;

      let codeArray = [];

      codeArray = [...codeArray, ...generateFontFamilies(primaryFont, secondaryFont, format, store.getData().capAdjusts, store.getData().lineHeights)];
      codeArray.push("");

      if(format === "Variables") {
        codeArray.unshift("");
        codeArray.unshift(":root {");
        codeArray.push("}");
      }

      codeArray.unshift("");
      codeArray.unshift("/* CSS Generated by x-heightable */");

      codeContainer.querySelector('code').textContent = codeArray.join('\n');

    }
  
  }

  store.subscribe(updateImport);


  function changeTab(tab) {
    store.setData({codeTab: tab});

    qaDom(tabs, "tab").forEach((thisTab) => {
      thisTab.classList.remove("active");
      if(thisTab.dataset.tab === tab) {
        thisTab.classList.add("active");
      }
    });

    qaDom(tabs, "slub").forEach((thisButton) => {
      thisButton.classList.remove("active");
      if(thisButton.dataset.target === tab) {
        thisButton.classList.add("active");
      }
    });
  }

  changeTab("Variables");


  function toggleCapAdjusts(bool) {
    store.setData({capAdjusts: bool});
  }

  toggleCapAdjusts(store.getData().capAdjusts);


  function toggleLineHeights(bool) {
    store.setData({lineHeights: bool});
  }

  toggleLineHeights(store.getData().lineHeights);


  // Return

  return importFonts;

}

export default ImportFonts;