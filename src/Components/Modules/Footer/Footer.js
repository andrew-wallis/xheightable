import Button from "../../Elements/Button";
import FooterTemplate from "./FooterTemplate";

function Footer(store) {


  // Template

  const footer = FooterTemplate();


  // Elements

  footer.help.appendChild(Button({
    label: "Help",
    action: displayHelp
  }));

  footer.theme.appendChild(Button({
    label: "Theme",
    action: toggleTheme,
    suffix: " "
  }));


  // Functions

  function displayHelp() {
    store.setData({help: true});
  };

  function getDefaultTheme() {

    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme("light");
    } else if(localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
    } else {
      setTheme("light");
    }
  }

  getDefaultTheme();

  function toggleTheme() {
    
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    html.classList.add("disable-transitions");
  
    setTimeout(() => {
      html.classList.remove("disable-transitions");
    }, 100);

    if(theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }

  }

  function setTheme(mode) {
    const themeSwitchLabel = footer.theme.querySelector(".button-suffix");

    document.documentElement.setAttribute("data-theme", mode);
    themeSwitchLabel.innerHTML = mode === "light" ? "Switch To Dark" : "Switch To Light";
    localStorage.setItem('theme', mode);
  }

  return footer.template;

}

export default Footer;