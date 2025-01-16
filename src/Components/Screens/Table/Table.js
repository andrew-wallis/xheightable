import TableRow from "../../Elements/TableRow";
import highlightRows from "../../../utils/highlightRows";
import sortAndFilterFonts from "../../../utils/sortAndFilterFonts";
import TableHeader from "../../Elements/TableHeader";
import TableGuidance from "./TableGuidance";
import TableShowGuidance from "./TableShowGuidance";
import Header from "../../Global/Header";

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
      <div class="insulate table-y-scrollable">
        <table>
          <thead data-element="table-fields">
          <!-- Table Header -->
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

  const tableHeader = table.querySelector('[data-element="table-fields');
  tableHeader.appendChild(TableHeader({fields: ["Licence", "Font", "X-Height", "Cap Height", "Line Height (Headings)", "Line Height (Paragraphs)"], action: changeSort}));

  function updateGuidance() {
    const guidance = table.querySelector('[data-element="table-guidance"]');
    guidance.innerHTML = "";

    if(!localStorage.getItem('guidance')) {
      localStorage.setItem('guidance', "show");
    }

    if(localStorage.getItem('guidance') === "show") {
      guidance.appendChild(TableGuidance(toggleGuidance));
    } else {
      guidance.appendChild(TableShowGuidance(toggleGuidance));
    }
  }

  updateGuidance();


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

      const ths = tableHeader.querySelectorAll("th");

      ths.forEach((th) => {
        th.classList.remove("active");
        const tableArrow  = th.querySelector('[data-element="table-arrow"]');

        if(tableArrow) {
          tableArrow.style.display = "none";
        }

        if(sort.includes(th.dataset.field)) {
          th.classList.add("active");
          tableArrow.style.display = "block";
          
          if(sort.includes("Reverse")) {
            tableArrow.classList.add("reverse");
          } else {
            tableArrow.classList.remove("reverse");
          }
        }
      });

      tableList.dataset.sort = sort;
      tableList.dataset.search = search;
    }
  }

  store.subscribe(updateTableList);
  updateTableList();

  function toggleGuidance() {
    if(localStorage.getItem('guidance') === "show") {
      localStorage.setItem('guidance', "hide");
    } else {
      localStorage.setItem('guidance', "show");
    }

    updateGuidance();
  }

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