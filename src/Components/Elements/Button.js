import Icon from "./Icons";

function Button({label, icon, type, action, hideLabel}) {

  const iconButton = document.createElement('button');
  iconButton.className = `label ${type ? type : ""}`;

  if(icon) {
    iconButton.appendChild(Icon(icon));
  }
  
  iconButton.dataset.element = "button";
  iconButton.dataset.target = label;
  
  const iconButtonLabel = document.createElement('div');
  iconButtonLabel.innerText = label;
  iconButtonLabel.classList = hideLabel ? "sr-only" : "";
  iconButton.appendChild(iconButtonLabel);

  iconButton.addEventListener('click', function(e) {
    e.preventDefault();
    action(label);
  });

  return iconButton;

}

export default Button;