function FontData() {

  const fontData = document.createElement('div');
  fontData.className = "md:w-1/2 shrink-0";

  /* html */
  fontData.innerHTML = `
    <h2 data-element="data-label" class="font-semibold whitespace-nowrap flex items-center mb-6">
      <!-- Data-Label -->
    </h2>
    <div class="mb-4 flex gap-4 items-center text-sm leading-6 font-semibold">
      <div data-element="data-distribution" class="icon h-9 w-9 flex items-center justify-center rounded-full border shrink-0"></div>
      <div class="">
        <span data-element="data-designers">
          <!-- Data-Designers -->
        </span>
        <span data-element="data-year" class="inline-block">
          <!-- Data-Designers -->
        </span>
      </div>
    </div>
    <div data-element="data-details">
      <!-- Data-Get -->
    </div>
  `;

  return fontData;

}

export default FontData;