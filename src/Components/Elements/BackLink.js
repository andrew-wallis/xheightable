function BackLink({action}) {

  const backLink = document.createElement('a');
  backLink.href = "#";
  backLink.className = "text-xs leading-4";
  backLink.innerText = "Back";

  backLink.addEventListener('click', function(e) {
    e.preventDefault();
    action("Table");
  })

  return backLink;

}

export default BackLink;