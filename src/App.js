
import Button from "./Components/Elements/Button";
import Pair from "./Components/Screens/Pair/Pair";
import Table from "./Components/Screens/Table/Table";

function App({store}) {


  // Initial

  store.setData({primaryFont: store.getData().fonts[57]});
  store.setData({secondaryFont: {}});
  store.setData({search: ""});
  store.setData({sort: "Font"});
  store.setData({activeScreen: "Pair"});
  store.setData({activeSection: "Pair"});
  store.setData({primaryFilter: {
    sort: "Rating",
    licences: [],
    classifications: []
  }});
  store.setData({secondaryFilter: {
    sort: "Match",
    licences: [],
    classifications: []
  }});
  store.setData({tableScroll: 0});
  store.setData({pairScroll: 0});
  store.setData({capAdjusts: true});
  store.setData({lineHeights: true});
  

  // Containers

  const app = document.createElement('div');

  app.appendChild(Table(store));
  app.appendChild(Pair(store));
  //app.appendChild(Test(store));
  //app.appendChild(ImportFonts(store));



  const changePrimary = app.querySelector('[data-element="pair-change"]');
  changePrimary.appendChild(Button({label: "Change", action: openPrimary, type: "primary-button slub"}));

  function updateScreen() {

    const currentScreen = app.getAttribute('data-active');
    const activeScreen = store.getData().activeScreen;

    if(currentScreen !== activeScreen) {
  
      const screens = app.querySelectorAll('[data-element="screen"]');
      screens.forEach(screen => {
        screen.style.display = screen.getAttribute('data-screen') === activeScreen ? "block" : "none";
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

  function openPrimary() {
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