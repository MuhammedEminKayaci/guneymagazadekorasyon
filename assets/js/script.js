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

function animateNumber(element, target) {
    let current = 0;
    const duration = 2000; // 2 saniye
    const stepTime = 50; // Her 50ms'de bir güncelle
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

function startCountAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateNumber(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', startCountAnimation);

// ...existing code...
/* ===== Projects slider JS ===== */
function initProjectSlider() {
  const slider = document.querySelector('.project-slider');
  const slides = Array.from(document.querySelectorAll('.project-slide'));
  const prevBtn = document.querySelector('.project-nav.prev');
  const nextBtn = document.querySelector('.project-nav.next');
  if (!slider || !slides.length) return;

  // Eğer buton içi boşsa ikon ekle
  if (prevBtn && prevBtn.innerHTML.trim() === '') prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
  if (nextBtn && nextBtn.innerHTML.trim() === '') nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';

  let current = 0;
  let autoId = null;
  const AUTO_MS = 5000;

  function showSlide(index) {
    const newIndex = ((index % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === newIndex));
    current = newIndex;
  }

  function next() { showSlide(current + 1); }
  function prev() { showSlide(current - 1); }

  // Auto play
  function startAuto() {
    stopAuto();
    autoId = setInterval(() => { next(); }, AUTO_MS);
  }
  function stopAuto() {
    if (autoId) { clearInterval(autoId); autoId = null; }
  }

  // Events
  nextBtn && nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn && prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); startAuto(); }
    if (e.key === 'ArrowLeft') { prev(); startAuto(); }
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  // Touch / swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', (e) => {
    stopAuto();
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  slider.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
    }
    startAuto();
  }, {passive: true});

  // Ensure first slide visible
  showSlide(0);
  startAuto();

  // Optional: ensure images loaded (prevent layout jump)
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img && !img.complete) {
      img.addEventListener('load', () => {
        // no-op for now
      });
    }
  });
}

// initialize on DOM ready (if not already initialized elsewhere)
document.addEventListener('DOMContentLoaded', () => {
  try { initProjectSlider(); } catch (e) { console.error(e); }
});
// ...existing code...

/* ===== FAQ Accordion ===== */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  const closeAll = (except) => {
    items.forEach(it => {
      if (it === except) return;
      it.classList.remove('open');
      const ans = it.querySelector('.faq-answer');
      const btn = it.querySelector('.faq-question');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (ans) ans.style.height = '0px';
    });
  };

  items.forEach((item, idx) => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;

    // ARIA bağlama
    if (!btn.id) btn.id = `faq-q-${idx+1}`;
    if (!ans.id) ans.id = `faq-${idx+1}`;
    btn.setAttribute('aria-controls', ans.id);
    ans.setAttribute('role', 'region');
    ans.setAttribute('aria-labelledby', btn.id);

    btn.addEventListener('click', () => {
      const open = item.classList.contains('open');
      if (open) {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        ans.style.height = '0px';
      } else {
        closeAll(item);
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.height = ans.scrollHeight + 'px';
      }
    });
  });

  // Açık öğe varsa resize'da yükseklik güncelle
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-item.open .faq-answer').forEach(a => {
      a.style.height = a.scrollHeight + 'px';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  try { initFAQAccordion(); } catch (e) { console.error(e); }
});

/* ===== Footer Map & Year ===== */
function initFooterMap() {
  const el = document.getElementById('footer-map');
  if (!el || typeof L === 'undefined') return;

  // Güncel koordinatlar: İstanbul, Bakırköy
  const center = [41.013544, 28.8814898];

  const map = L.map(el, {
    center, 
    zoom: 15, 
    zoomControl: true, 
    scrollWheelZoom: false, 
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  const marker = L.marker(center).addTo(map);
  marker.bindPopup('<b>Güney Mağaza Dekorasyon</b><br>İstanbul, Bakırköy');

  el.addEventListener('touchstart', () => {}, { passive: true });
}

function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  try { setYear(); initFooterMap(); } catch(e) { console.error(e); }
});