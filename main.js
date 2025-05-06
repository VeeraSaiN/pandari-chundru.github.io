// Toggle navigation menu
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

// Close nav on link click
const navLinks = document.querySelectorAll('.nav__link');
if (navLinks) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('show');
    });
  });
}

// Dark Theme Toggle
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const selectedTheme = localStorage.getItem('selected-theme');

if (themeButton) {
  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedTheme === 'dark' ? 'add' : 'remove']('bx-sun');
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle('bx-sun');
    localStorage.setItem('selected-theme', document.body.classList.contains(darkTheme) ? 'dark' : 'light');
  });
}
