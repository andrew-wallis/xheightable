import Icons from "../../Elements/Icons";
import qDom from "../../../utils/qDom";

function StyleCalculator() {

  const styleCalculator = document.createElement('div');

  /* html */
  styleCalculator.innerHTML = `
    <div class="stack-l">
      <div class="stack-l">
        <div>
          <div class="with-sidebar tab-header">
            <ul class="tabs not-sidebar" data-element="tabs">
              <li class="tab" data-element="tab" data-tab="Variables">
                <!-- Variables Tab -->
              </li>
              <li class="tab" data-element="tab" data-tab="Classes">
                <!-- Classes Tab -->
              </li>
            </ul>
            <div class="">
              <a href="#" data-element="copy-stylesheet" class="button label accent">
                <div data-element="copy-label">Copy</div>
                <div data-element="copy-icon" class="accent"></div>
              </a>
            </div>
          </div>
          <pre class="tab-content">
            <code class="data">
              <!-- Code -->
            </code>
          </pre>
        </div>
        <div class="stack" data-element="import-controls">
          <!-- Import Control -->
        </div>
      </div>
    </div>
  `;

  const copyStylesheet = qDom(styleCalculator, "copy-stylesheet");

  copyStylesheet.addEventListener("click", function(e) {
    handleClick(e);
  });
  
  copyStylesheet.removeEventListener("click", function(e) {
    handleClick(e);
  });

  function handleClick(e) {
    e.preventDefault();
    const label = qDom(copyStylesheet, "copy-label");
    navigator.clipboard.writeText(styleCalculator.querySelector('code').textContent).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  };

  qDom(styleCalculator, "copy-icon").appendChild(Icons("Copy"));

  return styleCalculator;

}

export default StyleCalculator;