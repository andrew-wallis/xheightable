import processFont from "../../helpers/processFont";
import getPercentage from "../../utils/getPercentage";
import Icons from "./Icons";

function ListItem({font, action, target}) {
  
  const listItem = document.createElement('li');

  listItem.className = `clickable list-item list-item-${target}`;
  listItem.dataset.name = font.name;
  listItem.dataset.label = font.label;
  listItem.dataset.element = "list-item";
  listItem.tabIndex = -1;
  listItem.role = "option";
  listItem.ariaLabel = `Select ${font.label}`;
  listItem.dataset.umamiEvent = `List Item ${target}`;
  listItem.dataset.umamiEventDistribution = font.distribution;
  listItem.dataset.umamiEventFont = font.label;

  const fontSize = 0.875;

  const leader = document.createElement("div");
  leader.className = "sample-leader";
  leader.innerHTML = "A";
  leader.style.fontFamily = 'system-ui';
  leader.style.fontSize = `1rem`;
  listItem.appendChild(leader);

  const label = document.createElement("div");
  label.className = "list-item-label";
  label.innerHTML = font.label;
  label.style.fontFamily = 'system-ui';
  label.style.fontSize = `${fontSize}rem`;
  listItem.appendChild(label);

  const dataLabel = document.createElement("span");
  dataLabel.className = "list-item-data";
  dataLabel.innerHTML = target === "primary" ? `${getPercentage(font.xHeightPct)}%` : `${getPercentage(font.xHeightPct)}% (${getPercentage(font.xHeightDiff) === "0" ? "Match": getPercentage(font.xHeightDiff)})`;
  label.appendChild(dataLabel);

  processFont(label, font, fontSize, font.regular, 1);

  if(target === "secondary") {
    listItem.appendChild(Icons("Lock", "list-item-lock"));
    listItem.appendChild(Icons("Unlock", "list-item-unlock"));
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