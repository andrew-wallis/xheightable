
import ListItem from "../../Elements/ListItem";
import Select from "../../Elements/Select";
import sortPrimaryFonts from "./helpers/sortPrimaryFonts";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import getPercentage from "../../../utils/getPercentage";

function Primary(store) {
  
  const primary = document.createElement('div');
  primary.id = "primary";
  primary.className = "insulate wrap scrollable-container"

  /* html */
  primary.innerHTML = `
    <div class="insulate stack scrollable-container">
      <div data-element="primary-sort">
        <!-- Pair Filter -->
      </div>
      <ul role="listbox" tab-index="-1" data-element="primary-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
    </div>
  `;


  
  // Appends

  qDom(primary, "primary-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: "Sort Primary Fonts", 
    options: ["A-Z", "Rating", "X-Height"], 
    value: store.getData().primarySort
  }));

  //let sortedFonts;
  //let highlightedFont;


  // Event Listener

/*   const list = qDom(primary, "primary-list");

  list.addEventListener("keydown", (e) => {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const primaryList = qDom(primary, "primary-list");
      const label = highlightedFont.label;
      const index = sortedFonts.findIndex(item => item.label === label);
  
      if (index === -1) return null;

      let nextIndex;

      if (e.key === "ArrowDown") {
        nextIndex = (index + 1) % sortedFonts.length;
      } else if (e.key === "ArrowUp") {
        nextIndex = (index - 1 + sortedFonts.length) % sortedFonts.length;
      }
    
      highlightActiveItem(primaryList, sortedFonts[nextIndex], true, true);
      highlightedFont = sortedFonts[nextIndex];
    }
  }); */


  // Functions

  function updatePrimaryList() {

    const sort = store.getData().primarySort;
    const primaryList = qDom(primary, "primary-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(isObj(primaryFont) > 0 && primaryList.dataset.sort !== sort) {

      primaryList.innerHTML = '';

      const sortedFonts = sortPrimaryFonts({
        fonts: fonts, 
        sort: sort
      });
      
      sortedFonts.map((font, index) => {
        primaryList.appendChild(ListItem({
          font: font,
          action: changePrimary,
          data: getPercentage(font.xHeightPct)
        }));
      });

      highlightActiveItem(primaryList, store.getData().primaryFont, true);
      //highlightedFont = store.getData().primaryFont;
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
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : ""
    });

    const primaryList = qDom(primary, "primary-list");
    primaryList.dataset.primary = font.name;
    highlightActiveItem(primaryList, font);
    qDom(document, "main-content").scrollTop = 0;
    //highlightedFont = font;
  }


  function changeSort(value) {
    store.setData({primarySort: value});
  }


  // Return

  return primary;

}

export default Primary;