const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section[id]');
const workGrid = document.getElementById('workGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.querySelector('.contact-form');
const siteHeader = document.querySelector('.site-header');
const heroVisual = document.querySelector('.hero-visual');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;

const projectsData = [
  {
    title: 'Portfolio Website',
    category: 'web',
    tag: 'GitHub Pages',
    icon: `
      <div class="project-placeholder" aria-hidden="true">
        <span class="project-placeholder-kicker">Featured Build</span>
        <strong>Portfolio</strong>
        <small>GitHub Profile + Live Site</small>
      </div>
    `,
    description: 'My personal portfolio site deployed through GitHub Pages, with direct access to the live version and the repository behind it.',
    codeLink: 'https://github.com/jannprecious/Portfolio',
    liveLink: 'https://jannprecious.github.io/Portfolio/'
  },
  {
    title: 'Food Menu Website',
    category: 'web',
    tag: 'Web Design',
    image: 'assets/food-menu-thumbnail.svg',
    imageAlt: 'Preview of the Food Menu Website project',
    description: "The Food Menu Website is a responsive web design project developed to showcase a restaurant's food offerings in an organized and visually appealing way."
  },
  {
    title: 'Sportinerary',
    category: 'app',
    tag: 'App Concept',
    image: 'assets/sportinerary-thumbnail.svg',
    imageAlt: 'Preview of the Sportinerary mobile app project',
    description: 'Sportinerary is a sports-focused activity management app that helps users organize schedules, events, and team-related tasks in one place.'
  },
  {
    title: 'Library Management System',
    category: 'java',
    tag: 'Java OOP',
    image: 'assets/library-management-thumbnail.svg',
    imageAlt: 'Preview of the Library Management System project',
    description: 'The Library Management System is a console-based Java project that demonstrates the core principles of object-oriented programming.'
  },
  {
    title: 'Notion',
    category: 'web',
    tag: 'Web App',
    image: 'assets/notion-thumbnail.svg',
    imageAlt: 'Preview of the Notion todo app project',
    description: 'A simple todo web app with a clean dark interface where users can create and manage tasks easily.'
  }
];

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

function markVisible(element) {
  element.classList.add('is-visible');
}

function observeReveal(element) {
  if (!element || element.dataset.revealReady === 'true') return;

  element.dataset.revealReady = 'true';

  if (prefersReducedMotion.matches) {
    markVisible(element);
    return;
  }

  revealObserver?.observe(element);
}

function registerRevealGroup(elements, options = {}) {
  const { origin = 'bottom', step = 70, immediate = false } = options;

  elements.forEach((element, index) => {
    if (!element || element.dataset.revealReady === 'true') return;

    element.classList.add('scroll-reveal');
    element.dataset.reveal = origin;
    element.style.setProperty('--reveal-delay', `${immediate ? 0 : index * step}ms`);
    observeReveal(element);
  });
}

function setupScrollAnimations() {
  registerRevealGroup([document.querySelector('.hero-copy')], { origin: 'left', immediate: true });
  registerRevealGroup([document.querySelector('.hero-image-frame')], { origin: 'right', immediate: true });
  registerRevealGroup([...document.querySelectorAll('.github-panel, .about-panel, .journey-panel, .skills-panel, .projects-panel, .contact-panel')], { step: 80 });
  registerRevealGroup([...document.querySelectorAll('.github-stat')], { step: 60 });
  registerRevealGroup([...document.querySelectorAll('.journey-card')], { step: 70 });
  registerRevealGroup([...document.querySelectorAll('.skill-stack')], { step: 90 });
  registerRevealGroup([...document.querySelectorAll('.skill-meter')], { step: 60 });
  registerRevealGroup([...document.querySelectorAll('.project-card')], { step: 70 });
  registerRevealGroup([...document.querySelectorAll('.about-ring, .contact-form')], { step: 0 });
}

function setActiveNav(targetId) {
  navItems.forEach((item) => {
    const href = item.getAttribute('href')?.substring(1);
    item.classList.toggle('active-nav', href === targetId);
  });
}

function getHeaderOffset() {
  return (siteHeader?.offsetHeight || 0) + 20;
}

function scrollToSection(section) {
  const rect = section.getBoundingClientRect();
  const sectionTop = window.scrollY + rect.top;

  window.scrollTo({
    top: Math.max(0, sectionTop - getHeaderOffset()),
    behavior: 'smooth'
  });
}

navItems.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href')?.substring(1);
    const targetSection = targetId ? document.getElementById(targetId) : null;

    if (targetSection) {
      event.preventDefault();
      scrollToSection(targetSection);
      setActiveNav(targetId);
    }

    if (navLinks?.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});

function updateActiveNav() {
  if (window.scrollY < 80) {
    setActiveNav('home');
    return;
  }

  let current = 'home';
  let bestScore = Number.POSITIVE_INFINITY;
  const headerOffset = siteHeader?.offsetHeight || 0;
  const viewportTarget = headerOffset + (window.innerHeight * 0.22);

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, headerOffset);

    if (visibleHeight <= 0) return;

    const center = rect.top + (rect.height / 2);
    const score = Math.abs(center - viewportTarget);

    if (score < bestScore) {
      bestScore = score;
      current = section.getAttribute('id') || current;
    }
  });

  setActiveNav(current);
}

function updateScrollEffects() {
  updateActiveNav();
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 24);

  if (!heroVisual || prefersReducedMotion.matches) return;

  const rect = heroVisual.getBoundingClientRect();
  const progress = Math.max(-1, Math.min(1, ((window.innerHeight * 0.5) - rect.top) / window.innerHeight));

  heroVisual.style.setProperty('--hero-shift', `${progress * 24}px`);
  heroVisual.style.setProperty('--hero-glow-shift', `${progress * -18}px`);
}

window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);

function renderProjects(filter) {
  if (!workGrid) return;

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((project) => project.category === filter);

  workGrid.innerHTML = filteredProjects.map((project, index) => {
    const actions = [
      project.codeLink
        ? `<a class="project-link project-link-secondary" href="${project.codeLink}" target="_blank" rel="noreferrer">GitHub</a>`
        : '',
      project.liveLink
        ? `<a class="project-link" href="${project.liveLink}" target="_blank" rel="noreferrer">Live Site</a>`
        : ''
    ].filter(Boolean).join('');

    return `
    <article class="project-card" data-category="${project.category}">
      <div class="project-thumb">
        ${project.image
          ? `<img src="${project.image}" alt="${project.imageAlt || project.title}">`
          : project.icon}
      </div>
      <div class="project-card-body">
        <div class="project-card-top">
          <span class="project-index">${String(index + 1).padStart(2, '0')}</span>
          <span class="project-tag">${project.tag}</span>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-card-footer">
          <span class="project-type">${project.category.toUpperCase()} PROJECT</span>
          <div class="project-actions">
            ${actions || '<span class="project-link project-link-muted">Preview Only</span>'}
          </div>
        </div>
      </div>
    </article>
  `;
  }).join('');

  setupScrollAnimations();
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter') || 'all';
      renderProjects(filterValue);
      filterButtons.forEach((item) => item.classList.remove('active-filter'));
      button.classList.add('active-filter');
    });
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const fullName = String(formData.get('full-name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const mobileNumber = String(formData.get('mobile-number') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${fullName || 'Website visitor'}`);
    const body = encodeURIComponent([
      `Name: ${fullName || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Mobile Number: ${mobileNumber || 'Not provided'}`,
      '',
      message || 'No message provided.'
    ].join('\n'));

    window.location.href = `mailto:pjsubong@gmail.com?subject=${subject}&body=${body}`;
  });
}

if (!prefersReducedMotion.matches) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      markVisible(entry.target);
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -12% 0px'
  });
}

renderProjects('all');
setupScrollAnimations();
updateScrollEffects();
