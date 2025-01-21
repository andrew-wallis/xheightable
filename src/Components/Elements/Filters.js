import Button from "./Button";
import Select from "./Select";

function Filters(data, action, options) {

  const filters = document.createElement('div');
  filters.className = "with-sidebar";

  /* html */
  filters.innerHTML = `
    <div class="cluster">
      <div class="cluster-no-gap" data-element="filters-licence">
        <!-- Filters Licence -->
      </div>
      <div class="cluster-no-gap" data-element="filters-classification">
        <!-- Filters Licence -->
      </div>
    </div>
    <div data-element="filters-sort">
      <!-- Filters Sort -->
    </div>
  `;

  const sort = filters.querySelector('[data-element="filters-sort"]');
  sort.appendChild(Select({label: "Sort", options: options, value: data.sort, hideLabel: true, action: filterSort}));

  const filtersLicence = filters.querySelector('[data-element="filters-licence"]');
  const licences = ["Adobe", "Google"];

  licences.forEach((licence) => {
    const licenceButton = Button({label: licence, icon: licence, type: `filter-button ${data.licences.includes(licence) ? "active" : ""}`, action: filterLicence, hideLabel: true});
    licenceButton.dataset.key = "licence";
    licenceButton.dataset.value = licence;
    filtersLicence.appendChild(licenceButton);
  })

  const filtersClassification = filters.querySelector('[data-element="filters-classification"]');
  const classifications = ["Sans", "Serif", "Mono"];

  classifications.forEach((classification) => {
    const classificationButton = Button({label: classification, icon: classification, type: `filter-button ${data.classifications.includes(classification) ? "active" : ""}`, action: filterClassification, hideLabel: true});
    classificationButton.dataset.key = "classification";
    classificationButton.dataset.value = classification;
    filtersClassification.appendChild(classificationButton);
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