import DBHelper from "./DbHelper";
import PictureHelper from "./PictureHelper";

export default class RestaurantsList {
    /**
     * Fetch all restaurants
     */
    fetchRestaurantByCuisineAndNeighborhood() {
        const cSelect = document.getElementById('cuisines-select');
        const nSelect = document.getElementById('neighborhoods-select');

        const cIndex = cSelect.selectedIndex;
        const nIndex = nSelect.selectedIndex;

        const cuisine = cSelect[cIndex].value;
        const neighborhood = nSelect[nIndex].value;

        DBHelper.fetchRestaurants()
            .then(restaurants => this.filterByCuisineAndNeighborhood(restaurants, cuisine, neighborhood))
            .then(results => this.fillRestaurantsHTML(results))
            .catch(error => console.error(error));
    }

    filterByCuisineAndNeighborhood(restaurants, cuisine, neighborhood) {
        return new Promise(
            function (resolve) {
                let results = restaurants;
                if (cuisine !== 'all') { // filter by cuisine
                    results = results.filter(element => element.cuisine_type == cuisine);
                }
                if (neighborhood !== 'all') { // filter by neighborhood
                    results = results.filter(element => element.neighborhood == neighborhood);
                }
                console.log(results);
                resolve(results);
            })
    }

    fillRestaurantsHTML(restaurants) {
        this.resetRestaurants();
        this.createList(restaurants);
    }

    resetRestaurants() {
        // Remove all restaurants
        const ul = document.getElementById('restaurants-list');
        ul.innerHTML = '';

        // Remove all map markers
        window.markers.forEach(m => m.setMap(null));
        window.markers = [];
    }

    createList(restaurants) {
        const container = document.getElementById('restaurants-container');
        const ul = document.getElementById('restaurants-list');
        ul.style.display = 'inline-flex';

        this.removeNoResult(container);
        if (restaurants.length < 1) {
            ul.style.display = 'none';
            this.addNoResult(container);
            return;
        }

        restaurants.forEach(restaurant => {
            ul.append(this.createRestaurantHTML(restaurant));
        });
        this.addMarkersToMap(restaurants);
    }

    removeNoResult(container) {
        const noRestaurants = document.getElementById('restaurant-no-result');
        if(noRestaurants) {
            container.removeChild(noRestaurants);
        }
    }

    addNoResult(container) {
        const noRestaurants = document.createElement('p');
        noRestaurants.id = 'restaurant-no-result';
        noRestaurants.className = 'no-result';
        noRestaurants.innerHTML = 'No restaurants found!';
        container.appendChild(noRestaurants);
    }

    createRestaurantHTML(restaurant) {
        const li = document.createElement('li');
        li.className = 'flex-list-item';

        const picture = new PictureHelper(restaurant, 'img', 'restaurant-img');
        li.append(picture.getPictureElement(restaurant));

        const container = document.createElement('div');
        li.append(container);

        const name = document.createElement('h1');
        name.innerHTML = restaurant.name;
        container.append(name);

        const neighborhood = document.createElement('p');
        neighborhood.innerHTML = restaurant.neighborhood;
        container.append(neighborhood);

        const address = document.createElement('p');
        address.innerHTML = restaurant.address;
        container.append(address);

        const more = document.createElement('a');
        more.innerHTML = 'View Details';
        more.href = DBHelper.urlForRestaurant(restaurant);
        container.append(more);

        return li;
    }

    addMarkersToMap(restaurants) {
        restaurants.forEach(restaurant => {
            // Add marker to the map
            const marker = DBHelper.mapMarkerForRestaurant(restaurant, window.map);
            window.google.maps.event.addListener(marker, 'click', () => {
                window.location.href = marker.url
            });
            window.markers.push(marker);
        });
    }

}
