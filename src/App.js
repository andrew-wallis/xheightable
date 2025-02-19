import getRandomArrayItem from "./utils/getRandomArrayKey";
import qDom from "./utils/qDom";
import Header from "./Components/Global/Header";
import Samples from "./Components/Sections/Samples/Samples";
import Secondary from "./Components/Global/Secondary";
import Primary from "./Components/Global/Primary";
import Test from "./Components/Sections/Test/Test";
import Horizontal from "./Components/Elements/Horizontal";
import ImportFonts from "./Components/Sections/ImportFonts/ImportFonts";
import './slider.css';
import getSampleText from "./utils/getSampleText";

function App({store}) {


  // Initial

  store.setData({
    primaryFont: getRandomArrayItem(store.getData().fonts),
    secondaryFont: {},
    primarySort: "A-Z",
    secondarySort: "Match",
    capAdjusts: true,
    lineHeights: true,
    embedLicence: ["Google"],
    affiliateLicence: ["Adobe"],
    sidebar: "",
    testTitle: getSampleText(2),
    testText: getSampleText(10)
  });

  const app = document.createElement('div');
  app.classList = ""

  /* html */
  app.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">

      </div>
    </div>
    <div data-element="slider" class="slider">
      <aside data-element="primary-sidebar">
        <!-- Primary Sidebar -->
      </aside>
      <main class="">
        <div data-element="main-content" class="insulate wrap">
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

  const slider = qDom(app, "slider");
  const main = qDom(app, "main-content");
  const primary = qDom(app, "primary-sidebar");
  const secondary = qDom(app, "secondary-sidebar");


  // Appends

  qDom(app, "top-bar").appendChild(Header());
  primary.appendChild(Primary(store));
  secondary.appendChild(Secondary(store));
  main.appendChild(Samples(store));
  main.appendChild(Test(store));
  main.appendChild(ImportFonts(store));


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
      document.body.classList.remove("sidebar-open");

      if(activeSidebar) {
        slider.classList.add(activeSidebar);
        slider.dataset.active = activeSidebar;
        document.body.classList.add("sidebar-open");
      } else {
        slider.dataset.active = "";
      }
    }
  }

  store.subscribe(updateSidebar);
  updateSidebar();

  function updateSidebarPositions() {

    const getSlider = document.querySelector('.slider');
    const getPrimary = document.querySelector('.slider > aside:first-child');
    const getSecondary = document.querySelector('.slider > aside:last-child');

    if(getSlider) {
      const sliderRect = getSlider.getBoundingClientRect();
      console.log(sliderRect);
      getPrimary.style.left = `${sliderRect.left}px`;
      getPrimary.style.top = `${sliderRect.top}px`;
      getSecondary.style.right = `${window.innerWidth - sliderRect.right}px`;
      getSecondary.style.top = `${sliderRect.top}px`;
    }
  }

  const observer = new MutationObserver((mutations, obs) => {
    const slider = document.querySelector('.slider');
    if (slider) {
      updateSidebarPositions();
      obs.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('resize', updateSidebarPositions);
  


  // Return

  return app;

  // Legacy theme and scroll functions

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