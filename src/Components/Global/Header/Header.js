import styles from "./Header.module.css";

function Header() {

  const header = document.createElement('header');
  header.className = styles.header;

  /* html */
  header.innerHTML = `
    <div class=${styles.container}>
      <div></div>
      <h1 class="${styles.sitename} label">
        xHeightable 4.1.1
      </h1>
      <div></div>
    </div>
  `;

  return header;

}

export default Header;