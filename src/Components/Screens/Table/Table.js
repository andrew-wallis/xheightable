import TableSearch from "./TableSearch";
import TableSelect from "./TableSelect";
import FontLink from "../../Elements/FontLink/FontLink";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import styles from "./Table.module.css";

function Table(store) {

  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "flex";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class=${styles.header} data-element="table-header">
      <!-- Table Header -->
    </div>
    <div class=${styles.list} data-element="table-list">
      <!-- Table List -->
    </div>
  `;

  const tableHeader = table.querySelector('[data-element="table-header"');
  tableHeader.appendChild(TableSearch(store));
  tableHeader.appendChild(TableSelect(store));

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
    }

/*     if(tableList.dataset.search !== search) {

      const rows = tableList.querySelectorAll('[data-element="font-link"]');

      rows.forEach((row) => {
        if(search && !row.dataset.label.toLowerCase().includes(search)) {
          row.style.display = "none";
        } else {
          row.style.display = "";
        }
      });

      tableList.dataset.search = search;
    } */
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