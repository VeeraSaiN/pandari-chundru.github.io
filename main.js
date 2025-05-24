document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('#nav-menu .nav__list');
  const backToTopButton = document.getElementById('back-to-top');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const darkClass = 'dark-theme';

  // Navigation toggle
  const toggleMenu = () => {
    navMenu.classList.toggle('nav--visible');
    const isExpanded = navMenu.classList.contains('nav--visible');
    navToggle.setAttribute('aria-expanded', isExpanded);
  };

  navToggle.addEventListener('click', toggleMenu);
  navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close nav menu on link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav--visible');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const updateActiveNav = () => {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // Typing animation
  const name = "Pandari Chundru";
  const typedName = document.getElementById("typed-name");
  let i = 0;

  const typeLetter = () => {
    if (i < name.length) {
      typedName.textContent += name.charAt(i);
      i++;
      setTimeout(typeLetter, 100);
    }
  };
  typeLetter();

  // Theme toggle
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add(darkClass);
    themeIcon.classList.replace('bx-moon', 'bx-sun');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('fade-theme');
    setTimeout(() => document.body.classList.remove('fade-theme'), 400);

    document.body.classList.toggle(darkClass);
    const isDark = document.body.classList.contains(darkClass);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.classList.replace(isDark ? 'bx-moon' : 'bx-sun', isDark ? 'bx-sun' : 'bx-moon');
  });

  // Back to top visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  // Back to top scroll
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
