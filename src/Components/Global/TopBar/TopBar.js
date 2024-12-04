import styles from "./TopBar.module.css";

function TopBar() {

  const topBar = document.createElement('div');
  topBar.className = `${styles.topbar}`;

  /* html */
  topBar.innerHTML = `
    <div class="wrap insulate">
      <h1 class="secondary-text">
        xHeightable
      </h1>
    </div>
  `;

  return topBar;

}

export default TopBar;