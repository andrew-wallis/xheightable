import Button from "../../Elements/Button";

function TableShowGuidance(action) {

  const showGuidance = document.createElement('div');

  /* html */
  showGuidance.innerHTML = `
    <div class="table-guidance-cta" data-element="table-guidance-cta">
      <!-- Table Guidance CTA -->
    </div>
  `;

  const cta = showGuidance.querySelector('[data-element="table-guidance-cta"]');
  cta.appendChild(Button({label: "Show Guidance", action: action}));

  return showGuidance;

}

export default TableShowGuidance;