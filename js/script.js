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

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});