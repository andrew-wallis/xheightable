import loadFont from "../../../utils/loadFont";
import setFontStyles from "../../../utils/setFontStyles";
import Icons from "../Icons";
import styles from "./FontLink.module.css";

function FontLink({font, action}) {
  
  const FontLink = document.createElement('a');
  FontLink.href = '#';
  FontLink.className = styles.link;
  FontLink.dataset.name = font.name;
  FontLink.dataset.label = font.label;
  FontLink.dataset.element = "font-link";

  FontLink.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  /* html */
  FontLink.innerHTML = `
    <div class=${styles.icon} data-element="font-icon" class="shrink-0 icon w-6 h-6 flex items-center justify-center">
      <!-- Font Icon -->
    </div>
    <div class=${styles.label} data-element="font-label" class="grow">
      ${font.label}
    </div>
    <div class=${styles.xHeight} data-element="font-xHeight" class="shrink-0 w-8">
      ${font.xHeightPct}
    </div>
  `;

  const icon = FontLink.querySelector('[data-element="font-icon"]');
  icon.appendChild(Icons(font.distribution));

  const label = FontLink.querySelector('[data-element="font-label"]');
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

  return FontLink;

}

export default FontLink;