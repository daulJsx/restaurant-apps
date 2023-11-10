import RestaurantSource from '../data/restaurant-source';
import CONFIG from '../globals/config';

const loadCatalogue = async ({ catalogue }) => {
  try {
    const response = await RestaurantSource.restList();

    response.restaurants.forEach((restaurant) => {
      const restaurantDiv = document.createElement('div');
      restaurantDiv.classList.add('restaurant');

      // Membentuk URL gambar dari CONFIG
      const imageUrl = `${CONFIG.BASE_IMAGE_URL_MD}${restaurant.pictureId}`;

      restaurantDiv.innerHTML = `
        <figure class="heaven__card">
          <a href="/#/detail/${restaurant.id}">
            <img class="card__image lazyload" src="${imageUrl}" alt="${restaurant.name}" tabindex="0">
            <div class="card__content">
              <blockquote>
                <p class="restaurant__name">
                  ${restaurant.name}
                </p>
              </blockquote>
              <figcaption>
                <div class="restaurant__city">
                  ${restaurant.city}
                </div>
                <div class="restaurant__rating">
                  &star; ${restaurant.rating}
                </div>
              </figcaption>
            </div>
          </a>
        </figure>
      `;

      catalogue.appendChild(restaurantDiv);
    });
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data:', error);
  }
};

export default loadCatalogue;
