import Icon from "./Icons";

function Button({label, icon, classes, action, hideLabel, type}) {

  const iconButton = document.createElement('button');
  iconButton.className = `clickable ${classes ? classes : ""}`;

  if(icon) {
    iconButton.appendChild(Icon(icon));
  }
  
  iconButton.dataset.element = "button";
  iconButton.dataset.target = label;
  
  const iconButtonLabel = document.createElement('span');
  iconButtonLabel.innerText = label;
  iconButtonLabel.classList = hideLabel ? "sr-only" : "";
  iconButton.appendChild(iconButtonLabel);

  iconButton.addEventListener('click', function(e) {
    handleClick(e);
  });

  iconButton.removeEventListener('click', function(e) {
    handleClick(e);
  });

  function handleClick(e) {
    e.preventDefault();
    action(label);
  };

  if(type === "tab") {
    const tabId = label.replace(/\W/g,'_');
    iconButton.role = "tab";
    iconButton.id = `${tabId.toLowerCase()}-tab`;
    iconButton.setAttribute("aria-controls", tabId);
    iconButton.ariaSelected = "false";
  }

  return iconButton;

}

export default Button;