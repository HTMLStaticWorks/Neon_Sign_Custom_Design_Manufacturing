document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      navbar.classList.toggle('menu-open');
    });
  }

  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  
  // Check saved theme
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }

  // RTL Toggle
  const rtlToggle = document.querySelector('.rtl-toggle');
  
  // Check saved dir
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.body.setAttribute('dir', savedDir);
  }
  
  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isRTL = document.body.getAttribute('dir') === 'rtl';
      const newDir = isRTL ? 'ltr' : 'rtl';
      document.body.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  }

  // Configurator Preview
  const configText = document.getElementById('config-text');
  const previewText = document.getElementById('preview-text');
  const configColor = document.getElementById('config-color');
  
  if (configText && previewText) {
    configText.addEventListener('input', (e) => {
      previewText.textContent = e.target.value || 'NEON';
    });
  }
  
  if (configColor && previewText) {
    configColor.addEventListener('input', (e) => {
      const colorMap = {
        'pink': 'var(--accent-primary)',
        'orange': 'var(--accent-secondary)',
        'teal': 'var(--accent-third)',
        'green': 'var(--accent-premium)'
      };
      const color = colorMap[e.target.value];
      previewText.style.color = '#fff';
      previewText.style.textShadow = `0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`;
    });
  }

  // Mouse move effect for cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      
      // Close all other open items
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });

  // Back to Top Button Implementation
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
