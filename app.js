//------------------service cards----------------------------//
let cards = document.querySelectorAll(".cards_container .card");
function removeAll() {
  cards.forEach(card => card.classList.remove("active"));
}
cards.forEach(card =>
  card.addEventListener("mouseover", () => {
    removeAll();
    card.classList.add("active");
  })
);
//------------------fixed navbar----------------------------//
let nav = document.querySelector("header nav");
let fixPoint = document.querySelector("header main").offsetTop;
window.onscroll = function() {
  if (this.scrollY >= fixPoint) {
    nav.classList.add("active");
  } else {
    nav.classList.remove("active");
  }
};
//------------------Nav Links hover----------------------------//
let navLinks = document.querySelectorAll(".nav_link");
let sections = document.querySelectorAll(".sec");
let current;
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    let secTop = sec.offsetTop;
    if (pageYOffset >= secTop - 80) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
});
//------------------Map section----------------------------//
if (navigator.geolocation) {
  const pos = [30.560668, 31.018417];
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map("mapLocation").setView(coords, 11);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(coords)
        .addTo(map)
        .bindPopup("This is your Location")
        .openPopup();
      L.marker(pos).addTo(map).bindPopup("This is our Location").openPopup();
    },
    function() {
      alert("cannot get current position");
    }
  );
}
//-------------------slider---------------------//
const doctors = [
  "images/doc1.jpg",
  "images/doc2.jpg",
  "images/doc3.jpg",
  "images/doc4.jpg"
];
const slides = document.querySelectorAll(".slider_wrap .slide");
const navBtns = document.querySelectorAll(".doctors nav button");
let currentSlide = 0;
for (let i = 0; i < slides.length; i++) {
  slides[i].style.backgroundImage = `linear-gradient(
    rgba(2, 116, 154, 0.5),
    #02749a 130%
  ),url(${doctors[i]})`;
}
for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].addEventListener("click",()=>{
    removeAllSlides();
    currentSlide = i;
    slides[currentSlide].classList.add("active");
    navBtns[currentSlide].classList.add("active");
    stopLooping();
    startLooping();
  })
}
function removeAllSlides() {
  slides.forEach(slide => slide.classList.remove("active"));
  navBtns.forEach(btn => btn.classList.remove("active"));
}
function startLooping() {
  time = setInterval(() => {
    nextSlide();
  },4000);
}
function stopLooping() {
  clearInterval(time);
}
function nextSlide() {
  if (currentSlide + 1 === slides.length) {
    currentSlide = 0;
    removeAllSlides();
    slides[currentSlide].classList.add("active");
    navBtns[currentSlide].classList.add("active");
  } else {
    currentSlide++;
    removeAllSlides();
    slides[currentSlide].classList.add("active");
    navBtns[currentSlide].classList.add("active");
  }
}
startLooping();
