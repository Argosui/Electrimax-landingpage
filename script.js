/* =========================================
   ELECTRIMAX — script.js mejorado
   ========================================= */

// ---- Header scroll shadow ----
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  nav.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
  }
});

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ---- Review Slider ----
const TOTAL_REVIEWS = 4;
let cardCounter = 1;
let isAnimating = false;
let autoSlide = setInterval(slideRight, 5500);

const btnRight = document.getElementById("btnright");
const btnLeft  = document.getElementById("btnleft");
const dots     = document.querySelectorAll(".dot");

function getCard(n) {
  return document.getElementById(`review${n}`);
}

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i + 1 === index);
  });
}

function slideTo(next) {
  if (isAnimating || next === cardCounter) return;
  isAnimating = true;

  const current = getCard(cardCounter);
  const nextCard = getCard(next);

  current.classList.remove("active");
  nextCard.classList.add("active");

  cardCounter = next;
  updateDots(cardCounter);

  setTimeout(() => { isAnimating = false; }, 500);
}

function slideRight() {
  const next = cardCounter === TOTAL_REVIEWS ? 1 : cardCounter + 1;
  slideTo(next);
}

function slideLeft() {
  const prev = cardCounter === 1 ? TOTAL_REVIEWS : cardCounter - 1;
  slideTo(prev);
}

function resetTimer() {
  clearInterval(autoSlide);
  autoSlide = setInterval(slideRight, 5500);
}

btnRight.addEventListener("click", () => { slideRight(); resetTimer(); });
btnLeft.addEventListener("click",  () => { slideLeft();  resetTimer(); });

// Dots click
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.dataset.index);
    slideTo(index);
    resetTimer();
  });
});

// Swipe support (touch)
let touchStartX = 0;
const reviewGroup = document.querySelector(".reviews-container-group");

reviewGroup.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

reviewGroup.addEventListener("touchend", e => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 40) {
    if (delta > 0) { slideRight(); } else { slideLeft(); }
    resetTimer();
  }
});