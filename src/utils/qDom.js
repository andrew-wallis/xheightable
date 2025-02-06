function qDom(element, value, selector = "element") {
  return element.querySelector(`[data-${selector}="${value}"]`);
}

export default qDom;