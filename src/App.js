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
import qaDom from "./utils/qaDom";
import Help from "./Components/Modules/Help/Help";


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
        <div class="not-sidebar">© xheightable ${new Date().getFullYear()}</div>
        <div class="cluster">
          <div data-element="theme-switch">
            <!-- Theme Switch -->
          </div>
          <div data-element="help-switch">
            <!-- Help Switch -->
          </div>
        </div>
      </div>
    </footer>
  `;


  // Queries

  const container = qDom(app, "sidebar-container");
  const mainContent = qDom(app, "main-content");
  const aside = qDom(app, "aside");


  // Create Elements

  const primary = PrimaryFontList(store);
  const secondary = SecondaryFontList(store);
  const help = Help();

  const themeSwitch = Button({
    label: "Theme",
    action: toggleTheme,
    suffix: " "
  });

  const hideHelp = Button({
    label: "Hide",
    action: removeHelp,
    classes: "button"
  });

  const showHelp = Button({
    label: "Help",
    action: displayHelp
  });
  

  // Appends

  qDom(app, "top-bar").appendChild(Header());

  help.style.display = "none";
  qDom(help, "help-hide").appendChild(hideHelp);
  app.appendChild(help);

  mainContent.appendChild(Samples(store));

  mainContent.appendChild(Button({
    label: "Change Fonts",
    classes: "button label secondary",
    action: openSidebar
  }))

  mainContent.appendChild(Test(store));
  //mainContent.appendChild(document.createElement("hr"));
  //mainContent.appendChild(Details(store));

  aside.appendChild(primary);
  aside.appendChild(secondary);
  
  qDom(app, "theme-switch").appendChild(themeSwitch);
  qDom(app, "help-switch").appendChild(showHelp);


  // Event Listeners

  qDom(app, "aside-overlay").addEventListener("click", function(e) {
    store.setData({sidebar: ""});
    store.setData({open: false});
  });


  // Sidebar Functions

  function openSidebar() {
    store.setData({open: true});
    store.setData({sidebar: "primary"});
  }

  function updateSidebar() {
    const activeSidebar = store.getData().sidebar;
    const viewport = store.getData().viewport;
    const isDesktop = viewport >= 1024 ? true : false;

    const primaryButtons = qaDom(aside, "button-primary");
    const secondaryButtons = qaDom(aside, "button-secondary");

    mainContent.scrollTop = 0;

    container.classList.remove("sidebar-open");
    document.body.classList.remove('scroll-lock');

    [primary, secondary, primaryButtons[0], primaryButtons[1], secondaryButtons[0], secondaryButtons[1]].forEach((elem) => {
      if(elem) elem.classList.remove("active");
    });

    if(activeSidebar === "primary") {
      primary.classList.add("active");
      if(primaryButtons[0]) primaryButtons[0].classList.add("active");
      if(primaryButtons[1]) primaryButtons[1].classList.add("active");
    } else if(activeSidebar === "secondary") {
      secondary.classList.add("active");
      if(secondaryButtons[0]) secondaryButtons[0].classList.add("active");
      if(secondaryButtons[1]) secondaryButtons[1].classList.add("active");
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

  function setTheme(mode) {
    const themeSwitchLabel = themeSwitch.querySelector(".button-suffix");

    document.documentElement.setAttribute("data-theme", mode);
    themeSwitchLabel.innerHTML = mode === "light" ? "Switch To Dark" : "Switch To Light";
    localStorage.setItem('theme', mode);
  }

  function getDefaultTheme() {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme("light");
    } else if(localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme'))
    } else {
      setTheme("dark");
    }
  }

  getDefaultTheme();

  function toggleTheme() {
    
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    html.classList.add("disable-transitions");
  
    setTimeout(() => {
      html.classList.remove("disable-transitions");
    }, 100);

    if(theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  toggleTheme();


  // Email

  const sayHi = qDom(app, "say-hi");

  sayHi.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "mailto:xheightable@gmail.com";

  });


  // Help

  function removeHelp() {
    localStorage.setItem('help', 'hide');
    help.style.display = "none";
    document.body.classList.remove("help-lock");
  }

  function displayHelp() {
    help.style.display = "block";
    document.body.classList.add("help-lock");
  }


  // Return

  return app;

}

export default App;