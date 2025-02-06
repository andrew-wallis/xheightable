function qaDom(element, value, selector = "element") {
  return element.querySelectorAll(`[data-${selector}="${value}"]`);
}

export default qaDom;