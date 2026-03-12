import Button from "../../Elements/Button";

function Footer(store) {


  // Structure

  const footer = document.createElement('footer');
  footer.className = "bg-background";

  const footerContainer = document.createElement('div');
  footerContainer.className = "with-sidebar wrap secondary-text secondary";
  footer.appendChild(footerContainer);

  const copyright = document.createElement('div');
  copyright.className = "not-sidebar";
  copyright.innerText = `© xheightable ${new Date().getFullYear()}`;
  footerContainer.appendChild(copyright);

  const footerControls = document.createElement('div');
  footerControls.className = "cluster";
  footerContainer.appendChild(footerControls);

  const showHelp = document.createElement('div');
  footerControls.appendChild(showHelp);

  const themeSwitch = document.createElement('div');
  footerControls.appendChild(themeSwitch);


  // Elements

  showHelp.appendChild(Button({
    label: "Help",
    action: displayHelp
  }));

  themeSwitch.appendChild(Button({
    label: "Theme",
    action: toggleTheme,
    suffix: " "
  }));


  // Help Functions

  function displayHelp() {
    store.setData({help: true});
  };

  function setTheme(mode) {
    const themeSwitchLabel = themeSwitch.querySelector(".button-suffix");

    document.documentElement.setAttribute("data-theme", mode);
    themeSwitchLabel.innerHTML = mode === "light" ? "Switch To Dark" : "Switch To Light";
    localStorage.setItem('theme', mode);
  }


  // Theme Functions

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

  return footer;

}

export default Footer;