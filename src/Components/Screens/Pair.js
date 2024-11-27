function Pair() {

  const pair = document.createElement('div');
  pair.id = "pair";
  pair.className = "screen";
  pair.style.display = "none";
  
  /* html */
  pair.innerHTML = `
    <div class="flex flex-col relative">
      <div id="pair-header" class="flex flex-col gap-2 pb-8 sticky top-12 left-0 z-10 bg-white">
        <div data-link="back-link" class="mb-2">
          <!-- Back Link -->
        </div>
        <div id="pair-labels" class="flex gap-4 w-full">
          <!-- Labels -->
        </div>
        <div class="flex items-center w-full">
        <div class="flex items-baseline text-5xl w-full">
          <div id="pair-samples" class="flex items-baseline gap-4 w-full">
            <!-- Samples -->
          </div>
        </div>
      </div>
      </div>
      <div id="pair-container" class="flex flex-col">
      </div>
    </div>
  `;

  return pair;

}

export default Pair;