import styles from "./NavBar.module.css";

function NavBar() {

  const navBar = document.createElement('div');
  navBar.className = `wrap insulate ${styles.container}`;

  /* html */
  navBar.innerHTML = `
    <div data-element="back-link">
      <!-- TopBar Back Link -->
    </div>
    <div class="${styles.navbar}" data-element="navbar">
      <!-- navbar -->
    </div>
    <div>
      <!-- TopBar Void -->
    </div>
  `;

  return navBar;

}

export default NavBar;