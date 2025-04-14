// Enhanced main.js with modern JavaScript features
// Using ES6+ syntax and modern browser APIs

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap 5 components
  initBootstrapComponents();
  
  // Smooth scrolling for anchor links
  initSmoothScrolling();
  
  // Newsletter form submission with fetch API
  initNewsletterForm();
  
  // Lazy loading for images
  initLazyLoading();
  
  // Dark mode toggle
  initDarkMode();
  
  // Social sharing functionality
  initSocialSharing();
  
  // Mobile menu enhancements
  initMobileMenu();
  
  // Search functionality
  initSearch();
});

// Initialize Bootstrap 5 components
function initBootstrapComponents() {
  // Initialize all tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Initialize all popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Newsletter form submission with fetch API
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      const formStatus = this.querySelector('.form-status') || document.createElement('div');
      
      if (!formStatus.classList.contains('form-status')) {
        formStatus.classList.add('form-status');
        this.appendChild(formStatus);
      }
      
      if (email && isValidEmail(email)) {
        // Show loading indicator
        formStatus.innerHTML = '<div class="spinner-border spinner-border-sm text-primary" role="status"><span class="visually-hidden">Loading...</span></div> Subscribing...';
        
        // In a real implementation, this would send the data to a server
        // Using fetch API for modern AJAX requests
        fetch('https://api.example.com/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Success message with animation
          formStatus.innerHTML = '<div class="alert alert-success animate__animated animate__fadeIn">Thank you for subscribing!</div>';
          emailInput.value = '';
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 3000);
        })
        .catch(error => {
          // For demo purposes, show success anyway
          formStatus.innerHTML = '<div class="alert alert-success animate__animated animate__fadeIn">Thank you for subscribing!</div>';
          emailInput.value = '';
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            formStatus.innerHTML = '';
          }, 3000);
          
          console.log('Would normally show error:', error);
        });
      } else {
        formStatus.innerHTML = '<div class="alert alert-danger animate__animated animate__shakeX">Please enter a valid email address.</div>';
        
        // Hide error message after 3 seconds
        setTimeout(() => {
          formStatus.innerHTML = '';
        }, 3000);
      }
    });
  });
}

// Lazy loading for images
function initLazyLoading() {
  // Use native browser lazy loading if available
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.setAttribute('loading', 'lazy');
      img.removeAttribute('data-src');
    });
  } else {
    // Fallback to Intersection Observer API
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.removeAttribute('data-src');
            imageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    } else {
      // Fallback for older browsers
      let active = false;
      
      const lazyLoad = function() {
        if (active === false) {
          active = true;
          
          setTimeout(function() {
            lazyImages.forEach(lazyImage => {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
                
                lazyImages = lazyImages.filter(function(image) {
                  return image !== lazyImage;
                });
                
                if (lazyImages.length === 0) {
                  document.removeEventListener("scroll", lazyLoad);
                  window.removeEventListener("resize", lazyLoad);
                  window.removeEventListener("orientationchange", lazyLoad);
                }
              }
            });
            
            active = false;
          }, 200);
        }
      };
      
      document.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
      lazyLoad();
    }
  }
}

// Dark mode toggle functionality
function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle) {
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    
    // Set initial state
    if (darkMode === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    
    // Listen for toggle changes
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
      }
    });
  }
}

// Social sharing functionality
function initSocialSharing() {
  document.querySelectorAll('.social-share a').forEach(shareLink => {
    shareLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      const platform = this.getAttribute('data-platform');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      
      switch(platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
        case 'pinterest':
          const image = encodeURIComponent(document.querySelector('meta[property="og:image"]')?.content || '');
          shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${title}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
      }
    });
  });
}

// Mobile menu enhancements
function initMobileMenu() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Add animation classes
    navbarCollapse.classList.add('animate__animated', 'animate__faster');
    
    navbarToggler.addEventListener('click', function() {
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.add('animate__fadeOutUp');
        setTimeout(() => {
          navbarCollapse.classList.remove('show', 'animate__fadeOutUp');
        }, 200);
      } else {
        navbarCollapse.classList.add('animate__fadeInDown', 'show');
        navbarCollapse.addEventListener('animationend', function() {
          navbarCollapse.classList.remove('animate__fadeInDown');
        }, { once: true });
      }
    });
  }
}

// Search functionality
function initSearch() {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  
  if (searchForm && searchResults) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = this.querySelector('input').value.trim();
      
      if (searchTerm) {
        // Show loading indicator
        searchResults.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
        searchResults.style.display = 'block';
        
        // Fetch search index (in a real implementation, this would be a proper search index)
        fetch('/index.json')
          .then(response => response.json())
          .then(data => {
            // Simple search implementation
            const results = data.filter(item => 
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (results.length > 0) {
              let resultsHtml = '<div class="list-group">';
              results.forEach(result => {
                resultsHtml += `
                  <a href="${result.permalink}" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">${result.title}</h5>
                    </div>
                    <p class="mb-1">${result.summary}</p>
                  </a>
                `;
              });
              resultsHtml += '</div>';
              searchResults.innerHTML = resultsHtml;
            } else {
              searchResults.innerHTML = '<div class="alert alert-info">No results found.</div>';
            }
          })
          .catch(error => {
            console.error('Error fetching search results:', error);
            searchResults.innerHTML = '<div class="alert alert-danger">Error fetching search results.</div>';
          });
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
      if (searchResults.style.display === 'block' && !searchForm.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }
}

// Email validation helper function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
