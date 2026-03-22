document.addEventListener("DOMContentLoaded", () => {
  // Check if GSAP is available
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initAnimations();
  }

  // Mobile Menu Logic
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-item");

  const toggleMenu = () => {
    mobileMenu.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
  };

  mobileMenu.addEventListener("click", toggleMenu);

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) toggleMenu();
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  function initAnimations() {
    // Hero Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-content .section-tag", { y: 20, opacity: 0, duration: 0.8 })
      .from(".hero-content h1", { y: 40, opacity: 0, duration: 1 }, "-=0.4")
      .from(".hero-content p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-btns", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-image-container", { x: 50, opacity: 0, duration: 1.2 }, "-=1");

    // Scroll Reveal for Sections
    const reveals = [".service-card", ".about-text", ".image-reveal-wrapper", ".cta-box"];
    reveals.forEach(selector => {
      gsap.utils.toArray(selector).forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    });
  }

  // Contact Form Submission
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("waName").value.trim();
      const email = document.getElementById("waEmail").value.trim();
      const interest = document.getElementById("waInterest").value;
      const message = document.getElementById("waMessage").value.trim();

      if (!name || !email || !interest) return;

      const now = new Date();
      const dateTime = now.toLocaleString("en-IN", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      });

      const text = `*New Inquiry from Website*\n\n` +
                   `*Date:* ${dateTime}\n` +
                   `*Name:* ${name}\n` +
                   `*Email:* ${email}\n` +
                   `*Interest:* ${interest}\n` +
                   `*Message:* ${message}`;

      const phoneNumber = "917997298575";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
      
      // Visual Feedback
      const btn = form.querySelector("button");
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      btn.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        btn.innerHTML = "Inquiry Sent!";
        btn.style.background = "#25d366";
        form.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      }, 800);
    });
  }
});