import qaDom from "./utils/qaDom";
import getRandomArrayItem from "./utils/getRandomArrayKey";
import qDom from "./utils/qDom";
import Header from "./Components/Global/Header";
import Button from "./Components/Elements/Button";
import Samples from "./Components/Sections/Samples/Samples";
import Secondary from "./Components/Global/Secondary";
import Primary from "./Components/Global/Primary";
import Test from "./Components/Sections/Test/Test";
import Horizontal from "./Components/Elements/Horizontal";
import ImportFonts from "./Components/Sections/ImportFonts/ImportFonts";

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
  });

  const app = document.createElement('div');
  app.classList = "stack-none page"

  /* html */
  app.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">

      </div>
    </div>
    <div data-element="slider" class="slider">
      <aside class="wrap" data-element="primary-sidebar">
        <!-- Primary Sidebar -->
      </aside>
      <main class="">
        <div class="stack scrollable-container wrap">
          <div data-element="main-sample" class="insulate ">
            <!-- Main Sample -->
          </div>
          <div data-element="main-content" class="scrollable insulate stack-xl">
            <!-- Main Content -->
          </div>
        </div>
        <div data-element="slider-overlay" class="slider-overlay"></div>
      </main>
      <aside class="wrap" data-element="secondary-sidebar">
        <!-- Secondary Sidebar -->
      </aside>
    </div>
  `;


  // Queries

  const slider = qDom(app, "slider");
  const main = qDom(app, "main-content");


  // Appends

  qDom(app, "top-bar").appendChild(Header());
  qDom(app, "primary-sidebar").appendChild(Primary(store));
  qDom(app, "secondary-sidebar").appendChild(Secondary(store));
  qDom(app, "main-sample").appendChild(Samples(store));

  main.appendChild(Test(store));
  main.appendChild(Horizontal());
  main.appendChild(ImportFonts(store));


  // Event Listeners

  qDom(app, "slider-overlay").addEventListener("click", function(e) {
    store.setData({sidebar: ""});
  });


  // Functions

  function updateSidebar() {

    const activeSidebar = store.getData().sidebar;

    if(slider.dataset.active !== activeSidebar) {
      slider.classList.remove("secondary");
      slider.classList.remove("primary");

      if(activeSidebar) {
        slider.classList.add(activeSidebar);
        slider.dataset.active = activeSidebar;
      } else {
        slider.dataset.active = "";
      }
    }
  }

  store.subscribe(updateSidebar);
  updateSidebar();


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