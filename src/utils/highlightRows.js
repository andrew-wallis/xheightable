import qaDom from "./qaDom";

function highlightRows(container, font) {
  qaDom(container, "table-link").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-row");
    } else {
      row.classList.remove("active-row");
    }
  });
}

export default highlightRows;