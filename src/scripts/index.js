/* eslint-disable no-unused-vars */
import 'regenerator-runtime'; /* for async await transpile */

// Styles
import '../styles/main.css';

import feather from 'feather-icons';
import Accessibility from './utils/Accessibility';
import App from './view/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
  catalogue: document.querySelector('#restaurant-list'),
});

document.addEventListener('DOMContentLoaded', async () => {
  feather.replace();
  Accessibility();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
