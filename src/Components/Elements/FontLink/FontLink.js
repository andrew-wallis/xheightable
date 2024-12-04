import loadFont from "../../../utils/loadFont";
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../Icons";
import styles from "./FontLink.module.css";

function FontLink({font, action}) {
  
  const FontLink = document.createElement('tr');
  FontLink.className = "clickable";
  FontLink.dataset.name = font.name;
  FontLink.dataset.label = font.label;
  FontLink.dataset.element = "font-link";

  FontLink.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  /* html */
  FontLink.innerHTML = `
    <td data-element="font-icon">
      <!-- Font Icon -->
    </td>
    <td data-element="font-label">
      ${font.label}
    </td>
    <td class="additional-data" data-element="font-capHeight">
      ${Math.round(font.capHeightPct * 100)}%
    </td>
    <td data-element="font-xHeight">
      ${Math.round(font.xHeightPct * 100)}%
    </td>
  `;

  const icon = FontLink.querySelector('[data-element="font-icon"]');
  icon.appendChild(Icons(font.distribution));

  const label = FontLink.querySelector('[data-element="font-label"]');
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = "1.125rem";
  label.style.lineHeight = "1";

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

  return FontLink;

}

export default FontLink;