import DBHelper from "./DbHelper";
import PictureHelper from "./PictureHelper";
import Review from "./Review";

export default class Restaurant {

    constructor(){
        this.restaurant = null;
    }

    getFromUrl() {
        const that = this;
        return new Promise(
            function (resolve, reject) {
                if (that.restaurant) { // restaurant already fetched!
                    console.log('already fetched', that.restaurant);
                    resolve(that.restaurant);
                }
                const id = that.getParameterByName('id');
                if (!id) { // no id found in URL
                    error = 'No restaurant id in URL';
                    reject(error);
                } else {
                    DBHelper.fetchRestaurants()
                        .then(restaurants => that.findById(restaurants, id))
                        .then(restaurant => {
                            that.fillRestaurantHTML(restaurant);
                            resolve(restaurant)
                        })
                        .catch(error => console.error(error));
                }
            }
        );
    }

    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    findById(restaurants, id) {
        return new Promise(
          function(resolve, reject){
              const restaurant = restaurants.find(element => element.id == id);
              if (restaurant) { // Got the restaurant
                  resolve(restaurant);
              } else { // Restaurant does not exist in the database
                  const error = 'Restaurant does not exist';
                  reject(error);
              }
          });
    }

    fillRestaurantHTML(restaurant) {
        const name = document.getElementById('restaurant-name');
        name.innerHTML = restaurant.name;

        const address = document.getElementById('restaurant-address');
        address.innerHTML = restaurant.address;

        const targetPicture = document.getElementById('restaurant-img');
        const picture = new PictureHelper(restaurant, 'img', 'restaurant-img');
        const newPicture = picture.getPictureElement(restaurant);
        targetPicture.replaceWith(newPicture);

        const cuisine = document.getElementById('restaurant-cuisine');
        cuisine.innerHTML = restaurant.cuisine_type;

        // fill operating hours
        if (restaurant.operating_hours) {
            this.fillRestaurantHoursHTML(restaurant);
        }
        // fill reviews
        this.fillReviewsHTML(restaurant);
    }

    fillRestaurantHoursHTML(restaurant) {
        const operatingHours = restaurant.operating_hours;
        const hours = document.getElementById('restaurant-hours');
        for (let key in operatingHours) {
            const row = document.createElement('tr');

            const day = document.createElement('td');
            day.innerHTML = key;
            row.appendChild(day);

            const time = document.createElement('td');
            time.innerHTML = operatingHours[key];
            row.appendChild(time);

            hours.appendChild(row);
        }
    }

    fillReviewsHTML(restaurant) {
        const reviews = restaurant.reviews;
        const container = document.getElementById('reviews-container');
        const title = document.createElement('h2');
        title.innerHTML = 'Reviews';
        container.appendChild(title);

        if (!reviews) {
            const noReviews = document.createElement('p');
            noReviews.innerHTML = 'No reviews yet!';
            container.appendChild(noReviews);
            return;
        }
        const ul = document.getElementById('reviews-list');
        reviews.forEach(review => {
            var reviewElement = new Review();
            ul.appendChild(reviewElement.createReviewHTML(review));
        });
        container.appendChild(ul);
    }
}
