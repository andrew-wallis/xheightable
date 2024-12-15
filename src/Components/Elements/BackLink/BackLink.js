import styles from "./BackLink.module.css";

import Icons from "../Icons";

function BackLink({action}) {

  const backLink = document.createElement('a');
  backLink.href = "#";
  backLink.className = `${styles.button} secondary-text`;
  backLink.appendChild(Icons("Arrow Left"));
  
  const backLinkLabel = document.createElement('div');
  backLinkLabel.innerText = "Back";
  backLink.appendChild(backLinkLabel);

  backLink.addEventListener('click', function(e) {
    e.preventDefault();
    action("Table");
  })

  return backLink;

}

export default BackLink;