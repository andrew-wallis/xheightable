function BackLink({action}) {

  const backLink = document.createElement('a');
  backLink.href = "#";
  backLink.className = "secondary-text";
  backLink.innerText = "Back to the Table";

  backLink.addEventListener('click', function(e) {
    e.preventDefault();
    action("Table");
  })

  return backLink;

}

export default BackLink;