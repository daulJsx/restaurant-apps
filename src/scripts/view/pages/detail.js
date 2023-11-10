import { createRestaurantDetailTemplate, createLikeButtonTemplate } from '../../templates/template-creator';
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteHeavenIdb from '../../data/favorite-heaven-idb';
import addNewReview from '../../utils/add-review';

const Detail = {
  async render() {
    return `
    <a href="#mainContentDetail" class="skip-link">Skip to Content</a>
    <main tabindex="0" id="mainContentDetail">
      <div id="restaurant-detail" class="restaurant__detail"></div>
    </main>
      <div id="like-btn"></div>

      <div class="review__form">
      <h2>Add Review</h2>
        <form>
            <div class="form__control">
              <label for="inputName" class="form-label">Name</label>
              <input name="inputName" type="text" class="form-control" id="inputName">
            </div>
            <div class="form__control">
              <label for="inputReview" class="form-label">Review</label>
              <input name="inputReview" type="text" class="form-control" id="inputReview">
            </div>
            <button id="submit-review" type="submit" class="btn">Submit</button>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.restDetail(url.id);
    const restaurantContainer = document.querySelector('#restaurant-detail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(
      restaurant.restaurant,
    );

    const likeButton = document.querySelector('#like-btn');
    likeButton.innerHTML = createLikeButtonTemplate();

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#like-btn'),
      favoriteRestaurants: FavoriteHeavenIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    const postNewReview = document.getElementById('submit-review');
    postNewReview.addEventListener('click', (event) => {
      event.preventDefault();
      addNewReview();
    });

    document
      .querySelector('.skip-link')
      .addEventListener('click', (event) => {
        event.preventDefault();
        const targetElement = document.getElementById('mainContentDetail');
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
  },
};

export default Detail;
