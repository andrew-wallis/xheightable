import findPairings from "../../../utils/findPairings";
import highlightRows from "../../../utils/highlightRows";
import TableRow from "../../Elements/TableRow";
import Filters from "../../Elements/Filters";
import toggleItem from "../../../utils/toggleItem";
import areNotEqual from "../../../utils/areNotEqual";

function PairList(store) {

  const list = document.createElement('div');
  list.id = "pair";
  list.style.display = "none";
  list.dataset.section = "Pair";
  list.dataset.element = "section";

  /* html */
  list.innerHTML = `
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
        <tbody data-element="pair-list">
          <!-- Pair List -->
        </tbody>
      </table>
    </div>
  `;

  const pairFilter = list.querySelector('[data-element="pair-filter"]');
  function updateFilters() {

    const filterData = store.getData().secondaryFilter;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;

    if(pairFilter.dataset.sort !== sort
    || areNotEqual(licences, pairFilter.dataset.licences, )
    || areNotEqual(classifications, pairFilter.dataset.classifications)) {
      pairFilter.innerHTML = "";
      pairFilter.appendChild(Filters(filterData, updateFilters, ["Match", "A-Z", "Rating"]));

      pairFilter.dataset.licences = licences.join("|");
      pairFilter.dataset.classifications = classifications.join("|");
      pairFilter.dataset.sort = sort;
    }
  }

  store.subscribe(updateFilters);
  updateFilters();

  function updatePairingList() {

    const filterData = store.getData().secondaryFilter;
    const sort = filterData.sort;
    const licences = filterData.licences;
    const classifications = filterData.classifications;
    
    const pairList = list.querySelector('[data-element="pair-list"]');
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;

    console.log(pairList.dataset.sort, sort);
  
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
    const pairList = list.querySelector('[data-element="pair-list"]');
    highlightRows(pairList, font);
    store.setData({secondaryFont: font});
  }

  function updateFilters(key, value) {

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

  return list;

}

export default PairList;