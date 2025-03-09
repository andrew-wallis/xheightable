import Icons from "../../Elements/Icons";
import qDom from "../../../utils/qDom";

function StyleCalculator() {

  const styleCalculator = document.createElement('div');

  /* html */
  styleCalculator.innerHTML = `
    <div class="stack">
      <div class="with-sidebar">
        <h3 class="heading not-sidebar">CSS</h3>
        <div>
          <a class="copy-button label-medium"  href="#" data-element="copy-stylesheet">
            <div data-element="copy-label">Copy</div>
            <div data-element="copy-icon"></div>
          </a>
        </div>
      </div>
      <pre tabindex="-1"><code tabindex="-1"><!-- Code --></code></pre>
      <div class="cluster" data-element="import-controls">
        <!-- Import Control -->
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