    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');
    const mankenlerBtn = document.getElementById('mankenler-btn');
    const submenu = document.getElementById('submenu');
    const plusBtn = document.getElementById('plus');

    menuToggle.addEventListener('click', () => {
      mobileNav.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      mobileNav.classList.remove('active');
    });

    mankenlerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submenu.classList.toggle('active');
      plusBtn.classList.toggle('rotate');
    });



   const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let current = 0;

// Noktaları oluştur
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dots span');

function goToSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

nextBtn.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  goToSlide(current);
});

prevBtn.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  goToSlide(current);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

setInterval(() => {
  current = (current + 1) % slides.length;
  goToSlide(current);
}, 7000);

