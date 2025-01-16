function PairLabel() {

  const fontLabel = document.createElement('div');
  fontLabel.className = "pair-label";

  /* html */
  fontLabel.innerHTML = `
    <div data-element="label-text" class="secondary-text pair-label">
      <!-- Label Text -->
    </div>
    <div data-element="label-xHeight" class="secondary-text">
      <!-- Label xHeight -->
    </div>
  `;

  return fontLabel;

}

export default PairLabel;