import Icons from "../../Elements/Icons";
import styles from "./Table.module.css";

function TableSelect(store) {

  const tableSelect = document.createElement('div');
  tableSelect.className = styles.selectContainer;

  /* html */
  tableSelect.innerHTML = `
    <label class="sr-only" for="">Sort</label>
    <select class=${styles.select} data-element="table-select" name="table-sort" id="table-sort">
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
      <option value="xHiLo">x Height (High/Low)</option>
      <option value="xLoHi">x Height (Low/High)</option>
      <option value="PopularityHiLo">Popularity (High/Low)</option>
      <option value="PopularityLoHi">Popularity (Low/High)</option>
    </select>
    <div data-element="select-icon" class=${styles.selectIcon}>
      <!-- Search Icon -->
    </div>
  `;

  const select = tableSelect.querySelector('[data-element="table-select"]');
  tableSelect.addEventListener('change', function () {
    store.setData({sort: select.value});
  });

  const selectIcon = tableSelect.querySelector('[data-element="select-icon"]');
  selectIcon.appendChild(Icons("Arrow Down", "form-icon"));

  return tableSelect;

}

export default TableSelect;