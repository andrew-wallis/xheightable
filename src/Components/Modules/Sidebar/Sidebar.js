import SidebarTemplate from "./SidebarTemplate";
import Button from "../../Elements/Button";
import ListItem from "../../Elements/ListItem";
import Select from "../../Elements/Select";
import findSecondary from "../../../helpers/findSecondary";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import sortPrimaryFonts from "../../../helpers/sortPrimaryFonts";
import sortSecondaryFonts from "../../../helpers/sortSecondaryFonts";
import isObj from "../../../utils/isObj";
import queryAllByData from "../../../utils/queryAllByData";


function Sidebar(store) {


  // Template

  const sidebar = SidebarTemplate();


  // Elements

  const primaryButton = Button({
    label: "Primary",
    suffix: "Font",
    classes: "button button-accent slub not-sidebar",
    action: changeSidebar,
    id: "primary"
  });

  const secondaryButton = Button({
    label: "Secondary",
    suffix: "Font",
    classes: "button button-accent slub not-sidebar",
    action: changeSidebar,
    id: "secondary"
  });

  const swapButton = Button({
    label: "Swap",
    suffix: "Primary and Secondary Font",
    classes: "button-secondary slub tertiary-text tertiary",
    icon: "Swap",
    action: changeSwap,
    id: "swap"
  });


  // Appends

  sidebar.switchWrapper.appendChild(primaryButton);
  sidebar.switchWrapper.appendChild(secondaryButton);
  sidebar.swapWrapper.appendChild(swapButton);


  // Functions

  function changeSidebar(value) {

    primaryButton.classList.remove("active");
    primaryButton.tabIndex = 0;
    secondaryButton.classList.remove("active");
    secondaryButton.tabIndex = 0;
    sidebar.primaryList.style.display = "none";
    sidebar.secondaryList.style.display = "none";
    let options = [];
    let sort = "";

    if(value === "primary") {
      primaryButton.classList.add("active");
      primaryButton.tabIndex = -1;
      sidebar.primaryList.style.display = "block";
      options = ["A-Z", "Rating", "X-Height"];
      sort = store.getData().primarySort;

    } else if(value === "secondary") {
      secondaryButton.classList.add("active");
      secondaryButton.tabIndex = -1;
      sidebar.secondaryList.style.display = "block";
      options = ["Match", "A-Z", "Rating"];
      sort = store.getData().secondarySort;
    }

    sidebar.sortWrapper.innerHTML = '';

    sidebar.sortWrapper.appendChild(Select({
      action: changeSort,
      hideLabel: true,
      label: `Sort fonts`,
      options: options,
      classes: "slub tertiary-text tertiary",
      value: sort
    }));

    sidebar.sortWrapper.dataset.target = value;

    if(value === "primary") {
      highlightActiveItem(sidebar.primaryList, store.getData().primaryFont, true);
    } else if(value === "secondary") {
      highlightActiveItem(sidebar.secondaryList, store.getData().secondaryFont, true, store.getData().lock);
    }
    
  }

  changeSidebar("primary");

  function changeSort(value) {
    if(sidebar.sortWrapper.dataset.target === "primary") {
      store.setData({primarySort: value});
    } else if(sidebar.sortWrapper.dataset.target === "secondary") {
      store.setData({secondarySort: value});
    }
  }

  function changeSwap() {
    const currentPrimary = store.getData().primaryFont;
    const currentSecondary = store.getData().secondaryFont;

    swapButton.classList.contains("is-toggled") ? swapButton.classList.remove("is-toggled") : swapButton.classList.add("is-toggled");

    store.setData({
      primaryFont: currentSecondary,
      secondaryFont: currentPrimary,
      lock: false
    });
  }


  // Subscribed Functions

  function updatePrimaryList() {

    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
    const sort = store.getData().primarySort;

    if(isObj(primaryFont) && 
      (sidebar.primaryList.dataset.primary !== primaryFont.name || sidebar.primaryList.dataset.sort !== sort)
    ) {

      sidebar.primaryList.innerHTML = '';

      const sortedFonts = sortPrimaryFonts({
        fonts: fonts,
        sort: sort
      });

      sortedFonts.map((font, index) => {
        sidebar.primaryList.appendChild(ListItem({
          font: font,
          action: changePrimary,
          target: "primary"
        }));
      });

      highlightActiveItem(sidebar.primaryList, store.getData().primaryFont, true);
      sidebar.primaryList.dataset.sort = sort;
      sidebar.primaryList.dataset.primary = primaryFont.name;

      function changePrimary(font) {

        sidebar.primaryList.dataset.primary = font.name;

        store.setData({
          primaryFont: font,
          secondaryFont: store.getData().lock ? store.getData().secondaryFont : {},
          secondarySort: store.getData().lock ? store.getData().secondarySort : "Match"
        });

        highlightActiveItem(sidebar.primaryList, store.getData().primaryFont, true);

      }
    }
  }

  store.subscribe(updatePrimaryList);
  updatePrimaryList();


  function updateSecondaryList() {

    const primaryFont = store.getData().primaryFont;
    const fonts = store.getData().fonts;
    const sort = store.getData().secondarySort;

    if(isObj(primaryFont) &&
      (sidebar.secondaryList.dataset.primary !== primaryFont.name || sidebar.secondaryList.dataset.sort !== sort) 
    ) {

      sidebar.secondaryList.innerHTML = '';

      const sortedFonts = sortSecondaryFonts({
        primary: primaryFont,
        fonts: fonts,
        sort: sort
      });

      sortedFonts.map((font, index) => {
        sidebar.secondaryList.appendChild(ListItem({
          font: font,
          action: changeSecondary,
          target: "secondary"
        }));
      });

      sidebar.secondaryList.dataset.primary = primaryFont.name;
      sidebar.secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, sortedFonts);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(sidebar.secondaryList, store.getData().secondaryFont, true, store.getData().lock);

      function changeSecondary(font) {
        if(font === store.getData().secondaryFont) {
          const lock = !store.getData().lock;
          highlightActiveItem(sidebar.secondaryList, font, true, lock);
          store.setData({
            lock: lock
          });

        } else {
          highlightActiveItem(sidebar.secondaryList, font, true, false);
          store.setData({
            secondaryFont: font,
            lock: false
          });
        }
      }
    }
  }

  store.subscribe(updateSecondaryList);
  updateSecondaryList();


  // Event Listeners

  sidebar.primaryList.addEventListener("keydown", (e) => {
    keyboardNavigation(e, sidebar.primaryList);
  });

  sidebar.secondaryList.addEventListener("keydown", (e) => {
    keyboardNavigation(e, sidebar.secondaryList);
  });

  function keyboardNavigation(e, list) {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {

      e.preventDefault();

      const listItems = Array.from(queryAllByData(list, 'list-item'));
      const currentItem = document.activeElement;
      const index = listItems.findIndex(item => item === currentItem);

      if(index === -1) return null;

      let nextIndex;

      if(e.key === "ArrowDown") {
        nextIndex = (index + 1) % listItems.length;
      } else if (e.key === "ArrowUp") {
        nextIndex = (index - 1  + listItems.length) % listItems.length;
      }

      currentItem.blur();
      currentItem.tabIndex = -1;

      const nextItem = listItems[nextIndex];
      nextItem.tabIndex = 0;
      nextItem.focus();
      
    }
  }

  return sidebar.template;

}

export default Sidebar;