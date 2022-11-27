"use strict;"
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

//Helper function to set Atrributes on Dom Elements

function setAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create elements for links && photos, add to dom

function displayPhotos(){
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

        // Put <img> inside <a> then put both inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Unsplah Api
const apiKey = 'h8KLLCHI6hKJ3qbDzjGk_a6XiUW5pxTec_5s1gH7t7g';
const count = 20;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

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



//on Load

getPhotos();

