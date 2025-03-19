function Sidebar() {

  const sidebar = document.createElement('div');
  sidebar.className = "insulate stack scrollable-container"

  /* html */
  sidebar.innerHTML = `
    <div data-element="sidebar-sort">
      <!-- Pair Filter -->
    </div>
    <ul role="listbox" tab-index="-1" data-element="sidebar-list" class="scrollable focus-padding">
      <!-- Pair List -->
    </ul>
  `;

  return sidebar;

}

export default Sidebar;