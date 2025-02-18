function TestElement(type, content, classes) {

  let element;

  switch(type) {
    case "title":
      element = document.createElement("h3");
      setAttributes(element, content, `${classes ? classes : ""}`, "primary", "1.5", "lineMin", "bold");
      break;
    case "paragraph":
      element = document.createElement('p');
      setAttributes(element, content, classes, "secondary", "1", "lineMax", "normal");
      break;
  }

  function setAttributes(element, setContent, setClasses, font, size, leading, weight) {
    element.innerText = setContent;
    element.classList = `clickable ${setClasses}`;
    element.dataset.example = type;
    element.dataset.element = "clickable"
    element.dataset.font = font;
    element.dataset.size = size;
    element.dataset.leading = leading;
    element.dataset.weight = weight;
    element.dataset.fontFamily = "";
    element.tabIndex = "0";
  }

  return element;

}

export default TestElement;