import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../../templates/template-creator';

const Main = {
  async render() {
    return `
      <!-- List Section Start -->
        <section id="list" class="list">
          <h2 tabindex="0">Popular Heaven</h2>
          <div class="row" id="restaurant-list"></div>
        </section>
      <!-- List Section End -->
    `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    // Memuat katalog restoran ke dalam elemen dengan id "restaurant-list"
    const catalogue = document.getElementById('restaurant-list');
    const restaurants = await RestaurantSource.restList();
    restaurants.restaurants.forEach((restaurant) => {
      catalogue.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Main;
