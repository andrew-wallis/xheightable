import PairLabel from "./PairLabel";
import PairSample from "./PairSample";
import findPairings from "../../../utils/findPairings";
import highlightRows from "../../../utils/highlightRows";
import setFontStyles from "../../../utils/setFontStyles";
import TableRow from "../../Elements/TableRow";
import Branding from "../../Elements/Branding";
import Navigation from "../../Global/Navigation";
import HtmlTable from "../../Elements/HtmlTable";

function Pair(store) {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.className = "screen";
  pair.style.display = "none";
  pair.dataset.screen = "Pair";
  pair.dataset.element = "screen";
  
  /* html */
  pair.innerHTML = `
    <header data-element="pair-header">
      <div data-element="top-bar">
        <!-- Pair Topbar -->
      </div>
      <div class="wrap insulate stack">
        <div data-element="pair-labels" class="labels">
          <!-- Pair Labels -->
        </div>
        <div class="samplesOuter">
          <div class="samplesMid">
            <div data-element="pair-samples" data-label="" class="samplesInner">
              <!-- Pair Samples -->
            </div>
          </div>
        </div>
      </div>
    </header>
    <main data-element="pair-main" class="wrap insulate stack">
      <!-- Pair Main -->
    </main>
  `;

  const topBar = pair.querySelector('[data-element="top-bar"]');
  topBar.appendChild(Branding());
  topBar.appendChild(Navigation());
  
  const primaryLabel = PairLabel();
  const secondaryLabel = PairLabel();

  const pairLabels = pair.querySelector('[data-element="pair-labels"]');
  pairLabels.appendChild(primaryLabel);
  pairLabels.appendChild(secondaryLabel);

  const primarySample = PairSample();
  const secondarySample = PairSample(true);

  const pairSamples = pair.querySelector('[data-element="pair-samples"]');
  pairSamples.appendChild(primarySample);
  pairSamples.appendChild(secondarySample);

  function updatePairingSample() {
    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;

    const capHeight = 33.5 / 16;

    if(primaryFont.label !== primaryLabel.dataset.label) {
      updateFont(primaryFont, primaryLabel, primarySample);
    }

    if(secondaryFont.label !== secondaryLabel.dataset.label) {
      updateFont(secondaryFont, secondaryLabel, secondarySample);
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const sampleText = pair.querySelectorAll('[data-element="font-sample"]');
    sampleText.forEach((text) => {
      text.innerText = isMobile ? "ABC abc" : "ABCEFG abcefg 123";
    });

    function updateFont(font, label, sample) {
      if(Object.keys(font).length > 0) {
    
        const text = label.querySelector('[data-element="label-text"]');
        text.innerText = font.shortlabel;
  
        const xHeight = label.querySelector('[data-element="label-xHeight"]');
        xHeight.innerText = `x ${Math.round(font.xHeightPct * 100)}%`;
  
        const capLine = sample.querySelector('[data-element="cap-line"]');
        capLine.style.verticalAlign = `${capHeight}rem`;

        const referenceLine = sample.querySelector('[data-element="reference-line"]');
        referenceLine.style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;

        const xHeightLine = sample.querySelector('[data-element="xHeight-line"]');
        xHeightLine.style.verticalAlign = `${capHeight * font.xHeightPct}rem`;

        setFontStyles({element: sample, font: font, size: "3", leading: "3"});

        label.dataset.label = font.label;
      }
    }
  }

  store.subscribe(updatePairingSample);

  function updatePairingList() {
    
    const main = pair.querySelector('[data-element="pair-main"]');
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;

    if(Object.keys(primary).length > 0 && main.dataset.primary !== primary.name) {

      main.innerHTML = '';
      main.dataset.primary = primary.name;
      
      const pairings = findPairings(primary, fonts);
      let secondary = {};

      pairings.map((matches, index) => {
        if(matches.length > 0) {
          const htmlTable = HtmlTable();
          main.appendChild(htmlTable);
          const pairList = htmlTable.querySelector('[data-element="pair-list"]');

          matches.map((font, index) => {
            pairList.appendChild(TableRow({font: font, action: changeSecondary}));
          });

          if(Object.keys(secondary).length === 0) {
            secondary = matches[0]; 
          }
        }
      });

      changeSecondary(secondary);
    }
  }

  store.subscribe(updatePairingList);

  function changeSecondary(font) {
    const pairLists = pair.querySelectorAll('[data-element="pair-list"]');

    if(pairLists.length > 0) {
      pairLists.forEach((list) => {
        highlightRows(list, font);
      });
    }


    store.setData({secondaryFont: font});
  }

  return pair;

}

export default Pair;