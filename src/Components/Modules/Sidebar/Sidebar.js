import qaDom from "../../../utils/qaDom";
import qDom from "../../../utils/qDom";
import Select from "../../Elements/Select";

function Sidebar({id, store, options, sort}) {

  const sidebar = document.createElement('div');
  sidebar.className = "insulate wrap scrollable-container";

  /* html */
  sidebar.innerHTML = `
    <div class="insulate stack scrollable-container">
      <div data-element="sidebar-sort">
        <!-- Pair Filter -->
      </div>
      <ul role="listbox" tabindex="-1" data-element="sidebar-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
    </div>
  `;


  // Apends

  qDom(sidebar, "sidebar-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: `Sort ${id} fonts`, 
    options: options,
    value: store.getData()[sort]
  }));


  // Event Listeners

  const list = qDom(sidebar, "sidebar-list");

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

  return sidebar;

}

export default Sidebar;