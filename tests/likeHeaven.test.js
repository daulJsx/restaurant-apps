/* eslint-disable no-undef */
import { spyOn } from 'jest-mock';
import FavoriteHeavenIdb from '../src/scripts/data/favorite-heaven-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="like-btn"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();

    spyOn(FavoriteHeavenIdb, 'searchRestaurants');
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithHeaven({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithHeaven({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonPresenterWithHeaven({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Memastikan restaurant berhasil disukai
    const restaurant = await FavoriteHeavenIdb.getHeaven(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteHeavenIdb.deleteHeaven(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithHeaven({ id: 1 });

    // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
    await FavoriteHeavenIdb.putHeaven({ id: 1 });

    // Simulasikan pengguna menekan tombol suka restaurant
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Tidak ada restaurant yang ganda
    expect(await FavoriteHeavenIdb.getAllHeaven()).toEqual([{ id: 1 }]);

    await FavoriteHeavenIdb.deleteHeaven(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithHeaven({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteHeavenIdb.getAllHeaven()).toEqual([]);
  });
});
