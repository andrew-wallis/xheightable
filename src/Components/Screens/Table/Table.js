import TableSearch from "./TableSearch";
import TableSelect from "./TableSelect";
import FontLink from "../../Elements/FontLink/FontLink";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import styles from "./Table.module.css";
import AppHeader from "../../Global/AppHeader/AppHeader";

function Table(store) {

  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <header data-element="table-header">
      <div data-element="top-bar">
        <!-- Table Topbar -->
      </div>
      <div class="background">
        <div class="${styles.container} insulate wrap" data-element="table-controls">
          <!-- Table Controls -->
        </div>
      </div>
    </header>
    <main class="wrap insulate stack">
      <table>
        <thead>
          <tr>
            <th><span class="sr-only">Licence</span></th>
            <th>Font</th>
            <th>x height</th>
            <th>Cap height</th>
          </tr>
        </thead>
        <tbody data-element="table-list">
          <!-- Table List -->
        </tbody>
      </table>
    </main>
  `;

  const topBar = table.querySelector('[data-element="top-bar"]');
  topBar.appendChild(AppHeader());

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