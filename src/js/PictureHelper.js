/**
 * Common helper to create picture elements for page
 */
export default class PictureHelper {

    /**
     *
     * @param {object} restaurant
     * @param {string} imgSourcePath
     * @param {string} imgClass
     */
    constructor(restaurant, imgSourcePath, imgClass) {
        this.restaurant = restaurant;
        this.imgSourcePath = imgSourcePath;
        this.imgClass = imgClass;
    }

    /**
     * @description Builds picture element
     * @returns {HTMLElement}
     */
    getPictureElement() {
        const picture = document.createElement('picture');
        picture.className = 'restaurant-img';
        const imgName= this.restaurant.photograph.split('.').shift();
        const sources = [PictureHelper.BREAKPOINT_LARGE, PictureHelper.BREAKPOINT_MEDIUM, null];

        for(let i=0; i < sources.length; i++) {
            if(sources[i] !== null){
                picture.append(
                    this.getSourceForPicture(
                        sources[i],
                        imgName,
                        PictureHelper.IMAGE_TYPE_JPG
                    ));
            }
            picture.append(
                this.getSourceForPicture(
                    sources[i],
                    imgName,
                    PictureHelper.IMAGE_TYPE_WEBP
                ));
        }

        const image = document.createElement('img');
        image.className = this.imgClass;
        image.src = `/${this.imgSourcePath}/${this.restaurant.photograph}`;
        image.alt = this.restaurant.name;
        picture.append(image);

        return picture;
    };

    /**
     * @description Builds srcset element
     * @param {string} breakpoint
     * @param {string} imgName
     * @param {string} type
     * @returns {HTMLElement}
     */
    getSourceForPicture(breakpoint, imgName, type) {
        let minWidth,
            imgSuffix = `-${breakpoint}`;
        switch (breakpoint){
            case PictureHelper.BREAKPOINT_LARGE:
                minWidth = PictureHelper.BREAKPOINT_LARGE_WIDTH;
                break;
            case PictureHelper.BREAKPOINT_MEDIUM:
                minWidth = PictureHelper.BREAKPOINT_MEDIUM_WIDTH;
                break;
            default:
                imgSuffix = '';
        }

        const source = document.createElement('source');
        source.media = breakpoint ? `(min-width: ${minWidth}px)` : '';
        source.srcset = `/${this.imgSourcePath}/${imgName}${imgSuffix}.${type}`;
        source.type =  type === PictureHelper.IMAGE_TYPE_JPG
            ? PictureHelper.MIME_TYPE_JPG
            : `image/${type}`;

        return source;
    };
}

PictureHelper.BREAKPOINT_MEDIUM = 'medium';
PictureHelper.BREAKPOINT_MEDIUM_WIDTH = 460;
PictureHelper.BREAKPOINT_LARGE = 'large';
PictureHelper.BREAKPOINT_LARGE_WIDTH = 800;
PictureHelper.IMAGE_TYPE_JPG = 'jpg';
PictureHelper.IMAGE_TYPE_WEBP = 'webp';
PictureHelper.MIME_TYPE_JPG = 'image/jpeg';
PictureHelper.MIME_TYPE_WEBP = 'image/webp';
