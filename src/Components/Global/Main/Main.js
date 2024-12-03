import styles from "./Main.module.css";

function Main() {

  const main = document.createElement('main');
  main.dataset.element = main;
  main.className = styles.main;

  return main;

}

export default Main;