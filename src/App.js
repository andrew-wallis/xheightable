

import Header from "./Components/Modules/Header/Header";
import Primary from "./Components/Modules/Primary/Primary";
import Secondary from "./Components/Modules/Secondary/Secondary";
import Samples from "./Components/Modules/Samples/Samples";
import Test from "./Components/Modules/Test/Test";
import Details from "./Components/Modules/Details/Details";
import Button from "./Components/Elements/Button";
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
    secondarySort: "Match",
    sidebar: "",
    testTitle: getSampleText(2),
    testText: getSampleText(10),
    viewport: window.innerWidth
  });

  const app = document.createElement('div');
  app.classList = "slider-container";

  /* html */
  app.innerHTML = `
    <header role="banner" data-element="top-bar">
      <!-- Top Bar -->
    </header>
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
    <footer>
      <div class="with-sidebar wrap caption">
        <div class="not-sidebar">© x-heightable ${new Date().getFullYear()}</div>
        <div data-element="theme-switch">
          <!-- Theme Switch -->
        </div>
      </div>
    </footer>
  `;


  // Queries

  const body = document.body;
  const slider = qDom(app, "slider");
  const main = qDom(app, "main-content");


  // Appends

  qDom(app, "top-bar").appendChild(Header());
  qDom(app, "primary-sidebar").appendChild(Primary(store));
  qDom(app, "secondary-sidebar").appendChild(Secondary(store));

  main.appendChild(Samples(store));
  main.appendChild(Test(store));
  main.appendChild(document.createElement("hr"));
  main.appendChild(Details(store));
  
  qDom(app, "theme-switch").appendChild(Button({
    label: "Theme",
    action: setTheme,
    classes: "caption"
  }));


  // Event Listeners

  qDom(app, "slider-overlay").addEventListener("click", function(e) {
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
    console.log("Resize");
    store.setData({
      isTablet: isViewportWidth(768),
      isDesktop: isViewportWidth(1024),
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

  const debouncedUpdateViewports = debounce(updateViewports, 200); // Adjust the delay as needed

  window.addEventListener("resize", debouncedUpdateViewports);



  function setTheme() {
    
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    html.classList.add("disable-transitions");
  
    setTimeout(() => {
      html.classList.remove("disable-transitions");
    }, 100);

    if(theme) {
      const newTheme = (theme === "dark") ? "light" : "dark"
      html.setAttribute("data-theme", newTheme);
      localStorage.setItem('theme', newTheme);
    } else {
      html.setAttribute("data-theme", localStorage.getItem('theme'));
    }
  }

  setTheme();


  // Return

  return app;

}

export default App;