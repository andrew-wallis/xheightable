import Icon from "./Icons";

function Button({label, icon, classes, action, id}) {

  const button = document.createElement('button');
  button.className = `clickable ${classes ? classes : ""} ${icon ? "button slub button-icon" : ""}`;

  if(icon) {
    button.appendChild(Icon(icon));
  }
  
  button.dataset.element = id ? `button-${id}` : "button";
  button.dataset.target = label;
  
  const buttonLabel = document.createElement('div');
  buttonLabel.innerText = label;
  buttonLabel.className = "button-label";
  button.appendChild(buttonLabel);

  button.addEventListener('click', function(e) {
    handleClick(e);
  });

  button.removeEventListener('click', function(e) {
    handleClick(e);
  });

  function handleClick(e) {
    e.preventDefault();
    action(label);
  };

  return button;

}

export default Button;