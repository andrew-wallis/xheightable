import BackLink from "./Components/Elements/BackLink";
import IconButton from "./Components/Elements/IconButton";
import GetFonts from "./Components/Screens/GetFonts";
import Pair from "./Components/Screens/Pair";
import Table from "./Components/Screens/Table";
import Test from "./Components/Screens/Test";

function App({store}) {


  // Template

  const app = document.createElement('div');
  app.className = "relative"

  /* html */
  app.innerHTML = `
    <header class="sticky md:static z-[200] top-0 inset-x-0 bg-white">
      <div class="max-w-6xl mx-auto grid grid-cols-4 gap-2 py-4 px-6">
        <div></div>
        <h1 class="col-span-2 text-center uppercase tracking-wider font-semibold text-xs leading-4">
          xHeightable 4.1.1
        </h1>
        <div class="text-xs leading-4 font-medium tracking-wider uppercase justify-end flex gap-2 items-center">
        </div>
      </div>
    </header>
    <main data-element="main" class="px-6 pb-6">
      <!-- main -->
    </main>
    <nav data-element="navbar-container" class="sticky md:absolute md:right-0 mx-8 nav-position" style="display: none">
      <div data-element="navbar" class="max-w-lg mx-auto grid grid-cols-3 md:grid-cols-1 justify-between p-2 md:p-4 gap-4 rounded-full bg-white">
        <!-- navbar -->
      </div>
    </nav>
  `


  // Initial

  store.setData({primaryFont: {}});
  store.setData({secondaryFont: {}});
  store.setData({sortedFonts: []});
  store.setData({pairings: []});
  store.setData({search: ""});
  store.setData({activeScreen: "Table"});
  

  // Screens

  const main = app.querySelector('[data-element="main"]');
  main.appendChild(Table(store));
  main.appendChild(Pair(store));
  main.appendChild(Test(store));
  main.appendChild(GetFonts(store));

  const backLinks = app.querySelectorAll('[data-element="back-link"]');
  backLinks.forEach((backLink) => {
    backLink.appendChild(BackLink({action: changeScreen}))
  });

  const navButtons = ["Pair", "Test", "Get Fonts"];
  const navBar = app.querySelector('[data-element="navbar"]');
  navButtons.map(button => {
    navBar.appendChild(IconButton({icon: button, action: changeScreen}));
  });

  function updateScreen() {

    const currentScreen = main.getAttribute('data-active');
    const activeScreen = store.getData().activeScreen;

    if(currentScreen !== activeScreen) {

      const screens = app.querySelectorAll('[data-element="screen"]');
      screens.forEach(screen => {
        screen.style.display = screen.getAttribute('data-screen') === activeScreen ? "block" : "none";
      });

      let font;

      if(activeScreen === "Table") {
        font = app.querySelector(`[data-name="${store.getData().primaryFont.label}"]`);
      } else if(activeScreen === "Pair") {
        font = app.querySelector(`[data-name="${store.getData().secondaryFont.label}"]`);
      }

      if(font) {
        const viewPort = (window.innerHeight);
        const offset = font.offsetTop;
        let pos = offset > (viewPort / 2) ? offset - (viewPort / 2) : 0;
        window.scrollTo(0, pos);
      } else {
        window.scrollTo(0, 0);
      }

      const navBar = app.querySelector('[data-element="navbar-container"]');
      if(activeScreen === "Table") {
        navBar.style.display = "none";
      } else {
        navBar.style.display = "block";
      }

      main.dataset.active = activeScreen;

    }
  }

  store.subscribe(updateScreen);
  updateScreen();

  function changeScreen(screen) {
    store.setData({activeScreen: screen});
  }

  return app;

}

export default App;