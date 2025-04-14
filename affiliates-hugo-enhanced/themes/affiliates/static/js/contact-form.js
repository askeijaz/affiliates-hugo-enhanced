// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formMessages = document.getElementById('form-messages');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Modern form validation using FormData API
      const formData = new FormData(contactForm);
      let isValid = true;
      let errorMessage = '';
      
      // Basic validation
      if (!formData.get('name').trim()) {
        isValid = false;
        errorMessage += 'Please enter your name.<br>';
      }
      
      if (!formData.get('email').trim()) {
        isValid = false;
        errorMessage += 'Please enter your email address.<br>';
      } else if (!isValidEmail(formData.get('email'))) {
        isValid = false;
        errorMessage += 'Please enter a valid email address.<br>';
      }
      
      if (!formData.get('message').trim()) {
        isValid = false;
        errorMessage += 'Please enter your message.<br>';
      }
      
      if (!isValid) {
        formMessages.innerHTML = `<div class="error">${errorMessage}</div>`;
        return;
      }
      
      // Use fetch API for form submission
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Success message
        formMessages.innerHTML = '<div class="success">Thank you! Your message has been sent successfully.</div>';
        contactForm.reset();
      })
      .catch(error => {
        // Error message
        formMessages.innerHTML = `<div class="error">Oops! There was a problem sending your message. Please try again later.</div>`;
        console.error('Error:', error);
      });
    });
  }
  
  // Email validation helper function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
