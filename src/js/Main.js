import Config from '../../config';
import GoogleMapsLoader from './GoogleMapsLoader';
import Neighborhoods from "./Neighborhoods";
import Cuisines from "./Cuisines";
import RestaurantsList from "./RestaurantsList";
import DBHelper from "./DbHelper";

window.markers = [];

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
export const initHome = () => {
    const cSelect = document.getElementById('cuisines-select');
    const nSelect = document.getElementById('neighborhoods-select');
    cSelect.onchange = updateRestaurants;
    nSelect.onchange = updateRestaurants;

    document.addEventListener('DOMContentLoaded', () => {
        DBHelper.fetchRestaurants()
            .then(restaurants => {
                fetchNeighborhoods(restaurants);
                fetchCuisines(restaurants);
                loadGoogleApi();
            })
    });
};

/**
 * Initialize Google map, called from HTML.
 */
export const loadGoogleApi = () => {
    const gml = new GoogleMapsLoader();
    gml.setOption('key', Config.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY");
    gml.setOption('libraries', ['places']);
    gml.setOption('mapOptions', Config.GOOGLE_MAPS_OPTIONS);
    gml.load()
        .then(map => {
            window.map =map;
            updateRestaurants();
        });
};

export const fetchNeighborhoods = (restaurants) => {
    const neighborhoods = new Neighborhoods();
    neighborhoods.fetchAll(restaurants);
};

/**
 * Fetch all cuisines and set their HTML.
 */
export const fetchCuisines = (restaurants) => {
    const cuisines = new Cuisines();
    cuisines.fetchAll(restaurants);
};

/**
 * Update page and map for current restaurants.
 */
export const updateRestaurants = () => {
    const restaurantList = new RestaurantsList();
    restaurantList.fetchRestaurantByCuisineAndNeighborhood();
};
