function Checkbox({label, action, value}) {

  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.className = "control-element checkbox-wrapper";

  const id = label.replace(/\W/g,'_');

  /* html */
  checkboxWrapper.innerHTML = `
    <input id=${id} type="checkbox">
    <label class="secondary-text" for=${id}>${label}</label>
  `;

  const checkbox = checkboxWrapper.querySelector('input');
  checkbox.checked = value;

  checkbox.addEventListener('change', function() {
    checkbox.checked ? action(true) : action(false);
  });


  return checkboxWrapper;

}

export default Checkbox;