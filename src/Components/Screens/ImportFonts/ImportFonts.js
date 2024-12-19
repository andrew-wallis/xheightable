
import setFontStyles from "../../../utils/setFontStyles";
import Branding from "../../Elements/Branding";
import Navigation from "../../Global/Navigation";
import ImportEmbed from "./ImportEmbed";
import ImportGoogle from "./ImportGoogle";
import ImportAdobe from "./ImportAdobe";
import ImportCode from "./ImportCode";
import getFontFamily from "../../../utils/getFontFamily";
import Button from "../../Elements/Button";
import Checkbox from "../../Elements/Checkbox";
import NumberField from "../../Elements/NumberField";
import Select from "../../Elements/Select";
import ButtonGroup from "../../Elements/ButtonGroup";
import generateFontSizes from "./helpers/generateFontSizes";
import generateFontFamilies from "./helpers/generateFontFamilies";

function ImportFonts(store) {

  const importFonts = document.createElement('div');
  importFonts.id = "import";
  importFonts.className = "screen";
  importFonts.style.display = "none";
  importFonts.dataset.screen = "Import";
  importFonts.dataset.element = "screen";
  
  /* html */
  importFonts.innerHTML = `
    <header data-element="import-header">
      <div data-element="top-bar">
        <!-- ImportFonts Topbar -->
      </div>
    </header>
    <main>
      <div class="wrap insulate stack embed-wrapper" data-element="import-embed">
        <!-- Import Embed -->
      </div>
      <div class="wrap insulate stack" data-element="import-code">
        <!-- Import Code -->
      </div>
    </main>
  `;

  // Page Layout

  const topBar = importFonts.querySelector('[data-element="top-bar"]');
  topBar.appendChild(Branding());
  topBar.appendChild(Navigation());

  const primaryEmbed = ImportEmbed();
  const secondaryEmbed = ImportEmbed();
  const code = ImportCode();

  const divider = document.createElement('hr');

  const embedContainer = importFonts.querySelector('[data-element="import-embed"]');
  embedContainer.appendChild(primaryEmbed);
  embedContainer.appendChild(divider);
  embedContainer.appendChild(secondaryEmbed);

  const codeContainer = importFonts.querySelector('[data-element="import-code"]');
  codeContainer.appendChild(code);


  // Tabs

  const tabs = importFonts.querySelector('[data-element="import-tabs"]');
  const variables = document.createElement('li');
  variables.appendChild(Button({label: "Variables", type: "tab", action: changeTab}));
  tabs.appendChild(variables);
  const classes = document.createElement('li');
  classes.appendChild(Button({label: "Classes", type: "tab", action: changeTab}));
  tabs.appendChild(classes);


  // Controls

  const controlContainer = importFonts.querySelector('[data-element="import-controls"]');
  controlContainer.appendChild(Checkbox({label: "Include font sizes", action: toggleSizes, value: store.getData().fontSizes}));
  controlContainer.appendChild(divider);

  const sizeControlContainer = document.createElement('div');
  sizeControlContainer.className = "control-size";
  sizeControlContainer.appendChild(Checkbox({label: "Adjust cap heights", action: toggleCapAdjust, value: store.getData().adjustCap}));
  sizeControlContainer.appendChild(NumberField({label: "Base", suffix: "px", action: changeBaseSize, value: store.getData().base}));
  sizeControlContainer.appendChild(Select({label: "Scale", options: [1.067, 1.125, 1.2, 1.25, 1.333, 1.414, 1.5, 1.618, 1.667, 1.778, 1.875, 2], action: changeScale, value: store.getData().scale}));
  sizeControlContainer.appendChild(ButtonGroup({label: "Unit", options: ["rem", "px"]}));
  controlContainer.appendChild(sizeControlContainer);


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

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        const label = element.querySelector('[data-element="data-label"]');
        label.innerText = font.label;
        setFontStyles({element: label, font: font, size: isMobile ? 1.3 : 1.5, leading: 1.5});

        const details = element.querySelector('[data-element="data-details"]');
        details.innerHTML = '';

        if(font.distribution === "Google") {
          details.appendChild(ImportGoogle(font));
        } else {
          details.appendChild(ImportAdobe(font));
        }

        element.dataset.label = font.label;
      }
    }

    function updateCode(primaryFont, secondaryFont) {

      const code = codeContainer.querySelector('code');

      const format = store.getData().codeTab;

      let codeArray = [];
      codeArray = [...codeArray, ...generateFontFamilies(primaryFont, secondaryFont, format)];

      if(store.getData().fontSizes) {
        codeArray.push("");

        const base = store.getData().base;
        const scale = store.getData().scale;
        const adjust = store.getData().adjustCap ? [primaryFont, secondaryFont] : false;
        codeArray = [...codeArray, ...generateFontSizes(base, scale, format, adjust)];
      }

      if(format === "Variables") {
        codeArray.unshift(":root{");
        codeArray.push("}");
      }

      code.textContent = codeArray.join('\n');

/* 
      if(store.getData().codeTab === "Variables") {
        
        code.textContent = `:root {
  --primary-font: ${getFontFamily(primaryFont)};
  --secondary-font: ${getFontFamily(secondaryFont)};

${store.getData().fontSizes ? generateFontSizes(store.getData().base, store.getData().scale).join('\n') : ""}
}`;
      } else {
        code.textContent = `.primary-font {
  font-family: ${getFontFamily(primaryFont)};
}

.secondary-font {
  font-family: ${getFontFamily(secondaryFont)}.
}`; 
      } */

    }
  
  }

  store.subscribe(updateImport);


  function changeTab(tab) {
    store.setData({codeTab: tab})

    const getTabs = tabs.querySelectorAll('[data-element="tab"]');

    getTabs.forEach((thisTab) => {
      thisTab.classList.remove("active");
      if(thisTab.dataset.target === tab) {
        thisTab.classList.add("active");
      }
    });
  }

  changeTab("Variables");


  function toggleSizes(bool) {

    const elements = sizeControlContainer.querySelectorAll('input, select');

    if(bool) {
      store.setData({fontSizes: true});
      sizeControlContainer.classList.remove("disabled");

      elements.forEach((element) => {
        element.disabled = false;
      });
    } else {
      store.setData({fontSizes: false});
      sizeControlContainer.classList.add("disabled");

      elements.forEach((element) => {
        element.disabled = true;
      });
    }
  }

  toggleSizes(false);

  function toggleCapAdjust(value) {
    store.setData({adjustCap: value});
  }

  function changeBaseSize(value) {
    store.setData({base: value});
  }
 
  function changeScale(value) {
    store.setData({scale: value});
  }

  return importFonts;

}

export default ImportFonts;