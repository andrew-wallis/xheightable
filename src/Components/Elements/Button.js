import Icon from "./Icons";

function Button({label, suffix, icon, classes, action, id}) {

  const button = document.createElement('button');
  button.className = `clickable ${classes ? classes : ""} ${icon ? "button button-icon" : ""}`;
  button.dataset.element = id ? `button-${id}` : "button";
  button.dataset.target = label ? label : id;

  if(icon) {
    button.appendChild(Icon(icon));
  }
  
  if(label) {
    const buttonLabel = document.createElement('div');
    buttonLabel.innerText = label;
    buttonLabel.className = "button-label";
    button.appendChild(buttonLabel);

    if(suffix) {
      const buttonSuffix = document.createElement('span');
      buttonSuffix.innerText = suffix;
      buttonSuffix.className = "sr-only";
      buttonLabel.appendChild(buttonSuffix);
    }
  }

  button.addEventListener('click', function(e) {
    handleClick(e);
  });

  button.removeEventListener('click', function(e) {
    handleClick(e);
  });

  function handleClick(e) {
    e.preventDefault();
    action(id);
  };

  return button;

}

export default Button;