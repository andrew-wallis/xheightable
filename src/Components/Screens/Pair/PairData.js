function PairData() {

  const data = document.createElement('ul');
  data.className = "caption cluster tertiary";

  /* html */
  data.innerHTML = `
    <li>
      X
        <span class="desktop">-Height</span> 
        <span class="data" data-element="data-xheight"><!-- Label Cap height --></span>
      %
    </li>
    <li>
      Cap
        <span class="desktop"> Height</span> 
        <span class="data" data-element="data-capheight"><!-- Label x-height --></span>
      %
    </li>
    <li>
      Line
        <span class="desktop"> Height</span> 
        <span class="data" data-element="data-lineheight"><!-- Label Line heights --></span>
    </li>
  `;

  return data;

}

export default PairData;