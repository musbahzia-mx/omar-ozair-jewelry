/* script.js - Final Pro Version */

/* --- Mobile Menu --- */
function toggleMenu() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.classList.toggle('active');
}

// Close menu when clicking a link (on mobile)
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (e.target.matches('.nav-link') && nav.classList.contains('active')) {
    nav.classList.remove('active');
  }
});

/* --- Slider Logic --- */
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slider-dots');
  const sliderEl = document.getElementById('slider');
  if (!slides  slides.length === 0  !dotsContainer) return;

  let current = 0;
  let interval = null;

  // Create dots dynamically
  slides.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(d);
  });

  function goToSlide(i) {
    const dots = document.querySelectorAll('.slider-dot');
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = (i + slides.length) % slides.length;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  // Expose for button controls
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  // Auto play logic
  function startAuto() { stopAuto(); interval = setInterval(nextSlide, 6000); }
  function stopAuto() { if (interval) clearInterval(interval); interval = null; }

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAuto);
    sliderEl.addEventListener('mouseleave', startAuto);
  }

  startAuto();
});