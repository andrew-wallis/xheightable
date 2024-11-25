import Pair from "./Components/Screens/Pair";
import Table from "./Components/Screens/Table";
import findPairings from "./utils/findPairings";
import sortAndFilterFonts from "./utils/sortAndFilterFonts";

function App({data}) {


  // Fonts and pairings

  const fonts = data.fonts.filter(font => font.status !== "REMOVE");
  let primaryFont = {};
  let secondaryFont = {};
  let pairings = [];


  // Search and sort

  let search = "";
  let sortedFonts = sortAndFilterFonts(fonts, search);


  // Screens

  const screens = ["Table", "Pair", "Test", "Get Fonts"];
  let activeScreen = "Table";


  // Functions

  const changePrimary = (font) => {
    primaryFont = font;
    changePairings(font);
    changeScreen("Pair");
    render();
    const rows = document.querySelectorAll('.table-fontrow');
    rows.forEach(row => {
      if(row.id === `table-${font.name.replace(/\W/g,'_')}`) {
        row.classList.add("active-row");
      } else {
        row.classList.remove("active-row");
      }
    });
  }

  const changeSecondary = (font) => {
    secondaryFont = font;
  }

  const changePairings = (font) => {
    const {pairingList, pairingDefault} = findPairings(font, fonts);
    pairings = pairingList;
    secondaryFont = pairingDefault;
  }

  const back = () => {
    changeScreen("Table");
  }

  const changeScreen = (newScreen) => {
    activeScreen = newScreen;
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.style.display = screen.id === newScreen.toLowerCase() ? "block" : "none";
    });
  }


  // Render

  const app = document.createElement('div');
  app.className = "relative";

  const main = document.createElement('main');
  main.className = "px-6 pb-6";

  const tableContainer = document.createElement('div');
  tableContainer.id = "table";
  tableContainer.className = "screen";
  tableContainer.style.display = activeScreen === "Table" ? "block" : "none";
  
  const pairContainer = document.createElement('div');
  pairContainer.id = "pair";
  pairContainer.className = "screen";
  pairContainer.style.display = activeScreen === "Pair" ? "block" : "none";

  const render = () => {
    app.innerHTML = '';

    app.appendChild(main);
    
    tableContainer.innerHTML = '';
    const table = Table({
      sortedFonts: sortedFonts, 
      action: changePrimary,
      primaryFont: primaryFont
    });
    tableContainer.appendChild(table);
    main.appendChild(tableContainer);

    pairContainer.innerHTML = '';
    const pair = Pair({
      primaryFont: primaryFont,
      secondaryFont: secondaryFont,
      changeSecondary: changeSecondary,
      pairings: pairings,
      back: back
    });
    pairContainer.appendChild(pair);
    main.appendChild(pairContainer);
  }

  render();

  return app;

}

export default App;