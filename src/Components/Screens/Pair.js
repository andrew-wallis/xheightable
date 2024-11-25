import Back from "../Elements/Back";

function Pair({primaryFont, secondaryFont, changeSecondary, pairings, back}) {


  const pair = document.createElement('div');
  pair.className = "flex flex-col relative";

  const pairHeader = document.createElement('div');
  pairHeader.className = "flex flex-col gap-2 pb-8 sticky top-12 left-0 z-10 sample";
  pair.appendChild(pairHeader);

  pairHeader.appendChild(Back({back: back}));

  

  const render = () => {
    pair.innerHTML = '';
    pair.appendChild(pairHeader);
  }

  render();

  return pair;

}

export default Pair;