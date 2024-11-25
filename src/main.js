import { data } from 'autoprefixer';
import App from './App.js';
import './style.css'
import { fetchAppData } from './utils/fetchAppData.js'

async function renderApp() {

  const csvFiles = [
    'fonts'
  ]

  const appData = await fetchAppData(csvFiles);

  const root = document.querySelector('#app');
  root.appendChild(App({data: appData}));

}

renderApp();