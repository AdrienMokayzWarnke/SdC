// JavaScript to handle the cookie pop-up
const cookiePopup = document.getElementById('cookie-popup');
const acceptButton = document.getElementById('accept-cookies');
const declineButton = document.getElementById('decline-cookies');
const mainTitle = document.getElementById('main-title');
const invitationTitle = document.getElementById('invitation-title');
const invitationDescription = document.getElementById('invitation-description');
const descriptionTitle = document.getElementById('description-title');
const descriptionText = document.getElementById('description-text')
const contactTitle = document.getElementById('contact-title');
const practicalInfoTitle = document.getElementById('practical-info-title');

const langToggle = document.getElementById("langToggle");

const behaviorText = document.getElementById('behavior');
const entryText = document.getElementById('entry');
const transportText = document.getElementById('transport');
const locationText = document.getElementById('location');

const secretIcon = document.getElementById('secret-icon');
const contactIcon = document.getElementById('contact-icon');
const studioIcon = document.getElementById('studio-icon');
const secretImageOff = document.getElementById('suite-secret-image-off');
const secretImageOn = document.getElementById('suite-secret-image-on');

const mainRoomAmenities = document.getElementById('main-room-amenities');
const mainRoomTitle = document.getElementById('main-room-title');

const kitchenAmenities = document.getElementById('kitchen-amenities');
const kitchenTitle = document.getElementById('kitchen-title');

const bathroomAmenities = document.getElementById('bathroom-amenities');
const bathroomTitle = document.getElementById('bathroom-title');

const terraceAmenities = document.getElementById('terrace-amenities');
const terraceTitle = document.getElementById('terrace-title');

const parkingAmenities = document.getElementById('parking-amenities');
const parkingTitle = document.getElementById('parking-title');

let currentLang = "fr";

init();

function addEventListenerInit(){

    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "fr" ? "en" : "fr";
        langToggle.textContent = currentLang.toUpperCase();
        this.initText(currentLang);
    });

    document.querySelector('a[href="#studio"]').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
    
        // Hide the description and suite-bed-image
        document.querySelector('.description').style.display = 'none';
        document.getElementById('suite-bed-image').style.display = 'none';
        document.querySelector('.contact').style.display = 'none';
    
        // Show the rooms div
        document.querySelector('.rooms').style.display = 'flex';

        //update the icons
        contactIcon.classList.remove('fa-arrow-pointer');
        studioIcon.classList.add('fa-arrow-pointer');
    });

    document.querySelector('a[href="#contact"]').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
    
        // show the description and suite-bed-image
        document.querySelector('.description').style.display = 'flex';
        document.getElementById('suite-bed-image').style.display = 'flex';
        document.querySelector('.contact').style.display = 'flex';

        // Show the rooms div
        document.querySelector('.rooms').style.display = 'none';

        //update the icons
        contactIcon.classList.add('fa-arrow-pointer');
        studioIcon.classList.remove('fa-arrow-pointer');
    });

    secretIcon.addEventListener('click', () => {
        if (secretIcon.classList.contains('fa-toggle-off')) {
            secretIcon.classList.remove('fa-toggle-off');
            secretIcon.classList.add('fa-toggle-on');
            secretImageOn.style.display = 'flex';
            secretImageOff.style.display = 'none';
        } else {
            secretIcon.classList.remove('fa-toggle-on');
            secretIcon.classList.add('fa-toggle-off');
            secretImageOff.style.display = 'flex';
            secretImageOn.style.display = 'none';
        }
    });
}

function init() {
    // Initialize the cookie pop-up
    initCookiePopup();

    // Initialize the text from JSON file
    initText(currentLang);

    // Initialize the map
    initMap();

    addEventListenerInit();
}


function initCookiePopup() {
    // Show the cookie pop-up
    cookiePopup.style.display = 'block';

    // Handle button clicks
    acceptButton.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
    });

    declineButton.addEventListener('click', () => {
        cookiePopup.style.display = 'none';
    });
}

function initText(lang) {
    let resourceSource = lang === "fr" ? 'resources/text/text_fr.json' : 'resources/text/text_en.json';
    //Charge the text from resources/text/text_fr.json if french
    fetch(resourceSource)
        .then(response => response.json())
        .then(data => {
            mainTitle.innerHTML = data.title;            
            invitationDescription.textContent = data.invitation_description;
            invitationTitle.textContent = data.invitation_title;
            descriptionTitle.textContent = data.location_title;
            descriptionText.textContent = data.location_description;
            behaviorText.textContent = data.practical_info.behavior;
            entryText.textContent = data.practical_info.entry;
            transportText.textContent = data.practical_info.transport;
            locationText.textContent = data.practical_info.location;
            contactTitle.textContent = data.contact_title;
            practicalInfoTitle.textContent = data.practical_info.title;

            mainRoomTitle.textContent = data.rooms.main.title;
            mainRoomAmenities.innerHTML = data.rooms.main.amenities.map(amenity => `<li>${amenity}</li>`).join('');
            kitchenTitle.textContent = data.rooms.kitchen.title;
            kitchenAmenities.innerHTML = data.rooms.kitchen.amenities.map(amenity => `<li>${amenity}</li>`).join('');
            bathroomTitle.textContent = data.rooms.bathroom.title;
            bathroomAmenities.innerHTML = data.rooms.bathroom.amenities.map(amenity => `<li>${amenity}</li>`).join('');
            terraceTitle.textContent = data.rooms.terrace.title;
            terraceAmenities.innerHTML = data.rooms.terrace.amenities.map(amenity => `<li>${amenity}</li>`).join('');
            parkingTitle.textContent = data.rooms.parking.title;
            parkingAmenities.innerHTML = data.rooms.parking.amenities.map(amenity => `<li>${amenity}</li>`).join('');
        })
        .catch(error => console.error('Error loading text:', error));
}

function initMap() {
    const map = L.map('map').setView([43.2939109, 3.5281907], 18); // Replace with your coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    L.marker([43.2939109, 3.5281907]).addTo(map).bindPopup('Port Nature 2, Cap d\'Agde').openPopup();
}