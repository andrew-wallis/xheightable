function Select({label, options, action, value, hideLabel}) {

  const select = document.createElement('div');
  const id = label.replace(/\W/g,'_');

  console.log(value);

  /* html */
  select.innerHTML = `
    <label class="label ${hideLabel ? "sr-only" : ""}" for=${id}>${label}</label>
    <select id=${id}>

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
    action(field.value);
  });

  return select;

}

export default Select;