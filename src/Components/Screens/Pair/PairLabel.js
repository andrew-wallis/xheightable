function PairLabel() {

  const fontLabel = document.createElement('ul');
  fontLabel.className = "caption data-label cluster";

  /* html */
  fontLabel.innerHTML = `
    <li>
      <strong data-element="label-text"><!-- Label Text --></strong>
    </li>
    <li>
      Cap height <span class="data" data-element="label-capheight"><!-- Label Cap height --></span><span class="deweight">%</span>
    </li>
    <li>
      x-height <span class="data" data-element="label-xheight"><!-- Label x-height --></span><span class="deweight">%</span>
    </li>
    <li>
      Line heights <span class="data" data-element="label-lineheight"><!-- Label Line heights --></span>
    </li>
  `;

  return fontLabel;

}

export default PairLabel;