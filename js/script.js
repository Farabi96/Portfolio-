 // --- Smooth Scrolling for Nav Links (accounts for sticky header) ---
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if it's open
        navLinks.classList.remove("active");

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Offset for the fixed header
            const headerOffset = 80; 
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
        }
    });
});

// --- Scroll to Top Button ---
const scrollTopButton = document.createElement("button");
scrollTopButton.innerHTML = "↑";
scrollTopButton.className = "scroll-top";
document.body.appendChild(scrollTopButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }
});

scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// --- Dark Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 1. Check if the user already chose dark mode in a previous visit
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️'; // Change icon to sun
}

// 2. Listen for clicks on the toggle button
themeToggle.addEventListener('click', () => {
    // Toggle the class on the body
    body.classList.toggle('dark-mode');
    
    // 3. Update the icon and save the choice to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});
 
// --- Quick Message Modal & AJAX Form Submission ---
const openFormBtn = document.getElementById('open-form-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const messageModal = document.getElementById('message-modal');
const messageForm = document.getElementById('quick-message-form');
const successMsg = document.getElementById('form-success-msg');
const submitBtn = document.getElementById('submit-btn');

if (openFormBtn && closeFormBtn && messageModal && messageForm) {
    // Open modal
    openFormBtn.addEventListener('click', () => {
        successMsg.style.display = 'none'; // Reset success message state
        messageForm.style.display = 'block'; // Ensure form is visible
        messageModal.classList.add('active');
    });

    // Close modal
    closeFormBtn.addEventListener('click', () => {
        messageModal.classList.remove('active');
    });

    // Close modal if clicking outside
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.classList.remove('active');
        }
    });

    // Handle background submission without page reload
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop standard redirect submission
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(messageForm);

        fetch(messageForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Success response from FormSubmit AJAX
            messageForm.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Hide the form fields and show a clean success notification
            messageForm.style.display = 'none';
            successMsg.style.display = 'block';

            // Automatically close the modal after 2.5 seconds
            setTimeout(() => {
                messageModal.classList.remove('active');
                // Bring form back for next time
                messageForm.style.display = 'block';
                successMsg.style.display = 'none';
            }, 2500);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! Something went wrong. Please try again.');
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        });
    });
}