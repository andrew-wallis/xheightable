import ListItem from "../Elements/ListItem";
import Select from "../Elements/Select";
import findPairings from "./helpers/findPairings";
import highlightRows from "../../utils/highlightRows";
import qDom from "../../utils/qDom";
import findSecondary from "./helpers/findSecondary";

function Secondary(store) {

  const secondary = document.createElement('div');
  secondary.id = "secondary";
  secondary.className = "insulate wrap scrollable-container";

  /* html */
  secondary.innerHTML = `
    <div class="insulate stack scrollable-container">
      <div data-element="secondary-sort">
        <!-- Pair Filter -->
      </div>
      <ul data-element="secondary-list" class="scrollable focus-padding">
        <!-- Pair Table -->
      </ul>
    </div>
  `;


  // Appends

  const secondarySort = qDom(secondary, "secondary-sort");
  secondarySort.appendChild(Select({
    label: "Sort", 
    options: ["X-Height", "A-Z", "Rating"], 
    value: store.getData().secondarySort, 
    hideLabel: true, 
    action: changeSort
  }));


  // Functions

  function updateSecondaryList() {

    const sort = store.getData().secondarySort;
    const secondaryList = qDom(secondary, "secondary-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(Object.keys(primaryFont).length > 0 && 
      (secondaryList.dataset.primary !== primaryFont.name
      || secondaryList.dataset.sort !== sort)
    ) {

      secondaryList.innerHTML = '';

      const pairings = findPairings({font: primaryFont, fonts: fonts, sort: sort});
      pairings.map((font, index) => {
        secondaryList.appendChild(ListItem({font: font, action: changeSecondary, data: `${Math.round(font.xHeightDiff * 100)}%`}));
      });
       
      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(Object.keys(store.getData().secondaryFont).length === 0) {
        const newSecondary = findSecondary(primaryFont, pairings);
        store.setData({secondaryFont: newSecondary});
      }

      highlightRows(secondaryList, store.getData().secondaryFont);

    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();


  function changeSecondary(font) {

    if(!store.getData().isDesktop) {
      store.setData({sidebar: ""});
    }

    highlightRows(qDom(secondary, "secondary-list"), font);
    store.setData({secondaryFont: font});
  }


  function changeSort(value) {
    store.setData({secondarySort: value});
  }


  // Return

  return secondary;

}

export default Secondary;