import TableSearch from "./TableSearch";
import TableSelect from "./TableSelect";
import FontLink from "../../Elements/FontLink/FontLink";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import styles from "./Table.module.css";
import TopBar from "../../Global/TopBar/TopBar";

function Table(store) {

  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <header class=${styles.header} data-element="table-header">
      <div data-element="table-topbar">
        <!-- Table Topbar -->
      </div>
      <div class="${styles.controlsWrapper}">
        <div class="${styles.controls} insulate wrap" data-element="table-controls">
          <!-- Table Controls -->
        </div>
      </div>
    </header>
    <main class="wrap" >
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Font</th>
            <th class="additional-data">Cap Height</th>
            <th>xHeight</th>
          </tr>
        </thead>
        <tbody data-element="table-list">
          <!-- Table List -->
        </tbody>
      </table>
    </main>
  `;

  const topBar = table.querySelector('[data-element="table-topbar"]');
  topBar.appendChild(TopBar());

  const tableControls = table.querySelector('[data-element="table-controls"]');
  tableControls.appendChild(TableSearch(store));
  tableControls.appendChild(TableSelect(store));

  function updateTableList() {
    
    const fonts = store.getData().fonts;
    const search = store.getData().search;
    const sort = store.getData().sort;

    const tableList = table.querySelector('[data-element="table-list"]');

    if(tableList.dataset.sort !== sort || tableList.dataset.search !== search) {
      
      const sortedFonts = sortAndFilterFonts(fonts, search, sort);

      tableList.innerHTML = '';

      sortedFonts.map((font, index) => {
        tableList.appendChild(FontLink({font: font, action: changePrimary}));
      });

      tableList.dataset.sort = sort;
      tableList.dataset.search = search;
    }
  }

  store.subscribe(updateTableList);
  updateTableList();

  function changePrimary(font) {
    store.setData({tableScroll: window.scrollY});
    store.setData({pairScroll: window.scrollY});
    store.setData({primaryFont: font});
    store.setData({activeScreen: "Pair"});
    const tableList = table.querySelector('[data-element="table-list"]');
    highlightRows(tableList, font);
  }

  return table;

}

export default Table;