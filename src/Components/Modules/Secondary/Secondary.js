import ListItem from "../../Elements/ListItem";
import Select from "../../Elements/Select";
import sortSecondaryFonts from "./helpers/sortSecondaryFonts";
import findSecondary from "./helpers/findSecondary";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import getPercentage from "../../../utils/getPercentage";

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

  qDom(secondary, "secondary-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: "Sort Secondary Fonts", 
    options: ["Match", "A-Z", "Rating"], 
    value: store.getData().secondarySort
  }));


  // Functions

  function updateSecondaryList() {

    const sort = store.getData().secondarySort;
    const secondaryList = qDom(secondary, "secondary-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(isObj(primaryFont) && 
      (secondaryList.dataset.primary !== primaryFont.name
      || secondaryList.dataset.sort !== sort)
    ) {

      secondaryList.innerHTML = '';

      const pairings = sortSecondaryFonts({
        primary: primaryFont, 
        fonts: fonts, 
        sort: sort
      });

      pairings.map((font, index) => {
        secondaryList.appendChild(ListItem({
          font: font,
          action: changeSecondary,
          data: getPercentage(font.xHeightDiff)
        }));
      });
       
      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, pairings);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(secondaryList, store.getData().secondaryFont, true);

    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();


  function changeSecondary(font) {

    store.setData({
      secondaryFont: font,
      sidebar: store.getData().viewport <= 1024 ? store.getData().sidebar : ""
    });

    highlightActiveItem(qDom(secondary, "secondary-list"), font);
  }


  function changeSort(value) {
    store.setData({secondarySort: value});
  }


  // Return

  return secondary;

}

export default Secondary;