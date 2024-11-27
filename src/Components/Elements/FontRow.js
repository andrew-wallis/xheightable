import getFontFamily from "../../utils/getFontFamily";
import getFontSize from "../../utils/getFontSize";
import loadFont from "../../utils/loadFont";
import Icons from "./Icons";
import Icon from "./Icons";

function FontRow({font, action}) {

  // Render

  const fontRow = document.createElement('a');
  fontRow.className = `fontrow block px-4 py-3 flex items-baseline gap-4 border-b border-b-black/10 active:bg-black/5 hover:bg-black/5 `;
  fontRow.href = '#';
  fontRow.dataset.name = font.name;

  fontRow.addEventListener('click', function(e) {
    e.preventDefault();
    action(font);
  });

  const iconDiv = document.createElement('div');
  iconDiv.className = "shrink-0 icon w-6 h-6 flex items-center justify-center";
  iconDiv.appendChild(Icons(font.distribution));

  const labelDiv = document.createElement('div');
  labelDiv.className = "grow";
  labelDiv.style.fontFamily = 'system-ui';
  labelDiv.style.fontSize = "1.125rem";
  labelDiv.innerText = font.label;

  const xHeightDiv = document.createElement('div');
  xHeightDiv.className ="shrink-0 w-8";
  xHeightDiv.innerText = font.xHeightPct;

  const render = () => {
    fontRow.innerHTML = '';
    fontRow.appendChild(iconDiv);
    fontRow.appendChild(labelDiv);
    fontRow.appendChild(xHeightDiv);
  }

  render();

  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font).then(() => {
            labelDiv.style.fontFamily = getFontFamily(font);
            labelDiv.style.fontSize = getFontSize(font, 1.125);
          });
          observer.disconnect();
        }
      });
    });

    observer.observe(labelDiv);

    window.addEventListener('beforeunload', () => {
      observer.disconnect();
    })
  }

  return fontRow;

}

export default FontRow;