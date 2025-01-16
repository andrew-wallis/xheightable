import Button from "../../Elements/Button";
import TableExamples from "./TableExamples";

function TableGuidance(action) {

  const guidance = document.createElement('aside');
  guidance.classList = "stack-xl";

  /* html */
  guidance.innerHTML = `
    <div class="grid-xl columns-1-3">
      <div class="table-guidance stack">
        <h2 class="slub">X-Height</h2>
        <div class="table-example">
          <div data-element="xheight-example">
            <!-- xheight example -->
          </div>
          <div class="caption deweight grid columns-2">
            <p>Inter and Garamond have a 16% difference in x-height</p>
            <p>Inter and Mencken have matching x-heights</p>
          </div>
        </div>
        <p>One way to pair fonts is to match their x-heights. This is the ratio between the lowercase and uppercase characters. Fonts with similar x-heights will have similar proportions and work well together. x-heightable documents the x-heights of over 150 popular fonts.</p>
        <p><strong>Click on a font in the table below to find and test suggested pairings and get the import code.</strong></p>
      </div>
      <div class="table-guidance stack">
        <h2 class="slub">Cap Height</h2>
        <div class="table-example">
          <div data-element="capheight-example">
            <!-- Cap height example -->
          </div>
          <div class="caption deweight grid columns-2">
            <p>Mencken is 7% smaller than Inter so they do not align</p>
            <p>Inter and Mencken with aligned cap heights</p>
          </div>
        </div>
        <p>Not all fonts are created equally. The size of the capital letter (cap height) is usually around 70%, but can vary from 50%-80% of the overall font size. Although two fonts might have a similar x-height, you might need to correct the overall font size so the actual proportions are the same. x-heightable documents the cap height of each font.</p>
      </div>
      <div class="table-guidance stack">
        <h2 class="slub">Line Height</h2>
        <div class="table-example">
          <div data-element="lineheight-example">
            <!-- Line height example -->
          </div>
          <div class="caption deweight grid columns-2">
            <p>Inter has a larger proporitons so has a wider line height</p>
            <p>Garamond has a smaller proportions so has a narrower line height</p>
          </div>
        </div>
        <p>The suggested line height is usually 1.5 for long text like paragraphs and 1.25 for short text like headings and quotes. However, the optimal line height will vary depending on the cap and x-height of a font. x-heightable documents the appropriate long and short line heights based on the proportions of each individual font.</p>
      </div>
    </div>
    <div class="center" data-element="table-guidance-cta">
      <!-- Table Guidance CTA -->
    </div>
  `;

  const xHeight = guidance.querySelector('[data-element="xheight-example"]');
  xHeight.appendChild(TableExamples("xheight"));

  const capHeight = guidance.querySelector('[data-element="capheight-example"]');
  capHeight.appendChild(TableExamples("capheight"));

  const lineHeight = guidance.querySelector('[data-element="lineheight-example"]');
  lineHeight.appendChild(TableExamples("lineheight"));

  const cta = guidance.querySelector('[data-element="table-guidance-cta"]');
  cta.appendChild(Button({label: "Hide Guidance", action: action, type: "secondary-button"}));





  return guidance;

}

export default TableGuidance;