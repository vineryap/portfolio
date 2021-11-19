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

      if (!e.target.hash) return window.scrollTo({ top: 0, behavior: 'smooth' });

      const el = document.querySelector(e.target.hash);

      if (el) {
        let top = el.offsetTop;
        if (e.target.hash) {
          document.querySelector(e.target.hash).offsetTop;
        }

        window.scrollTo({ top, left: el.offsetLeft, behavior: 'smooth' });
      }
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
      
      if (scrollY >= sectionTop) {
        current = `#${section.getAttribute('id')}`;
      }
    });

    links.forEach((link) => {
      link.classList.remove('before:bg-primary');

      if (link.href.includes(current)) {
        link.classList.add('before:bg-primary');
      }
    });
  });
}
