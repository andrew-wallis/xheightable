import Icons from "../../Elements/Icons";

function PairMatch(primaryFont, secondaryFont) {

  const match = document.createElement('div');
  match.classList = "cluster-2xs slub pair-match";

  /* html */
  match.innerHTML = `
    <div data-element="match-icon">
      <!-- Match Icon -->
    </div>
    <div>
      <span data-element="match-text"><!-- Match Text --></span>
      <span class="desktop">Match</span>
    </div>
  `;

  const matchIcon = match.querySelector('[data-element="match-icon"]');
  const matchText = match.querySelector('[data-element="match-text"]');
  let matchScore = 0;

  function roundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }

  if(Math.abs(roundToTwoDecimals(primaryFont.xHeightPct - secondaryFont.xHeightPct)) <=0.02) {
    matchScore += 1;

    if(primaryFont.superclass !== secondaryFont.superclass) {
      matchScore += 1;
    } else if(primaryFont.subclass === secondaryFont.subclass) {
      matchScore -= 1;
    }
  }

  match.classList.remove("match-excellent");
  match.classList.remove("match-good");
  match.classList.remove("match-possible");
  matchIcon.innerHTML = "";

  if(matchScore == 2) {
    matchIcon.appendChild(Icons("Tick"));
    match.classList.add("match-excellent");
    matchText.innerText = "Excellent";
  } else if (matchScore == 1) {
    matchIcon.appendChild(Icons("Tick"));
    match.classList.add("match-good");
    matchText.innerText = "Good";
  } else {
    matchIcon.appendChild(Icons("Question"));
    match.classList.add("match-possible");
    matchText.innerText = "Possible";
  }


  return match;

}

export default PairMatch;