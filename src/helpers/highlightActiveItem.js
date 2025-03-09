import qaDom from "../utils/qaDom";

function highlightActiveItem(container, font, scroll) {
  qaDom(container, "list-item").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-item");

      if (container && row && scroll) {
        container.scrollTo({
          top: row.offsetTop - container.offsetTop - 2,
          behavior: "instant",
        });
      }

    } else {
      row.classList.remove("active-item");
    }
  });
}

export default highlightActiveItem;