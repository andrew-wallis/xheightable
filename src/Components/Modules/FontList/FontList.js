import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import Button from "../../Elements/Button";
import Select from "../../Elements/Select";

function FontList({id, store, label, options, sort}) {

  const fontlist = document.createElement('div');
  fontlist.className = "scrollable-container stack-l";

  /* html */
  fontlist.innerHTML = `
    <div class="stack-2xs focus-padding">
      <div data-element="font-switch" class="button-group">
        <!-- Font Switch -->
      </div>
      <div class="with-sidebar aside-header">
        <div class="not-sidebar" data-element="swap-button">
          <!-- Swap Button -->
        </div>
        <div class="sidebar" data-element="fontlist-sort">
          <!-- Pair Filter -->
        </div>
      </div>
    </div>
    <ul role="listbox" tabindex="-1" data-element="aside-list" class="scrollable focus-padding">
      <!-- Pair List -->
    </ul>
  `;


  // Appends

  qDom(fontlist, "font-switch").appendChild(Button({
    label: "Primary",
    suffix: "Font",
    classes: `button button-secondary label not-sidebar`,
    action: changeSidebar,
    id: "primary"
  }));

  qDom(fontlist, "font-switch").appendChild(Button({
    label: "Secondary",
    suffix: "Font",
    classes: `button button-secondary label not-sidebar`,
    action: changeSidebar,
    id: "secondary"
  }));

  qDom(fontlist, "swap-button").appendChild(Button({
    label: "Swap",
    suffix: "Primary and Secondary Font",
    action: swap,
    classes: "button-icon-reverse button-tertiary label sub-label tertiary",
    icon: "Swap",
    id: "swap"
  }));

  qDom(fontlist, "fontlist-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: `Sort ${id} fonts`, 
    options: options,
    classes: "label sub-label tertiary",
    value: store.getData()[sort]
  }));


  // Event Listeners

  const list = qDom(fontlist, "aside-list");

  list.addEventListener("keydown", (e) => {

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {

      e.preventDefault();

      const listItems = Array.from(qaDom(list, 'list-item'));
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
  });

  
  // Functions

  function changeSort(value) {
    store.setData({[sort]: value});
  }

  function changeSidebar(value) {

    if(value === "primary") {
      store.setData({sidebar: "primary"});
      store.setData({open: true});
    } else if(value === "secondary") {
      store.setData({sidebar: "secondary"});
      store.setData({open: true});
    }

  }

  changeSidebar(store.getData().sidebar);

  function swap() {
    const currentPrimary = store.getData().primaryFont;
    const currentSecondary = store.getData().secondaryFont;

    store.setData({
      primaryFont: currentSecondary,
      secondaryFont: currentPrimary
    })
  }


  return fontlist;

}

export default FontList;