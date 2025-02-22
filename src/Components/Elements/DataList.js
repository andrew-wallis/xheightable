function DataList(data) {

  const dataList = document.createElement('ul');
  dataList.className = "caption cluster moderate";
  
  Object.entries(data).map(([key, val]) => {

    const dataItem = document.createElement('li');

    if(key === "Font") {
      dataItem.innerHTML = val;
    } else {
      dataItem.innerHTML = `${key} ${val}`;
      dataItem.className = "tertiary";
    }

    dataList.appendChild(dataItem);
  });

  return dataList;

}

export default DataList;