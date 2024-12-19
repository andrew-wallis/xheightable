function ImportEmbed() {

  const importEmbed = document.createElement('div');
  importEmbed.className = "embed";

  /* html */
  importEmbed.innerHTML = `
    <h2 data-element="data-label">
      <!-- Data-Label -->
    </h2>
    <div data-element="data-details">
      <!-- Data-Get -->
    </div>
  `;

  return importEmbed;

}

export default ImportEmbed;