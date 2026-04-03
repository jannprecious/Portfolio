const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main section[id]');
const workGrid = document.getElementById('workGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

const projectsData = [
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

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    if (!navLinks || !navLinks.classList.contains('active')) return;
    navLinks.classList.remove('active');
  });
});

function updateActiveNav() {
  let current = '';
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.remove('active-nav');
    const href = item.getAttribute('href')?.substring(1);
    if (href === current) {
      item.classList.add('active-nav');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

function renderProjects(filter) {
  if (!workGrid) return;

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((project) => project.category === filter);

  workGrid.innerHTML = filteredProjects.map((project) => `
    <article class="project-card" data-category="${project.category}">
      <div class="card-img">
        ${project.image
          ? `<img src="${project.image}" alt="${project.imageAlt || project.title}">`
          : project.icon}
      </div>
      <div class="card-content">
        <span class="card-tag">${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </article>
  `).join('');
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

renderProjects('all');
updateActiveNav();
