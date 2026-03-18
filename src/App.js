import Footer from "./Components/Modules/Footer/Footer";
import Header from "./Components/Modules/Header/Header";
import Help from "./Components/Modules/Help/Help";
import Samples from "./Components/Modules/Samples/Samples";
import Sidebar from "./Components/Modules/Sidebar/Sidebar";
import Test from "./Components/Modules/Test/Test";
import Button from "./Components/Elements/Button";
import getSampleText from "./helpers/getSampleText";
import getRandomIndex from "./utils/getRandomIndex";
import AppTemplate from "./AppTemplate";


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


  // Template

  const app = AppTemplate();


  // Elements

  const asideButtonContainer = document.createElement('div');
  asideButtonContainer.classList = "aside-button bg-background";

  const asideOverlay = document.createElement('div');
  asideOverlay.classList = "aside-overlay";

  const asideButton = Button({
    label: "Change Fonts",
    classes: "button slub secondary",
    action: toggleAside
  })


  // Appends

  app.template.prepend(Header(store));
  app.main.appendChild(Samples(store));
  app.main.appendChild(Test(store));
  app.container.appendChild(Sidebar(store));
  app.template.appendChild(Footer(store));
  app.template.appendChild(Help(store));
  app.template.append(asideButtonContainer);
  asideButtonContainer.appendChild(asideButton);
  app.main.appendChild(asideOverlay);
  

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

    if(store.getData().open === true && !app.container.classList.contains("is-sidebar-open")) {
      const viewport = store.getData().viewport;
      const isDesktop = viewport >= 1024 ? true : false;
      app.container.classList.add("is-sidebar-open");

      if(!isDesktop) {
        document.body.classList.add('scroll-lock');
      }
    } else if(store.getData().open === false && app.container.classList.contains("is-sidebar-open")) {
      app.container.classList.remove("is-sidebar-open");
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

  return app.template;

}

export default App;