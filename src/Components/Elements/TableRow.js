
import loadFont from "../../utils/loadFont";
import setFontStyles from "../../utils/setFontStyles";
import Icons from "./Icons";

function TableRow({font, action, fields}) {
  
  const tableRow = document.createElement('tr');
  tableRow.className = "clickable primary-text";
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
  `;

  const icon = tableRow.querySelector('[data-element="font-icon"]');
  icon.appendChild(Icons(font.distribution));

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const fontSize = isMobile ? 1 : 1.125;

  const label = tableRow.querySelector('[data-element="font-label"]');
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = `${fontSize}rem`;
  label.style.lineHeight = "1";

  fields.forEach((field) => {
    const cell = document.createElement("td");
    cell.dataset.element = `font-${font[field]}`;
    if(field === "lineRange") {
      cell.innerHTML = font[field];
    } else {
      cell.innerHTML = `${Math.round(font[field] * 100)}<span class="deweight">%</span>`;
    }
    tableRow.appendChild(cell);
  });

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