import App from './App.js';
import './style.css'
import { fetchAppData } from './utils/fetchAppData.js'
import createStore from './store.js';

async function renderApp() {

  const csvFiles = [
    'fonts'
  ]

  const initialData = await fetchAppData(csvFiles);
  const store = createStore(initialData);

  const root = document.querySelector('#app');
  root.appendChild(App({data: initialData, store: store}));

}

renderApp();