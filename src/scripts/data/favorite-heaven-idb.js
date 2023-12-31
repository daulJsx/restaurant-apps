import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteHeavenIdb = {
  async getHeaven(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllHeaven() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putHeaven(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteHeaven(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },

  async searchRestaurants(query) {
    return (await this.getAllHeaven()).filter((restaurant) => {
      const loweredCaseHeavenTitle = (restaurant.title || '-').toLowerCase();
      const jammedHeavenTitle = loweredCaseHeavenTitle.replace(/\s/g, '');

      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

      return jammedHeavenTitle.indexOf(jammedQuery) !== -1;
    });
  },
};

export default FavoriteHeavenIdb;
