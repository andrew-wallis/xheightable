import ListItem from "../Elements/ListItem";
import Select from "../Elements/Select";
import highlightRows from "../../utils/highlightRows";
import qDom from "../../utils/qDom";
import sortAndFilterFonts from "./helpers/sortAndFilterFonts";

function Primary(store) {
  
  const primary = document.createElement('div');
  primary.id = "primary";
  primary.className = "wrap insulate scrollable-container"

  /* html */
  primary.innerHTML = `
    <div class="insulate stack scrollable-container">
      <div data-element="primary-sort">
        <!-- Pair Filter -->
      </div>
      <ul data-element="primary-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
    </div>
  `;

  
  // Appends

  const primarySort = qDom(primary, "primary-sort");
  primarySort.appendChild(Select({
    label: "Sort", 
    options: ["A-Z", "Rating", "X-Height"], 
    value: store.getData().primarySort, 
    hideLabel: true, 
    action: changeSort
  }));


  // Functions

  function updatePrimaryList() {

    const sort = store.getData().primarySort;
    const primaryList = qDom(primary, "primary-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(Object.keys(primaryFont).length > 0 && primaryList.dataset.sort !== sort) {
      
      const sortedFonts = sortAndFilterFonts({fonts: fonts, sort: sort});

      primaryList.innerHTML = '';

      sortedFonts.map((font, index) => {
        primaryList.appendChild(ListItem({font: font, action: changePrimary, data: `${Math.round(font.xHeightPct * 100)}%`}));
      });

      highlightRows(primaryList, store.getData().primaryFont);

      primaryList.dataset.sort = sort;
    }
  }

  store.subscribe(updatePrimaryList);
  updatePrimaryList();

  function changePrimary(font) {
    store.setData({
      primaryFont: font,
      secondaryFont: {},
      secondarySort: "Match",
    });

    if(!store.getData().isDesktop) {
      store.setData({sidebar: ""});
    }

    const primaryList = qDom(primary, "primary-list");
    primaryList.dataset.primary = font.name;
    highlightRows(primaryList, font);
  }

  function changeSort(value) {
    store.setData({primarySort: value});
  }

  return primary;

}

export default Primary;