import Icon from "./Icons";

function IconButton({icon, action}) {

  const iconButton = document.createElement('a');

  iconButton.href = "#";
  iconButton.className = "block h-12 text-center text-xs leading-none flex flex-col gap-1 items-center justify-center";
  iconButton.appendChild(Icon(icon));
  
  const iconButtonLabel = document.createElement('div');
  iconButtonLabel.innerText = icon;
  iconButton.appendChild(iconButtonLabel);

  iconButton.addEventListener('click', function(e) {
    e.preventDefault();
    action(icon);
  });

  return iconButton;

}

export default IconButton;