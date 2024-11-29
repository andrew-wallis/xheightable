import FontData from "../Elements/FontData";
import FontDataAdobe from "../Elements/FontDataAdobe";
import FontDataGoogle from "../Elements/FontDataGoogle";
import Icons from "../Elements/Icons";
import setFontStyles from "../../utils/setFontStyles";

function GetFonts(store) {

  const getFonts = document.createElement('div');
  getFonts.id = "getfonts";
  getFonts.style.display = "none";
  getFonts.dataset.screen = "Get Fonts";
  getFonts.dataset.element = "screen";
  
  /* html */
  getFonts.innerHTML = `
    <div class="relative" >
      <div data-element="back-link" class="pb-8 sticky top-12 left-0 z-10 h-6 bg-white">
        <!-- Back Link -->
      </div>
      <div data-element="font-data" class="mt-8">
        <!-- Get Fonts -->
      </div>
    </div>
  `;

  const primaryFontData = FontData();
  const secondaryFontData = FontData();

  const divider = document.createElement('hr');
  divider.className = "hr my-8 border-t-gray-100";

  const fontDataContainer = getFonts.querySelector('[data-element="font-data"]');

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
          details.appendChild(FontDataGoogle(font));
        } else {
          details.appendChild(FontDataAdobe(font));
        }

        element.dataset.label = font.label;
      }
    }
  
  }

  store.subscribe(updateGetFontsScreen);

  return getFonts;

}

export default GetFonts;