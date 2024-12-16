import TableRow from "../../Elements/TableRow";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import Branding from "../../Elements/Branding";

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
  topBar.appendChild(Branding());

  function updateTableList() {
    
    const fonts = store.getData().fonts;
    const search = store.getData().search;
    const sort = store.getData().sort;

    const tableList = table.querySelector('[data-element="table-list"]');

    if(tableList.dataset.sort !== sort || tableList.dataset.search !== search) {
      
      const sortedFonts = sortAndFilterFonts(fonts, search, sort);

      tableList.innerHTML = '';

      sortedFonts.map((font, index) => {
        tableList.appendChild(TableRow({font: font, action: changePrimary}));
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