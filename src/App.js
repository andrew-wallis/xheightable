import BackLink from "./Components/Elements/BackLink";
import IconButton from "./Components/Global/NavBar/NavBarButton";
import Header from "./Components/Global/TopBar/TopBar";
import Main from "./Components/Global/Main/Main";
import NavBar from "./Components/Global/NavBar/NavBar";
import GetFonts from "./Components/Screens/GetFonts/GetFonts";
import Pair from "./Components/Screens/Pair/Pair";
import Table from "./Components/Screens/Table/Table";
import Test from "./Components/Screens/Test/Test";

function App({store}) {


  // Initial

  store.setData({primaryFont: {}});
  store.setData({secondaryFont: {}});
  store.setData({search: ""});
  store.setData({sort: "A-Z"});
  store.setData({activeScreen: "Table"});
  store.setData({tableScroll: 0});
  store.setData({pairScroll: 0});
  

  // Containers

  const header =  Header();
  const main = Main();
  const app = document.createElement('div');

  const navBar = NavBar();
  app.appendChild(navBar);

  app.appendChild(Table(store));
  app.appendChild(Pair(store));
  app.appendChild(Test(store));
  app.appendChild(GetFonts(store));

  const backLinks = app.querySelectorAll('[data-element="back-link"]');
  backLinks.forEach((backLink) => {
    backLink.appendChild(BackLink({action: changeScreen}));
  });

  const navButtons = ["Pair", "Test", "Get Fonts"];
  const nav = app.querySelector('[data-element="navbar"]');
  navButtons.map(button => {
    nav.appendChild(IconButton({icon: button, action: changeScreen}));
  });

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

      if(activeScreen === "Table") {
        navBar.style.display = "none";
      } else {
        navBar.style.display = "block";
      }

      app.dataset.active = activeScreen;

    }
  }

  store.subscribe(updateScreen);
  updateScreen();

  function changeScreen(screen) {

    const currentScreen = app.getAttribute('data-active');
    const scroll = window.scrollY;

    if(currentScreen === "Table") {
      store.setData({tableScroll: scroll})
    } else if (currentScreen === "Pair") {
      store.setData({pairScroll: scroll});
    }

    store.setData({activeScreen: screen});
  }

  return app;

}

export default App;