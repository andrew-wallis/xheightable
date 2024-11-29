import FontLabel from "../Elements/FontLabel";
import FontRow from "../Elements/FontRow";
import FontSample from "../Elements/FontSample";
import findPairings from "../../utils/findPairings";
import highlightRows from "../../utils/highlightRows";
import setFontStyles from "../../utils/setFontStyles";

function Pair(store) {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.style.display = "none";
  pair.dataset.screen = "Pair";
  pair.dataset.element = "screen";
  
  /* html */
  pair.innerHTML = `
    <div class="flex flex-col relative">
      <div id="pair-header" class="flex flex-col gap-2 pb-8 sticky top-12 left-0 z-10 bg-white">
        <div data-element="back-link" class="mb-2">
          <!-- Back Link -->
        </div>
        <div data-element="pair-labels" class="flex gap-4 w-full">
          <!-- Pair Labels -->
        </div>
        <div class="flex items-center w-full">
        <div class="flex items-baseline text-5xl w-full">
          <div data-element="pair-samples" data-label="" class="flex items-baseline gap-4 w-full h-16">
            <!-- Pair Samples -->
          </div>
        </div>
      </div>
      </div>
      <div data-element="pair-list" class="flex flex-col">
        <!-- Pair List -->
      </div>
    </div>
  `;
  
  const primaryLabel = FontLabel();
  const secondaryLabel = FontLabel();

  const pairLabels = pair.querySelector('[data-element="pair-labels"]');
  pairLabels.appendChild(primaryLabel);
  pairLabels.appendChild(secondaryLabel);

  const primarySample = FontSample();
  const secondarySample = FontSample(true);

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
        text.innerText = font.label;
  
        const xHeight = label.querySelector('[data-element="label-xHeight"]');
        xHeight.innerText = font.xHeightPct;
  
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
    
    const pairList = pair.querySelector('[data-element="pair-list"]');
    const primary = store.getData().primaryFont;
    const fonts = store.getData().fonts;
    const pairings = store.getData().pairings;

    const updatePairings = findPairings(primary, fonts);

    if(Object.keys(primary).length > 0 && JSON.stringify(pairings) !== JSON.stringify(updatePairings)) {

      pairList.innerHTML = '';
      updatePairings.map((font, index) => {
        pairList.appendChild(FontRow({font: font, action: changeSecondary}));
      });

      store.setData({pairings: updatePairings});
      changeSecondary(updatePairings[0]);
    }
  }

  store.subscribe(updatePairingList);

  function changeSecondary(font) {
    const pairList = pair.querySelector('[data-element="pair-list"]');
    highlightRows(pairList, font);
    store.setData({secondaryFont: font});
  }

  return pair;

}

export default Pair;