/* eslint-disable no-undef */
const itActsAsfavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putHeaven({ id: 1 });
    favoriteRestaurant.putHeaven({ id: 2 });

    expect(await favoriteRestaurant.getHeaven(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getHeaven(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getHeaven(3)).toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    favoriteRestaurant.putHeaven({ aProperty: 'property' });

    expect(await favoriteRestaurant.getAllHeaven()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteRestaurant.putHeaven({ id: 1 });
    favoriteRestaurant.putHeaven({ id: 2 });

    expect(await favoriteRestaurant.getAllHeaven()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurant', async () => {
    favoriteRestaurant.putHeaven({ id: 1 });
    favoriteRestaurant.putHeaven({ id: 2 });
    favoriteRestaurant.putHeaven({ id: 3 });

    await favoriteRestaurant.deleteHeaven(1);

    expect(await favoriteRestaurant.getAllHeaven()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    favoriteRestaurant.putHeaven({ id: 1 });
    favoriteRestaurant.putHeaven({ id: 2 });
    favoriteRestaurant.putHeaven({ id: 3 });

    await favoriteRestaurant.deleteHeaven(4);

    expect(await favoriteRestaurant.getAllHeaven()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should be able to search for restaurants', async () => {
    favoriteRestaurant.putHeaven({ id: 1, title: 'restaurant a' });
    favoriteRestaurant.putHeaven({ id: 2, title: 'restaurant b' });
    favoriteRestaurant.putHeaven({ id: 3, title: 'restaurant abc' });
    favoriteRestaurant.putHeaven({ id: 4, title: 'ini mah restaurant abcd' });

    expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 3, title: 'restaurant abc' },
      { id: 4, title: 'ini mah restaurant abcd' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsfavoriteRestaurantModel };
