function BackLink({action}) {

  const backLink = document.createElement('a');
  backLink.href = "#";
  backLink.className = "button secondary-text";
  backLink.innerText = "Back";

  backLink.addEventListener('click', function(e) {
    e.preventDefault();
    action("Table");
  })

  return backLink;

}

export default BackLink;