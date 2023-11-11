import NavigationDrawer from '../utils/navigation-drawer';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, catalogue,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._catalogue = catalogue;

    this._initialAppShell();
  }

  _initialAppShell() {
    NavigationDrawer.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    document.body.addEventListener('click', (event) => {
      const { target } = event;

      if (target.matches('.skip-link')) {
        event.preventDefault();
        const targetElement = document.getElementById('mainContent');
        targetElement.tabIndex = -1;
        targetElement.focus();
      } else if (target.matches('.cta') || target.matches('.restaurants-link')) {
        event.preventDefault();
        const targetElement = document.getElementById('mainContent');
        targetElement.scrollIntoView({ behavior: 'smooth' });
        targetElement.tabIndex = -1;
        targetElement.focus();
      }
    });
  }
}

export default App;
