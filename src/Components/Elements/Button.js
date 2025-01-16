import Icon from "./Icons";

function Button({label, icon, type, action}) {

  const iconButton = document.createElement('button');
  
  iconButton.className = `${type}`;

  if(icon) {
    iconButton.appendChild(Icon(icon));
  }
  
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

export default Button;