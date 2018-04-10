import Config from "../../config";
import DBHelper from './DbHelper';
import GoogleMapsLoader from './GoogleMapsLoader';
import Restaurant from "./Restaurant";

export const initDetails = () => {
    const restaurant = new Restaurant();
    restaurant.getFromUrl()
        .then(loadGoogleApi)
        .catch(error => console.error(error));
};

export const loadGoogleApi = (restaurant) => {
    /**
     * Initialize Google map, called from HTML.
     */
    const gml = new GoogleMapsLoader();
    gml.setOption('key', Config.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY",);
    gml.setOption('libraries', ['places']);
    gml.setOption('mapOptions', Config.GOOGLE_MAPS_OPTIONS);
    gml.load()
        .then(map => {
            window.map =map;
            fillBreadcrumb(restaurant);
            DBHelper.mapMarkerForRestaurant(restaurant, window.map);
        })
        .catch(error => console.error(error));
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
export const fillBreadcrumb = (restaurant) => {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    li.setAttribute('title', `Details page for restaurant: ${restaurant.name}`);
    li.setAttribute('aria-current', 'page');
    const link = document.createElement('a');
    link.href = '#';
    link.innerHTML = restaurant.name;
    li.appendChild(link);

    breadcrumb.appendChild(li);
};
