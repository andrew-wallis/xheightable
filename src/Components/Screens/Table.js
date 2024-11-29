import FontRow from "../Elements/FontRow";
import SearchInput from "../Elements/SearchInput";
import highlightRows from "../../utils/highlightRows";
import sortAndFilterFonts from "../../utils/sortAndFilterFonts";
import TableSelect from "../Elements/TableSelect";

function Table(store) {

  
  const table = document.createElement('div');
  table.id = "table";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class="flex flex-col pt-6 gap-4">
      <div class="flex gap-4" data-element="table-header">
        <!-- Table Header -->
      </div>
      <div data-element="table-list" className="flex flex-col">
        <!-- Table List -->
      </div>
    </div>
  `;

  const tableHeader = table.querySelector('[data-element="table-header"');
  tableHeader.appendChild(SearchInput(store));
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
        tableList.appendChild(FontRow({font: font, action: changePrimary}));
      });

      tableList.dataset.sort = sort;
    }

/*     if(tableList.dataset.search !== search) {

      const rows = tableList.querySelectorAll('[data-element="fontrow"]');

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
    const tableList = table.querySelector('[data-element="table-list"]');
    highlightRows(tableList, font);
    store.setData({tableScroll: window.scrollY});
    store.setData({pairScroll: window.scrollY});
    store.setData({primaryFont: font});
    store.setData({activeScreen: "Pair"});
  }

  return table;

}

export default Table;