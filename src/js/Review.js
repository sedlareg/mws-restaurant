export default class Review {

    createReviewHTML(review) {
        const li = document.createElement('li');

        const rating = document.createElement('span');
        rating.innerHTML = this.createRating(review.rating);
        li.appendChild(rating);

        const comments = document.createElement('p');
        comments.innerHTML = review.comments;
        li.appendChild(comments);

        const name = document.createElement('p');
        name.innerHTML = `<i>${review.date} (${review.name})</i>`;
        li.appendChild(name);

        return li;
    }

    createRating(rating) {
        let rateHtml = '<b>Rating: </b> ';
        for(let i = 0; i < 5; i++){
            if (i < rating){
                rateHtml += '<span class="fa fa-star checked"></span>';
            } else {
                rateHtml += '<span class="fa fa-star"></span>';
            }
        }

        return rateHtml;
    }
}