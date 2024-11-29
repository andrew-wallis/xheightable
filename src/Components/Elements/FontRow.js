import loadFont from "../../utils/loadFont";
import setFontStyles from "../../utils/setFontStyles";
import Icons from "./Icons";

function FontRow({font, action}) {
  

  const fontRow = document.createElement('a');
  fontRow.className = `fontrow block px-4 py-3 flex items-baseline gap-4 border-b border-b-black/10 active:bg-black/5 hover:bg-black/5 `;
  fontRow.href = '#';
  fontRow.dataset.name = font.name;
  fontRow.dataset.element = "fontrow";

  fontRow.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  /* html */
  fontRow.innerHTML = `
    <div data-element="font-icon" class="shrink-0 icon w-6 h-6 flex items-center justify-center">
      <!-- Font Icon -->
    </div>
    <div data-element="font-label" class="grow">
      ${font.label}
    </div>
    <div data-element="font-xHeight" class="shrink-0 w-8">
      ${font.xHeightPct}
    </div>
  `;

  const icon = fontRow.querySelector('[data-element="font-icon"]');
  icon.appendChild(Icons(font.distribution));

  const label = fontRow.querySelector('[data-element="font-label"]');
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = "1.125rem";
  label.style.leading = "1.125rem";

  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font).then(() => {
            setFontStyles({element: label, font: font, size: 1.125});
          });
          observer.disconnect();
        }
      });
    });

    observer.observe(label);

    window.addEventListener('beforeunload', () => {
      observer.disconnect();
    })
  }

  return fontRow;

}

export default FontRow;