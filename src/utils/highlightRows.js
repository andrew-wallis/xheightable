function highlightRows(container, font) {
  const rows = container.querySelectorAll('[data-element="font-link"]');
  rows.forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-row");
    } else {
      row.classList.remove("active-row");
    }
  });
}

export default highlightRows;