import ListItem from "../../Elements/ListItem";
import Select from "../../Elements/Select";
import sortSecondaryFonts from "./helpers/sortSecondaryFonts";
import findSecondary from "./helpers/findSecondary";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import getPercentage from "../../../utils/getPercentage";
import Sidebar from "./Sidebar";

function Secondary(store) {

  const secondary = document.createElement('div');
  secondary.id = "secondary";
  secondary.className = "insulate wrap scrollable-container";


  // Appends

  secondary.append(Sidebar());

  qDom(secondary, "sidebar-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: "Sort Secondary Fonts", 
    options: ["Match", "A-Z", "Rating"], 
    value: store.getData().secondarySort
  }));

  //let sortedFonts;
  //let highlightedFont;


  // Event Listener

/*   const list = qDom(secondary, "secondary-list");

  list.addEventListener("keydown", (e) => {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const secondaryList = qDom(secondary, "secondary-list");
      const label = highlightedFont.label;
      const index = sortedFonts.findIndex(item => item.label === label);
  
      if (index === -1) return null;

      let nextIndex;

      if (e.key === "ArrowDown") {
        nextIndex = (index + 1) % sortedFonts.length;
      } else if (e.key === "ArrowUp") {
        nextIndex = (index - 1 + sortedFonts.length) % sortedFonts.length;
      }
    
      highlightActiveItem(secondaryList, sortedFonts[nextIndex], true, true);
      highlightedFont = sortedFonts[nextIndex];
    }
  }); */


  // Functions

  function updateSecondaryList() {

    const sort = store.getData().secondarySort;
    const secondaryList = qDom(secondary, "sidebar-list");
    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(isObj(primaryFont) && 
      (secondaryList.dataset.primary !== primaryFont.name
      || secondaryList.dataset.sort !== sort)
    ) {

      secondaryList.innerHTML = '';

      const sortedFonts = sortSecondaryFonts({
        primary: primaryFont, 
        fonts: fonts, 
        sort: sort
      });

      sortedFonts.map((font, index) => {
        secondaryList.appendChild(ListItem({
          font: font,
          action: changeSecondary,
          data: getPercentage(font.xHeightDiff)
        }));
      });
       
      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, sortedFonts);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(secondaryList, store.getData().secondaryFont, true);
      //highlightedFont = store.getData().secondaryFont;

    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();


  function changeSecondary(font) {

    store.setData({
      secondaryFont: font,
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : ""
    });

    highlightActiveItem(qDom(secondary, "secondary-list"), font);
    qDom(document, "main-content").scrollTop = 0;
  }


  function changeSort(value) {
    store.setData({secondarySort: value});
  }


  // Return

  return secondary;

}

export default Secondary;