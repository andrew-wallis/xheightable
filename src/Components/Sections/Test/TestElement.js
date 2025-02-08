function TestElement(type, content, classes) {

  let element;
  
  if(Array.isArray(content)) {

    element = document.createElement("ul");
    element.classList = classes;

    content.forEach((item) => {
      const li = document.createElement("li");

      switch(type) {
        case "paragraph":
          setAttributes(li, item, "", "secondary", "1", "lineMax", "normal");
          break;
        case "citation":
          setAttributes(li, item, "", "primary", "0.875", "lineMin", "normal");
          break;
      }

      element.appendChild(li);
    });

  } else {
    switch(type) {
      case "title":
        element = document.createElement("h3");
        setAttributes(element, content, `uppercase ${classes}`, "primary", "2.5", "lineMin", "bold");
        break;
      case "paragraph":
        element = document.createElement('p');
        setAttributes(element, content, classes, "secondary", "1", "lineMax", "normal");
        break;
      case "lede":
        element = document.createElement('p');
        setAttributes(element, content, `secondary em ${classes}`, "secondary", "1.125", "lineMax", "normal");
        break;
      case "heading":
        element = document.createElement('h4');
        setAttributes(element, content, `test-heading ${classes}`, "primary", "1.6", "lineMin", "bold");
        break;
      case "subheading":
        element = document.createElement('h5');
        setAttributes(element, content, `test-subheading ${classes}`, "primary", "1.125", "lineMin", "bold");
        break;
      case "quote":
        element = document.createElement('blockquote');
        setAttributes(element, content, classes, "primary", "1.125", "lineMin", "normal");
        break;
      case "citation":
        element = document.createElement('cite');
        setAttributes(element, content, `slub ${classes}`, "secondary", "0.875", "lineMin", "bold");
        break;
      case "label":
        element = document.createElement('div');
        setAttributes(element, content, classes, "primary", "0.875", "lineMin", "normal");
        break;
      case "button":
        element = document.createElement('div');
        setAttributes(element, content, classes, "primary", "0.875", "lineMin", "bold");
        break;
    }
    
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