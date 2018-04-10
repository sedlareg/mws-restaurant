export default class GoogleMapsLoader {
    /**
     * @description Add script element to page and loads GoogleMap Api
     * @constructor
     */
    constructor() {
        this.options = new Proxy(
            {
                businessApi: null,
                initializator: '__google_maps_api_provider_initializator__',
                isAsync: true,
                isDefer: true,
                key: null,
                language: 'en',
                libraries: [],
                mapApiUrl: 'https://maps.googleapis.com/maps/api/js',
                mapId: 'map',
                mapOptions: {
                    zoom: 12,
                    center: {
                        lat: 40.722216,
                        lng: -73.987501
                    },
                    scrollwheel: false,
                },
                region: 'US',
                version: '3.27',
            },
            {
                get(target, property) {
                    return Reflect.get(...arguments);
                },
                set(target, property, value) {
                    return Reflect.set(...arguments);
                }
            }
        );

        this.google = null;
        this.scriptElement = null;
        this.loading = false;
    }

    getOptions() {
        console.log(this.options);
        return this.options;
    }

    getOption(key) {
        console.log(this.options[key]);
        return this.options[key];
    }

    setOption(key, value) {
        this.options[key] = value;
    }

    load() {
        let that = this;
        return new Promise(
            function (resolve, reject) {
                if (that.google === null) {
                    if(that.loading === false) {
                        that.loading = true;
                        that.appendLoaderToBody();
                        window[that.options.initializator] = function () {
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
        if (this.options.isAsync) this.scriptElement.async = true; // not needed as async is set by default
        if (this.options.isDefer) this.scriptElement.defer = true;
        this.scriptElement.onerror = this.onError;
        document.body.appendChild(this.scriptElement);
    }

    onError() {
        console.error('could not load google maps');
    }
    /**
     * @description Creates GoogleMapApi URL for script
     * @returns {string}
     */
    createUrl() {
        let url = this.options.mapApiUrl;
        url += '?callback=' + this.options.initializator;
        url += `&key=${this.options.key}`;

        if (this.options.libraries.length > 0) {
            url += '&_libraries=' + this.options.libraries.join(',');
        }

        if (this.options.businessApi) {
            url += '&client=' + this.options.businessApi + '&v=' + this.options.version;
        }

        if (this.options.language) {
            url += '&_language=' + this.options.language;
        }

        if (this.options.region) {
            url += '&_region=' + this.options.region;
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
        const map = document.getElementById(this.options.mapId);
        map.style.display = 'block';

       return new this.google.maps.Map(map, this.options.mapOptions);
    }
}