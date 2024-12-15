
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../../Elements/Icons";
import AppHeader from "../../Global/AppHeader/AppHeader";
import NavBar from "../../Global/NavBar/NavBar";
import GetFont from "./GetFont";
import GetFontAdobe from "./GetFontAdobe";
import GetFontGoogle from "./GetFontGoogle";
import styles from "./GetFonts.module.css";

function GetFonts(store) {

  const getFonts = document.createElement('div');
  getFonts.id = "getfonts";
  getFonts.className = "screen";
  getFonts.style.display = "none";
  getFonts.dataset.screen = "Import";
  getFonts.dataset.element = "screen";
  
  /* html */
  getFonts.innerHTML = `
    <header data-element="import-header">
      <div data-element="top-bar">
        <!-- Import Topbar -->
      </div>
    </header>
    <main class="wrap insulate stack" data-element="get-fonts">
      <!-- Get Fonts -->
    </main>
  `;

  const topBar = getFonts.querySelector('[data-element="top-bar"]');
  topBar.appendChild(AppHeader());
  topBar.appendChild(NavBar());

  const primaryFontData = GetFont();
  const secondaryFontData = GetFont();

  const divider = document.createElement('hr');
  divider.className = styles.divider;

  const fontDataContainer = getFonts.querySelector('[data-element="get-fonts"]');

  fontDataContainer.appendChild(primaryFontData);
  fontDataContainer.appendChild(divider);
  fontDataContainer.appendChild(secondaryFontData);
  
  function updateGetFontsScreen() {

    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    if(primaryFont.label !== primaryFontData.dataset.label) {
      updateFont(primaryFont, primaryFontData);
    }

    if(secondaryFont.label !== secondaryFontData.dataset.label) {
      updateFont(secondaryFont, secondaryFontData);
    }

    function updateFont(font, element) {

      if(Object.keys(font).length > 0) {

        const label = element.querySelector('[data-element="data-label"]');
        label.innerText = font.label;
        setFontStyles({element: label, font: font, size: 1.5, leading: 1.5});

        const distribution = element.querySelector('[data-element="data-distribution"]');
        distribution.innerHTML = '';
        distribution.appendChild(Icons(font.distribution));

        const designers = element.querySelector('[data-element="data-designers"]');
        const getDesigners = font.designer.split(";");
        designers.innerText = getDesigners.join(", ");

        const year = element.querySelector('[data-element="data-year"]');
        year.innerText = font.Year;

        const details = element.querySelector('[data-element="data-details"]');
        details.innerHTML = '';

        if(font.distribution === "Google") {
          details.appendChild(GetFontGoogle(font));
        } else {
          details.appendChild(GetFontAdobe(font));
        }

        element.dataset.label = font.label;
      }
    }
  
  }

  store.subscribe(updateGetFontsScreen);

  return getFonts;

}

export default GetFonts;