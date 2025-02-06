import Secondary from "./Components/Screens/Secondary/Secondary";
import Primary from "./Components/Screens/Primary.js/Primary";
import qaDom from "./utils/qaDom";
import getRandomArrayItem from "./utils/getRandomArrayKey";

function App({store}) {


  // Initial

  store.setData({
    primaryFont: getRandomArrayItem(store.getData().fonts),
    secondaryFont: {},
    activeScreen: "Secondary",
    activeSection: "Pair",
    primaryFilter: {
      sort: "Rating",
      licences: [],
      classifications: []
    },
    secondaryFilter: {
      sort: "Match",
      licences: [],
      classifications: []
    },
    tableScroll: 0,
    pairScroll: 0,
    capAdjusts: true,
    lineHeights: true,
    embedLicence: ["Google"],
    affiliateLicence: ["Adobe"]
  });

  const app = document.createElement('div');


  // Appends

  app.appendChild(Primary(store));
  app.appendChild(Secondary(store));


  // Functions

  function updateScreen() {

    const currentScreen = app.getAttribute('data-active');
    const activeScreen = store.getData().activeScreen;

    if(currentScreen !== activeScreen) {
      qaDom(app, "screen").forEach(screen => {
        screen.style.display = screen.getAttribute('data-screen') === activeScreen ? "block" : "none";
      });

      let pos = 0;

      if(activeScreen === "Primary") {
        pos = store.getData().tableScroll;
      } else if(activeScreen === "Secondary") {
        pos = store.getData().pairScroll;
      }

      window.scrollTo(0, pos);
      app.dataset.active = activeScreen;

    }
  }

  store.subscribe(updateScreen);
  updateScreen();


  // Return

  return app;

  // Legacy theme and scroll functions

/*   function setTheme() {
    
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    if(theme) {
      const newTheme = (theme === "dark") ? "light" : "dark"
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem('theme', newTheme);
    } else {
      html.setAttribute("data-theme", localStorage.getItem('theme'));
    }
  } */

  //setTheme();

/*   function adjustStickyHeaderOffset() {
    const screen = store.getData().activeScreen;

    if(screen === "Primary" || screen === "Pair") {
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
 */

}

export default App;