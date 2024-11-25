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

  const screens = ["Pair", "Test", "Get Fonts"];
  let activeScreen = "Table";


  // Functions

  const changePrimary = (font) => {
    primaryFont = font;
    changePairings(font);
    changeScreen("Pair");
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

  const changeScreen = (screen) => {
    activeScreen = screen;
    setDisplayConditions();
  }


  // Render

  const app = document.createElement('div');
  app.className = "relative";

  const main = document.createElement('main');
  main.className = "px-6 pb-6";

  const tableContainer = document.createElement('div');
  main.appendChild(tableContainer);

  const table = Table({
    sortedFonts: sortedFonts, 
    action: changePrimary,
    primaryFont: primaryFont
  });
  tableContainer.appendChild(table);

  const pairContainer = document.createElement('div');
  main.appendChild(pairContainer);

  const pair = Pair({
    primaryFont: primaryFont,
    secondaryFont: secondaryFont,
    changeSecondary: changeSecondary,
    pairings: pairings,
    back: back
  });
  pairContainer.appendChild(pair);

  const setDisplayConditions = () => {
    tableContainer.style.display = activeScreen === "Table" ? "block" : "none";
    pairContainer.style.display = activeScreen === "Pair" ? "block" : "none";
    //testContainer.style.display = activeScreen === "Test" ? "block" : "none";
    //getFontsContainer.style.display = activeScreen === "Pair" ? "block" : "none";
  }

  setDisplayConditions();

  const render = () => {
    app.innerHTML = '';
    app.appendChild(main);
  }

  render();

  return app;

}

export default App;