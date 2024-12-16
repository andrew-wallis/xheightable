function HtmlTable() {

  const table = document.createElement('table');

  /* html */
  table.innerHTML = `
    <thead>
      <tr>
        <th></th>
        <th>Font</th>
        <th>x height</th>
        <th>Cap height</th>
      </tr>
    </thead>
    <tbody data-element="pair-list">
      <!-- Pair List -->
    </tbody>
  `;

  return table;

}

export default HtmlTable;