import TableRow from "../../Elements/TableRow";
import Button from "../../Elements/Button";
import Header from "../../Global/Header";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import areNotEqual from "../../../utils/areNotEqual";
import toggleItem from "../../../utils/toggleItem";
import Filters from "../../Elements/Filters";
import qu from "../../../utils/qu";
import qua from "../../../utils/qua";

function Table(store) {
  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";
  table.dataset.screen = "Table";
  table.dataset.element = "screen";

  /* html */
  table.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">
        <!-- Table Topbar -->
      </div>
      <div class="insulate wrap stack">
        <div class="cluster" data-element="table-back">
          <!-- Table Close -->
        </div>
        <div data-element="table-filter">
          <!-- Table Filter -->
        </div>
      </div>
    </div>
    <main class="wrap stack-m">
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

  qu(table, "top-bar").appendChild(Header());
  qu(table, "table-back").appendChild(Button({label: "Back", icon: "Arrow Left", type: "slim-button", action: closeTable}));

  const tableFilter = qu(table, "table-filter");
  const filterData = store.getData().primaryFilter;
  tableFilter.appendChild(Filters(filterData, changeFilters, ["Rating", "A-Z", "X-Height"]));

  function updateTableFilters() {

    const updateFilterData = store.getData().primaryFilter;
    const sort = updateFilterData.sort;
    const licences = updateFilterData.licences;
    const classifications = filterData.classifications;

    if(tableFilter.dataset.sort !== sort) {
      tableFilter.querySelector('select').value = sort;
    }

    if(areNotEqual(licences, tableFilter.dataset.licences)) {
      qua(tableFilter, "licence", "key").forEach((licence) => {
        if(licences.includes(licence.dataset.value)) {
          licence.classList.add("active");
        } else {
          licence.classList.remove("active");
        }
      });
      tableFilter.dataset.licences = licences.join("|");
    }

    if(areNotEqual(classifications, tableFilter.dataset.classifications)) {
      qua(tableFilter, "classification", "key").forEach((classification) => {
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
    
    const tableList = qu(table, "table-list");
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
        tableList.appendChild(TableRow({font: font, action: changePrimary}));
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
    store.setData({
      tableScroll: window.scrollY,
      pairScroll: 0,
      primaryFont: font,
      activeScreen: "Pair",
      activeSection: "Pair",
      secondaryFilter: {
        sort: "Match",
        licences: [],
        classifications: []
      }
    });
    highlightRows(qu(table, "table-list"), font);
  }

  function closeTable() {
    store.setData({
      tableScroll: window.scrollY,
      activeScreen: "Pair"
    });
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