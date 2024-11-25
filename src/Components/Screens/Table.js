import FontRow from "../Elements/FontRow";

function Table({sortedFonts, action}) {


  // Render

  const table = document.createElement('div');
  table.className = "flex flex-col pt-6 gap-4";

  const tableContainer = document.createElement('div');
  tableContainer.className = "flex flex-col";
  
  sortedFonts.map((font, index) => {
    tableContainer.appendChild(FontRow({font: font, action: action}));
  });

  const render = () => {
    table.innerHTML = '';
    table.appendChild(tableContainer);
  }

  render();

  return table;

}

export default Table;