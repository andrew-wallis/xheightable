function getFontSize(font, size) {
  return `${size * (0.7 / font.capHeightPct )}rem`
}

export default getFontSize;