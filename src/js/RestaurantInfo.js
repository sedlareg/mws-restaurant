import Config from "../../config";
import DBHelper from './DbHelper';
import GoogleMapsLoader from './GoogleMapsLoader';
import Restaurant from "./Restaurant";

export const initDetails = () => {
    const restaurant = new Restaurant();
    restaurant.getFromUrl()
        .then(restaurant => loadGoogleApi(restaurant))
        .catch(error => console.error(error));
};

export const loadGoogleApi = (restaurant) => {
    /**
     * Initialize Google map, called from HTML.
     */
    const gml = new GoogleMapsLoader();
    gml.load({
        key: Config.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY",
        libraries: ['places'],
        mapOptions: Config.GOOGLE_MAPS_OPTIONS
    })
        .then(map => {
            window.map =map;
            fillBreadcrumb(restaurant);
            DBHelper.mapMarkerForRestaurant(restaurant, window.map);
        });
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 * todo: add aria current
 */
export const fillBreadcrumb = (restaurant) => {
    const breadcrumb = document.getElementById('breadcrumb');
    const li = document.createElement('li');
    li.innerHTML = restaurant.name;
    breadcrumb.appendChild(li);
};
