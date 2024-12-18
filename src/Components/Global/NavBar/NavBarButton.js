import Icon from "../../Elements/Icons";
import styles from "./NavBar.module.css";

function NavBarButton({icon, action}) {

  const iconButton = document.createElement('a');

  iconButton.href = "#";
  iconButton.className = `${styles.button} secondary-text`;
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

export default NavBarButton;