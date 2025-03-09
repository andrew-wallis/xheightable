function ButtonGroup({action, label, options, value}) {

  const buttonGroup = document.createElement('div');
  buttonGroup.className = "button-group";
  const id = label.replace(/\W/g,'_');

  options.forEach((item) => {
    const optionId = item.replace(/\W/g,'_');

    const option = document.createElement('input');
    option.type = "radio";
    option.id = optionId;
    option.name = id;
    option.value = item;

    buttonGroup.appendChild(option);

    if(item === value) option.checked = true;

    const label = document.createElement('label');
    label.htmlFor = optionId;
    label.innerText = item;
    label.className = "clickable button label-medium";

    buttonGroup.appendChild(label);

    option.addEventListener('change', function(e) {
      handleChange(e);
    });

    option.removeEventListener('change', function(e) {
      handleChange(e);
    });
  });


  function handleChange(e) {
    action(e.target.value);
  }

  return buttonGroup;

}

export default ButtonGroup;