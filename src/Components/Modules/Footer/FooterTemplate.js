import queryByData from "../../../utils/queryByData";

function FooterTemplate() {

  const template = document.createElement("footer");
  template.className = "bg-background";

  /* html */
  template.innerHTML = `
    <div class="with-sidebar wrap secondary-text secondary">
      <div class="not-sidebar">
        © xheightable ${new Date().getFullYear()}
      </div>
      <div class="cluster">
        <div data-element="footer-help">
          <!-- Footer help -->
        </div>
        <div data-element="footer-theme">
          <!-- Footer theme -->
        </div>
      </div>
    </div>
  `

  const help = queryByData(template, "footer-help");
  const theme = queryByData(template, "footer-theme");

  return {
    template,
    help,
    theme
  }

}

export default FooterTemplate;