function qu(element, value, selector = "element") {
  return element.querySelector(`[data-${selector}="${value}"]`);
}

export default qu;