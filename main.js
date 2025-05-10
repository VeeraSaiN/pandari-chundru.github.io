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
