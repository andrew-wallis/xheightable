function GetFonts() {

  const getFonts = document.createElement('div');
  getFonts.id = "getfonts";
  getFonts.className = "screen";
  getFonts.style.display = "none";
  
  /* html */
  getFonts.innerHTML = `
    <div class="relative" >
      <div data-link="back-link" class="pb-8 sticky top-12 left-0 z-10 h-6 bg-white">
        <!-- Back Link -->
      </div>
      <div class="mt-8" id="get-fonts">

      </div>
    </div>
  `;

  return getFonts;

}

export default GetFonts;