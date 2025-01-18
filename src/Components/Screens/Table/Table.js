import TableRow from "../../Elements/TableRow";
import Header from "../../Global/Header";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";

function Table(store) {
  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class="top-bar" data-element="top-bar">
      <!-- Table Topbar -->
    </div>
    <main class="wrap stack">
      <div class="insulate" data-element="table-guidance">
        <!-- Table Guidance -->
      </div>
      <div class="insulate">
        <table>
          <thead class="sr-only">
            <tr>
              <th>Distribution</th>
              <th>Font</th>
              <th class="desktop">Classification</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody data-element="table-list">
            <!-- Table List -->
          </tbody>
        </table>
      </div>
    </main>
  `;

  const topBar = table.querySelector('[data-element="top-bar"]');
  topBar.appendChild(Header());

  function updateTableList() {
    
    const fonts = store.getData().fonts;
    const search = store.getData().search;
    const sort = store.getData().sort;

    const tableList = table.querySelector('[data-element="table-list"]');

    if(tableList.dataset.sort !== sort || tableList.dataset.search !== search) {
      
      const sortedFonts = sortAndFilterFonts(fonts, search, sort);

      tableList.innerHTML = '';

      sortedFonts.map((font, index) => {
        tableList.appendChild(TableRow({font: font, action: changePrimary, fields: ["xHeightPct", "capHeightPct", "lineMin","lineMax"]}));
      });

      highlightRows(tableList, store.getData().primaryFont);

      tableList.dataset.sort = sort;
      tableList.dataset.search = search;
    }
  }

  store.subscribe(updateTableList);
  updateTableList();

  function changePrimary(font) {
    store.setData({tableScroll: window.scrollY});
    store.setData({pairScroll: 0});
    store.setData({primaryFont: font});
    store.setData({activeScreen: "Pair"});
    const tableList = table.querySelector('[data-element="table-list"]');
    highlightRows(tableList, font);
  }

  function changeSort(field) {

    const currentStore = store.getData().sort;

    if(currentStore.includes(field)) {
      if(currentStore.includes("Reverse")) {
        store.setData({sort: field});
      } else {
        store.setData({sort: `${field} Reverse`});
      }
    } else {
      store.setData({sort: field});

    }

  }

  return table;

}

export default Table;