import FavoriteHeavenShowPresenter from '../src/scripts/view/pages/liked-heavens/favorite-heaven-show-presenter';
import FavoriteHeavenView from '../src/scripts/view/pages/liked-heavens/favorite-heaven-view';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteHeavenView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should render the information that no restaurants have been liked', () => {
      const favoriteRestaurants = {
        getAllHeaven: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteHeavenShowPresenter({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      presenter._displayHeavens(restaurants);

      expect(document.querySelectorAll('.heaven-item__not__found').length).toEqual(1);
    });

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllHeaven: jest.fn().mockImplementation(() => []),
      };

      new FavoriteHeavenShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllHeaven).toHaveBeenCalledTimes(1);
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('heavens').addEventListener('heavens:updated', () => {
        expect(document.querySelectorAll('.heaven__card').length).toEqual(2);

        done();
      });

      const favoriteRestaurants = {
        getAllHeaven: jest.fn().mockImplementation(() => [
          {
            id: 11,
            title: 'A',
            vote_average: 3,
            overview: 'Sebuah restaurant A',
          },
          {
            id: 22,
            title: 'B',
            vote_average: 4,
            overview: 'Sebuah restaurant B',
          },
        ]),
      };

      new FavoriteHeavenShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
