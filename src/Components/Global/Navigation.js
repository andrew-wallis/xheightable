function Navigation() {

  const navigation = document.createElement('nav');
  navigation.className = "wrap insulate";

  /* html */
  navigation.innerHTML = `
    <div data-element="back-link">
      <!-- TopBar Back Link -->
    </div>
    <div class="navbar" data-element="navbar">
      <!-- navbar -->
    </div>
    <div>
      <!-- TopBar Void -->
    </div>
  `;

  return navigation;

}

export default Navigation;