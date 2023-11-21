import FavoriteHeavenIdb from '../../data/favorite-heaven-idb';
import FavoriteHeavenView from './liked-heavens/favorite-heaven-view';
import FavoriteHeavenShowPresenter from './liked-heavens/favorite-heaven-show-presenter';
import FavoriteHeavenSearchPresenter from './liked-heavens/favorite-heaven-search-presenter';

const view = new FavoriteHeavenView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    // eslint-disable-next-line no-new
    new FavoriteHeavenShowPresenter({ view, favoriteRestaurants: FavoriteHeavenIdb });
    // eslint-disable-next-line no-new
    new FavoriteHeavenSearchPresenter({
      view,
      favoriteRestaurants: FavoriteHeavenIdb,
    });
  },
};

export default Like;
