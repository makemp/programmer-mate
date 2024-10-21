// script.js

// Toggle Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (!targetElement) return;

        const headerOffset = 60; // Height of the navbar in pixels
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Close the menu after clicking
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        // Close any open dropdown menus
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Active Link Highlighting Based on Scroll Position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust offset as needed
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Dropdown Menu Toggle for Mobile
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.dropdown-toggle');
    dropdownLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
});

// script.js

// Existing code...

// Handle Form Submission
const contactForm = document.getElementById('form-messages');
const formMessages = document.getElementById('form-messages');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
        formMessages.textContent = 'Please fill in all required fields.';
        formMessages.style.color = 'red';
        return;
    }

    // Disable the submit button and form fields
    const submitButton = contactForm.querySelector('.submit-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const formElements = contactForm.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }

    // Send the data via a JSON POST request
    fetch('https://your-google-cloud-function-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        formMessages.textContent = 'Your message has been sent successfully!';
        formMessages.style.color = 'green';
        contactForm.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        formMessages.textContent = 'Form not implemented yet. Waiting for proper domain.';
        formMessages.style.color = 'red';
    })
    .finally(() => {
        // Re-enable the submit button and form fields
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';

        for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = false;
        }
    });
});

