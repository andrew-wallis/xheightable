import FontRow from "../Elements/FontRow";
import SearchInput from "../Elements/SearchInput";
import highlightRows from "../../utils/highlightRows";
import sortAndFilterFonts from "../../utils/sortAndFilterFonts";

function Table(store) {

  
  const table = document.createElement('div');
  table.id = "table";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class="flex flex-col pt-6 gap-4">
      <div class="flex gap-4" data-element="table-search">
        <!-- Table Search -->
      </div>
      <div data-element="table-list" className="flex flex-col">
        <!-- Table List -->
      </div>
    </div>
  `;

  const tableSearch = table.querySelector('[data-element="table-search"');
  tableSearch.appendChild(SearchInput(store));

  function updateTableList() {
    
    const fonts = store.getData().fonts;
    const search = store.getData().search;

    const sortedFonts = store.getData().sortedFonts;
    let updateSortedFonts = sortAndFilterFonts(fonts, search);

    if(JSON.stringify(sortedFonts) !== JSON.stringify(updateSortedFonts)) {

      const tableList = table.querySelector('[data-element="table-list"]');
      tableList.innerHTML = '';

      updateSortedFonts.map((font, index) => {
        tableList.appendChild(FontRow({font: font, action: changePrimary}));
      });

      store.setData({sortedFonts: updateSortedFonts});
    }
  }

  store.subscribe(updateTableList);
  updateTableList();

  function changePrimary(font) {
    const tableList = table.querySelector('[data-element="table-list"]');
    highlightRows(tableList, font);
    store.setData({primaryFont: font});
    store.setData({activeScreen: "Pair"});
  }

  return table;

}

export default Table;