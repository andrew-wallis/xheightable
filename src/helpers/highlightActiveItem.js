import qaDom from "../utils/qaDom";

function highlightActiveItem(container, font) {
  qaDom(container, "list-item").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-item");
      row.scrollIntoView({ behavior: "instant", block: "nearest", inline: "start" });
    } else {
      row.classList.remove("active-item");
    }
  });
}

export default highlightActiveItem;