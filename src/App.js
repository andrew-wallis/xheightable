import BackLink from "./Components/Elements/BackLink";
import FontData from "./Components/Elements/FontData";
import FontLabel from "./Components/Elements/FontLabel";
import FontRow from "./Components/Elements/FontRow";
import IconButton from "./Components/Elements/IconButton";
import Sample from "./Components/Elements/Sample";
import Search from "./Components/Elements/Search";
import GetFonts from "./Components/Screens/GetFonts";
import Pair from "./Components/Screens/Pair";
import Table from "./Components/Screens/Table";
import Test from "./Components/Screens/Test";
import findPairings from "./utils/findPairings";
import getFontFamily from "./utils/getFontFamily";
import getFontSize from "./utils/getFontSize";
import sortAndFilterFonts from "./utils/sortAndFilterFonts";

function App({data}) {

  // Template

  const app = document.createElement('div');
  app.className = "relative"

  /* html */
  app.innerHTML = `
    <header class="sticky md:static z-[200] top-0 inset-x-0 bg-white">
      <div class="max-w-6xl mx-auto grid grid-cols-4 gap-2 py-4 px-6">
        <div></div>
        <h1 class="col-span-2 text-center uppercase tracking-wider font-semibold text-xs leading-4">
          xHeightable 4.1.1
        </h1>
        <div class="text-xs leading-4 font-medium tracking-wider uppercase justify-end flex gap-2 items-center">
        </div>
      </div>
    </header>
    <main id="main" class="px-6 pb-6">
      
    </main>
    <nav id="nav-bar" class="sticky md:absolute md:right-0 mx-8 nav-position" style="display: none">
      <div id="nav-container" class="max-w-lg mx-auto grid grid-cols-3 md:grid-cols-1 justify-between p-2 md:p-4 gap-4 rounded-full bg-white"></div>
    </nav>
  `


  // Fonts and pairings

  const fonts = data.fonts.filter(font => font.status !== "REMOVE");

  let primaryFont = {};
  let secondaryFont = {};

  
  // Screens

  const back = () => {
    changeScreen("Table");
  }

  const main = app.querySelector("#main");
  main.appendChild(Table());
  main.appendChild(Pair());
  main.appendChild(Test());
  main.appendChild(GetFonts());

  const backLinks = app.querySelectorAll('[data-link="back-link"]');
  backLinks.forEach((backLink) => {
    backLink.appendChild(BackLink({action: back}))
  })

  const navScreens = ["Pair", "Test", "GetFonts"];
  const navBar = app.querySelector("#nav-container");
  navScreens.map(screen => {
    navBar.appendChild(IconButton({icon: screen, action: changeScreen}));
  });


  // Search and sort

  let search = "";

  const searchContainer = app.querySelector('[data-element="table-input"]');

  searchContainer.appendChild(Search(updateSearch, search));

  function updateSearch(term) {
    search = term;
    updateTableList();
  }
  

  // Lists

  function updateTableList() {
    const tableContainer = main.querySelector("#table-container");
    tableContainer.innerHTML = '';

    let sortedFonts = sortAndFilterFonts(fonts, search);
    sortedFonts.map((font, index) => {
      tableContainer.appendChild(FontRow({font: font, action: changePrimary}));
    });
  }
  updateTableList();

  function updatePairingList(font) {
    const pairContainer = main.querySelector("#pair-container");
    pairContainer.innerHTML = '';

    if(Object.keys(font).length > 0) {
      const {pairingList, pairingDefault} = findPairings(font, fonts);


      if(pairingList.length > 0) {
        pairingList.map((font, index) => {
          pairContainer.appendChild(FontRow({font: font, action: changeSecondary}));
        });
      }

      changeSecondary(pairingDefault);
      updateRows("pair", pairingDefault);
    }
  }


  function updatePairingSample() {

    const pairLabels = app.querySelector("#pair-labels");
    pairLabels.innerHTML = '';

    pairLabels.appendChild(FontLabel({font: primaryFont}));
    pairLabels.appendChild(FontLabel({font: secondaryFont}));

    const pairSamples = app.querySelector("#pair-samples");
    pairSamples.innerHTML = '';

    pairSamples.appendChild(Sample({font: primaryFont, referenceFont: primaryFont}));
    pairSamples.appendChild(Sample({font: secondaryFont, referenceFont: primaryFont}));

  }


  function updateTestScreen() {

    const primaryFontFamily = getFontFamily(primaryFont);
    const secondaryFontFamily = getFontFamily(secondaryFont);

    const titles = app.querySelectorAll('[data-style="title"]');
    titles.forEach((title) => {
      title.style.fontFamily = primaryFontFamily;
      title.style.fontSize = getFontSize(primaryFont, 2.25);
      title.style.lineHeight = "2.25rem";
    });

    const headings = app.querySelectorAll('[data-style="heading"]');
    headings.forEach((heading) => {
      heading.style.fontFamily = primaryFontFamily;
      heading.style.fontSize = getFontSize(primaryFont, 1.5);
      heading.style.lineHeight = "1.75rem";
    });

    const ledes = app.querySelectorAll('[data-style="lede"]');
    ledes.forEach((lede) => {
      lede.style.fontFamily = secondaryFontFamily;
      lede.style.fontSize = getFontSize(primaryFont, 1.125);
      lede.style.lineHeight = "1.7rem";
    });

    const paragraphs = app.querySelectorAll('[data-style="paragraph"]');
    paragraphs.forEach((paragraph) => {
      paragraph.style.fontFamily = secondaryFontFamily;
      paragraph.style.fontSize = getFontSize(secondaryFont, 1);
      paragraph.style.lineHeight = "1.5rem";
    });

    const smalls = app.querySelectorAll('[data-style="small"]');
    smalls.forEach((small) => {
      small.style.fontFamily = secondaryFontFamily;
      small.style.fontSize = getFontSize(primaryFont, 0.875);
      small.style.lineHeight = "1rem";
    });

    const quotes = app.querySelectorAll('[data-style="quote"]');
    quotes.forEach((quote) => {
      quote.style.fontFamily = secondaryFontFamily;
      quote.style.fontSize = getFontSize(primaryFont, 1.125);
      quote.style.lineHeight = "1.7rem";
    });

    const captions = app.querySelectorAll('[data-style="caption"]');
    captions.forEach((caption) => {
      caption.style.fontFamily = secondaryFontFamily;
      caption.style.fontSize = getFontSize(primaryFont, 0.75);
      caption.style.lineHeight = "0.875rem";
    });
  }

  function updateGetFontsScreen() {

    const getFonts = app.querySelector("#get-fonts");
    getFonts.innerHTML = '';

    const primaryFontData = FontData(primaryFont);
    getFonts.appendChild(primaryFontData);

    const divider = document.createElement('hr');
    divider.className = "hr my-8 border-t-gray-100";
    getFonts.appendChild(divider);

    const secondaryFontData = FontData(secondaryFont);
    getFonts.appendChild(secondaryFontData);
  
  }
 
  function updateRows(container, font) {
    const rows = document.querySelectorAll(`#${container}-container .fontrow`);
    rows.forEach(row => {
      if(row.dataset.name === font.name) {
        row.classList.add("active-row");
      } else {
        row.classList.remove("active-row");
      }
    });
  }


  // Actions

  function changePrimary(font) {
    primaryFont = font;
    changeScreen("Pair");
    updatePairingList(font);
    updateRows("table", font);
  }

  function changeSecondary(font) {
    secondaryFont = font;
    updatePairingSample();
    updateTestScreen();
    updateGetFontsScreen();
    updateRows("pair", font);
  }

  function changeScreen(newScreen) {
    const screens = app.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.style.display = screen.id === newScreen.toLowerCase() ? "block" : "none";
    });

    const navBar = app.querySelector("#nav-bar");
    if(newScreen === "Table") {
      navBar.style.display = "none";
    } else {
      navBar.style.display = "block";
    }
  }

  return app;

}

export default App;