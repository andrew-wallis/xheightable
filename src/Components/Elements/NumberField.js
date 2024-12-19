function NumberField({label, suffix, action, value}) {

  const numberFieldWrapper = document.createElement('div');
  numberFieldWrapper.className = "control-element";
  const id = label.replace(/\W/g,'_');

  /* html */
  numberFieldWrapper.innerHTML = `
    <label class="label" for=${id}>${label}</label>
    <input id=${id} type="number" value=${value} />
  `;

  if(suffix) {
    const suffixElement = document.createElement('div');
    suffixElement.innerText = suffix;
    numberFieldWrapper.appendChild(suffixElement);
  }

  const numberField = numberFieldWrapper.querySelector('input');

  numberField.addEventListener('input', function(event) {
    action(event.target.value);
  });

  return numberFieldWrapper;

}

export default NumberField;