function Detail() {

  const detail = document.createElement('div');
  detail.className = "stack"

  /* html */
  detail.innerHTML = `
    <h3 class="heading" data-element="detail-label">
      <!-- Detail Label-->
    </h3>
    <ul class="stack caption">
      <li class="with-sidebar">
        <div class="not-sidebar"><span class="slub">X Height</span> (% of Cap Height)</div>
        <div class="data" data-element="x-height">
          <!-- X Height -->
        </div>
      </li>
      <li class="with-sidebar">
        <div class="not-sidebar"><span class="slub">Cap Height</span> (% of Font Size)</div>
        <div class="data" data-element="cap-height">
          <!-- Cap Height -->
        </div>
      </li>
      <li class="with-sidebar">
        <div class="not-sidebar"><span class="slub">Line Height</span></div>
        <div class="data" data-element="line-height">
          <!-- Line Height -->
        </div>
      </li>
    </ul>
    <a data-element="detail-cta" href="#" target="_blank" class="button button-icon button-large slub">
      <!-- Detail CTA -->
    </a>
    <div data-element="detail-footer">
      <!-- Detail Footer -->
    </div>
  `;

  return detail;

}

export default Detail;