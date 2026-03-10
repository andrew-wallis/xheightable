function queryByData(element, value, selector = "element") {
  return element.querySelector(`[data-${selector}="${value}"]`);
}

export default queryByData;