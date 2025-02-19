function PairData() {

  const data = document.createElement('ul');
  data.className = "caption moderate cluster-s tertiary";

  /* html */
  data.innerHTML = `
    <li>
      X H<span class="desktop">ei</span>g<span class="desktop">h</span>t <span class="data" data-element="data-xheight"><!-- Label Cap height --></span>%
    </li>
    <li>
      Cap H<span class="desktop">ei</span>g<span class="desktop">h</span>t <span class="data" data-element="data-capheight"><!-- Label x-height --></span>%
    </li>
    <li>
      Line H<span class="desktop">ei</span>g<span class="desktop">h</span>t <span class="data" data-element="data-capheight"><!-- Label x-height --></span> <span class="data" data-element="data-lineheight"><!-- Label Line heights --></span>
    </li>
  `;

  return data;

}

export default PairData;