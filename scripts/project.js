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

        let timestamp = document.createElement('p');
        let time = new Date(item.properties.time).toUTCString();
        timestamp.textContent = time;

        let lat = item.geometry.coordinates[1];
        let lon = item.geometry.coordinates[0];

        let src = `https://maps.google.com/maps?q=${lat},${lon}&h1=us;z=14&output=embed&z=5`;

        /* let src = `https://maps.google.com/maps?q=38.8213348,-122.8531647&h1=us;z=14&output=embed&z=5`; */

        /* src="https://maps.google.com/maps?q={lat},{lon}&h1=us;z=14&output=embed"  */

        /* <iframe src="https://maps.google.com/maps?q=38.8213348,-122.8531647&h1=us;z=14&output=embed&z=5" height="300" width="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Iframe Example"></iframe> */
        let image = document.createElement('iframe');
        image.setAttribute('src', src);
        image.setAttribute('width', "600");
        image.setAttribute('height', "450");
        image.setAttribute('style', "border:0;");
        image.setAttribute('allowfullscreen', "");
        image.setAttribute('loading', "lazy");
        image.setAttribute('referrerpolicy', "no-referrer-when-downgrade");


        let place = document.createElement('p');
        place.textContent = item.properties.place

        article.appendChild(h3);
        article.appendChild(timestamp);
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
    const usa = [' Alabama', ' Alaska', ' Arizona', ' Arkansas', ' California', ' Colorado', ' Connecticut',
        ' Delaware', ' Florida', ' Georgia', ' Hawaii', ' Idaho', ' Illinois', ' Indiana', ' Iowa', ' Kansas',
        ' Kentucky', ' Louisiana', ' Maine', ' Maryland', ' Massachusetts', ' Michigan', ' Minnesota',
        ' Mississippi', ' Missouri', ' Montana', ' Nebraska', ' Nevada', ' New Hampshire', ' New Jersey',
        ' New Mexico', ' New York', ' North Carolina', ' North Dakota', ' Ohio', ' Oklahoma', ' Oregon',
        ' Pennsylvania', ' Rhode Island', ' South Carolina', ' South Dakota', ' Tennessee', ' Texas', ' Utah',
        ' Vermont', ' Virginia', ' Washington', ' West Virginia', ' Wisconsin', ' Wyoming', ' AL', ' AK', ' AS', ' AZ', ' AR', ' CA', ' CO', ' CT', ' DE', ' DC', ' FM', ' FL', ' GA', ' GU', ' HI', ' ID', ' IL', ' IN', ' IA', ' KS', ' KY', ' LA', ' ME', ' MH', ' MD', ' MA', ' MI', ' MN', ' MS', ' MO', ' MT', ' NE', ' NV', ' NH', ' NJ', ' NM', ' NY', ' NC', ' ND', ' MP', ' OH', ' OK', ' OR', ' PW', ' PA', ' PR', ' RI', ' SC', ' SD', ' TN', ' TX', ' UT', ' VT', ' VI', ' VA', ' WA', ' WV', ' WI', ' WY', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
        'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
        'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

    switch (filter) {

        case "utah":
            displayTemples(
                /* data.features.filter(item => item.properties.place.split(",")[1] == ' Hawaii') */
                data.features.filter(item => usa.includes(item.properties.place.split(",")[1]) || usa.includes(item.properties.place.split(" ")[1])) || usa.includes(item.properties.place));

            break;

        case "notutah":
            displayTemples(
                /* data.features.filter(item => !item.location.includes('Utah')) */
                data.features.filter(item => !usa.includes(item.properties.place.split(",")[1])) || !usa.includes(item.properties.place));

            break;

        case "older":
            displayTemples(
                data.features.filter(item => parseFloat(item.properties.mag) >= 5.0)
            );

            break;

        case "all":
            displayTemples(data.features);
    };
}


getData();

/* Event Listener */
document.querySelector('#sortBy').addEventListener('change', () => {
    sortBy(templeList)
});