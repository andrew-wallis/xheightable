import Icons from "../../Elements/Icons";
import styles from "./Table.module.css";

function TableSearch(store) {

  const searchContainer = document.createElement('div');
  searchContainer.className = styles.searchContainer;


  /* html */
  searchContainer.innerHTML = `
    <input data-element="search" type="search" placeholder="Search"/>
    <div data-element="search-icon" class=${styles.searchIcon}>
      <!-- Search Icon -->
    </div>
    <a href="#" data-element="reset-icon" style="display: none;" class=${styles.resetIcon}>
      <!-- Reset Icon -->
    </a>
  `;
  
  const input = searchContainer.querySelector('[data-element="search"]');
  input.addEventListener('input', function(e) {
    store.setData({ search: e.target.value });
  });


  const searchIcon = searchContainer.querySelector('[data-element="search-icon"]');
  const resetIcon = searchContainer.querySelector('[data-element="reset-icon"]');

  searchIcon.appendChild(Icons("Search", "icon"));
  resetIcon.appendChild(Icons("Cross", "icon"));

  resetIcon.addEventListener('click', function(e) {
    e.preventDefault();
    input.value = "";
    store.setData({ search: "" });
  })

  function updateIcon() {
    const term = store.getData().search;

    if(term.length > 0) {
      resetIcon.style.display = "block";
    } else {
      resetIcon.style.display = "none";
    }
  }

  store.subscribe(updateIcon);
  updateIcon();

  return searchContainer;

}

export default TableSearch;