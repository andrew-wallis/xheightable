function TableSelect(store) {

  const tableSelect = document.createElement('div');
  tableSelect.className = "w-24 shrink-0";

  /* html */
  tableSelect.innerHTML = `
    <label class="sr-only" for="">Sort</label>
    <select class="w-full rounded-lg border leading-[22px] px-2 py-2.5" data-element="table-select" name="table-sort" id="table-sort">
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
      <option value="xHiLo">x Height (High/Low)</option>
      <option value="xLoHi">x Height (Low/High)</option>
      <option value="RatingHiLo">Rating (High/Low)</option>
      <option value="RatingLoHi">Rating (Low/High)</option>
    </select>
  `;

  const select = tableSelect.querySelector('[data-element="table-select"]');

  tableSelect.addEventListener('change', function () {
    store.setData({sort: select.value});
  });


  return tableSelect;

}

export default TableSelect;