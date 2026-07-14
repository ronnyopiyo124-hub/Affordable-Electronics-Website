const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.querySelector(".toggle-dark");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const reveals = document.querySelectorAll(".reveal");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach(link => {
  if (link.getAttribute("href") === location.pathname.split("/").pop() || 
      (location.pathname.endsWith("/") && link.getAttribute("href") === "index.html")) {
    link.classList.add("active");
  }
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const pressed = document.body.classList.contains("dark");
    themeToggle.setAttribute("aria-pressed", String(pressed));
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Message sent successfully. We'll get back to you soon.";
    contactForm.reset();
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}