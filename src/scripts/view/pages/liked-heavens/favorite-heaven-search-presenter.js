class FavoriteHeavenSearchPresenter {
  constructor({ favoriteRestaurants, view }) {
    this._favoriteRestaurants = favoriteRestaurants;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundHeavens;
    if (this.latestQuery.length > 0) {
      foundHeavens = await this._favoriteRestaurants.searchRestaurants(
        this.latestQuery,
      );
    } else {
      foundHeavens = await this._favoriteRestaurants.getAllHeaven();
    }

    this._showFoundHeavens(foundHeavens);
  }

  _showFoundHeavens(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteHeavenSearchPresenter;
