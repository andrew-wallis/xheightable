import qDom from "../../utils/qDom";
import Button from "./Button";
import Select from "./Select";

function Filters(data, action, options) {

  const filters = document.createElement('div');
  filters.className = "with-sidebar";

  /* html */
  filters.innerHTML = `
    <div class="cluster">
      <div role="group" aria-label="Filter by licence" class="cluster-none" data-element="filters-licence">
        <!-- Filters Licence -->
      </div>
      <div role="group" aria-label="Filter by classification" class="cluster-none" data-element="filters-classification">
        <!-- Filters Licence -->
      </div>
    </div>
    <div data-element="filters-sort">
      <!-- Filters Sort -->
    </div>
  `;

  qDom(filters, "filters-sort").appendChild(Select({
    label: "Sort", 
    options: options, 
    value: data.sort, 
    hideLabel: true, 
    action: filterSort
  }));

  ["Adobe", "Google"].forEach((licence) => {
    const licenceButton = Button({label: licence, icon: licence, classes: `filter-button ${data.licences.includes(licence) ? "active" : ""}`, action: filterLicence, hideLabel: true, type: "filter"});
    licenceButton.dataset.key = "licence";
    licenceButton.dataset.value = licence;
    qDom(filters, "filters-licence").appendChild(licenceButton);
  });

  ["Sans", "Serif", "Mono"].forEach((classification) => {
    const classificationButton = Button({label: classification, icon: classification, classes: `filter-button ${data.classifications.includes(classification) ? "active" : ""}`, action: filterClassification, hideLabel: true, type: "filter"});
    classificationButton.dataset.key = "classification";
    classificationButton.dataset.value = classification;
    qDom(filters, "filters-classification").appendChild(classificationButton);
  });
  
  function filterSort(value) {
    action("sort", value);
  }

  function filterLicence(value) {
    action("licences", value);
  }

  function filterClassification(value) {
    action("classifications", value);
  }

  return filters;

}

export default Filters;