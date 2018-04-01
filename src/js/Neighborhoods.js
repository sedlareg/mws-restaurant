import DBHelper from "./DbHelper";

export default class Neighborhoods {
    /**
     * Fetch all restaurants
     */
    fetchAll() {
        DBHelper.fetchRestaurants()
            .then(this.filterUniqueNeighborhoods)
            .catch(this.showError)
            .then(this.fillNeighborhoodsHTML);
    }

    showError(error) {
        console.error(error);
    }

    /**
     * @param {object} restaurants
     * @returns {Promise<any>}
     */
    filterUniqueNeighborhoods(restaurants) {
        return new Promise(
            function(resolve, reject) {
                // Get all neighborhoods from all restaurants
                const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood);
                // Remove duplicates from neighborhoods
                const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i);
                if(uniqueNeighborhoods.length > 0) {
                    resolve(uniqueNeighborhoods);
                }else{
                    reject('no neighborhoods found');
                }
            })
    }

    fillNeighborhoodsHTML(neighborhoods) {
        const select = document.getElementById('neighborhoods-select');
        neighborhoods.forEach(neighborhood => {
            const option = document.createElement('option');
            option.innerHTML = neighborhood;
            option.value = neighborhood;
            select.append(option);
        });
    };
}
