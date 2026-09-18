const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const revealItems = document.querySelectorAll('.reveal');
const backToTopButton = document.querySelector('.back-to-top');
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  const updateThemeIcon = () => {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  updateThemeIcon();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => observer.observe(item));

const onScroll = () => {
  if (window.scrollY > 400) {
    backToTopButton?.classList.add('visible');
  } else {
    backToTopButton?.classList.remove('visible');
  }
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
