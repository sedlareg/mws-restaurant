import Config from '../../config';

/**
 * Common database helper functions.
 */
export default class DBHelper {
    /**
     * Database URL.
     * Change this to restaurants.json file location on your server.
     */
    static get DATABASE_URL() {
        return Config.DATA_STORE || '/data/restaurants.json';
    }

    /**
     * Fetch all restaurants.
     */
    static fetchRestaurants() {
        return fetch(DBHelper.DATABASE_URL)
            .then(response => response.json())
            .then(json => json.restaurants)
            .catch(error => console.error(error));
    }

    /**
     * Restaurant page URL.
     */
    static urlForRestaurant(restaurant) {
        return (`./restaurant.html?id=${restaurant.id}`);
    }

    /**
     * Map marker for a restaurant.
     */
    static mapMarkerForRestaurant(restaurant, map) {
        return new window.google.maps.Marker({
                position: restaurant.latlng,
                title: restaurant.name,
                url: DBHelper.urlForRestaurant(restaurant),
                map: map,
                animation: window.google.maps.Animation.DROP
            }
        );
    }

}
