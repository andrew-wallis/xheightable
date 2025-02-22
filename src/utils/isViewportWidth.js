function isViewportWidth(width) {
  return window.matchMedia(`(min-width: ${width}px)`).matches
}

export default isViewportWidth; 