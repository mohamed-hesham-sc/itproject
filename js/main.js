let overray = document.getElementById("overray");
let popupcard = document.getElementById("popup-card");
let closebtn = document.getElementById("closebtn");
let popupcardbody = document.getElementById("popup-card-body");
let allbtns = document.querySelectorAll(".book-btn");

for (let btn of allbtns) {
    btn.addEventListener('click', function(e) {
        const card = e.target.closest('.dest-card');

        const title = card.querySelector('.card-title').innerText;
        const image = card.querySelector('img').src;
        const desc = e.target.getAttribute('data-desc');
        const hours = e.target.getAttribute('data-hours');
        const season = e.target.getAttribute('data-season');
        const map = e.target.getAttribute('data-map');
        const rating = parseInt(e.target.getAttribute('data-rating'));

        const egyPrice = card.querySelector('.price-egyptian span').innerText;
        const arabPrice = card.querySelector('.price-arab span').innerText;
        const foreignPrice = card.querySelector('.price-foreign span').innerText;

        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

        popupcardbody.innerHTML = `
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <div class="popup-stars">${stars}</div>
            <p>${desc}</p>
            <div class="popup-meta">
                <p>⏰ <strong>Opening Hours:</strong> ${hours}</p>
                <p>🌤️ <strong>Best Time to Visit:</strong> ${season}</p>
            </div>
            <div class="popup-prices">
                <p>🇪🇬 Egyptian: ${egyPrice}</p>
                <p>🇸🇦 Arab: ${arabPrice}</p>
                <p>🌍 Foreign: ${foreignPrice}</p>
            </div>
            <a href="${map}" target="_blank" class="popup-map-btn">📍 View on Google Maps</a>
            <a href="booking.html" class="popup-book-btn">Book Now</a>
        `;

        popupcard.classList.add('show-popup');
        overray.classList.add('show-popup');
    });
}

function closePopup() {
    popupcard.classList.remove('show-popup');
    overray.classList.remove('show-popup');
}

closebtn.addEventListener("click", closePopup);
overray.addEventListener("click", closePopup);

function search() {
    let searchbar = document.querySelector(".search-container input").value.toUpperCase();
    let card = document.querySelectorAll(".dest-card");
    let cardname = document.querySelectorAll(".card-content h3");

    for (let i = 0; i < cardname.length; i++) {
        if (cardname[i].innerHTML.toUpperCase().indexOf(searchbar) >= 0) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}

document.querySelector('.search-container input').addEventListener('input', search);



let chips = document.querySelectorAll(".chip");

for( let chip of chips){
    chip.addEventListener("click",function(){
    let selected = this.innerText.replace(/[^\w\s]/g, '').trim().toLowerCase();
    for(let c of chips){
        c.classList.remove("active");
    }
    this.classList.add("active");   
    let cards = document.querySelectorAll(".dest-card");

        for(let card of cards){
            if(selected == "all"){
                card.style.display = ''
            }
            else if(card.dataset.category.includes(selected)){
                card.style.display = ''

            }
            else{
                card.style.display = 'none';
            }
        }
});
}