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
document.addEventListener('DOMContentLoaded', () => {
  // ... existing navigation, theme toggle, and back-to-top code ...

  // iPhone Lock Screen-Inspired Background Animation
  const canvas = document.getElementById('iphone-bg');
  const ctx = canvas.getContext('2d');

  // Set canvas size to full screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Gradient animation state
  let gradientOffset = 0;
  const gradientSpeed = 0.001; // Slow transition speed

  // Sunlight/lens flare state
  let flareOpacity = 1;
  let flarePulse = 0;
  const flarePulseSpeed = 0.02;

  // Particles (bokeh-style orbs)
  const particles = [];
  const numParticles = 20; // Number of bokeh orbs

  // Create particles
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 0.5, // Slow horizontal movement
      speedY: (Math.random() - 0.5) * 0.5, // Slow vertical movement
      opacity: Math.random() * 0.3 + 0.1,
    });
  }

  // Wave effect for underwater ripple/shimmer
  let waveOffset = 0;
  const waveSpeed = 0.02;
  const waveAmplitude = 5;

  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background with slow transition
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, `hsl(210, 70%, ${30 + Math.sin(gradientOffset) * 5}%)`); // Top color
    gradient.addColorStop(1, `hsl(210, 50%, ${50 + Math.cos(gradientOffset) * 5}%)`); // Bottom color
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    gradientOffset += gradientSpeed;

    // Draw underwater ripple/shimmer effect
    for (let x = 0; x < canvas.width; x += 10) {
      for (let y = 0; y < canvas.height; y += 10) {
        const wave = Math.sin((x + y + waveOffset) * 0.05) * waveAmplitude;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + wave * 0.01})`;
        ctx.fillRect(x, y, 10, 10);
      }
    }
    waveOffset += waveSpeed;

    // Draw sunlight/lens flare at top center
    const flareX = canvas.width / 2;
    const flareY = 50; // Near the top
    const flareRadius = 100 + Math.sin(flarePulse) * 20; // Pulsing size
    const flareGradient = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, flareRadius);
    flareGradient.addColorStop(0, `rgba(255, 255, 255, ${flareOpacity})`);
    flareGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGradient;
    ctx.beginPath();
    ctx.arc(flareX, flareY, flareRadius, 0, Math.PI * 2);
    ctx.fill();
    flarePulse += flarePulseSpeed;
    flareOpacity = 0.7 + Math.sin(flarePulse) * 0.2; // Pulsing opacity

    // Draw floating particles (bokeh orbs)
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();

      // Update particle position
      p.x += p.speedX;
      p.y += p.speedY;

      // Bounce off edges or wrap around
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });

    requestAnimationFrame(draw);
  }
  draw();
});

    requestAnimationFrame(draw);
  }
  draw();
});
