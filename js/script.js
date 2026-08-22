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