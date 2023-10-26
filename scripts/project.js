const templesElement = document.querySelector('div');
const dataURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
/* async getTemples Function using fetch()*/
const getTemples = async () => {

    const response = await fetch(dataURL);

    templeList = await response.json();

    console.log(templeList);
    // displayTemples(templeList);
}

let templeList = [];

/* async displayTemples Function */
const displayTemples = templeList => {
    templeList.forEach(item => {

        let article = document.createElement('article');

        let h3 = document.createElement('h3');
        h3.textContent = item.templeName;

        let image = document.createElement('img');
        image.setAttribute('src', item.imageUrl);
        image.setAttribute('alt', item.location);

        article.appendChild(h3);
        article.appendChild(image);

        templesElement.appendChild(article);
    });
}


/* reset Function */
const reset = () => {
    document.querySelector('#temples').innerHTML = '';
}

/* sortBy Function */
const sortBy = templeList => {

    reset();

    const filter = document.querySelector('#sortBy').value;

    switch (filter) {

        case "utah":
            displayTemples(
                templeList.filter(item => item.location.includes('Utah'))
            );

            break;

        case "notutah":
            displayTemples(
                templeList.filter(item => !item.location.includes('Utah'))
            );

            break;

        case "older":
            displayTemples(
                templeList.filter(item => new Date(item.dedicated) < new Date(1950, 0, 1))
            );

            break;

        case "all":
            displayTemples(templeList);
    };
}


getTemples();

/* Event Listener */
document.querySelector('#sortBy').addEventListener('change', () => {
    sortBy(templeList)
});