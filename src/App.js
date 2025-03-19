import Header from "./Components/Modules/Header/Header";
import Samples from "./Components/Modules/Samples/Samples";
import Test from "./Components/Modules/Test/Test";
import Details from "./Components/Modules/Details/Details";
import Sidebar from "./Components/Modules/Sidebar/Sidebar";
import Button from "./Components/Elements/Button";
import ListItem from "./Components/Elements/ListItem";
import findSecondary from "./helpers/findSecondary";
import getPercentage from "./utils/getPercentage";
import getSampleText from "./helpers/getSampleText";
import highlightActiveItem from "./helpers/highlightActiveItem";
import sortPrimaryFonts from "./helpers/sortPrimaryFonts";
import sortSecondaryFonts from "./helpers/sortSecondaryFonts";
import getRandomIndex from "./utils/getRandomIndex";
import isObj from "./utils/isObj";
import qDom from "./utils/qDom";


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


  // Create Elements


  // Appends

  qDom(app, "top-bar").appendChild(Header());
  
  primary.appendChild(Sidebar({
    id: "primary",
    store: store,
    options: ["A-Z", "Rating", "X-Height"],
    sort: "primarySort"
  }));

  secondary.appendChild(Sidebar({
    id: "secondary",
    store: store,
    options: ["Match", "A-Z", "Rating"],
    sort: "secondarySort"
  }));

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

      primaryButton.disabled = false;
      secondaryButton.disabled = false;

      if(isDesktop) {
        main.classList.add("main-max-width");
        main.classList.add('scrollable-container');
        mainContent.classList.add('scrollable');
        app.classList.add('slider-flex');
      }

      if(activeSidebar === "primary") {

        primary.classList.add("sidebar-open");
        main.classList.add('primary-open');

        if(!isDesktop) {
          overlay.classList.add('show-overlay');
          body.classList.add('scroll-lock');
        } else {
          primaryButton.disabled = true;
        }

      } else if (activeSidebar === "secondary") {

        secondary.classList.add("sidebar-open");

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


  // Font Actions

  function changePrimary(font) {
    store.setData({
      primaryFont: font,
      secondaryFont: {},
      secondarySort: "Match",
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : ""
    });
  }


  function updatePrimaryList() {

    const sort = store.getData().primarySort;
    const primaryList = qDom(primary, "sidebar-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(isObj(primaryFont) > 0 && primaryList.dataset.sort !== sort) {

      primaryList.innerHTML = '';

      const sortedFonts = sortPrimaryFonts({
        fonts: fonts, 
        sort: sort
      });
      
      sortedFonts.map((font, index) => {
        primaryList.appendChild(ListItem({
          font: font,
          action: changePrimary,
          data: getPercentage(font.xHeightPct)
        }));
      });

      highlightActiveItem(primaryList, store.getData().primaryFont, true);
      primaryList.dataset.sort = sort;
    }
  }

  store.subscribe(updatePrimaryList);
  updatePrimaryList();


  function changeSecondary(font) {
    store.setData({
      secondaryFont: font,
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : ""
    });
  }


  function updateSecondaryList() {

    const sort = store.getData().secondarySort;
    const secondaryList = qDom(secondary, "sidebar-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(isObj(primaryFont) && 
      (secondaryList.dataset.primary !== primaryFont.name
      || secondaryList.dataset.sort !== sort)
    ) {

      secondaryList.innerHTML = '';

      const sortedFonts = sortSecondaryFonts({
        primary: primaryFont, 
        fonts: fonts, 
        sort: sort
      });

      sortedFonts.map((font, index) => {
        secondaryList.appendChild(ListItem({
          font: font,
          action: changeSecondary,
          data: getPercentage(font.xHeightDiff)
        }));
      });
       
      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, sortedFonts);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(secondaryList, store.getData().secondaryFont, true);

    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();


  // Return

  return app;

}

export default App;