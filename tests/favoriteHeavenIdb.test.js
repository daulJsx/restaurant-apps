/* eslint-disable no-undef */
import { itActsAsfavoriteRestaurantModel } from './contracts/favoriteHeavensContract';
import FavoriteHeavenIdb from '../src/scripts/data/favorite-heaven-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteHeavenIdb.getAllHeaven()).forEach(async (restaurant) => {
      await FavoriteHeavenIdb.deleteHeaven(restaurant.id);
    });
  });

  itActsAsfavoriteRestaurantModel(FavoriteHeavenIdb);
});
