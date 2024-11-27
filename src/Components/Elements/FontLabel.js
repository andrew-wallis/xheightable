function FontLabel({font}) {

  const fontLabel = document.createElement('div');
  fontLabel.className = "flex gap-4 w-1/2";

  /* html */
  fontLabel.innerHTML = `
    <div class="grow whitespace-nowrap overflow-hidden text-sm leading-4">${font.label}</div>
    <div class="shrink-0 text-xs leading-4">${font.xHeightPct}</div>
  `;

  return fontLabel;

}

export default FontLabel;