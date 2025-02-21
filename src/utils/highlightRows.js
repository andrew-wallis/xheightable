import qaDom from "./qaDom";

function highlightRows(container, font) {
  qaDom(container, "table-link").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-row");
      row.scrollIntoView({ behavior: "instant", block: "nearest", inline: "start" });
    } else {
      row.classList.remove("active-row");
    }
  });
}

export default highlightRows;