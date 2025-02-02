
import loadFont from "../../utils/loadFont";
import qu from "../../utils/qu";
import setFontStyles from "../../utils/setFontStyles";
import Icons from "./Icons";

function TableRow({font, action}) {
  
  const tableRow = document.createElement('tr');

  tableRow.className = "clickable";
  tableRow.dataset.name = font.name;
  tableRow.dataset.label = font.label;
  tableRow.dataset.element = "table-link";

  tableRow.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  /* html */
  tableRow.innerHTML = `
    <td data-element="table-icon">
      <!-- Font Icon -->
    </td>
    <td data-element="table-label">
      ${font.label}
    </td>
    <td data-element="table-sample" class="desktop">
      hamburgers & JACKDAWS
    </td>
    <td>
      <div class="cluster caption">
        <div>
          <span class="tertiary">X-Height</span> <span class="data"><span data-element="label-xheight">${Math.round(font.xHeightPct * 100)}</span><span class="tertiary">%</span></span>
        </div>
        <div class="desktop">
          <span class="tertiary">Cap Height</span> <span class="data"><span data-element="label-capheight">${Math.round(font.capHeightPct * 100)}</span><span class="tertiary">%</span></span>
        </div>
        <div class="desktop">
          <span class="tertiary">Line Height</span> <span class="data"><span data-element="label-lineheight">${font.lineMin}-${font.lineMax}</span></span>
        </div>
      </div>
    </td>
  `;

  qu(tableRow, "table-icon").appendChild(Icons(font.distribution));

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const fontSize = isMobile ? 0.875 : 1;

  const label = qu(tableRow, "table-label");
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = `${fontSize}rem`;

  const sample = qu(tableRow, "table-sample");
  sample.style.fontFamily = 'system-ui';
  sample.style.fontSize = `${fontSize}rem`;

  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font).then(() => {
            setFontStyles({element: label, font: font, size: fontSize, weight: "normal"});
            setFontStyles({element: sample, font: font, size: fontSize, weight: "normal"});
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

  return tableRow;

}

export default TableRow;