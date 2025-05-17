 (function() {
      'use strict';

      // Menu toggle button functionality
      const menuToggle = document.getElementById('menuToggle');
      const primaryMenu = document.getElementById('primaryMenu');

      menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        primaryMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
      });

      // Close menu when a link is clicked (on mobile)
      primaryMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            primaryMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('open');
          }
        });
      });

      // Smooth scroll to services on Learn More btn click
      const learnMoreBtn = document.getElementById('learnMoreBtn');
      learnMoreBtn.addEventListener('click', () => {
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
      });

      // Intersection Observer for fade-slide animations
      const fadeElements = document.querySelectorAll('.fade-slide');

      const observerOptions = {
        threshold: 0.15
      };

      const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      fadeElements.forEach(el => fadeObserver.observe(el));

      // Motion picture 3D tilt effect
      const motionContainer = document.getElementById('motionContainer');
      const motionPic = document.getElementById('motionPic');

      function transformMovement(x, y) {
        const maxRotation = 15; // degrees
        let rotateX = (y / motionContainer.clientHeight) * maxRotation * 2 - maxRotation;
        let rotateY = (x / motionContainer.clientWidth) * maxRotation * 2 - maxRotation;
        motionPic.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      }

      function resetTransform() {
        motionPic.style.transition = 'transform 0.5s ease-out';
        motionPic.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        setTimeout(() => {
          motionPic.style.transition = '';
        }, 500);
      }

      motionContainer.addEventListener('mousemove', (e) => {
        const rect = motionContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        transformMovement(x, y);
      });

      motionContainer.addEventListener('mouseleave', () => {
        resetTransform();
      });

      motionContainer.addEventListener('focus', () => {
        motionPic.style.transform = 'scale(1.05)';
      });

      motionContainer.addEventListener('blur', () => {
        resetTransform();
      });

      // Newsletter form submission
      const newsletterForm = document.getElementById('newsletterForm');
      const emailInput = document.getElementById('emailSubscribe');
      const messageDiv = document.getElementById('newsletter-message');

      newsletterForm.addEventListener('submit', e => {
        e.preventDefault();
        messageDiv.textContent = '';
        const email = emailInput.value.trim();

        if (!email) {
          messageDiv.style.color = '#d9534f';
          messageDiv.textContent = 'Please enter your email address.';
          emailInput.focus();
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          messageDiv.style.color = '#d9534f';
          messageDiv.textContent = 'Please enter a valid email address.';
          emailInput.focus();
          return;
        }

        // Simulate success submission (replace with real API call as needed)
        messageDiv.style.color = '#28a745';
        messageDiv.textContent = 'Thank you for subscribing!';

        newsletterForm.reset();
      });
    })()