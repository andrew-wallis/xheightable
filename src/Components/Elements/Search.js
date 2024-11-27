import Icons from "./Icons";

function Search(action, searchTerm) {

  const search = document.createElement('div');

  /* html */
  search.innerHTML = `
    <div class="relative">
      <input data-element="search" value="${searchTerm}" placeholder="Search" class="w-full rounded-lg border leading-[22px] pr-2 pl-11 py-2.5"/>
      <a data-link="reset-search" href="#" class="block top-0 left-0 bottom-0 flex items-center justify-center absolute">
        <div data-element="icon" class="h-11 w-11 flex justify-center items-center icon">
          <!-- Icon -->
        </div>
      </a>
    </div>
  `;

  const searchInput = search.querySelector('[data-element="search"]');

  const icon = search.querySelector('[data-element="icon"]');
  updateIcon(searchTerm);

  searchInput.addEventListener('keyup', function(e){
    action(e.target.value);
    updateIcon(e.target.value);

  });

  const dataLink = search.querySelector('[data-link="reset-search"]');
  dataLink.addEventListener('click', function(e){
    action("");
    searchInput.value = "";
    updateIcon("");
  });

  function updateIcon(term) {
    icon.innerHTML = '';
    if(term.length > 0) {
      icon.appendChild(Icons("Cross"));
    } else {
      icon.appendChild(Icons("Search"));
    }
  }

  return search;

}

export default Search;