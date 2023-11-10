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
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllHeaven() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putHeaven(restaurant) {
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteHeaven(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoriteHeavenIdb;
