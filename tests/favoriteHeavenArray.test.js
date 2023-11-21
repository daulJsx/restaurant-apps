/* eslint-disable no-undef */
import { itActsAsfavoriteRestaurantModel } from './contracts/favoriteHeavensContract';

let favoriteRestaurants = [];

const FavoriteHeavenArray = {
  getHeaven(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return, , eqeqeq
    return favoriteRestaurants.find((restaurant) => restaurant.id == id);
  },

  getAllHeaven() {
    return favoriteRestaurants;
  },

  putHeaven(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getHeaven(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteHeaven(id) {
    // cara boros menghapus restaurant dengan meng-copy restaurant yang ada
    // kecuali restaurant dengan id == id

    // eslint-disable-next-line eqeqeq
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
  },

  async searchRestaurants(query) {
    return (await this.getAllHeaven()).filter((restaurant) => {
      const loweredCaseRestaurantTitle = (restaurant.title || '-').toLowerCase();
      const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  itActsAsfavoriteRestaurantModel(FavoriteHeavenArray);
});
