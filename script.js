"use strict;"
const scrollButton = document.getElementById("auto-scroll")
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0

//function tpo check if images weere loaded

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
    ready = true;
    loader.hiddden = true;
    }}

//Helper function to set Atrributes on Dom Elements

function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create elements for links && photos, add to dom

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',

        });
        //Create <img> for photo
        const img = document.createElement('img');
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each even is finished loading
        img.addEventListener("load", imageLoaded);

        // Put <img> inside <a> then put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

// Unsplah Api
const apiKey = 'h8KLLCHI6hKJ3qbDzjGk_a6XiUW5pxTec_5s1gH7t7g';
const count = 20;
const topics = "forest"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${topics}`;

// Get photos from unsplash APi

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        console.log("something went wrong :(");
        console.log(error)
    }
}

// Scrolling checker, if near bottom of page, Load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});

//auto scroll functionality 

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}

scrollButton.addEventListener("click", pageScroll);

//on Load

getPhotos();

