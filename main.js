// ====================
// Responsive Navigation Toggle
// ====================
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        navList = document.querySelector(`#${navId} .nav__list`);
  if (toggle && navList) {
    const toggleMenu = (e) => {
      e.preventDefault();
      navList.classList.toggle('show');
      const isExpanded = navList.classList.contains('show');
      toggle.setAttribute('aria-expanded', isExpanded);
    };
    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('touchstart', toggleMenu);
    // Add keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu(e);
      }
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

// Highlight Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Close mobile nav on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#nav-menu .nav__list').classList.remove('show');
    document.getElementById('nav-toggle').setAttribute('aria-expanded', 'false');
  });
});

// ====================
// Dark/Light Theme Toggle
// ====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const darkClass = 'dark-theme';

// Load preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add(darkClass);
  themeIcon.classList.replace('bx-moon', 'bx-sun');
}

// Toggle theme on click with fade
themeToggle.addEventListener('click', () => {
  document.body.classList.add('fade-theme');
  setTimeout(() => {
    document.body.classList.remove('fade-theme');
  }, 400);

  document.body.classList.toggle(darkClass);
  const isDark = document.body.classList.contains(darkClass);

  themeIcon.classList.replace(isDark ? 'bx-moon' : 'bx-sun', isDark ? 'bx-sun' : 'bx-moon');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
// Show/Hide Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

// Scroll to Top on Click
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Fullscreen Particle Tunnel Effect - Inspired by RUSTCODE
document.addEventListener('DOMContentLoaded', () => {
  const particleBg = document.getElementById('particle-bg');
  if (!particleBg) return;

  const particles = [];
  const numParticles = 150;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = 'translate(-50%, -50%) scale(1)';
    particleBg.appendChild(particle);

    particles.push({
      element: particle,
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 10,
      speed: Math.random() * 1.5 + 0.5,
    });
  }

  function animateParticles() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    particles.forEach(p => {
      p.distance += p.speed;
      const x = centerX + Math.cos(p.angle) * p.distance;
      const y = centerY + Math.sin(p.angle) * p.distance;
      const scale = 0.5 + p.distance / 400;

      p.element.style.left = `${x}px`;
      p.element.style.top = `${y}px`;
      p.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
      p.element.style.opacity = 1 - p.distance / 600;

      if (p.distance > 600) {
        p.distance = Math.random() * 10;
        p.angle = Math.random() * Math.PI * 2;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  window.addEventListener('resize', () => {
    particles.forEach(p => {
      p.distance = Math.random() * 10;
    });
  });
});
