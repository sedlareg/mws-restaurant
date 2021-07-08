export default class Cuisines {
    /**
     * Fetch all restaurants
     */
    fetchAll(restaurants) {
        this.filterUniqueCuisines(restaurants)
            .catch(this.showError)
            .then(this.fillCuisinesHTML);
    }

    showError(error) {
        console.error(error);
    }

    /**
     * @param {object} restaurants
     * @returns {Promise<any>}
     */
    filterUniqueCuisines(restaurants) {
        return new Promise(
            function(resolve, reject) {
                // Get all cuisines from all restaurants
                const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type);
                // Remove duplicates from cuisines
                const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);

                if(uniqueCuisines.length > 0) {
                    resolve(uniqueCuisines);
                }else{
                    reject('no cuisines found');
                }
            })
    }

    fillCuisinesHTML(cuisines) {
        const select = document.getElementById('cuisines-select');
        cuisines.forEach(cuisine => {
            const option = document.createElement('option');
            option.innerHTML = cuisine;
            option.value = cuisine;
            select.append(option);
        });
    };
}
