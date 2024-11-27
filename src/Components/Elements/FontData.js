import getFontFamily from "../../utils/getFontFamily";
import getFontSize from "../../utils/getFontSize";
import getFontStylesheet from "../../utils/getFontStylesheet";
import Icons from "./Icons";

function FontData(font) {

  const fontData = document.createElement('div');
  fontData.className = "md:w-1/2 shrink-0";

  /* html */
  fontData.innerHTML = `
    <h2 data-field="label" class="font-semibold whitespace-nowrap flex items-center mb-6"></h2>
    <div class="mb-4 flex gap-4 items-center text-sm leading-6 font-semibold">
      <div data-field="distribution" class="icon h-9 w-9 flex items-center justify-center rounded-full border shrink-0"></div>
      <div class="">
        <span data-field="designers" ></span>
        <span data-field="year" class="inline-block ml-4"></span>
      </div>
    </div>
  `;

  const label = fontData.querySelector('[data-field="label"]');
  label.innerText = font.label;
  label.style.fontFamily = getFontFamily(font);
  label.style.fontSize = getFontSize(font, 1.5);
  label.style.lineHeight = "1.5rem";

  const distribution = fontData.querySelector('[data-field="distribution"]');
  distribution.appendChild(Icons(font.distribution));

  const designers = fontData.querySelector('[data-field="designers"]');
  designers.innerText = font.designer;

  const year = fontData.querySelector('[data-field="year"]');
  year.innerText = font.Year;

  if(font.distribution === "Google") {

    const google = document.createElement('div');

    /* html */
    google.innerHTML = `
      <div class="flex justify-between mb-2">
        <h3 class="font-semibold text-xs uppercase tracking-wider">Stylesheet</h3>
        <a href="#" data-link="copy-stylesheet" class="font-medium text-xs uppercase tracking-wider flex gap-2 opacity-60">
          <div data-element="copy-label">Copy</div>
          <div data-element="copy-icon"></div>
        </a>
      </div>
      <code data-code="stylesheet" class="text-sm block rounded p-2 mb-4 overflow-x-auto">${getFontStylesheet(font)}</code>
      <div class="flex justify-between mb-2">
        <h3 class="font-semibold text-xs uppercase tracking-wider">CSS</h3>
        <a href="#" data-link="copy-css" class="font-medium text-xs uppercase tracking-wider flex gap-2 opacity-60">
          <div data-element="copy-label">Copy</div>
          <div data-element="copy-icon"></div>
        </a>
      </div>
      <code data-code="css" class="text-sm block rounded p-2 mb-4 overflow-x-auto">font-family: ${getFontFamily(font)}</code>
      <a class="block rounded py-3 px-4 border text-sm leading-4 uppercase tracking-wider text-center font-semibold mt-6" href=${font.link} target="_blank">More at Google Fonts</a>
    `;

    const copyStylesheet = google.querySelector('[data-link="copy-stylesheet"]');

    copyStylesheet.addEventListener("click", function(e) {
      e.preventDefault();
      const label = copyStylesheet.querySelector('[data-element="copy-label"]')
      navigator.clipboard.writeText(getFontStylesheet(font)).then(() => {
        label.innerText = "Copied";
        setTimeout(() => {
          label.innerText = "Copy";
        }, 1000);
      });
    });

    const copyCSS = google.querySelector('[data-link="copy-css"]');

    copyCSS.addEventListener("click", function(e) {
      e.preventDefault();
      const label = copyCSS.querySelector('[data-element="copy-label"]')
      navigator.clipboard.writeText(`font-family: ${getFontFamily(font)}`).then(() => {
        label.innerText = "Copied";
        setTimeout(() => {
          label.innerText = "Copy";
        }, 1000);
      });
    });

    const copyIcons = google.querySelectorAll('[data-element="copy-icon"]');
    copyIcons.forEach((icon) => {
      icon.appendChild(Icons("Copy"));
    })

    fontData.appendChild(google);

  } else {

    const adobe = document.createElement('div');
    adobe.className = "mt-6";

    /* html */
    adobe.innerHTML = `
      <a class="block rounded py-3 px-4 text-sm leading-4 uppercase tracking-wider text-center mt-6 font-semibold mb-4" href="${font.link}" target="_blank">Get This Font From Adobe</a>
      <p class="text-xs leading-4">We have partnered with Adobe and get a percentage from each licence sold through xHeightable.</p>
    `

    fontData.appendChild(adobe);

  }

  return fontData;

}

export default FontData;