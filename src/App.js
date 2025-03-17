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
import qaDom from "./utils/qaDom";

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

  /* html */
  app.innerHTML = `
    <header role="banner" data-element="top-bar">
      <!-- Top Bar -->
    </header>
    <div data-element="slider" class="slider">
      <aside class="slider-sidebar primary-closed" data-element="primary-sidebar">
        <!-- Primary Sidebar -->
      </aside>
      <main data-element="main" class="slider-main insulate-3xl">
        <div data-element="main-content" class="stack-3xl wrap">
          <!-- Main Content -->
        </div>
        <div data-element="slider-overlay" class="slider-overlay"></div>
      </main>
      <aside class="slider-sidebar secondary-closed" data-element="secondary-sidebar">
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
  const main = qDom(app, "main");
  const mainContent = qDom(app, "main-content");
  const primary = qDom(app, "primary-sidebar");
  const secondary  = qDom(app, "secondary-sidebar");
  const overlay = qDom(app, "slider-overlay");


  // Appends

  qDom(app, "top-bar").appendChild(Header());
  
  primary.appendChild(Primary(store));
  secondary.appendChild(Secondary(store));
  mainContent.appendChild(Samples(store));
  mainContent.appendChild(Test(store));
  mainContent.appendChild(document.createElement("hr"));
  mainContent.appendChild(Details(store));
  
  qDom(app, "theme-switch").appendChild(Button({
    label: "Theme",
    action: setTheme,
    classes: "caption"
  }));


  // Event Listeners

  overlay.addEventListener("click", function(e) {
    store.setData({sidebar: ""});
  });


  // Sidebar Functions

  function updateSlider() {

    const activeSidebar = store.getData().sidebar;
    const viewport = store.getData().viewport;
    const isDesktop = viewport >= 1024 ? true : false;

    if(slider.dataset.active !== activeSidebar || slider.dataset.viewport !== viewport) {
      
      primary.classList.remove("sidebar-open");
      secondary.classList.remove('sidebar-open');
      main.classList.remove('primary-open');
      main.classList.remove('secondary-open');
      main.classList.remove("main-max-width");
      main.classList.remove('scrollable-container');
      mainContent.classList.remove('scrollable');
      overlay.classList.remove('show-overlay');
      body.classList.remove('scroll-lock');
      app.classList.remove('slider-flex');

      const primaryButton = qDom(mainContent, "button-primary");
      const secondaryButton = qDom(mainContent, "button-secondary");
      const primarySort = qDom(primary, "sort-primary-fonts");
      const secondarySort = qDom(secondary, "sort-secondary-fonts");

      primaryButton.disabled = false;
      secondaryButton.disabled = false;
      // primarySort.tabIndex = -1;
      // secondarySort.tabIndex = -1;

      if(isDesktop) {
        main.classList.add("main-max-width");
        main.classList.add('scrollable-container');
        mainContent.classList.add('scrollable');
        app.classList.add('slider-flex');
      }

      if(activeSidebar === "primary") {

        primary.classList.add("sidebar-open");
        main.classList.add('primary-open');
        //primarySort.tabIndex = 0;

/*         qaDom(primary, "list-item").forEach(row => {
          setTimeout(() => {
            if(row.tabIndex === 0) row.focus();
          }, 400);
        });
 */
        if(!isDesktop) {
          overlay.classList.add('show-overlay');
          body.classList.add('scroll-lock');
        } else {
          primaryButton.disabled = true;
        }

      } else if (activeSidebar === "secondary") {

        secondary.classList.add("sidebar-open");
        //secondarySort.tabIndex = 0;

/*         qaDom(secondary, "list-item").forEach(row => {
          setTimeout(() => {
            if(row.tabIndex === 0) row.focus();
          }, 400);
        }); */

        if(!isDesktop) {
          main.classList.add('secondary-open');
          overlay.classList.add('show-overlay');
          body.classList.add('scroll-lock');
        } else {
          secondaryButton.disabled = true;
        }

      } else {
        if (isDesktop) {
          secondary.classList.add("sidebar-open");
          secondaryButton.disabled = true; 
          //secondarySort.tabIndex = 0;
        }
      }

      slider.dataset.viewport = viewport;
      slider.dataset.active = activeSidebar;
    
    }
  }

  store.subscribe(updateSlider);
  updateSlider();


  // Viewport Functions

  function updateViewports() {
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

  const debouncedUpdateViewports = debounce(updateViewports, 50);

  window.addEventListener("resize", debouncedUpdateViewports);


  // Theme functions

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