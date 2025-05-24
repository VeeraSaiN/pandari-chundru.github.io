document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const navList = document.querySelector('#nav-menu .nav__list');

  const toggleMenu = () => {
    navList.classList.toggle('nav--visible');
    const isExpanded = navList.classList.contains('nav--visible');
    toggle.setAttribute('aria-expanded', isExpanded);
  };

  if (toggle && navList) {
    toggle.addEventListener('click', toggleMenu);
    toggle.addEventListener('touchstart', toggleMenu);
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('nav--visible');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  // Typing Effect for Name
  const name = "Pandari Chundru";
  const typedName = document.getElementById("typed-name");
  let i = 0;

  function typeLetter() {
    if (i < name.length) {
      typedName.textContent += name.charAt(i);
      i++;
      setTimeout(typeLetter, 120);
    } else {
      document.querySelector('.cursor').style.animation = 'blink 0.7s infinite';
    }
  }
  typeLetter();

  // Set Plain Background
  const setThemeBackground = () => {
    const isDark = document.body.classList.contains('dark-theme');
    document.body.style.background = isDark ? 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)' : 'linear-gradient(135deg, #f6f8fa 0%, #e6e9ef 100%)';
  };
  setThemeBackground();
  const observer = new MutationObserver(setThemeBackground);
  observer.observe(document.body, { attributes: true });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const darkClass = 'dark-theme';

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add(darkClass);
  themeIcon.classList.replace('bx-moon', 'bx-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.add('fade-theme');
  setTimeout(() => document.body.classList.remove('fade-theme'), 400);

  document.body.classList.toggle(darkClass);
  const isDark = document.body.classList.contains(darkClass);
  themeIcon.classList.replace(isDark ? 'bx-moon' : 'bx-sun', isDark ? 'bx-sun' : 'bx-moon');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});
backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
