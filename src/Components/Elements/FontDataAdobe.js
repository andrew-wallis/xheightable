function FontDataAdobe(font) {

  const fontDataAdobe = document.createElement('div');

  /* html */
  fontDataAdobe.innerHTML = `
    <a class="block rounded py-3 px-4 text-sm leading-4 uppercase tracking-wider text-center mt-6 font-semibold mb-4" href="${font.link}" target="_blank">
      Get This Font From Adobe
    </a>
    <p class="text-xs leading-4">
      We have partnered with Adobe and get a percentage from each licence sold through xHeightable.
    </p>
  `;

  return fontDataAdobe;

}

export default FontDataAdobe;