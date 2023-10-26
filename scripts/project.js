const templesElement = document.querySelector('div');
const dataURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';


const getData = async () => {

    const response = await fetch(dataURL);

    data = await response.json();

    console.log(data.features);
    displayTemples(data.features);
}

let templeList = [];

/* async displayTemples Function */
const displayTemples = templeList => {
    templeList.forEach(item => {

        let article = document.createElement('article');

        let h3 = document.createElement('h3');
        h3.textContent = `Magnitude: ${item.properties.mag}`;

        let lat = item.geometry.coordinates[1];
        let lon = item.geometry.coordinates[0];

        let src = `https://maps.google.com/maps?q=${lat},${lon}&h1=us;z=14&output=embed&z=5`;

        /* src="https://maps.google.com/maps?q={lat},{lon}&h1=us;z=14&output=embed"  */

        /* <iframe src="https://maps.google.com/maps?q=38.8213348,-122.8531647&h1=us;z=14&output=embed&z=5" height="300" width="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Iframe Example"></iframe> */
        let image = document.createElement('iframe');
        image.setAttribute('src', src);
        image.setAttribute('height', "300");
        image.setAttribute('width', "400");
        image.setAttribute('style', "border:0;");
        image.setAttribute('allowfullscreen', "");
        image.setAttribute('loading', "lazy");
        image.setAttribute('referrerpolicy', "no-referrer-when-downgrade");
        image.setAttribute('referrerpolicy', "no-referrer-when-downgrade");


        let place = document.createElement('p');
        place.textContent = item.properties.place

        article.appendChild(h3);
        article.appendChild(image);
        article.appendChild(place);

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


getData();

/* Event Listener */
document.querySelector('#sortBy').addEventListener('change', () => {
    sortBy(templeList)
});