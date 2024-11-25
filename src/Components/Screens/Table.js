import FontRow from "../Elements/FontRow";

function Table({sortedFonts, action, primaryFont}) {


  // Render

  const table = document.createElement('div');
  table.className = "flex flex-col pt-6 gap-4";

  const tableContainer = document.createElement('div');
  tableContainer.className = "flex flex-col";

  const render = () => {
    table.innerHTML = '';
    table.appendChild(tableContainer);
  
    sortedFonts.map((font, index) => {
      tableContainer.appendChild(FontRow({font: font, action: action, parent: "table"}));
    });
  }

  render();

  return table;

}

export default Table;