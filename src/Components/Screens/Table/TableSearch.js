import styles from "./Table.module.css";

function TableSearch(store) {

  const searchContainer = document.createElement('div');
  searchContainer.className = styles.searchContainer;


  /* html */
  searchContainer.innerHTML = `
    <input data-element="search" class=${styles.search} type="text" placeholder="Search"/>
  `;
  
  const input = searchContainer.querySelector('[data-element="search"]');
  input.addEventListener('input', function(e) {
    store.setData({ search: e.target.value });
  });

/*   const reset = searchContainer.querySelector('[data-element="reset-search"]');
  reset.addEventListener('click', function(e) {
    e.preventDefault();
    input.value = "";
    store.setData({ search: "" });
  })

  const icons = searchContainer.querySelector('[data-element="search-icons"]');

  icons.appendChild(Icons("Cross"));
  icons.appendChild(Icons("Search"));

  const iconReset = searchContainer.querySelector('[data-icon="Cross"]');
  const iconSearch = searchContainer.querySelector('[data-icon="Search"]');

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
  updateIcon(); */

  return searchContainer;

}

export default TableSearch;