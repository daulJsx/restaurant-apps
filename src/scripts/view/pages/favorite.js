import FavoriteHeavenIdb from '../../data/favorite-heaven-idb';
import { createRestaurantItemTemplate } from '../../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section>
        <div class="favorite__content">
          <h2 class="favorite__header"></h2>
          <div id="likedHeavens" class="liked__heavens">
    
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restaurants = await FavoriteHeavenIdb.getAllHeaven();
    const restaurantContainer = document.querySelector('#likedHeavens');

    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    const empty = document.querySelector('.favorite__header');
    if (restaurants.length === 0) {
      empty.innerHTML = `
      <h2>You haven't added a favorite yet</h2>
      `;
    } else {
      empty.innerHTML = `
      <h2>Your Liked Heaven</h2>
      `;
    }
  },
};

export default Favorite;
