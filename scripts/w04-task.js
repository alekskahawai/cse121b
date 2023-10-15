/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: 'Aleksius De Vollèges',
    photo: 'images/profile.webp',
    favoriteFoods: ['Strawberries', 'Cheesecake', 'Duck', 'Poke', 'Stew'],
    hobbies: ['Cycling', 'Swimming', 'Coding', 'Reading', 'Cooking'],
    placesLived: [],
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: '🇱🇻 Jekabpils, Latvia',
        length: '18 years'
    }
);

myProfile.placesLived.push(
    {
        place: '🇱🇻 Rezekne, Latvia',
        length: '3 year'
    }
);

myProfile.placesLived.push(
    {
        place: '🇱🇻 Daugavpils, Latvia',
        length: '3 years'
    }
);

myProfile.placesLived.push(
    {
        place: '🇰🇿 Alamty, Kazakhstan',
        length: '2 years'
    }
);

/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
document.querySelector('#photo').setAttribute('src', myProfile.photo);
document.querySelector('#photo').setAttribute('alt', myProfile.name);

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(item => {
    let list = document.createElement('li');
    list.textContent = item;
    document.querySelector('#favorite-foods').appendChild(list);
});

/* Hobbies List */
myProfile.hobbies.forEach(item => {
    let list = document.createElement('li');
    list.textContent = item;
    document.querySelector('#hobbies').appendChild(list);
});

/* Places Lived DataList */
myProfile.placesLived.forEach(item => {
    let dt = document.createElement('dt');
    dt.textContent = item.place;

    let dd = document.createElement('dd');
    dd.textContent = item.length;

    document.querySelector('#places-lived').appendChild(dt);
    document.querySelector('#places-lived').appendChild(dd);
});

