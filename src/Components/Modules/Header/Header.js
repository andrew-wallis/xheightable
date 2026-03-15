import Button from "../../Elements/Button";
import HeaderLogo from "./HeaderLogo";

function Header() {


  // Structure

  const header = document.createElement('header');
  header.classList = "bg-background";
  header.id = "header"

  const headerContainer = document.createElement('div');
  headerContainer.className = "wrap with-sidebar primary-text";
  header.appendChild(headerContainer);

  const branding = document.createElement('div');
  branding.className = "not-sidebar branding cluster-s";
  headerContainer.appendChild(branding);

  branding.appendChild(HeaderLogo());

  const title = document.createElement('h1');
  title.className = "slub";
  title.innerText = "xheightable";
  branding.appendChild(title);

  const headerControls = document.createElement('div');
  headerControls.className = "sidebar cluster align-center";
  headerContainer.appendChild(headerControls);

  headerControls.appendChild(Button({
    label: "Say Hi",
    action: sayHi,
    classes: "secondary slub"
  }));

  const coffee = document.createElement('a');
  coffee.innerText = "Buy us a coffee!";
  coffee.className = "button slub secondary clickable";
  coffee.dataset.umamiEvent = "Buy us a coffee";
  coffee.href = "https://buymeacoffee.com/xheightable";
  coffee.target = "_blank";
  coffee.rel = "noopener noreferrer"
  headerControls.appendChild(coffee);


  // Functions

  function sayHi() {
    window.location.href = "mailto:xheightable@gmail.com";
  }


  return header;

}

export default Header;