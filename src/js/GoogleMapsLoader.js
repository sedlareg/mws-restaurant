export default class GoogleMapsLoader {
    /**
     * @description Add script element to page and loads GoogleMap Api
     * @constructor
     * @param {string} async - flag to set async loading
     * @param {string} defer - flag to set defer
     */
    constructor(async = true, defer = true) {
        this.language = 'en';
        this.region = 'US';
        this.initializator = '__google_maps_api_provider_initializator__';
        this.mapApiUrl = 'https://maps.googleapis.com/maps/api/js';
        this.libraries = [];
        this.businessApi = null;
        this.key = null;
        this.version = '3.27';
        this.mapId = 'map';
        this.mapOptions = {
            zoom: 12,
            center: {
                lat: 40.722216,
                lng: -73.987501
            },
            scrollwheel: false,
        };

        this.isAsync = async;
        this.isDefer = defer;
        this.google = null;
        this.scriptElement = null;
        this.loading = false;
    }

    get REGION() {
        return this.region;
    }

    set REGION(region) {
        this.region = region;
    }

    get LIBRARIES() {
        return this.libraries;
    }

    set LIBRARIES(libs) {
        this.libraries = libs;
    }

    get BUSINESS_API() {
        return this.businessApi;
    }

    set BUSINESS_API(key) {
        this.businessApi = key;
    }

    get KEY() {
        return this.key;
    }

    set KEY(key) {
        this.key = key;
    }

    get VERSION() {
        return this.version;
    }

    set VERSION(version) {
        this.version = version;
    }

    get LANGUAGE() {
        return this.language;
    }

    set LANGUAGE(language) {
        this.language = language;
    }

    load(options) {
        Object.entries(options).forEach(
            ([key, value]) => this[key] = value
        );

        let that = this;
        return new Promise(
            function (resolve, reject) {
                if (that.google === null) {
                    if(that.loading === false) {
                        that.loading = true;
                        that.appendLoaderToBody();
                        window[that.initializator] = function () {
                            if(window.google === null){
                                throw new Error('error loading google maps')
                            }
                            resolve(that.ready());
                        };
                    }else{
                        reject('error loading google maps');
                    }
                }
            });
    }

    /**
     * @description Adds script tag for loading
     * @returns {void}
     */
    appendLoaderToBody() {
        this.scriptElement = document.createElement('script');
        this.scriptElement.src = this.createUrl();
        if (this.isAsync) this.scriptElement.async = true; // not needed as async is set by default
        if (this.isDefer) this.scriptElement.defer = true;
        document.body.appendChild(this.scriptElement);
    }

    /**
     * @description Creates GoogleMapApi URL for script
     * @returns {string}
     */
    createUrl() {
        let url = this.mapApiUrl;
        url += '?callback=' + this.initializator;
        url += `&key=${this.key}`;

        if (this.libraries.length > 0) {
            url += '&_libraries=' + this.libraries.join(',');
        }

        if (this.businessApi) {
            url += '&client=' + this.businessApi + '&v=' + this.version;
        }

        if (this.language) {
            url += '&_language=' + this.language;
        }

        if (this.region) {
            url += '&_region=' + this.region;
        }

        return url;
    }

    /**
     * @description onReady-Handler
     * @returns {Map}
     */
    ready() {
        this.loading = false;
        if (this.google === null) {
            this.google = window.google;
        }

        return this.createMap();
    }

    /**
     * @description Creates new GoogleMap
     * @returns {Map}
     */
    createMap() {
        const map = document.getElementById(this.mapId);
        map.style.display = 'block';

       return new this.google.maps.Map(map, this.mapOptions);
    }
}