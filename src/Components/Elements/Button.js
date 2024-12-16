import Icon from "./Icons";

function NavigationButton({label, icon, type, action}) {

  const iconButton = document.createElement('a');

  iconButton.href = "#";
  iconButton.className = `button ${type}`;
  iconButton.appendChild(Icon(icon));
  iconButton.dataset.element = type;
  iconButton.dataset.target = label;
  
  const iconButtonLabel = document.createElement('div');
  iconButtonLabel.innerText = label;
  iconButton.appendChild(iconButtonLabel);

  iconButton.addEventListener('click', function(e) {
    e.preventDefault();
    action(label);
  });

  return iconButton;

}

export default NavigationButton;