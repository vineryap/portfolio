import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

window.addEventListener('load', () => {
  scroll('nav a');

  // Menu Drawer
  scroll('ul#menu-drawer a');

  highlightLink();
});

function scroll(selectors) {
  document.querySelectorAll(selectors).forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.querySelector(e.target.hash);

      let top = el.offsetTop;

      if (e.target.hash) {
        if (selectors.includes('menu-drawer')) {
          top =
            e.target.hash === '#about'
              ? document.querySelector(e.target.hash).offsetTop / 1.1
              : document.querySelector(e.target.hash).offsetTop;
        } else {
          top =
            e.target.hash === '#about'
              ? document.querySelector(e.target.hash).offsetTop / 1.1
              : document.querySelector(e.target.hash).offsetTop;
        }
      }

      window.scrollTo({ top, left: el.offsetLeft, behavior: 'smooth' });
    });
  });
}

function highlightLink() {
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('nav ul li a.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach((section) => {
      let sectionTop = section.offsetTop;

      if (section.id === 'about' || section.id === 'skills') {
        sectionTop = section.offsetTop / 1.5;
      }
      if (scrollY >= sectionTop) {
        current = `#${section.getAttribute('id')}`;
      }
    });

    links.forEach((link) => {
      link.classList.remove('before:bg-secondary');

      if (link.href.includes(current)) {
        link.classList.add('before:bg-secondary');
      }
    });
  });
}
