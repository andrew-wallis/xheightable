import findPairings from "../../../utils/findPairings";
import highlightRows from "../../../utils/highlightRows";
import TableRow from "../../Elements/TableRow";

function PairList(store) {

  const list = document.createElement('div');

  /* html */
  list.innerHTML = `
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
  `;

  function updatePairingList() {
    
    const pairList = list.querySelector('[data-element="pair-list"]');
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;

    if(Object.keys(primary).length > 0 && pairList.dataset.primary !== primary.name) {

      pairList.innerHTML = '';
      const pairings = findPairings(primary, fonts);
      pairings.map((font, index) => {
        pairList.appendChild(TableRow({font: font, action: changeSecondary, fields: ["xHeightDiff"]}));
      });

      pairList.dataset.primary = primary.name;

      const newSecondary = pairings[0];
      store.setData({secondaryFont: newSecondary})
      highlightRows(pairList, newSecondary);

    }
  }

  store.subscribe(updatePairingList);

  function changeSecondary(font) {
    const pairList = pair.querySelector('[data-element="pair-list"]');
    highlightRows(pairList, font);
    store.setData({secondaryFont: font});
  }

  return list;

}

export default PairList;