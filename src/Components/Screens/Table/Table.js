import TableRow from "../../Elements/TableRow";
import Header from "../../Global/Header";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import areNotEqual from "../../../utils/areNotEqual";
import toggleItem from "../../../utils/toggleItem";
import Filters from "../../Elements/Filters";
import Button from "../../Elements/Button";

function Table(store) {
  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class="top-bar stack-m" data-element="top-bar">
      <!-- Table Topbar -->
    </div>
    <main class="wrap stack-m">
      <div class="table-close" data-element="table-close">
        <!-- Table Close -->
      </div>
      <div data-element="table-filter">
        <!-- Table Filter -->
      </div>
      <table>
        <thead class="sr-only">
          <tr>
            <th>Distribution</th>
            <th>Font</th>
            <th>Classification</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody data-element="table-list">
          <!-- Table List -->
        </tbody>
      </table>
    </main>
  `;

  const topBar = table.querySelector('[data-element="top-bar"]');
  
  topBar.appendChild(Header());



  const tableClose = document.createElement('div');
  tableClose.classList = "wrap table-close";
  tableClose.dataset.element = "table-close";
  tableClose.appendChild(Button({label: "Close", icon: "Cross", type: "close-button", action: closeTable, hideLabel: true}))
  topBar.appendChild(tableClose);

  const tableFilter = table.querySelector('[data-element="table-filter"]');
  const filterData = store.getData().primaryFilter;
  tableFilter.appendChild(Filters(filterData, changeFilters, ["Match", "A-Z", "Rating"]));

  function updateTableFilters() {

    const updateFilterData = store.getData().primaryFilter;
    const sort = updateFilterData.sort;
    const licences = updateFilterData.licences;
    const classifications = filterData.classifications;

    if(tableFilter.dataset.sort !== sort) {
      const sortSelect = tableFilter.querySelector('select');
      sortSelect.value = sort;
    }

    if(areNotEqual(licences, tableFilter.dataset.licences)) {
      const getLicences = tableFilter.querySelectorAll('[data-key="licence"]');
      getLicences.forEach((licence) => {
        if(licences.includes(licence.dataset.value)) {
          console.log(licence.classList);
          licence.classList.add("active");
        } else {
          licence.classList.remove("active");
        }
      });
      tableFilter.dataset.licences = licences.join("|");
    }

    if(areNotEqual(classifications, tableFilter.dataset.classifications)) {
      const getClassifications = tableFilter.querySelectorAll('[data-key="classification"]');
      getClassifications.forEach((classification) => {
        if(classifications.includes(classification.dataset.value)) {
          classification.classList.add("active");
        } else {
          classification.classList.remove("active");
        }
      });
      tableFilter.dataset.classifications = classifications.join("|");
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
    store.setData({activeSection: "Pair"});
    const tableList = table.querySelector('[data-element="table-list"]');
    highlightRows(tableList, font);
  }

  function closeTable() {
    store.setData({tableScroll: window.scrollY});
    store.setData({activeScreen: "Pair"});
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