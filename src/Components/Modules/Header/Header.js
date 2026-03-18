import Button from "../../Elements/Button";
import HeaderTemplate from "./HeaderTemplate";

function Header() {


  // Template

  const header = HeaderTemplate();


  // Elements

  header.controls.appendChild(Button({
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
  header.controls.appendChild(coffee);


  // Functions

  function sayHi() {
    window.location.href = "mailto:xheightable@gmail.com";
  }


  return header.template;

}

export default Header;