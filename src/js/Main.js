import Config from '../../config';
import GoogleMapsLoader from './GoogleMapsLoader';
import Neighborhoods from "./Neighborhoods";
import Cuisines from "./Cuisines";
import RestaurantsList from "./RestaurantsList";

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
        loadGoogleApi();
        fetchNeighborhoods();
        fetchCuisines();
    });
};

/**
 * Initialize Google map, called from HTML.
 */
export const loadGoogleApi = () => {
    const gml = new GoogleMapsLoader();
    gml.load({
        key: Config.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY",
        libraries: ['places'],
        mapOptions: Config.GOOGLE_MAPS_OPTIONS
    })
        .then(map => {
            window.map =map;
            updateRestaurants();
        });
};

export const fetchNeighborhoods = () => {
    const neighborhoods = new Neighborhoods();
    neighborhoods.fetchAll();
};

/**
 * Fetch all cuisines and set their HTML.
 */
export const fetchCuisines = () => {
    const cuisines = new Cuisines();
    cuisines.fetchAll();
};

/**
 * Update page and map for current restaurants.
 */
export const updateRestaurants = () => {
    const restaurantList = new RestaurantsList();
    restaurantList.fetchRestaurantByCuisineAndNeighborhood();
};
