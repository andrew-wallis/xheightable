import queryByData from "./utils/queryByData";

function AppTemplate() {

  const template = document.createElement("div");
  template.className = "app-container";

  /* html */
  template.innerHTML = `
    <div class="center scrollable-container aside-container" data-element="app-container">
      <main class="main scrollable-container">
        <div class="stack-3xl wrap scrollable" data-element="app-main">

        </div>
      </main>
    </div>
  `

  const container = queryByData(template, "app-container");
  const main = queryByData(template, "app-main");

  return {
    template,
    container,
    main
  }

}

export default AppTemplate;