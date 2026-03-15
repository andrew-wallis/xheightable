import Footer from "./Components/Modules/Footer/Footer";
import Header from "./Components/Modules/Header/Header";
import Help from "./Components/Modules/Help/Help";
import Samples from "./Components/Modules/Samples/Samples";
import Sidebar from "./Components/Modules/Sidebar/Sidebar";
import Test from "./Components/Modules/Test/Test";
import Button from "./Components/Elements/Button";
import getSampleText from "./helpers/getSampleText";
import getRandomIndex from "./utils/getRandomIndex";


function App({store}) {
  

  // Initiate

  store.setData({
    help: false,
    lock: false,
    open: false,
    primaryFont: getRandomIndex(store.getData().fonts),
    primarySort: "A-Z",
    secondaryFont: {},
    secondarySort: "Match",
    testText: getSampleText(10),
    testTitle: getSampleText(2),
    viewport: window.innerWidth
  });


  // Structure

  const app = document.createElement('div');
  app.className = "app-container";

  app.appendChild(Header(store));

  const appContainer = document.createElement('div');
  appContainer.classList = "center scrollable-container aside-container";
  app.appendChild(appContainer);

  const main = document.createElement('main');
  main.classList = "main scrollable-container";
  appContainer.appendChild(main);

  const mainContent = document.createElement('div');
  mainContent.classList = "stack-3xl wrap scrollable";
  main.appendChild(mainContent);

  mainContent.appendChild(Samples(store));
  mainContent.appendChild(Test(store));
  appContainer.appendChild(Sidebar(store));

  app.appendChild(Footer(store));
  app.appendChild(Help(store));

  const asideButtonContainer = document.createElement('div');
  asideButtonContainer.classList = "aside-button bg-background";
  app.append(asideButtonContainer);

  const asideButton = Button({
    label: "Change Fonts",
    classes: "button slub secondary",
    action: toggleAside
  })

  asideButtonContainer.appendChild(asideButton);

  const asideOverlay = document.createElement('div');
  asideOverlay.classList = "aside-overlay";
  mainContent.appendChild(asideOverlay);
  

  // Sidebar Functions

  function toggleAside() {

    const label = asideButton.querySelector(".button-label");

    if(store.getData().open === true) {
      store.setData({open: false});
      label.textContent = "Change Fonts"
    } else if(store.getData().open === false) {
      store.setData({open: true});
      label.textContent = "Close"
    }
  }

  asideOverlay.addEventListener("click", function(e) {
    store.setData({open: false});
    label.textContent = "Change Fonts"
  });

  function updateAside() {

    if(store.getData().open === true && !appContainer.classList.contains("is-sidebar-open")) {
      const viewport = store.getData().viewport;
      const isDesktop = viewport >= 1024 ? true : false;
      appContainer.classList.add("is-sidebar-open");

      if(!isDesktop) {
        document.body.classList.add('scroll-lock');
      }
    } else if(store.getData().open === false && appContainer.classList.contains("is-sidebar-open")) {
      appContainer.classList.remove("is-sidebar-open");
      document.body.classList.remove('scroll-lock');
    }
  }
  
  store.subscribe(updateAside);


  // Viewport Functions

  function updateViewports() {

    const getHeader = document.getElementById("header");
    const getSamples = document.getElementById("samples");
    const getSidebar = document.getElementById("sidebar");

    const top = getHeight(getHeader) + getHeight(getSamples);

    console.log(window.innerHeight, top);

    if ((window.innerHeight) - top > 448) {
      getSidebar.style.top = `calc(${top}px + 5rem)`;
    } else {
      getSidebar.style.top = `calc(${window.innerHeight}px - 28rem)`;
    }
    

    function getHeight(element) {
      const rect = element.getBoundingClientRect();
      return rect.height;
    }

    store.setData({
      viewport: window.innerWidth
    });
  }

  const observer = new MutationObserver((mutations, obs) => {
    updateViewports();
    obs.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
  }

  const debouncedUpdateViewports = debounce(updateViewports, 50);

  window.addEventListener("resize", debouncedUpdateViewports);

  return app;

}

export default App;