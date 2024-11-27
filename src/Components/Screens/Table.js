function Table() {

  
  const table = document.createElement('div');
  table.id = "table";
  table.className = "screen";
  table.style.display = "block";

  /* html */
  table.innerHTML = `
    <div class="flex flex-col pt-6 gap-4">
      <div data-element="table-input">
        <!-- Input -->
      </div>
      <div id="table-container" className="flex flex-col">
      </div>
    </div>
  `;

  return table;

}

export default Table;