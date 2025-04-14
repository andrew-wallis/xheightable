import findSecondary from "../../../helpers/findSecondary";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import sortSecondaryFonts from "../../../helpers/sortSecondaryFonts";
import getPercentage from "../../../utils/getPercentage";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import ListItem from "../../Elements/ListItem";
import FontList from "./FontList";

function SecondaryFontList(store) {

  const secondary = document.createElement('div');
  secondary.className = "aside-list scrollable-container";
  secondary.dataset.element = "secondary-sidebar";

  secondary.appendChild(FontList({
    id: "secondary",
    label: "Secondary",
    store: store,
    options: ["Match", "A-Z", "Rating"],
    sort: "secondarySort"
  }));

  function changeSecondary(font) {
    store.setData({
      secondaryFont: font,
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : "",
      open: false
    });

    const secondaryList = qDom(secondary, "aside-list");
    highlightActiveItem(secondaryList, store.getData().secondaryFont, true);
  }


  function updateSecondaryList() {

    const sort = store.getData().secondarySort;
    const secondaryList = qDom(secondary, "aside-list");
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
          data: `${getPercentage(font.xHeightPct)}% (${getPercentage(font.xHeightDiff) === "0" ? "Match": getPercentage(font.xHeightDiff)})`
        }));
      });
       
      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, sortedFonts);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(secondaryList, store.getData().secondaryFont, true);

    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();

  secondary.addEventListener("focusin", () => {
    store.setData({sidebar: "secondary"});
  });

  return secondary;

}

export default SecondaryFontList;