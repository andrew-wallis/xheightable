import queryAllByData from "../../../utils/queryAllByData";
import queryByData from "../../../utils/queryByData";

function SampleTemplate(font) {

  const template = document.createElement('div');
  template.classList = "unselectable stack";
  template.dataset.font = font;

  /* html */
  template.innerHTML = `
    <div class="sample">
      <div class="stack-3xs">
        <h2 class="slub secondary" data-element="sample-header"></h2>
        <div class="sample-label">
          <div class="sample-align">
            <div class="sample-leader" data-element="label-leader">A</div>
            <div class="sample-label-text" data-element="label-text">
              <!-- Label -->
            </div>
            <div data-element="sample-lock">
              <!-- Lock -->
            </div>
          </div>
          <div class="xheight" data-element="sample-xheight-circle">
            <div class="xheight-content">
              <div class="sr-only">X Height</div>
              <div data-element="sample-xheight-number">
                <!-- X-Height -->
              </div>
              <div class="xheight-percentage">%</div>
            </div>
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
    <ul class="cluster">
      <li><span class="slub tertiary-text tertiary">X Height</span> <span class="accent-text accent-tertiary-text tertiary"><span data-element="sample-x-height"></span>%</span></li>
      <li><span class="slub tertiary-text tertiary">Cap Height</span> <span class="accent-text accent-tertiary-text tertiary"><span data-element="sample-cap-height"></span>%</span></li>
      <li>
        <a href="#" data-element="get-link" class="slub tertiary-text" target="_blank">
          Get This Font
          <span data-element="get-link-distribution" class="sr-only"></span>
        </a>
      </li>
    </ul>
  `;

  const lock = queryByData(template, "sample-lock");
  const header = queryByData(template, "sample-header");
  const label = queryByData(template, "label-text");
  const labelLeader = queryByData(template, "label-leader");
  const text = queryByData(template, "sample-text");
  const textLeader = queryByData(template, "sample-leader");
  const abcs = queryAllByData(template, "sample-text-abc");
  const capline = queryByData(template, "sample-text-capline");
  const refline = queryByData(template, "sample-text-refline");
  const xline = queryByData(template, "sample-text-xline");
  const xheightCircle = queryByData(template, "sample-xheight-circle");
  const xHeightNumber = queryByData(template, "sample-xheight-number");
  const xHeight = queryByData(template, "sample-x-height");
  const capHeight = queryByData(template, "sample-cap-height");
  const getLink = queryByData(template, "get-link");
  const getLinkDistribution = queryByData(template, "get-link-distribution");

  return {
    template,
    lock,
    header,
    label,
    labelLeader,
    text,
    textLeader,
    abcs,
    capline,
    refline,
    xline,
    xheightCircle,
    xHeightNumber,
    xHeight,
    capHeight,
    getLink,
    getLinkDistribution
  };



}

export default SampleTemplate;