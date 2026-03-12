function Select({action, hideLabel, label, options, value, classes}) {

  const id = label.replace(/\W/g,'-').toLowerCase();
  const select = document.createElement('div');
  select.className = ``;
  select.dataset.umamiEvent = `Select ${label}`;

  const fieldLabel = document.createElement('label');
  fieldLabel.className = `${hideLabel ? "sr-only" : ""}`;
  fieldLabel.htmlFor = id;
  fieldLabel.innerText = label;
  select.appendChild(fieldLabel);

  const field = document.createElement('select');
  field.className = `clickable ${classes ? classes : ""}`;
  field.id = id;
  field.dataset.element = id;
  select.appendChild(field);


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