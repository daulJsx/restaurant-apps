/* eslint-disable no-unused-vars */
import CONFIG from '../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const createRestaurantItemTemplate = (restaurant) => `
<figure class="heaven__card">
  <a href="/#/detail/${restaurant.id}">
    <img 
      class="card__image"
      loading="lazy" 
      src="${CONFIG.BASE_IMAGE_URL_LG + restaurant.pictureId}" 
      alt="${restaurant.name || '-'}" 
      tabindex="0"
      class="lazyload"
    >
    <div class="card__content">
      <blockquote>
        <p class="restaurant__name">
          ${restaurant.name || '-'}
        </p>
      </blockquote>
      <figcaption>
        <div class="restaurant__city">
          ${restaurant.city || '-'}
        </div>
        <div class="restaurant__rating">
          <i class="fa fa-star"></i>
          ${restaurant.rating || '-'}
        </div>
      </figcaption>
    </div>
  </a>
</figure>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <header>
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <div class="detail__header">
      <img 
        class="restaurant__image" 
        src="${CONFIG.BASE_IMAGE_URL_LG + restaurant.pictureId}" 
        alt="${restaurant.name}"
        class="lazyload"
        loading="lazy"
      >
      <div class="restaurant__info">
        <h3>${restaurant.address}, ${restaurant.city}</h3>
        <p>${restaurant.description}</p>
      </div>
    <div/>
  </header>
 
    <div class="restaurant__menu">
      <div class="menu__foods">
        <h3>Food</h3>
        <hr>
        <ul class="list__foods">
          ${restaurant.menus.foods
    .map(
      (food) => `
            <li>
              <i class="fa fa-cutlery font-decoration"></i>
              ${food.name}
            </li>
          `,
    )
    .join('')}
        </ul>
      </div>
      <div class="menu__drinks">
        <h3>Drink</h3>
        <hr>
        <ul class="list__drinks">
          ${restaurant.menus.drinks
    .map(
      (drink) => `
            <li>
              <i class="fa fa-coffee font-decoration"></i> 
              ${drink.name}
            </li>
          `,
    )
    .join('')}
        </ul>
      </div>
    </div>
    <div id="resto__reviews">
      <h2 tabindex="0"><span>Reviews</span></h2>
      <ul class="reviews">
        ${restaurant.customerReviews
    .map(
      (review) => `
          <li class="review__item">
            <div class="review__header">
              <p class="review__name"><i title="restaurant" class="fa fa-user-circle"></i>${review.name}</p>
              <p class="review__date">${review.date}</p>
            </div>
            <p class="review__content">
              ${review.review}
            </p>
          </li>
        `,
    )
    .join('')}
      </ul>
    </div>
  
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
