// Navbar Toggle Menu

const navMenu = document.getElementById("nav-menu");
const menuBtn = document.querySelector(".nav__menu-icon");
const menuIcon = document.getElementById("menu-icon");
var isLarge = false;

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle("scale");
    menuIcon.classList.toggle("fa-xmark");
})

// Initializing Api Key

const searchParam = location.search.split("=").pop();
const accessKey = "gF26hNIy44q-YUT3fpSb2JKVARFdhaXwclB_uipMLvo";
const randomPhotoUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`
const searchPhotoUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchParam}&per_page=50`
const gallery = document.querySelector(".gallery__container");
let allImages;
let currentImage = 0;


//  Random Photo Generation

const getImages = () => {
    fetch(randomPhotoUrl)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    })
}

//  Searched photo generation

const searchImages = () => {
    fetch(searchPhotoUrl)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages);
    })

    const searchHeading = document.getElementById("search-heading-text");
    searchHeading.textContent = searchParam.toUpperCase();

}

//  For generating the images with img tags

const makeImages = (data) => {
    data.forEach((item, index) => {

        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = 'gallery__image'
        gallery.appendChild(img);

        // Popup image

        img.addEventListener('click', () => {
            currentImage = index;
            showPopup(item);
        })
    })
}

//  For Displaying Popup menu when an image is clicked

const showPopup = (item) => {
    const popup = document.getElementById("image-popup");
    const downloadBtn = document.getElementById("image-download-btn");
    const downloadIcon = document.getElementById("image-download-icon");
    const closeBtn = document.getElementById("image-close-btn");
    const popupImage = document.querySelector(".image__popup-image");
    popup.classList.remove("hide");
    popupImage.src = item.urls.regular;

    // For Downloading image with Download Button
    downloadBtn.addEventListener('click', () => {
        fetch(popupImage.src)
        .then(res => res.blob())
        .then(file => {
            const fileName = "pric-image.jpg";
            const imageLink = document.createElement('a');
            imageLink.href = URL.createObjectURL(file);
            imageLink.download = fileName;
            imageLink.click();
        })
        .catch(() => alert("Failed to Download the Image!"))
        
    })
    
    // For Downloading image with Download Icon (at Smaller screens)
    downloadIcon.addEventListener('click', () => {
            fetch(popupImage.src)
            .then(res => res.blob())
            .then(file => {
                const fileName = "pric-image.jpg";
                const imageLink = document.createElement('a');
                imageLink.href = URL.createObjectURL(file);
                imageLink.download = fileName;
                imageLink.click();
            })
            .catch(() => alert("Failed to Download the Image!"))
       
    })
    closeBtn.addEventListener('click', () => {
        popup.classList.add("hide")
    })

}


if(searchParam == ''){
    getImages();
}
else{
    searchImages();
}


//  For navigating images 

const preBtns = document.querySelector('.pre-btn');
const nxtBtns = document.querySelector('.nxt-btn');

preBtns.addEventListener('click', () => {
    if(currentImage > 0){
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})
nxtBtns.addEventListener('click', () => {
    if(currentImage < allImages.length - 1){
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})

