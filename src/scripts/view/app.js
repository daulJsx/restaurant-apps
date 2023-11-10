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
  }
}

export default App;
