/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../../templates/template-creator';

class FavoriteHeavenView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Heaven</h2>
  
        <div id="heavens" class="heavens">
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(
        createRestaurantItemTemplate(restaurant),
      ), '');
    } else {
      html = this._getEmptyHeavenTemplate();
    }

    document.getElementById('heavens').innerHTML = html;

    document.getElementById('heavens').dispatchEvent(new Event('heavens:updated'));
  }

  _getEmptyHeavenTemplate() {
    return `
      <div class="heaven-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteHeavenView;
