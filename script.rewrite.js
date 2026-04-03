const cursor = document.querySelector('.cursor-follower');

function expandCursor() {
  if (!cursor) return;
  cursor.style.width = '48px';
  cursor.style.height = '48px';
  cursor.style.backgroundColor = 'rgba(255, 153, 182, 0.25)';
  cursor.style.border = '2px solid #ff7a9e';
}

function resetCursor() {
  if (!cursor) return;
  cursor.style.width = '32px';
  cursor.style.height = '32px';
  cursor.style.backgroundColor = 'rgba(255, 153, 182, 0.1)';
  cursor.style.border = '2px solid #ff99b6';
}

function bindCursorTargets() {
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .filter-btn, .btn, .submit-btn, .social-links a, .skill-card');
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', expandCursor);
    element.addEventListener('mouseleave', resetCursor);
  });
}

if (cursor) {
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
  });
}

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

document.querySelectorAll('.nav-item').forEach((link) => {
  link.addEventListener('click', () => {
    if (!navLinks || !navLinks.classList.contains('active')) return;
    navLinks.classList.remove('active');
    const icon = menuToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

function updateActiveNav() {
  let current = '';
  const scrollPosition = window.scrollY + 150;

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
window.addEventListener('load', updateActiveNav);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href')?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

const projectsData = [
  {
    id: 1,
    title: 'Food Menu Website',
    category: 'web',
    tag: 'Web Design',
    icon: '<i class="fas fa-utensils"></i>',
    description: "The Food Menu Website is a responsive web design project developed to showcase a restaurant's food offerings in an organized and visually appealing way. The site features sections such as Foods, About Us, and Contact Us, providing users with easy navigation and a user-friendly experience."
  },
  {
    id: 2,
    title: 'Sportinerary',
    category: 'app',
    tag: 'App Concept',
    icon: '<i class="fas fa-person-running"></i>',
    description: 'Sportinerary is a sports-focused itinerary and activity management app designed to help athletes and teams organize training schedules, events, and tournaments efficiently. It combines event planning with performance tracking, making it easier to manage time, goals, and activities in one platform.'
  },
  {
    id: 3,
    title: 'Library Management System',
    category: 'java',
    tag: 'Java OOP',
    icon: '<i class="fas fa-book"></i>',
    description: 'The Library Management System is a console-based Java program designed to manage books, magazines, and e-books. It demonstrates the four pillars of Object-Oriented Programming: Encapsulation, Inheritance, Polymorphism, and Abstraction through a realistic library scenario.'
  }
];

const workGrid = document.getElementById('workGrid');

function renderProjects(filter) {
  if (!workGrid) return;

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((project) => project.category === filter);

  workGrid.innerHTML = filteredProjects.map((project) => `
    <article class="project-card" data-category="${project.category}">
      <div class="card-img">
        ${project.icon}
      </div>
      <div class="card-content">
        <span class="card-tag">${project.tag}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    </article>
  `).join('');

  bindCursorTargets();
}

const filterButtons = document.querySelectorAll('.filter-btn');

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

function updateFilterCounters() {
  const counts = {
    all: projectsData.length,
    web: projectsData.filter((project) => project.category === 'web').length,
    app: projectsData.filter((project) => project.category === 'app').length,
    java: projectsData.filter((project) => project.category === 'java').length
  };

  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  const webButton = document.querySelector('.filter-btn[data-filter="web"]');
  const appButton = document.querySelector('.filter-btn[data-filter="app"]');
  const javaButton = document.querySelector('.filter-btn[data-filter="java"]');

  if (allButton) allButton.innerHTML = `All projects <span style="font-size:0.7rem;">(${counts.all})</span>`;
  if (webButton) webButton.innerHTML = `Web design <span style="font-size:0.7rem;">(${counts.web})</span>`;
  if (appButton) appButton.innerHTML = `App concept <span style="font-size:0.7rem;">(${counts.app})</span>`;
  if (javaButton) javaButton.innerHTML = `Java OOP <span style="font-size:0.7rem;">(${counts.java})</span>`;
}

renderProjects('all');
updateFilterCounters();
bindCursorTargets();

const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = contactForm.querySelector('textarea');

    if (!nameInput || !phoneInput || !emailInput || !messageInput) return;

    let isValid = true;
    let errorMessage = '';

    const phoneRegex = /^[0-9+\-\s]{7,15}$/;
    const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;

    if (!nameInput.value.trim()) {
      isValid = false;
      errorMessage = 'Please enter your name.';
      nameInput.style.border = '1px solid #ff99b6';
    } else {
      nameInput.style.border = '1px solid #ffe0e8';
    }

    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
      isValid = false;
      errorMessage = errorMessage || 'Please enter a valid phone number.';
      phoneInput.style.border = '1px solid #ff99b6';
    } else {
      phoneInput.style.border = '1px solid #ffe0e8';
    }

    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      errorMessage = errorMessage || 'Please enter a valid email address.';
      emailInput.style.border = '1px solid #ff99b6';
    } else {
      emailInput.style.border = '1px solid #ffe0e8';
    }

    if (!messageInput.value.trim()) {
      isValid = false;
      errorMessage = errorMessage || 'Please enter your message.';
      messageInput.style.border = '1px solid #ff99b6';
    } else {
      messageInput.style.border = '1px solid #ffe0e8';
    }

    if (isValid) {
      formFeedback.innerHTML = '<i class="fas fa-check-circle"></i> Thanks for reaching out. Your message is ready to send.';
      formFeedback.style.color = '#ff7a9e';
      formFeedback.style.fontWeight = '500';
      contactForm.reset();

      setTimeout(() => {
        formFeedback.innerHTML = '';
      }, 4000);
    } else {
      formFeedback.innerHTML = `<i class="fas fa-circle-exclamation"></i> ${errorMessage}`;
      formFeedback.style.color = '#e06785';

      setTimeout(() => {
        if (formFeedback.innerHTML.includes(errorMessage)) {
          formFeedback.innerHTML = '';
        }
      }, 3500);
    }
  });

  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      this.style.border = '1px solid #ffe0e8';
    });
  });
}

window.addEventListener('load', () => {
  const toast = document.createElement('div');
  toast.innerHTML = "Welcome to Precious Janna's portfolio";
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.backgroundColor = '#ffffffcc';
  toast.style.backdropFilter = 'blur(12px)';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '60px';
  toast.style.fontSize = '0.9rem';
  toast.style.fontWeight = '500';
  toast.style.color = '#ff7a9e';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)';
  toast.style.border = '1px solid #ffc0d0';
  toast.style.zIndex = '999';
  toast.style.fontFamily = "'Inter', sans-serif";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 600);
  }, 3000);

  function createFloatingBadge() {
    const badge = document.createElement('div');
    const labels = ['HTML', 'CSS', 'UI', 'UX'];
    badge.textContent = labels[Math.floor(Math.random() * labels.length)];
    badge.style.position = 'fixed';
    badge.style.bottom = '-20px';
    badge.style.left = Math.random() * window.innerWidth + 'px';
    badge.style.fontSize = Math.random() * 12 + 12 + 'px';
    badge.style.opacity = '0.55';
    badge.style.pointerEvents = 'none';
    badge.style.zIndex = '9998';
    badge.style.transition = 'transform 6s linear, opacity 2s';
    document.body.appendChild(badge);

    setTimeout(() => {
      badge.style.transform = `translateY(-${window.innerHeight + 50}px)`;
      badge.style.opacity = '0';
    }, 10);

    setTimeout(() => {
      badge.remove();
    }, 6500);
  }

  const badgeInterval = setInterval(() => {
    if (document.visibilityState === 'visible') {
      createFloatingBadge();
    }
  }, 4500);

  window.addEventListener('beforeunload', () => {
    clearInterval(badgeInterval);
  });
});

const revealElements = document.querySelectorAll('.project-card, .skill-card, .about-text, .about-img, .contact-left, .contact-right, .hero h1, .hero-description, .hero-cta');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(24px)';
  element.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s ease';
  revealObserver.observe(element);
});

document.querySelectorAll('.hero h1, .hero-description, .hero-cta').forEach((element) => {
  element.style.opacity = '1';
  element.style.transform = 'translateY(0)';
});

setInterval(() => {
  if (document.body) {
    document.body.style.background = 'radial-gradient(circle at 30% 10%, rgba(255,245,248,1) 0%, rgba(255,235,242,1) 100%)';
  }
}, 8000);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks?.classList.contains('active')) {
    navLinks.classList.remove('active');
    const icon = menuToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
});

const shapes = document.querySelectorAll('.shape');

document.addEventListener('mousemove', (event) => {
  const mouseX = event.clientX / window.innerWidth;
  const mouseY = event.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = 12 + index * 5;
    const moveX = (mouseX - 0.5) * speed;
    const moveY = (mouseY - 0.5) * speed;
    shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.5}deg)`;
  });
});

window.addEventListener('resize', () => {});

console.log('Portfolio content loaded for Precious Janna S.');
