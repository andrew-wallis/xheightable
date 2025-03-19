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
      <ul role="listbox" tab-index="-1" data-element="sidebar-list" class="scrollable focus-padding">
        <!-- Pair List -->
      </ul>
    </div>
  `;

  qDom(sidebar, "sidebar-sort").appendChild(Select({
    action: changeSort,
    hideLabel: true,
    label: `Sort ${id} fonts`, 
    options: options,
    value: store.getData()[sort]
  }));

  function changeSort(value) {
    store.setData({[sort]: value});
  }

  return sidebar;

}

export default Sidebar;