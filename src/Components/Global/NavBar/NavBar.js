import styles from "./NavBar.module.css";

function NavBar() {

  const navBar = document.createElement('div');
  navBar.style.display = "none";
  navBar.dataset.element = "navbar-container";
  navBar.className = styles.container;

  /* html */
  navBar.innerHTML = `
    <div data-element="navbar" class=${styles.navbar}>
      <!-- navbar -->
    </div>
  `;

  return navBar;

}

export default NavBar;