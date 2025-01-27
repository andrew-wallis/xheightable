function PairLabel() {

  const fontLabel = document.createElement('ul');
  fontLabel.className = "caption data-label cluster-2xs";

  /* html */
  fontLabel.innerHTML = `
    <li>
      X<span class="desktop">-Height</span> <span class="data" data-element="label-xheight"><!-- Label Cap height --></span><span class="deweight">%</span>
    </li>
    <li>
      Cap <span class="desktop">Height</span> <span class="data" data-element="label-capheight"><!-- Label x-height --></span><span class="deweight">%</span>
    </li>
    <li>
      Line <span class="desktop">Height</span> <span class="data" data-element="label-lineheight"><!-- Label Line heights --></span>
    </li>
  `;

  return fontLabel;

}

export default PairLabel;