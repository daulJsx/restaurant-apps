import loadCatalogue from '../../utils/load-catalogue';

const Main = {
  async render() {
    return `
    <main tabindex="0" id="mainContent">
      <!-- Hero Section Start -->
      <section class="hero" id="home">
        <div class="left">
          <h1 tabindex="0"><span>Discover </span>stuff of your life!</h1>
          <p tabindex="0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia,
            voluptatem.
          </p>
          <a href="#list" tabindex="0" class="cta" aria-label="Get Started"
            >Get Started</a
          >
        </div>

        <div class="right"></div>
      </section>
      <!-- Hero Section End -->

      <!-- About Section Start -->
      <section id="about" class="about">
        <h2 tabindex="0">About Us</h2>

        <div class="row">
          <div class="about__img">
            <img
              tabindex="0"
              loading="lazy"
              src="images/heros/hero-image_4.jpg"
              alt="About us"
            />
          </div>

          <div class="about__content">
            <h3 tabindex="0">Why must <span>Food Heaven </span> ?</h3>
            <p tabindex="0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              inventore ab voluptatum laborum fuga. Possimus rerum, earum
              cupiditate aspernatur cum, dignissimos commodi exercitationem
              adipisci ullam tempore laboriosam praesentium deleniti non.
            </p>
            <p tabindex="0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              delectus voluptatum dolorem commodi numquam. Facere, dolore. Quasi
              quaerat eos veniam minima molestias, perferendis officia iste odio
              exercitationem aspernatur incidunt placeat.
            </p>
          </div>
        </div>
      </section>
      <!-- About Section End -->

      <!-- List Section Start -->
      <section id="list" class="list">
        <h2 tabindex="0">Popular Heaven</h2>

        <div class="row" id="restaurant-list">
          
        </div>
      </section>
      <!-- List Section End -->
    </main>
    `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    // Memuat katalog restoran ke dalam elemen dengan id "restaurant-list"
    const catalogue = document.getElementById('restaurant-list');
    await loadCatalogue({ catalogue });
  },
};

export default Main;
