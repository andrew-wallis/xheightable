function ButtonGroup({label, options}) {

  const buttonGroup = document.createElement('div');
  buttonGroup.className = "control-element";

  /* html */
  buttonGroup.innerHTML = `
    <div class="label">${label}</div>
    <div data-element="button-group"></div>
  `;

  const field = buttonGroup.querySelector('[data-element="button-group"]');

  options.forEach((item) => {
    const id = `${label}-${item.replace(/\W/g,'_')}`;
    const option = document.createElement('input');
    option.type = "radio";
    option.value = item;
    option.name = label;
    option.id = id;
    field.appendChild(option);

    const radioLabel = document.createElement('label');
    radioLabel.innerHTML = item;
    radioLabel.htmlFor = id;
    field.appendChild(radioLabel);
  });

  return buttonGroup;

}

export default ButtonGroup;