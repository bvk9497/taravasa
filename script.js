document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  });

  // Hero Animations
  const tl = gsap.timeline();
  tl.from(".hero-content h1", {
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
  })
    .from(".hero-content p", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
    .from(".hero-btns", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6");

  // Scroll Reveal for Sections
  const revealElements = document.querySelectorAll(
    ".service-card, .about-text, .image-reveal-wrapper, .cta-box"
  );
  revealElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  // Form Submit (Visual feedback)
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    btn.innerHTML = "Inquiry Sent!";
    btn.style.background = "#25d366";
    form.reset();
  });

  // Smooth Scroll for Nav Links
  document.querySelectorAll(".nav-item").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      const offset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
});
