function Sample(font) {

  const sample = document.createElement('div');
  sample.classList = "stack-l unselectable";
  sample.dataset.font = font;

  /* html */
  sample.innerHTML = `
    <div class="sample">
      <div class="sample-wrapper">
        <div class="sample-header">
          <div class="sample-align">
            <div class="sample-leader" data-element="label-leader">A</div>
            <div data-element="label-text">
              <!-- Label -->
            </div>
          </div>
          <div class="xheight" data-element="sample-xheight">
            <div class="xheight-content">
              <div data-element="sample-xheight-number">
                <!-- X-Height -->
              </div>
              <div class="xheight-percentage">%</div>
            </div>
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
      <div class="focus-padding with-sidebar">
        <div class="not-sidebar" data-element="sample-action-left">
          <!-- Action Left -->
        </div>
        <div data-element="sample-action-right">
          <!-- Action Right -->
        </div>
      </div>
    </div>
  `;

  return sample;

}

export default Sample;