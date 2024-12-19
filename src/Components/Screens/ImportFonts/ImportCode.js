import Icons from "../../Elements/Icons";

function importCode() {

  const importCode = document.createElement('div');

  /* html */
  importCode.innerHTML = `
    <div class="code-wrapper">
      <div class="control-panel" data-element="import-controls">
        <!-- Import Control -->
      </div>
      <div class="code-panel">
        <div class="code-header">
          <ul class="tabs" data-element="import-tabs">
            <!-- Import Tabs -->
          </ul>
          <div class="">
            <a href="#" data-element="copy-stylesheet" class="button secondary-text">
              <div data-element="copy-label">Copy</div>
              <div data-element="copy-icon"></div>
            </a>
          </div>
        </div>
        <pre class="code-container">
          <code>
            <!-- Code -->
          </code>
        </pre>
      </div>
    </div>
  `;

  const copyStylesheet = importCode.querySelector('[data-element="copy-stylesheet"]');
  copyStylesheet.addEventListener("click", function(e) {
    e.preventDefault();
    const label = copyStylesheet.querySelector('[data-element="copy-label"]');
    const code = importCode.querySelector('code');
    navigator.clipboard.writeText(code.textContent).then(() => {
      label.innerText = "Copied";
      setTimeout(() => {
        label.innerText = "Copy";
      }, 1000);
    });
  });

  const copyIcon = importCode.querySelector('[data-element="copy-icon"]');
  copyIcon.appendChild(Icons("Copy"));

  return importCode;

}

export default importCode;