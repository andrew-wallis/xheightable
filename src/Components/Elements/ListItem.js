
import loadFont from "../../helpers/loadFont";
import qDom from "../../utils/qDom";
import setFontStyles from "../../helpers/setFontStyles";

function ListItem({font, action, data}) {
  
  const listItem = document.createElement('li');

  listItem.className = "clickable list-item";
  listItem.dataset.name = font.name;
  listItem.dataset.label = font.label;
  listItem.dataset.element = "list-item";
  listItem.tabIndex = -1;
  listItem.role = "option";
  listItem.ariaLabel = `Select ${font.label}`;

  /* html */
  listItem.innerHTML = `
    <div data-element="item-leader" class="sample-leader">A</div>
    <div class="list-item-label" data-element="item-label">${font.label}<span class="data list-item-data">${data}</span></div>
    
  `;

  const fontSize = 0.875;

  const label = qDom(listItem, "item-label");
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = `${fontSize}rem`;

  const leader = qDom(listItem, "item-leader");
  leader.style.fontSize = `1rem`;


  if(!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          loadFont(font).then(() => {

            setFontStyles({
              element: label, 
              font: font, 
              size: fontSize, 
              weight: 400
            });
            
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


  // Functions

  listItem.addEventListener('click', function() {
    handleClick();
  });

  listItem.removeEventListener('click', function() {
    handleClick();
  });

  listItem.addEventListener('keydown', function(e) {
    handleKeyDown(e);
  });

  listItem.removeEventListener('keydown', function(e) {
    handleKeyDown(e);
  });

  function handleClick() {
    action(font);
  }

  function handleKeyDown(e) {
    if(e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action(font);
    }
  }

  return listItem;

}

export default ListItem;