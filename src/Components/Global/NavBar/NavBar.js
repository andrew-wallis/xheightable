import styles from "./NavBar.module.css";

function NavBar() {

  const navBar = document.createElement('div');
  navBar.className = "background";

  /* html */
  navBar.innerHTML = `
    <div class="wrap insulate ${styles.container}">
      <div data-element="back-link">
        <!-- TopBar Back Link -->
      </div>
      <div class="${styles.navbar}" data-element="navbar">
        <!-- navbar -->
      </div>
      <div>
        <!-- TopBar Void -->
      </div>
    </div>
  `;

  return navBar;

}

export default NavBar;