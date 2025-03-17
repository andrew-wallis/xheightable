import qaDom from "../utils/qaDom";

function highlightActiveItem(container, font, scroll, focus) {
  qaDom(container, "list-item").forEach(row => {
    if(row.dataset.name === font.name) {
      row.classList.add("active-item");
      //row.tabIndex = 0;

      if (scroll & container && row) {
        const containerRect = container.getBoundingClientRect();
        const rowRect = row.getBoundingClientRect();
      
        const isAbove = rowRect.top < containerRect.top;
        const isBelow = rowRect.bottom > containerRect.bottom;
      
        if (isAbove || isBelow) {
          container.scrollTo({
            top: row.offsetTop - container.offsetTop - 2,
            behavior: "instant",
          });
        }
      }

/*       if(focus) {
        row.focus();
      } */

    } else {
      row.classList.remove("active-item");
      //row.tabIndex = -1;
    }
  });
}

export default highlightActiveItem;