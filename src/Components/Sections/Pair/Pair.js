import Filters from "../../Elements/Filters";
import TableRow from "../../Elements/TableRow";
import areNotEqual from "../../../utils/areNotEqual";
import findPairings from "./helpers/findPairings";
import highlightRows from "../../../utils/highlightRows";
import qDom from "../../../utils/qDom";
import qaDom from "../../../utils/qaDom";
import toggleItem from "../../../utils/toggleItem";

function Pair(store) {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.style.display = "none";
  pair.dataset.section = "Pair";
  pair.dataset.element = "section";
  pair.role = "tabpanel";
  pair.setAttribute("aria-labelledby", "pair-tab");

  /* html */
  pair.innerHTML = `
    <h2 data-element="section-title" tabindex="-1" class="sr-only">Pair</h2>
    <div class="stack-m">
      <div data-element="pair-filter">
        <!-- Pair Filter -->
      </div>
      <table>
        <thead class="sr-only">
          <tr>
            <th>Distribution</th>
            <th>Font</th>
            <th>Classification</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody data-element="pair-table">
          <!-- Pair Table -->
        </tbody>
      </table>
    </div>
  `;


  // Appends

  const pairFilter = qDom(pair, "pair-filter");
  pairFilter.appendChild(Filters(store.getData().secondaryFilter, changeFilters, ["Match", "A-Z", "Rating"]));


  // Functions

  function updateFilters() {

    const filterData = store.getData().secondaryFilter;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;

    if(pairFilter.dataset.sort !== sort) {
      pairFilter.querySelector('select').value = sort;
    }

    if(areNotEqual(licences, pairFilter.dataset.licences)) {
      qaDom(pairFilter, "licence", "key").forEach((licence) => {
        if(licences.includes(licence.dataset.value)) {
          licence.classList.add("active");
          licence.setAttribute("aria-pressed", "true");
        } else {
          licence.classList.remove("active");
          licence.setAttribute("aria-pressed", "false");
        }
      });
      pairFilter.dataset.licences = licences.join("|");
    }

    if(areNotEqual(classifications, pairFilter.dataset.classifications)) {
      qaDom(pairFilter, "classification", "key").forEach((classification) => {
        if(classifications.includes(classification.dataset.value)) {
          classification.classList.add("active");
          classification.setAttribute("aria-pressed", "true");
        } else {
          classification.classList.remove("active");
          classification.setAttribute("aria-pressed", "false");
        }
      });
      pairFilter.dataset.classifications = classifications.join("|");
    }
  }

  store.subscribe(updateFilters);
  updateFilters();


  function updatePairingList() {

    const filterData = store.getData().secondaryFilter;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;
    
    const pairList = qDom(pair, "pair-table");
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;
  
    if(Object.keys(primary).length > 0 && 
      (pairList.dataset.primary !== primary.name
      || pairList.dataset.sort !== sort
      || areNotEqual(licences, pairList.dataset.licences)
      || areNotEqual(classifications, pairList.dataset.classifications))
    ) {

      pairList.innerHTML = '';
      const pairings = findPairings({font: primary, fonts: fonts, sort: sort, licences: licences, classifications: classifications});
      pairings.map((font, index) => {
        pairList.appendChild(TableRow({font: font, action: changeSecondary}));
      });
       
      pairList.dataset.primary = primary.name;
      pairList.dataset.licences = licences.join("|");
      pairList.dataset.classifications = classifications.join("|");
      pairList.dataset.sort = sort;

      const newSecondary = pairings[0];
      store.setData({secondaryFont: newSecondary});
      highlightRows(pairList, newSecondary);

    }
  }

  store.subscribe(updatePairingList);

  function changeSecondary(font) {
    highlightRows(qDom(pair, "pair-table"), font);
    store.setData({secondaryFont: font});
  }

  function changeFilters(key, value) {
    const filterData = store.getData().secondaryFilter;
    const licences = filterData.licences;
    const classifications = filterData.classifications;

    let updatedValue;

    if(key === "sort") {
      updatedValue = {sort: value};
    } else if(key === "licences") {
      updatedValue = {licences: toggleItem(licences, value)};
    } else if(key === "classifications") {
      updatedValue = {classifications: toggleItem(classifications, value)};
    }
    

    const updatedFilter = {...store.getData().secondaryFilter, ...updatedValue};
    store.setData({secondaryFilter: updatedFilter});
  }


  // Return

  return pair;

}

export default Pair;