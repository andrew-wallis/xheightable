import Header from "./Components/Modules/Header/Header";
import Samples from "./Components/Modules/Samples/Samples";
import Test from "./Components/Modules/Test/Test";
import Help from "./Components/Modules/Help/Help";
import Sidebar from "./Components/Modules/Sidebar/Sidebar";
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
    <header class="bg-background" role="banner" data-element="top-bar">
      <!-- Top Bar -->
    </header>
    <div data-element="aside-container" class="center scrollable-container aside-container">
      <main data-element="main" class="main scrollable-container">
        <div data-element="main-content" class="stack-3xl wrap scrollable">
          <!-- Main Content -->
        </div>
        <div data-element="aside-overlay" class="aside-overlay"></div>
      </main>
      <aside class="aside" data-element="aside">
        <!-- Aside -->
      </aside>
    </div>
    <footer class="secondary-text secondary bg-background">
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

  const container = qDom(app, "aside-container");
  const mainContent = qDom(app, "main-content");
  const aside = qDom(app, "aside");


  // Create Elements

  const sidebar = Sidebar(store);
  const help = Help();

  const themeSwitch = Button({
    label: "Theme",
    action: toggleTheme,
    suffix: " "
  });

  const hideHelp = Button({
    label: "Close",
    action: removeHelp,
    classes: "button slub secondary"
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
    classes: "button slub secondary change-fonts",
    action: openAside
  }))

  mainContent.appendChild(Test(store));
  aside.appendChild(sidebar);
  
  qDom(app, "theme-switch").appendChild(themeSwitch);
  qDom(app, "help-switch").appendChild(showHelp);


  // Event Listeners

  qDom(app, "aside-overlay").addEventListener("click", function(e) {
    store.setData({open: false});
    container.classList.remove("is-sidebar-open");
    document.body.classList.remove('scroll-lock');
  });


  // Functions

  function openAside() {
    store.setData({open: true});
  }

  function updateAside() {

    if(store.getData().open === true && !container.classList.contains("is-sidebar-open")) {
      const viewport = store.getData().viewport;
      const isDesktop = viewport >= 1024 ? true : false;
      container.classList.add("is-sidebar-open");

      if(!isDesktop) {
        document.body.classList.add('scroll-lock');
      }
    } else if(store.getData().open === false && container.classList.contains("is-sidebar-open")) {
      container.classList.remove("is-sidebar-open");
      document.body.classList.remove('scroll-lock');
    }
  }
  
  store.subscribe(updateAside);


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
      setTheme("light");
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