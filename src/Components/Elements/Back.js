function Back({back}) {

  const backLink = document.createElement('a');
  backLink.href = "#";
  backLink.className = "mb-2 pt-6 text-xs leading-4";
  backLink.innerText = "Back";

  backLink.addEventListener('click', function(e) {
    e.preventDefault();
    back();
  })

  return backLink;

}

export default Back;