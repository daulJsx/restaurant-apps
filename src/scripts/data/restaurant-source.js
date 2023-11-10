import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async restList() {
    const response = await fetch(API_ENDPOINT.CATALOGUE);
    const responseJson = await response.json();
    return responseJson;
  }

  static async restDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postNewReview(review) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    };
    const response = await fetch(API_ENDPOINT.ADD_NEW_REVIEW, options);
    return response.json();
  }
}

export default RestaurantSource;
