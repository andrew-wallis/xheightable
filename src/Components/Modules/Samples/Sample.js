function Sample() {

  const sample = document.createElement('div');
  sample.classList = "stack-l unselectable";

  /* html */
  sample.innerHTML = `
    <div class="stack-2xs sample">
      <div class="sample-wrapper">
        <div class="sample-header">
          <div class="sample-align">
            <div class="sample-leader" data-element="label-leader">A</div>
            <div data-element="label-text">
              <!-- Label -->
            </div>
          </div>
          <div class="focus-padding" data-element="sample-action">
            <!-- Action -->
          </div>
        </div>
        <div class="sample-align">
          <div class="sample-leader" data-element="sample-leader">A</div>
          <div class="sample-text" data-element="sample-text">
            <div class="sample-guide-text" data-element="sample-text-abc">
              <!-- Sample Text -->
            </div>
            <div class="sample-display-text" data-element="sample-text-abc">
              <!-- Sample Text -->
            </div>
            <div class="sample-line" >
              <hr data-element="sample-text-capline"/>
            </div>
            <div class="sample-line sample-reference">
              <hr data-element="sample-text-refline"/>
            </div>
            <div class="sample-line sample-xline">
              <hr data-element="sample-text-xline"/>
            </div>
            <div class="sample-line">
              <hr data-element="sample-text-baseline"/>
            </div>
          </div>
        </div>
      </div>
      <ul class="table-list label-medium">
        <li class="with-sidebar">
          <div class="not-sidebar label-bold">
            <div class="cluster-3xs">
              <div>x-height</div> <div class="regular deweight">(% of Cap Height)</div>
            </div>
          </div> 
          <div data-element="x-height">
            <!-- X Height -->
          </div>
        </li>
        <li class="with-sidebar">
          <div class="not-sidebar label-bold">
            <div class="cluster-3xs">
              <div>Cap Height</div> <div class="regular deweight">(% of Font Size)</div>
            </div>
          </div>
          <div data-element="cap-height">
            <!-- X Height -->
          </div>
        </li>
        <li class="with-sidebar">
          <div class="not-sidebar label-bold">
            <div class="cluster-3xs">
              <div>Line Height</div> <div class="regular deweight">(Short/Long)</div>
            </div>
          </div> 
          <div data-element="line-height">
            <!-- X Height -->
          </div>
        </li>
      </ul>
    </div>
  `;

  return sample;

}

export default Sample;