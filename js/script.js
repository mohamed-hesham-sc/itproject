var DESTINATIONS = [
  {
    id: "giza",
    name: "Giza Pyramids & Sphinx",
    sub: "Journey through 5,000 years of history",
    img: "../pic/pyramids-of-giza.jpg.jpeg",
    prices: { egyptian: 60, arab: 400, foreign: 700 },
    childRate: 0.5,
  },
  {
    id: "philae",
    name: "Philae Temple",
    sub: "A jewel of the Nile and a symbol of ancient Egyptian beauty",
    img: "../pic/Philae.jpg.jpeg",
    prices: { egyptian: 50, arab: 350, foreign: 600 },
    childRate: 0.5,
  },
  {
    id: "valley",
    name: "Valley of the Kings",
    sub: "Descend into the tombs of pharaohs",
    img: "../pic/valley.jpg.jpeg",
    prices: { egyptian: 60, arab: 380, foreign: 650 },
    childRate: 0.5,
  },
  {
    id: "abusimbel",
    name: "Abu Simbel Temples",
    sub: "Witness Ramesses II's eternal monument",
    img: "../pic/Simbel.jpg.jpeg",
    prices: { egyptian: 30, arab: 200, foreign: 750 },
    childRate: 0.5,
  },
  {
    id: "karnak",
    name: "Karnak Temple",
    sub: "The largest ancient religious site on Earth",
    img: "../pic/karnak.jpg.jpeg",
    prices: { egyptian: 40, arab: 450, foreign: 600 },
    childRate: 0.5,
  },
  {
    id: "NMEC",
    name: "National Museum Of Egyptian Civilization",
    sub: "The story of Egypt from the dawn of history to modern times",
    img: "../pic/NMEC.webp",
    prices: { egyptian: 90, arab: 450, foreign: 550 },
    childRate: 0.5,
  },
  {
    id: "GEM",
    name: "Grand Egyptian Museum",
    sub: "A journey through the greatest treasures of ancient Egypt",
    img: "../pic/GEM.jpg.jpeg",
    prices: { egyptian: 200, arab: 900, foreign: 1200 },
    childRate: 0.5,
  },
];

var activeId = "giza";

var tabsContainer = document.getElementById("destTabs");

for (var i = 0; i < DESTINATIONS.length; i++) {
  var destination = DESTINATIONS[i];
  var btn = document.createElement("button");

  if (destination.id === activeId) {
    btn.className = "dest-tab active";
  } else {
    btn.className = "dest-tab";
  }

  btn.textContent = destination.name;
  btn.dataset.id = destination.id;

  btn.onclick = function () {
    var clickedId = this.dataset.id;
    selectDest(clickedId);
  };

  tabsContainer.appendChild(btn);
}

function selectDest(id) {
  if (id === activeId) {
    return;
  }

  activeId = id;

  var currentDestination;
  for (var i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].id === id) {
      currentDestination = DESTINATIONS[i];
      break;
    }
  }

  var allTabs = document.querySelectorAll(".dest-tab");
  for (var j = 0; j < allTabs.length; j++) {
    if (allTabs[j].dataset.id === id) {
      allTabs[j].classList.add("active");
    } else {
      allTabs[j].classList.remove("active");
    }
  }

  var img = document.getElementById("destImg");
  var title = document.getElementById("captionTitle");
  var sub = document.getElementById("captionSub");

  img.classList.add("fade-out");
  title.style.opacity = "0";
  sub.style.opacity = "0";

  setTimeout(function () {
    img.src = currentDestination.img;
    img.onload = function () {
      img.classList.remove("fade-out");
      title.textContent = currentDestination.name;
      sub.textContent = currentDestination.sub;
      title.style.opacity = "1";
      sub.style.opacity = "1";
    };
  }, 400);

  updatePrice();
}

function updatePrice() {
  var currentDestination;
  for (var i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].id === activeId) {
      currentDestination = DESTINATIONS[i];
      break;
    }
  }

  var nationality = document.getElementById("nationality").value;
  var adultsCount = parseInt(document.getElementById("adults").value);
  var childrenCount = parseInt(document.getElementById("children").value);

  var adultPrice = currentDestination.prices[nationality];
  var childPrice = adultPrice * currentDestination.childRate;
  var totalPrice = adultPrice * adultsCount + childPrice * childrenCount;

  var priceEl = document.getElementById("totalPrice");
  priceEl.innerHTML = "EGP " + totalPrice + " <span>total</span>";

  var breakdownEl = document.getElementById("priceBreakdown");
  var breakdownText = adultsCount + " Adults x EGP " + adultPrice;

  if (childrenCount > 0) {
    breakdownText =
      breakdownText + "  |  " + childrenCount + " Children x EGP " + childPrice;
  }

  breakdownEl.textContent = breakdownText;
}

function startPage() {
  var firstDest = DESTINATIONS[0];
  document.getElementById("destImg").src = firstDest.img;
  document.getElementById("captionTitle").textContent = firstDest.name;
  document.getElementById("captionSub").textContent = firstDest.sub;
  updatePrice();

  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  var formattedDate = year + "-" + month + "-" + day;
  document.getElementById("visitDate").min = formattedDate;
}

startPage();

function handleBook() {
  var nameInput = document.getElementById("fullName");
  var emailInput = document.getElementById("email");
  var dateInput = document.getElementById("visitDate");

  if (nameInput.value === "") {
    highlightError(nameInput);
    return;
  }
  if (emailInput.value === "" || emailInput.value.indexOf("@") === -1) {
    highlightError(emailInput);
    return;
  }
  if (dateInput.value === "") {
    highlightError(dateInput);
    return;
  }

  var currentDest;
  for (var i = 0; i < DESTINATIONS.length; i++) {
    if (DESTINATIONS[i].id === activeId) {
      currentDest = DESTINATIONS[i];
      break;
    }
  }
  var nat = document.getElementById("nationality").value;
  var adults = parseInt(document.getElementById("adults").value);
  var children = parseInt(document.getElementById("children").value);
  var price =
    currentDest.prices[nat] * adults +
    currentDest.prices[nat] * currentDest.childRate * children;

  var bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push({
    id: Date.now(),
    destination: currentDest.name,
    date: dateInput.value,
    guests: adults + children,
    price: price,
    status: "confirmed",
  });
  localStorage.setItem("bookings", JSON.stringify(bookings));

  var toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 4000);
}

function highlightError(element) {
  element.style.borderColor = "#f7220a";
  element.focus();

  setTimeout(function () {
    element.style.borderColor = "";
  }, 2000);
}