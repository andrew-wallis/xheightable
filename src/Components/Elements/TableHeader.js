import Icons from "./Icons";

function TableHeader({fields, action}) {

  const tableHeader = document.createElement('tr');

  fields.forEach((field, index) => {

    const th = document.createElement('th');
    th.dataset.field = field;

    if(index === 0) {

      const span = document.createElement('span');
      span.className = "sr-only";
      span.innerText = field;
      th.appendChild(span);

    } else {

      const link = document.createElement('a');
      link.href = "#";
      link.innerText = field;
      th.appendChild(link);

      
      const tableArrow = document.createElement('div');
      tableArrow.className = "table-arrow";
      tableArrow.dataset.element = "table-arrow";
      tableArrow.appendChild(Icons("Arrow Down"));
      tableArrow.style.display = "none";
      link.appendChild(tableArrow);
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        action(field);
      });
    }

    tableHeader.appendChild(th);
  });

  return tableHeader;

}

export default TableHeader;