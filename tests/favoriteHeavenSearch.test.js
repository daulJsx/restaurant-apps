import FavoriteHeavenSearchPresenter from '../src/scripts/view/pages/liked-heavens/favorite-heaven-search-presenter';
import FavoriteHeavenView from '../src/scripts/view/pages/liked-heavens/favorite-heaven-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setHeavenSearchContainer = () => {
    view = new FavoriteHeavenView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllHeaven: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteHeavenSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setHeavenSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        expect(document.querySelectorAll('.heaven__card').length).toEqual(3);

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__name');

        expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, title: 'restaurant abc' },
            { id: 222, title: 'ada juga restaurant abcde' },
            { id: 333, title: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__name');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllHeaven.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllHeaven.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllHeaven).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        expect(document.querySelectorAll('.heaven-item__not__found').length).toEqual(1);

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('restaurant a');
    });

    it('should not show any restautant', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        expect(document.querySelectorAll('.heaven__card').length).toEqual(0);

        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('restaurant a');
    });
  });
});
