import RestaurantSource from '../data/restaurant-source';
import UrlParser from '../routes/url-parser';

const addNewReview = async () => {
  try {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const inputReviewName = document.getElementById('inputName');
    const inputReview = document.getElementById('inputReview');
    const reviewContainer = document.querySelector('.reviews');

    if (!inputReviewName.value || !inputReview.value) {
      alert('Name and review cannot be empty!');
      return;
    }

    const dataInput = {
      id: url.id,
      name: inputReviewName.value,
      review: inputReview.value,
    };

    const date = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const reviewElement = `
        <li class="review__item">
            <div class="review__header">
                <p class="review__name">
                    <i title="restaurant" class="fa fa-user-circle"></i>
                    ${dataInput.name}
                </p>
                <p class="review__date">${date}</p>
            </div>
            <p class="review__content">
                ${dataInput.review}
            </p>
        </li>
    `;

    await RestaurantSource.postNewReview(dataInput);
    reviewContainer.innerHTML += reviewElement;
    inputReviewName.value = '';
    inputReview.value = '';
  } catch (error) {
    console.error('Error posting review:', error);
    alert('Failed to post review. Please try again.');
  }
};

export default addNewReview;
