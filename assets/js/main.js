// nav-toggle
const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav-links');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });
}

// active nav highlight
const links = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('main section[id]')];
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

links.forEach(l => {
  const href = l.getAttribute('href') || '';
  if (href && !href.startsWith('#') && href.split('#')[0] === currentPage) {
    l.classList.add('active');
  }
});

if (sections.length && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          const href = l.getAttribute('href') || '';
          const samePageHash = href === '#' + e.target.id;
          const indexHash = currentPage === 'index.html' && href === 'index.html#' + e.target.id;
          l.classList.toggle('active', samePageHash || indexHash || l.classList.contains('active') && href.split('#')[0] === currentPage && currentPage !== 'index.html');
        });
      }
    });
  }, { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 });
  sections.forEach(s => obs.observe(s));
}

// close nav on link click
links.forEach(l => l.addEventListener('click', () => {
  if (!toggle || !nav) return;
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
  toggle.querySelector('i').className = 'fa-solid fa-bars';
}));