function Select({action, hideLabel, label, options, value}) {

  const id = label.replace(/\W/g,'-').toLowerCase();
  const select = document.createElement('div');
  select.classList = "focus-padding";

  /* html */
  select.innerHTML = `
    <label class="${hideLabel ? "sr-only" : ""} label-medium" for=${id}>${label}</label>
    <select class="clickable slub" id=${id} data-element=${id}>
      <!-- Select Options -->
    </select>
  `;

  const field = select.querySelector('select');

  options.forEach((item) => {
    const option = document.createElement('option');
    option.innerText = item;
    option.value = item;
    field.appendChild(option);
  });

  field.value = value;

  field.addEventListener('change', function () {
    handleChange();
  });

  field.removeEventListener('change', function () {
    handleChange();
  });

  function handleChange() {
    action(field.value);
  }

  return select;

}

export default Select;