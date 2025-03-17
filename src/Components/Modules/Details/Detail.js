function Detail() {

  const detail = document.createElement('div');
  detail.className = "stack"

  /* html */
  detail.innerHTML = `
    <h3 class="heading" data-element="detail-label">
      <!-- Detail Label-->
    </h3>
    <ul class="stack secondary">
      <li class="with-sidebar">
        <div class="not-sidebar"><strong>X Height</strong> (% of Cap Height)</div>
        <div class="data" data-element="x-height">
          <!-- X Height -->
        </div>
      </li>
      <li class="with-sidebar">
        <div class="not-sidebar"><strong>Cap Height</strong> (% of Font Size)</div>
        <div class="data" data-element="cap-height">
          <!-- Cap Height -->
        </div>
      </li>
      <li class="with-sidebar">
        <div class="not-sidebar"><strong>Line Height</strong></div>
        <div class="data" data-element="line-height">
          <!-- Line Height -->
        </div>
      </li>
    </ul>
    <a data-element="detail-cta" href="#" target="_blank" class="button button-icon button-large slub slub-large">
      <!-- Detail CTA -->
    </a>
    <div data-element="detail-footer">
      <!-- Detail Footer -->
    </div>
  `;

  return detail;

}

export default Detail;