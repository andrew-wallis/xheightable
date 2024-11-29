function FontLabel() {

  const fontLabel = document.createElement('div');
  fontLabel.className = "flex gap-4 w-1/2";

  /* html */
  fontLabel.innerHTML = `
    <div data-element="label-text" class="grow whitespace-nowrap text-sm leading-4">
      <!-- Label Text -->
    </div>
    <div data-element="label-xHeight" class="shrink-0 text-xs leading-4">
      <!-- Label xHeight -->
    </div>
  `;

  return fontLabel;

}

export default FontLabel;