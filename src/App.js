
import Button from "./Components/Elements/Button";
import ImportFonts from "./Components/Screens/ImportFonts/ImportFonts";
import Pair from "./Components/Screens/Pair/Pair";
import Table from "./Components/Screens/Table/Table";
import Test from "./Components/Screens/Test/Test";

function App({store}) {


  // Initial

  store.setData({primaryFont: {}});
  store.setData({secondaryFont: {}});
  store.setData({search: ""});
  store.setData({sort: "Font"});
  store.setData({activeScreen: "Table"});
  store.setData({tableScroll: 0});
  store.setData({pairScroll: 0});
  store.setData({capAdjusts: true});
  store.setData({lineHeights: true});
  

  // Containers

  const app = document.createElement('div');

  app.appendChild(Table(store));
  app.appendChild(Pair(store));
  app.appendChild(Test(store));
  app.appendChild(ImportFonts(store));

  const backLinks = app.querySelectorAll('[data-element="back-link"]');
  backLinks.forEach((backLink) => {
    backLink.appendChild(Button({label: "Back", icon: "Arrow Left", type: "back-button", action: backToTable}));
  });

  const navButtons = ["Pair", "Test", "Import"];
  const navBars = app.querySelectorAll('[data-element="navbar"]');

  navBars.forEach((navBar) => {
    navButtons.map(button => {
      navBar.appendChild(Button({label: button, icon: button, type: "nav-button", action: changeScreen}));
    });
  });

  const brandingControls = app.querySelectorAll('[data-element="branding-controls"]');
  brandingControls.forEach((control) => {
    control.appendChild(Button({label: "Buy us a coffee!", icon: "", type: "tipjar", action: setTheme}))
  });

  function updateScreen() {

    const currentScreen = app.getAttribute('data-active');
    const activeScreen = store.getData().activeScreen;

    if(currentScreen !== activeScreen) {
  
      const screens = app.querySelectorAll('[data-element="screen"]');
      screens.forEach(screen => {
        screen.style.display = screen.getAttribute('data-screen') === activeScreen ? "block" : "none";
      });

      const buttons = app.querySelectorAll('[data-element="nav-button"]');
      buttons.forEach(button => {
        button.getAttribute('data-target') === activeScreen ? button.classList.add("active") : button.classList.remove("active");
      });

      let pos = 0;

      if(activeScreen === "Table") {
        pos = store.getData().tableScroll;
      } else if(activeScreen === "Pair") {
        pos = store.getData().pairScroll;
      }

      window.scrollTo(0, pos);
      app.dataset.active = activeScreen;

    }
  }

  store.subscribe(updateScreen);
  updateScreen();

  function changeScreen(screen) {

    const currentScreen = app.getAttribute('data-active');
    const scroll = window.scrollY;

    if(currentScreen === "Table") {
      store.setData({tableScroll: scroll});
    } else if (currentScreen === "Pair") {
      store.setData({pairScroll: scroll});
    }

    store.setData({activeScreen: screen});
  }

  function backToTable() {
    changeScreen("Table");
  }

  function setTheme() {
    
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    if(theme) {
      const newTheme = (theme === "dark") ? "light" : "dark"
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem('theme', newTheme);
    } else {
      html.setAttribute("data-theme", localStorage.getItem('theme'));
    }
  }

  //setTheme();

  function adjustStickyHeaderOffset() {
    const screen = store.getData().activeScreen;

    if(screen === "Table" || screen === "Pair") {
      const thisScreen = app.querySelector(`[data-screen="${screen}"]`);
      const header = thisScreen.querySelector('header');
      const thead = thisScreen.querySelector('thead');
      const headerHeight = header.offsetHeight;

      if(thead.style.top !== headerHeight) {
        thead.style.top = `${headerHeight - 2}px`;
      }
    }
  }

  window.onscroll = function() {adjustStickyHeaderOffset()};

  return app;

}

export default App;