
import loadFont from "../../utils/loadFont";
import setFontStyles from "../../utils/setFontStyles";
import Icons from "./Icons";

function TableRow({font, action}) {
  
  const tableRow = document.createElement('tr');

  tableRow.className = "clickable";
  tableRow.dataset.name = font.name;
  tableRow.dataset.label = font.label;
  tableRow.dataset.element = "font-link";

  tableRow.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  /* html */
  tableRow.innerHTML = `
    <td data-element="font-icon">
      <!-- Font Icon -->
    </td>
    <td data-element="font-label">
      ${font.label}
    </td>
    <td class="desktop">
      <div class="cluster">
        <div>${font.superclass}</div>
        <div>${font.classification}</div>
      </div>
    </td>
    <td>
      <div class="cluster">
        <div>
          <span class="deweight">X height</span> <span class="data"><span data-element="label-xheight">${Math.round(font.xHeightPct * 100)}</span><span class="deweight">%</span></span>
        </div>
        <div class="desktop">
          <span class="deweight">Cap height</span> <span class="data"><span data-element="label-capheight">${Math.round(font.capHeightPct * 100)}</span><span class="deweight">%</span></span>
        </div>
        <div class="desktop">
          <span class="deweight">Line height</span> <span class="data"><span data-element="label-lineheight">${font.lineMin}-${font.lineMax}</span></span>
        </div>
      </div>
    </td>
  `;

  const icon = tableRow.querySelector('[data-element="font-icon"]');
  icon.appendChild(Icons(font.distribution));


  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const fontSize = isMobile ? 0.875 : 1;

  const label = tableRow.querySelector('[data-element="font-label"]');
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = `${fontSize}rem`;

  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font).then(() => {
            setFontStyles({element: label, font: font, size: fontSize, weight: "normal"});
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

  return tableRow;

}

export default TableRow;