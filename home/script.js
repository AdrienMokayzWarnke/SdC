// ── EmailJS configuration ──────────────────────────────────────────────────
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (connect your Gmail)
// 3. Create an Email Template using these variables:
//      {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}, {{contact_preference}}
//    Set "To Email" in the template to: lasuitedescharmes@gmail.com
// 4. Replace the three values below with your actual IDs from the EmailJS dashboard
const EMAILJS_PUBLIC_KEY  = 'yceXXBO_Tfh2jurYB';
const EMAILJS_SERVICE_ID  = 'service_r39tk7p';
const EMAILJS_TEMPLATE_ID = 'template_k9edgol';
// ──────────────────────────────────────────────────────────────────────────

const cookiePopup        = document.getElementById('cookie-popup');
const acceptButton       = document.getElementById('accept-cookies');
const declineButton      = document.getElementById('decline-cookies');
const mainTitle          = document.getElementById('main-title');
const invitationTitle    = document.getElementById('invitation-title');
const invitationDesc     = document.getElementById('invitation-description');
const descriptionTitle   = document.getElementById('description-title');
const descriptionText    = document.getElementById('description-text');
const contactTitle       = document.getElementById('contact-title');
const practicalInfoTitle = document.getElementById('practical-info-title');
const langToggle         = document.getElementById('langToggle');
const langLabel          = document.getElementById('lang-label');
const behaviorText       = document.getElementById('behavior');
const entryText          = document.getElementById('entry');
const transportText      = document.getElementById('transport');
const locationText       = document.getElementById('location');
const secretIcon         = document.getElementById('secret-icon');
const secretImageOff     = document.getElementById('suite-secret-image-off');
const secretImageOn      = document.getElementById('suite-secret-image-on');
const mainRoomAmenities  = document.getElementById('main-room-amenities');
const mainRoomTitle      = document.getElementById('main-room-title');
const kitchenAmenities   = document.getElementById('kitchen-amenities');
const kitchenTitle       = document.getElementById('kitchen-title');
const bathroomAmenities  = document.getElementById('bathroom-amenities');
const bathroomTitle      = document.getElementById('bathroom-title');
const terraceAmenities   = document.getElementById('terrace-amenities');
const terraceTitle       = document.getElementById('terrace-title');
const parkingAmenities   = document.getElementById('parking-amenities');
const parkingTitle       = document.getElementById('parking-title');

// Form
const contactForm    = document.querySelector('#contact-form form');
const submitButton   = contactForm.querySelector('button[type="submit"]');
const formStatus     = document.getElementById('form-status');
const labelName      = document.getElementById('label-name');
const labelEmail     = document.getElementById('label-email');
const labelPhone     = document.getElementById('label-phone');
const labelSubject   = document.getElementById('label-subject');
const labelMessage   = document.getElementById('label-message');
const labelPhonePref = document.getElementById('label-phone-pref');
const optReservation  = document.getElementById('opt-reservation');
const optCancellation = document.getElementById('opt-cancellation');
const optInfo         = document.getElementById('opt-info');

// Pricing
const pricingDetails = document.getElementById('pricing-details');
const servicesList   = document.getElementById('services-list');
const servicesTitle  = document.getElementById('services-title');
const priceAmount    = document.getElementById('price-amount');
const priceUnit      = document.getElementById('price-unit');

// Hero
const heroTagline = document.getElementById('hero-tagline');
const heroCta     = document.getElementById('hero-cta');

let currentLang = 'fr';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
init();

function init() {
    initCookiePopup();
    initText(currentLang);
    initMap();
    initLightbox();
    initScrollReveal();
    addEventListeners();
}

function addEventListeners() {
    langToggle.addEventListener('change', () => {
        currentLang = langToggle.value;
        initText(currentLang);
    });

    document.getElementById('nav-contact').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('nav-studio').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('studio').scrollIntoView({ behavior: 'smooth' });
    });

    secretIcon.addEventListener('click', () => {
        const isOff = secretIcon.classList.contains('fa-toggle-off');
        secretIcon.classList.replace(
            isOff ? 'fa-toggle-off' : 'fa-toggle-on',
            isOff ? 'fa-toggle-on'  : 'fa-toggle-off'
        );
        secretImageOn.style.display  = isOff ? 'flex' : 'none';
        secretImageOff.style.display = isOff ? 'none' : 'flex';
    });

    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    formStatus.className = 'form-status';
    submitButton.disabled = true;
    submitButton.textContent = currentLang === 'fr' ? 'Envoi…' : 'Sending…';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
            formStatus.textContent = currentLang === 'fr'
                ? 'Message envoyé ! Nous vous répondrons sous peu.'
                : 'Message sent! We will get back to you shortly.';
            formStatus.classList.add('success');
            contactForm.reset();
        })
        .catch(() => {
            formStatus.textContent = currentLang === 'fr'
                ? 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'
                : 'An error occurred. Please try again or contact us directly.';
            formStatus.classList.add('error');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = currentLang === 'fr' ? 'Envoyer' : 'Send';
        });
}

function initCookiePopup() {
    cookiePopup.style.display = 'flex';
    acceptButton.addEventListener('click',  () => { cookiePopup.style.display = 'none'; });
    declineButton.addEventListener('click', () => { cookiePopup.style.display = 'none'; });
}

function initText(lang) {
    const src = lang === 'fr' ? 'resources/text/text_fr.json' : 'resources/text/text_en.json';
    fetch(src)
        .then(r => r.json())
        .then(data => {
            mainTitle.innerHTML          = data.title;
            invitationDesc.textContent   = data.invitation_description;
            invitationTitle.textContent  = data.invitation_title;
            descriptionTitle.textContent = data.location_title;
            descriptionText.textContent  = data.location_description;
            behaviorText.textContent     = data.practical_info.behavior;
            entryText.textContent        = data.practical_info.entry;
            transportText.textContent    = data.practical_info.transport;
            locationText.textContent     = data.practical_info.location;
            contactTitle.textContent     = data.contact_title;
            practicalInfoTitle.textContent = data.practical_info.title;

            if (data.lang_label) langLabel.textContent = data.lang_label;

            if (data.hero_tagline) heroTagline.textContent = data.hero_tagline;
            if (data.hero_cta)     heroCta.textContent     = data.hero_cta;

            mainRoomTitle.textContent    = data.rooms.main.title;
            mainRoomAmenities.innerHTML  = data.rooms.main.amenities.map(a => `<li>${a}</li>`).join('');
            kitchenTitle.textContent     = data.rooms.kitchen.title;
            kitchenAmenities.innerHTML   = data.rooms.kitchen.amenities.map(a => `<li>${a}</li>`).join('');
            bathroomTitle.textContent    = data.rooms.bathroom.title;
            bathroomAmenities.innerHTML  = data.rooms.bathroom.amenities.map(a => `<li>${a}</li>`).join('');
            terraceTitle.textContent     = data.rooms.terrace.title;
            terraceAmenities.innerHTML   = data.rooms.terrace.amenities.map(a => `<li>${a}</li>`).join('');
            parkingTitle.textContent     = data.rooms.parking.title;
            parkingAmenities.innerHTML   = data.rooms.parking.amenities.map(a => `<li>${a}</li>`).join('');

            if (data.price)     priceAmount.textContent = data.price;
            if (data.price_per) priceUnit.textContent   = data.price_per;

            if (data.rules) {
                const r = data.rules;
                pricingDetails.innerHTML = [r.tariff, r.stay, r.checkin, r.checkout, r.cancellation, r.caution]
                    .map(t => `<li>${t}</li>`).join('');
            }

            if (data.services) {
                servicesTitle.textContent = data.services.title;
                servicesList.innerHTML = data.services.list.map(s => `<li>${s}</li>`).join('');
            }

            if (data.contact_form) {
                const f = data.contact_form;
                labelName.textContent      = f.name_label + ' *';
                labelEmail.textContent     = f.email_label + ' *';
                labelPhone.textContent     = f.phone_label;
                labelSubject.textContent   = f.subject_label;
                labelMessage.textContent   = f.message_label;
                labelPhonePref.textContent = f.phone_preference;
                optReservation.textContent  = f.subject_reservation;
                optCancellation.textContent = f.subject_cancellation;
                optInfo.textContent         = f.subject_info;
                submitButton.textContent    = f.submit;
            }
        })
        .catch(err => console.error('Error loading text:', err));
}

function initMap() {
    const map = L.map('map').setView([43.2939109, 3.5281907], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    L.marker([43.2939109, 3.5281907]).addTo(map).bindPopup("Port Nature 2, Cap d'Agde").openPopup();
}

function initLightbox() {
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    const open = (src, alt) => {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.image-grid img, .suite-secret-image').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => open(img.src, img.alt));
    });

    lightboxClose.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
