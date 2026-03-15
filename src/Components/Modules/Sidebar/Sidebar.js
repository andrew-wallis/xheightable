import findSecondary from "../../../helpers/findSecondary";
import highlightActiveItem from "../../../helpers/highlightActiveItem";
import sortPrimaryFonts from "../../../helpers/sortPrimaryFonts";
import sortSecondaryFonts from "../../../helpers/sortSecondaryFonts";
import isObj from "../../../utils/isObj";
import queryAllByData from "../../../utils/queryAllByData";
import queryByData from "../../../utils/queryByData";
import Button from "../../Elements/Button";
import ListItem from "../../Elements/ListItem";
import Select from "../../Elements/Select";

function Sidebar(store) {

  const sidebar = document.createElement('aside');
  sidebar.className = "aside bg-background";
  sidebar.id = "sidebar";

  /* html */
  sidebar.innerHTML = `
    <div class="scrollable-container stack-l">
      <div class="stack-2xs focus-padding">
        <div data-element="switch-wrapper" class="button-group">
          <!-- Font Switch -->
        </div>
        <div class="with-sidebar align-center">
          <div class="not-sidebar" data-element="swap-wrapper">
            <!-- Swap Button -->
          </div>
          <div class="sidebar" data-element="sort-wrapper">
            <!-- Pair Filter -->
          </div>
        </div>
      </div>
      <ul role="listbox" tabindex="-1" data-element="primary-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
      <ul role="listbox" tabindex="-1" data-element="secondary-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
    </div>
  `


  // Queries

  const switchWrapper = queryByData(sidebar, "switch-wrapper");
  const swapWrapper = queryByData(sidebar, "swap-wrapper");
  const sortWrapper = queryByData(sidebar, "sort-wrapper");
  const primaryList = queryByData(sidebar, "primary-list");
  const secondaryList = queryByData(sidebar, "secondary-list");
  const closeSidebar = queryByData(sidebar, "close-sidebar");


  // Create Elements

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

  switchWrapper.appendChild(primaryButton);
  switchWrapper.appendChild(secondaryButton);
  swapWrapper.appendChild(swapButton);


  // Functions

  function changeSidebar(value) {

    primaryButton.classList.remove("active");
    primaryButton.tabIndex = 0;
    secondaryButton.classList.remove("active");
    secondaryButton.tabIndex = 0;
    secondaryButton.classList.remove("unselectable");
    primaryList.style.display = "none";
    secondaryList.style.display = "none";
    let options = [];
    let sort = "";

    if(value === "primary") {
      primaryButton.classList.add("active");
      primaryButton.tabIndex = -1;
      primaryList.style.display = "block";
      options = ["A-Z", "Rating", "X-Height"];
      sort = store.getData().primarySort;

    } else if(value === "secondary") {
      secondaryButton.classList.add("active");
      secondaryButton.tabIndex = -1;
      secondaryList.style.display = "block";
      options = ["Match", "A-Z", "Rating"];
      sort = store.getData().secondarySort;
    }

    sortWrapper.innerHTML = '';

    sortWrapper.appendChild(Select({
      action: changeSort,
      hideLabel: true,
      label: `Sort fonts`,
      options: options,
      classes: "slub tertiary-text tertiary",
      value: sort
    }));

    sortWrapper.dataset.target = value;

    if(value === "primary") {
      highlightActiveItem(primaryList, store.getData().primaryFont, true);
    } else if(value === "secondary") {
      highlightActiveItem(secondaryList, store.getData().secondaryFont, true, store.getData().lock);
    }
    
  }

  changeSidebar("primary");

  function changeSort(value) {
    if(sortWrapper.dataset.target === "primary") {
      store.setData({primarySort: value});
    } else if(sortWrapper.dataset.target === "secondary") {
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
      (primaryList.dataset.primary !== primaryFont.name || primaryList.dataset.sort !== sort)
    ) {

      primaryList.innerHTML = '';

      const sortedFonts = sortPrimaryFonts({
        fonts: fonts,
        sort: sort
      });

      sortedFonts.map((font, index) => {
        primaryList.appendChild(ListItem({
          font: font,
          action: changePrimary,
          target: "primary"
        }));
      });

      highlightActiveItem(primaryList, store.getData().primaryFont, true);
      primaryList.dataset.sort = sort;
      primaryList.dataset.primary = primaryFont.name;

      function changePrimary(font) {

        primaryList.dataset.primary = font.name;

        store.setData({
          primaryFont: font,
          secondaryFont: store.getData().lock ? store.getData().secondaryFont : {},
          secondarySort: store.getData().lock ? store.getData().secondarySort : "Match"
        });

        highlightActiveItem(primaryList, store.getData().primaryFont, true);

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
      (secondaryList.dataset.primary !== primaryFont.name || secondaryList.dataset.sort !== sort) 
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
          target: "secondary"
        }));
      });

      secondaryList.dataset.primary = primaryFont.name;
      secondaryList.dataset.sort = sort;

      if(!isObj(store.getData().secondaryFont)) {
        const newSecondary = findSecondary(primaryFont, sortedFonts);
        store.setData({secondaryFont: newSecondary});
      }

      highlightActiveItem(secondaryList, store.getData().secondaryFont, true, store.getData().lock);

      function changeSecondary(font) {

        if(font === store.getData().secondaryFont) {

          const lock = !store.getData().lock;

          highlightActiveItem(secondaryList, font, true, lock);

          store.setData({
            lock: lock
          });

        } else {

          highlightActiveItem(secondaryList, font, true, false);

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

  primaryList.addEventListener("keydown", (e) => {
    keyboardNavigation(e, primaryList);
  });

  secondaryList.addEventListener("keydown", (e) => {
    keyboardNavigation(e, secondaryList);
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

  return sidebar;

}

export default Sidebar;