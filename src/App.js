import Header from "./Components/Modules/Header/Header";
import Samples from "./Components/Modules/Samples/Samples";
import Test from "./Components/Modules/Test/Test";
import Details from "./Components/Modules/Details/Details";
import PrimaryFontList from "./Components/Modules/FontList/PrimaryFontList";
import SecondaryFontList from "./Components/Modules/FontList/SecondaryFontList";
import Button from "./Components/Elements/Button";
import getSampleText from "./helpers/getSampleText";
import getRandomIndex from "./utils/getRandomIndex";
import qDom from "./utils/qDom";


function App({store}) {


  // Initial

  store.setData({
    primaryFont: getRandomIndex(store.getData().fonts),
    secondaryFont: {},
    primarySort: "A-Z",
    secondarySort: "Match",
    sidebar: "",
    open: false,
    lock: false,
    testTitle: getSampleText(2),
    testText: getSampleText(10),
    viewport: window.innerWidth
  });

  const app = document.createElement('div');
  app.className = "app-container";

  /* html */
  app.innerHTML = `
    <header role="banner" data-element="top-bar">
      <!-- Top Bar -->
    </header>
    <div data-element="sidebar-container" class="center scrollable-container sidebar-container">
      <main data-element="main" class="main insulate-2xl-3xl scrollable-container">
        <div data-element="main-content" class="stack-3xl wrap scrollable">
          <!-- Main Content -->
        </div>
        <div data-element="aside-overlay" class="aside-overlay"></div>
      </main>
      <aside class="aside insulate-2xl-3xl wrap scrollable-container" data-element="aside">
        <!-- Aside -->
      </aside>
    </div>
    <footer>
      <div class="with-sidebar wrap">
        <div class="not-sidebar">© x-heightable ${new Date().getFullYear()}</div>
        <div data-element="theme-switch">
          <!-- Theme Switch -->
        </div>
      </div>
    </footer>
  `;


  // Queries

  const container = qDom(app, "sidebar-container");
  const mainContent = qDom(app, "main-content");
  const aside = qDom(app, "aside");
  

  // Appends

  qDom(app, "top-bar").appendChild(Header());
  
  mainContent.appendChild(Samples(store));
  mainContent.appendChild(Test(store));
  mainContent.appendChild(document.createElement("hr"));
  mainContent.appendChild(Details(store));

  const primary = PrimaryFontList(store);
  const secondary = SecondaryFontList(store)

  aside.appendChild(primary);
  aside.appendChild(secondary);
  
  qDom(app, "theme-switch").appendChild(Button({
    label: "Theme",
    action: setTheme
  }));


  // Event Listeners

  qDom(app, "aside-overlay").addEventListener("click", function(e) {
    store.setData({sidebar: ""});
    store.setData({open: false});
  });


  // Sidebar Functions

  function updateSidebar() {
    const activeSidebar = store.getData().sidebar;
    const viewport = store.getData().viewport;
    const isDesktop = viewport >= 1024 ? true : false;

    const primaryButton = qDom(mainContent, "button-primary");
    const secondaryButton = qDom(mainContent, "button-secondary");

    container.classList.remove("sidebar-open");
    document.body.classList.remove('scroll-lock');

    [primary, secondary, primaryButton, secondaryButton].forEach((elem) => {
      elem.classList.remove("active");
    });

    if(activeSidebar === "primary") {
      primary.classList.add("active");
      primaryButton.classList.add("active");
    } else if(activeSidebar === "secondary") {
      secondary.classList.add("active");
      secondaryButton.classList.add("active");
    }

    if(store.getData().open) {
      container.classList.add("sidebar-open");

      if(!isDesktop) {
        document.body.classList.add('scroll-lock');
      }
    }

    if(isDesktop && !store.getData().sidebar) {
      store.setData({sidebar: "primary"});
    }

  }

  store.subscribe(updateSidebar);
  updateSidebar();


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












  // Return

  return app;

}

export default App;