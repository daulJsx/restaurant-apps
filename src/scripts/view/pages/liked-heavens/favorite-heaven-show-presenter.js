class FavoriteHeavenShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurants = await this._favoriteRestaurants.getAllHeaven();
    this._displayHeavens(restaurants);
  }

  _displayHeavens(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }
}

export default FavoriteHeavenShowPresenter;
