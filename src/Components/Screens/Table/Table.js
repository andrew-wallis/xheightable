import TableRow from "../../Elements/TableRow";
import Header from "../../Global/Header";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import areNotEqual from "../../../utils/areNotEqual";
import toggleItem from "../../../utils/toggleItem";
import Filters from "../../Elements/Filters";

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
      <div class="insulate stack-m">
        <div data-element="table-filter">
          <!-- Pair Filter -->
        </div>
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

  const tableFilter = table.querySelector('[data-element="table-filter"]');
  function updateTableFilters() {

    const filterData = store.getData().primaryFilter;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;

    if(tableFilter.dataset.sort !== sort
    || areNotEqual(licences, tableFilter.dataset.licences, )
    || areNotEqual(classifications, tableFilter.dataset.classifications)) {
      tableFilter.innerHTML = "";
      tableFilter.appendChild(Filters(filterData, changeFilters, ["A-Z", "Rating", "X-Height"]));

      tableFilter.dataset.licences = licences.join("|");
      tableFilter.dataset.classifications = classifications.join("|");
      tableFilter.dataset.sort = sort;
    }
  }

  store.subscribe(updateTableFilters);
  updateTableFilters();

  function updateTableList() {

    const filterData = store.getData().primaryFilter;
    const search = filterData.search;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;
    
    const tableList = table.querySelector('[data-element="table-list"]');
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(Object.keys(primary).length > 0 && 
      (tableList.dataset.primary !== primary.name
      || tableList.dataset.sort !== sort
      || areNotEqual(licences, tableList.dataset.licences)
      || areNotEqual(classifications, tableList.dataset.classifications))
    ) {
      
      const sortedFonts = sortAndFilterFonts({fonts: fonts, search: search, sort: sort, licences: licences, classifications: classifications});

      tableList.innerHTML = '';

      sortedFonts.map((font, index) => {
        tableList.appendChild(TableRow({font: font, action: changePrimary, fields: ["xHeightPct", "capHeightPct", "lineMin","lineMax"]}));
      });

      highlightRows(tableList, store.getData().primaryFont);

      tableFilter.dataset.licences = licences.join("|");
      tableFilter.dataset.classifications = classifications.join("|");
      tableFilter.dataset.sort = sort;
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

  function changeFilters(key, value) {

    const filterData = store.getData().primaryFilter;
    const licences = filterData.licences;
    const classifications = filterData.classifications;

    let updatedValue;

    if(key === "sort") {
      updatedValue = {sort: value};
    } else if(key === "licences") {
      updatedValue = {licences: toggleItem(licences, value)};
    } else if(key === "classifications") {
      updatedValue = {classifications: toggleItem(classifications, value)};
    }
    

    const updatedFilter = {...store.getData().primaryFilter, ...updatedValue};
    store.setData({primaryFilter: updatedFilter});
  }

  return table;

}

export default Table;