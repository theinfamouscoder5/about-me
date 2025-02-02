// Auto-Update Copyright Year
const copyrightYear = document.querySelector('footer .copyright');
const currentYear = new Date().getFullYear();
copyrightYear.textContent = `\u00A9 ${currentYear} Cody`; // Template literal for cleaner code

// Smooth scrolling (same as before)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation Bar Scroll Effect (same as before)
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled'); // Add 'scrolled' class
    } else {
        nav.classList.remove('scrolled'); // Remove 'scrolled' class
    }
});

// Form Submission Handling (Example - Replace with your actual logic)
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form data (You would do more robust validation/handling here)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // In a real application, you would send this data to a server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("Form submitted (example - no actual submission)"); // Replace with your submission logic
    form.reset(); // Clear the form
});

// Optional: Add active class to the nav link
const navLinks = document.querySelectorAll('#mainNav a'); // Select all links in the nav
navLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    navLinks.forEach(otherLink => otherLink.classList.remove('active')); // Remove from others
    this.classList.add('active'); // Add to the clicked link
  });
});