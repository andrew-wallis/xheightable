import Icons from "./Icons";

function SearchInput(store) {

  const searchDiv = document.createElement('div');
  searchDiv.className = "relative grow";


  /* html */
  searchDiv.innerHTML = `
    <input data-element="search" type="text" placeholder="Search" class="w-full rounded-lg border leading-[22px] pr-2 pl-11 py-2.5"/>
    <a data-element="reset-search" href="#" class="block top-0 left-0 bottom-0 flex items-center justify-center absolute">
      <div data-element="search-icons" class="h-11 w-11 flex justify-center items-center icon">
        <!-- Icons -->
      </div>
    </a>
  `;
  
  const input = searchDiv.querySelector('[data-element="search"]');
  input.addEventListener('input', function(e) {
    store.setData({ search: e.target.value });
  });

  const reset = searchDiv.querySelector('[data-element="reset-search"]');
  reset.addEventListener('click', function(e) {
    e.preventDefault();
    store.setData({ search: "" });
  })

  const icons = searchDiv.querySelector('[data-element="search-icons"]');

  icons.appendChild(Icons("Cross"));
  icons.appendChild(Icons("Search"));

  const iconReset = searchDiv.querySelector('[data-icon="Cross"]');
  const iconSearch = searchDiv.querySelector('[data-icon="Search"]');

  function updateIcon() {
    const term = store.getData().search;

    if(term.length > 0) {
      iconReset.style.display = "block";
      iconSearch.style.display = "none";
    } else {
      iconReset.style.display = "none";
      iconSearch.style.display = "block";
    }
  }

  store.subscribe(updateIcon);
  updateIcon();

  return searchDiv;

}

export default SearchInput;