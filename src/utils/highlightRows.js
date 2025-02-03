import qua from "./qua";

function highlightRows(container, font) {
  qua(container, "table-link").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-row");
    } else {
      row.classList.remove("active-row");
    }
  });
}

export default highlightRows;