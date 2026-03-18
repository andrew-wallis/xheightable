import queryByData from "../../../utils/queryByData";

function SidebarTemplate() {

  const template = document.createElement("aside");
  template.className = "aside bg-background";
  template.id = "sidebar";

  /* html */
  template.innerHTML = `
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

  const switchWrapper = queryByData(template, "switch-wrapper");
  const swapWrapper = queryByData(template, "swap-wrapper");
  const sortWrapper = queryByData(template, "sort-wrapper");
  const primaryList = queryByData(template, "primary-list");
  const secondaryList = queryByData(template, "secondary-list");


  return {
    template,
    switchWrapper,
    swapWrapper,
    sortWrapper,
    primaryList,
    secondaryList
  }

}

export default SidebarTemplate;