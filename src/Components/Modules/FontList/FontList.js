import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import Select from "../../Elements/Select";

function FontList({id, store, label, options, sort}) {

  const fontlist = document.createElement('div');
  fontlist.className = "scrollable-container stack";

  /* html */
  fontlist.innerHTML = `
    <div class="with-sidebar aside-header">
      <h3 class="not-sidebar">
        ${label}
      </h3>
      <div class="sidebar" data-element="fontlist-sort">
        <!-- Pair Filter -->
      </div>
    </div>
    <ul role="listbox" tabindex="-1" data-element="aside-list" class="scrollable focus-padding">
      <!-- Pair List -->
    </ul>
  `;


  // Apends

  qDom(fontlist, "fontlist-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: `Sort ${id} fonts`, 
    options: options,
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

  return fontlist;

}

export default FontList;