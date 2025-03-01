

import Header from "./Components/Modules/Header/Header";
import Primary from "./Components/Modules/Primary/Primary";
import Secondary from "./Components/Modules/Secondary/Secondary";
import Samples from "./Components/Modules/Samples/Samples";
import Test from "./Components/Modules/Test/Test";
import ImportFonts from "./Components/Modules/ImportFonts/ImportFonts";
import getRandomIndex from "./utils/getRandomIndex";
import getSampleText from "./helpers/getSampleText";
import isViewportWidth from "./utils/isViewportWidth";
import qDom from "./utils/qDom";
import './slider.css';

function App({store}) {


  // Initial

  store.setData({
    primaryFont: getRandomIndex(store.getData().fonts),
    secondaryFont: {},
    primarySort: "A-Z",
    secondarySort: "X-Height",
    capAdjusts: true,
    lineHeights: true,
    embedLicence: ["Google"],
    affiliateLicence: ["Adobe"],
    sidebar: "",
    testTitle: getSampleText(2),
    testText: getSampleText(10),
    isTablet: isViewportWidth(768),
    isDesktop: isViewportWidth(1024)
  });

  const app = document.createElement('div');
  app.classList = "slider-container";

  /* html */
  app.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">
        <!-- Top Bar -->
      </div>
    </div>
    <div data-element="slider" class="slider">
      <aside data-element="primary-sidebar">
        <!-- Primary Sidebar -->
      </aside>
      <main class="insulate-3xl desktop-scrollable-container">
        <div data-element="main-content" class="stack-3xl wrap desktop-scrollable">
          <!-- Main Content -->
        </div>
        <div data-element="slider-overlay" class="slider-overlay"></div>
      </main>
      <aside data-element="secondary-sidebar">
        <!-- Secondary Sidebar -->
      </aside>
    </div>
  `;


  // Queries

  const body = document.body;
  const topBar = qDom(app, "top-bar");
  const slider = qDom(app, "slider");
  const main = qDom(app, "main-content");
  const primary = qDom(app, "primary-sidebar");
  const secondary = qDom(app, "secondary-sidebar");
  const overlay = qDom(app, "slider-overlay")


  // Appends

  topBar.appendChild(Header());
  primary.appendChild(Primary(store));
  secondary.appendChild(Secondary(store));
  main.appendChild(Samples(store));
  main.appendChild(document.createElement("hr"));
  main.appendChild(Test(store));
  main.appendChild(document.createElement("hr"));
  main.appendChild(ImportFonts(store));


  // Event Listeners

  overlay.addEventListener("click", function(e) {
    store.setData({sidebar: ""});
  });


  // Functions

  function updateSidebar() {

    const activeSidebar = store.getData().sidebar;

    if(slider.dataset.active !== activeSidebar) {
      slider.classList.remove("primary");
      slider.classList.remove("secondary");
      body.classList.remove("sidebar-open");
      if(activeSidebar) {
        slider.classList.add(activeSidebar);
        slider.dataset.active = activeSidebar;
        body.classList.add("sidebar-open");
      } else {
        slider.dataset.active = "";
      }
    }
  }

  store.subscribe(updateSidebar);
  updateSidebar();


  function updateViewports() {
    store.setData({
      isTablet: isViewportWidth(768),
      isDesktop: isViewportWidth(1024)
    });
  }

  const observer = new MutationObserver((mutations, obs) => {
    updateViewports();
    obs.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('resize', updateViewports);


  // Return

  return app;


  // Legacy theme function
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

}

export default App;