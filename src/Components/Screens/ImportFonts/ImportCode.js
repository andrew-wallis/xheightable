import qu from "../../../utils/qu";
import Icons from "../../Elements/Icons";

function importCode() {

  const importCode = document.createElement('div');

  /* html */
  importCode.innerHTML = `
    <div class="stack-l">
      <div class="stack-xs">
        <h2 class="slub">CSS</h2>
        <hr/>
      </div>
      <div class="grid columns-1-3">
        <div class="stack" data-element="import-controls">
          <!-- Import Control -->
        </div>
        <div class="span-2">
          <div class="with-sidebar">
            <ul class="cluster" data-element="tabs">
              <li class="tab" data-element="tab" data-tab="Variables">
                <!-- Variables Tab -->
              </li>
              <li class="tab" data-element="tab" data-tab="Classes">
                <!-- Classes Tab -->
              </li>
            </ul>
            <div class="">
              <a href="#" data-element="copy-stylesheet" class="button slim-button label">
                <div data-element="copy-label">Copy</div>
                <div data-element="copy-icon"></div>
              </a>
            </div>
          </div>
          <pre class="tab-content">
            <code class="data">
              <!-- Code -->
            </code>
          </pre>
        </div>
      </div>
    </div>
  `;

  const copyStylesheet = qu(importCode, "copy-stylesheet");
  copyStylesheet.addEventListener("click", function(e) {
    e.preventDefault();
    const label = qu(copyStylesheet, "copy-label");
    navigator.clipboard.writeText(importCode.querySelector('code').textContent).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  qu(importCode, "copy-icon").appendChild(Icons("Copy"));

  return importCode;

}

export default importCode;