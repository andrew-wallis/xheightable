import PairLabel from "./PairLabel";
import PairSample from "./PairSample";
import setFontStyles from "../../../utils/setFontStyles";
import Header from "../../Global/Header";
import Select from "../../Elements/Select";
import PairList from "./PairList";
import Test from "../Test/Test";

function Pair(store) {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.className = "screen";
  pair.style.display = "none";
  pair.dataset.screen = "Pair";
  pair.dataset.element = "screen";
  
  /* html */
  pair.innerHTML = `
    <div class="top-bar">
      <div data-element="top-bar">
        <!-- Pair Topbar -->
      </div>
      <div class="wrap insulate stack">
        <div class="insulate stack-s">
          <div class="grid columns-2">
            <div class="cluster pair-label">
              <div class="" data-element="pair-primary-label">
                <!-- Pair Primary -->
              </div>
              <div data-element="pair-change">
                <!-- Pair Change -->
              </div>
            </div>
            <div class="cluster pair-label">
              <div class="pair-label" data-element="pair-secondary-label">
                <!-- Pair Secondary -->
              </div>
            </div>
          </div>
          <div>
            <div class="samplesOuter">
              <div class="samplesMid">
                <div data-element="pair-samples" data-label="" class="samplesInner">
                  <!-- Pair Samples -->
                </div>
              </div>
            </div>
            <div data-element="pair-labels" class="grid columns-2">
            <!-- Pair Labels -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <main data-element="pair-main" class="wrap insulate grid-xl columns-1-2">
      <!-- Pair main" -->
    </main>
  `;
  
  const topBar = pair.querySelector('[data-element="top-bar"]');
  topBar.appendChild(Header());

  const primaryLabel = pair.querySelector('[data-element="pair-primary-label"]');
  const secondaryLabel = pair.querySelector('[data-element="pair-secondary-label"]');

  const primaryData = PairLabel();
  const secondaryData = PairLabel();

  const pairLabels = pair.querySelector('[data-element="pair-labels"]');
  pairLabels.appendChild(primaryData);
  pairLabels.appendChild(secondaryData);

  const primarySample = PairSample();
  const secondarySample = PairSample(true);

  const pairSamples = pair.querySelector('[data-element="pair-samples"]');
  pairSamples.appendChild(primarySample);
  pairSamples.appendChild(secondarySample);

  const pairMain = pair.querySelector('[data-element="pair-main"]');
  pairMain.appendChild(Test(store));
  pairMain.appendChild(PairList(store));


  function updatePairingSample() {
    const primaryFont = store.getData().primaryFont;
    const secondaryFont = store.getData().secondaryFont;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const capHeight = 33.5 / 16;

    if(primaryFont.label !== primaryLabel.dataset.label) {
      updateFont(primaryFont, primaryLabel, primaryData, primarySample);
    }

    if(secondaryFont.label !== secondaryLabel.dataset.label) {
      updateFont(secondaryFont, secondaryLabel, secondaryData, secondarySample);
    }
    const sampleText = pair.querySelectorAll('[data-element="font-sample"]');
    sampleText.forEach((text) => {
      text.innerText = isMobile ? "ABC abc" : "ABCEFG abcefg 123";
    });

    function updateFont(font, label, data, sample) {
      if(Object.keys(font).length > 0) {
    
        label.innerText = font.shortlabel;
        setFontStyles({element: label, font: font, size: isMobile ? 1.1 : 1.25, leading: "2.25rem", weight: "bold"});
  
        const capHeightLabel = data.querySelector('[data-element="label-capheight"]');
        capHeightLabel.innerHTML = Math.round(font.xHeightPct * 100);  
  
        const xHeight = data.querySelector('[data-element="label-xheight"]');
        xHeight.innerHTML = Math.round(font.xHeightPct * 100);
  
        const lineHeight = data.querySelector('[data-element="label-lineheight"]');
        lineHeight.innerHTML = `${font.lineMin}-${font.lineMax}`;

        const capLine = sample.querySelector('[data-element="cap-line"]');
        capLine.style.verticalAlign = `${capHeight}rem`;

        const referenceLine = sample.querySelector('[data-element="reference-line"]');
        referenceLine.style.verticalAlign = `${capHeight * primaryFont.xHeightPct}rem`;

        const xHeightLine = sample.querySelector('[data-element="xHeight-line"]');
        xHeightLine.style.verticalAlign = `${capHeight * font.xHeightPct}rem`;

        setFontStyles({element: sample, font: font, size: "3", leading: "3rem", weight: "normal"});

        label.dataset.label = font.label;
      }
    }
  }

  store.subscribe(updatePairingSample);

  function changePrimary(label) {
    const font = store.getData().fonts.find(font => font.label === label);
    store.setData({primaryFont: font});
  }

  return pair;

}

export default Pair;