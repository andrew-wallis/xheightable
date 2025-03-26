import highlightActiveItem from "../../../helpers/highlightActiveItem";
import sortPrimaryFonts from "../../../helpers/sortPrimaryFonts";
import getPercentage from "../../../utils/getPercentage";
import isObj from "../../../utils/isObj";
import qDom from "../../../utils/qDom";
import ListItem from "../../Elements/ListItem";
import FontList from "./FontList";

function PrimaryFontList(store) {

  const primary = document.createElement('div');
  primary.className = "aside-list scrollable-container";
  primary.dataset.element = "primary-sidebar";

  primary.appendChild(FontList({
    id: "primary",
    label: "Primary",
    store: store,
    options: ["A-Z", "Rating", "X-Height"],
    sort: "primarySort"
  }));

  function changePrimary(font) {
    store.setData({
      primaryFont: font,
      secondarySort: "Match",
      sidebar: store.getData().viewport >= 1024 ? store.getData().sidebar : "",
      open: false
    });
    
    const primaryList = qDom(primary, "aside-list");
    highlightActiveItem(primaryList, store.getData().primaryFont, true);
  }

  function updatePrimaryList() {

    const sort = store.getData().primarySort;
    const primaryList = qDom(primary, "aside-list");
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
      primaryList.dataset.sort = sort;
    }
  }

  store.subscribe(updatePrimaryList);
  updatePrimaryList();

  primary.addEventListener("focusin", () => {
    store.setData({sidebar: "primary"});
  });



  return primary;

}

export default PrimaryFontList;