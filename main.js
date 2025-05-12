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
// Particle Effect
document.addEventListener('DOMContentLoaded', () => {
  const particleBg = document.getElementById('particle-bg');
  if (!particleBg) return;

  const particles = [];
  const numParticles = 100; // Number of particles

  // Create particles
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.position = 'absolute';
    particle.style.background = 'rgba(255, 255, 255, 0.8)';
    particle.style.borderRadius = '50%';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particleBg.appendChild(particle);
    particles.push({
      element: particle,
      angle: Math.random() * Math.PI * 2, // Random angle in radians
      distance: 0, // Distance from center
      speed: Math.random() * 2 + 1, // Random speed between 1 and 3
    });
  }

  // Animate particles
  function animateParticles() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    particles.forEach(p => {
      p.distance += p.speed; // Move particle outward
      const x = centerX + Math.cos(p.angle) * p.distance;
      const y = centerY + Math.sin(p.angle) * p.distance;

      // Update particle position
      p.element.style.left = `${x}px`;
      p.element.style.top = `${y}px`;
      p.element.style.opacity = 1 - p.distance / 500; // Fade out as it moves farther

      // Reset particle if it moves too far
      if (p.distance > 500 || x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
        p.distance = 0;
        p.angle = Math.random() * Math.PI * 2;
        p.speed = Math.random() * 2 + 1;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  // Start animation
  animateParticles();

  // Update particle positions on window resize
  window.addEventListener('resize', () => {
    particles.forEach(p => {
      p.distance = 0; // Reset distance to center on resize
    });
  });
});

