function PairLabel() {

  const fontLabel = document.createElement('ul');
  fontLabel.className = "caption data-label cluster";

  /* html */
  fontLabel.innerHTML = `
    <li>
      X <span class="desktop">height</span> <span data-element="label-xheight"><!-- Label Cap height --></span><span class="deweight">%</span>
    </li>
    <li class="desktop">
      Cap <span class="desktop">height</span> <span data-element="label-capheight"><!-- Label x-height --></span><span class="deweight">%</span>
    </li>
    <li class="desktop">
      Line <span class="desktop">height</span> <span data-element="label-lineheight"><!-- Label Line heights --></span>
    </li>
  `;

  return fontLabel;

}

export default PairLabel;