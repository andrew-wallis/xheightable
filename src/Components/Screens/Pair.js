import Back from "../Elements/Back";
import FontLabel from "../Elements/FontLabel";

function Pair({primaryFont, secondaryFont, changeSecondary, pairings, back}) {


  const pair = document.createElement('div');
  pair.className = "flex flex-col relative";

  const pairHeader = document.createElement('div');
  pairHeader.className = "flex flex-col gap-2 pb-8 sticky top-12 left-0 z-10 sample";

  const pairHeaderLabels = document.createElement('div');
  pairHeaderLabels.classList = "flex gap-4 w-full";

  const pairHeaderSampleOuter = document.createElement('div');
  pairHeaderSampleOuter.className = "flex items-center w-full";

  const pairHeaderSampleMiddle = document.createElement('div');
  pairHeaderSampleMiddle.className = "flex items-baseline text-5xl w-full";

  const pairHeaderSampleInner = document.createElement('div');
  pairHeaderSampleInner.className = "flex items-baseline gap-4 w-full";


  const render = () => {
    pair.innerHTML = '';
    renderHeader();
  }

  const renderHeader = () => {

    pairHeader.innerHTML = '';
    const backButton = Back({back: back});
    pairHeader.appendChild(backButton);

    pairHeaderLabels.innerHTML = '';
    pairHeaderLabels.appendChild(FontLabel({font: primaryFont}));
    pairHeaderLabels.appendChild(FontLabel({font: secondaryFont}));
    pairHeader.appendChild(pairHeaderLabels);

    pairHeaderSampleInner.innerHTML = '';
    pairHeaderSampleMiddle.innerHTML = '';
    pairHeaderSampleOuter.innerHTML = '';
    


    pair.appendChild(pairHeader);
  }

  render();

  return pair;

}

export default Pair;