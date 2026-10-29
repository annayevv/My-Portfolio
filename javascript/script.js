/* ======================================================
   PORTFOLIO — Orazmämmet Annaýew
   JavaScript — Animations, Interactions & Effects
   ====================================================== */

// ===== DOM Elements =====
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const scrollTopBtn = document.querySelector("#scrollTop");
const cursorGlow = document.querySelector("#cursorGlow");

// ===== Mobile Menu Toggle =====
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  });
}

// Close mobile menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});

// ===== Scroll — Active Nav Link & Header State =====
function onScroll() {
  const scrollY = window.scrollY;

  // Header shrink on scroll
  if (scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to top button visibility
  if (scrollTopBtn) {
    if (scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  // Active nav link based on scroll position
  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= offset && scrollY < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + id) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", onScroll);

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 80;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ===== Cursor Glow Effect (Desktop only) =====
if (cursorGlow && window.innerWidth > 768) {
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

// ===== Floating Particles =====
function createParticles() {
  const particlesContainer = document.querySelector("#particles");
  if (!particlesContainer) return;

  const particleCount = window.innerWidth > 768 ? 35 : 15;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 3 + 1.5;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 14;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.45 + 0.1;

    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = left + "%";
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = delay + "s";
    particle.style.opacity = opacity;

    const colors = [
      "rgba(0, 240, 255, 0.4)",
      "rgba(139, 92, 246, 0.35)",
      "rgba(236, 72, 153, 0.3)",
    ];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ===== 3D Tilt Effect on Project Cards =====
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ===== 3D Tilt Effect on Service Boxes =====
const serviceBoxes = document.querySelectorAll(".service-box");

serviceBoxes.forEach((box) => {
  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  box.addEventListener("mouseleave", () => {
    box.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ===== Smooth scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 75;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ===== Magnetic effect on primary buttons =====
const magneticBtns = document.querySelectorAll(".btn-primary");

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

// ===== Smooth Word Rotation =====
const rotatingWords = document.querySelectorAll(".rotate-word");

if (rotatingWords.length > 0) {
  let currentWord = 0;

  setInterval(() => {
    rotatingWords[currentWord].classList.remove("active");
    rotatingWords[currentWord].classList.add("exit");

    currentWord = (currentWord + 1) % rotatingWords.length;

    setTimeout(() => {
      rotatingWords.forEach((word, i) => {
        if (i !== currentWord) {
          word.classList.remove("exit", "active");
        }
      });
      rotatingWords[currentWord].classList.add("active");
    }, 400);
  }, 3000);
}

// ===== Floating Geometric Shapes =====
function createGeoShapes() {
  const container = document.querySelector("#geoShapes");
  if (!container) return;

  const shapeCount = window.innerWidth > 768 ? 12 : 5;
  const types = ["circle", "square", "triangle"];

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    const type = types[Math.floor(Math.random() * types.length)];
    shape.classList.add("geo-shape", type);

    const size = Math.random() * 30 + 15;
    shape.style.width = size + "px";
    shape.style.height = size + "px";
    shape.style.left = Math.random() * 100 + "%";
    shape.style.animationDuration = Math.random() * 25 + 20 + "s";
    shape.style.animationDelay = Math.random() * 20 + "s";

    const colors = [
      "rgba(0, 240, 255, 0.07)",
      "rgba(139, 92, 246, 0.06)",
      "rgba(236, 72, 153, 0.05)",
    ];
    if (type !== "triangle") {
      shape.style.borderColor = colors[Math.floor(Math.random() * colors.length)];
    }

    container.appendChild(shape);
  }
}

createGeoShapes();

// ===== Click Spark Effect =====
document.addEventListener("click", (e) => {
  const sparkContainer = document.createElement("div");
  sparkContainer.classList.add("click-spark");
  sparkContainer.style.left = e.clientX + "px";
  sparkContainer.style.top = e.clientY + "px";

  const sparkColors = ["#00f0ff", "#8b5cf6", "#ec4899", "#10b981", "#fbbf24"];
  const sparkCount = 8;

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    const angle = (360 / sparkCount) * i;
    const distance = Math.random() * 40 + 25;
    const tx = Math.cos((angle * Math.PI) / 180) * distance;
    const ty = Math.sin((angle * Math.PI) / 180) * distance;

    spark.style.setProperty("--tx", tx + "px");
    spark.style.setProperty("--ty", ty + "px");
    spark.style.background = sparkColors[Math.floor(Math.random() * sparkColors.length)];

    sparkContainer.appendChild(spark);
  }

  document.body.appendChild(sparkContainer);

  setTimeout(() => {
    sparkContainer.remove();
  }, 700);
});

// ===== Button Ripple Effect =====
document.querySelectorAll(".btn-primary").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== Counter Animation for Hero Stats =====
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      counter.textContent = current + "+";

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = target + "+";
      }
    }

    requestAnimationFrame(step);
  });
}

// Trigger counter animation when hero stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  statsObserver.observe(heroStats);
}

// ===== Enhanced Parallax on Scroll =====
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Parallax for floating badges
  const badges = document.querySelectorAll(".floating-badge");
  badges.forEach((badge, i) => {
    const rate = (i + 1) * 0.05;
    badge.style.transform = `translateY(${-scrollY * rate}px)`;
  });

  // Subtle parallax for home image
  const homeImg = document.querySelector(".img-border");
  if (homeImg && scrollY < window.innerHeight) {
    homeImg.style.transform = `translateY(${scrollY * 0.08}px)`;
  }
});

// ===== Tilt on Hover for Skill Items =====
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    item.style.transform = `perspective(500px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "perspective(500px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// ===== Text Reveal Effect for About Section =====
const aboutParagraphs = document.querySelectorAll(".about-content p");

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const words = entry.target.textContent.split(" ");
        entry.target.innerHTML = words
          .map(
            (word, i) =>
              `<span style="display:inline-block;opacity:0;transform:translateY(10px);animation:wordReveal 0.4s ease forwards ${i * 0.03}s">${word}&nbsp;</span>`
          )
          .join("");
        textObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

aboutParagraphs.forEach((p) => textObserver.observe(p));

// Add wordReveal keyframe dynamically
const style = document.createElement("style");
style.textContent = `
  @keyframes wordReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ===== Contact Form Submission (Web3Forms AJAX) =====
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const submitBtn = document.querySelector("#submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtnText = submitBtn.querySelector("span");
    const originalText = submitBtnText.textContent;
    const submitBtnIcon = submitBtn.querySelector("i");
    const originalIconClass = submitBtnIcon.className;

    // Loading state
    submitBtn.disabled = true;
    submitBtnIcon.className = "bx bx-loader-alt bx-spin";
    submitBtnText.textContent = "Sending...";
    formStatus.style.display = "none";
    formStatus.className = "form-status";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        formStatus.className = "form-status success";
        formStatus.innerHTML = '<i class="bx bx-check-circle"></i> Thank you! Your message has been sent successfully.';
        formStatus.style.display = "flex";
        contactForm.reset();

        // Hide success message after 6 seconds
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 6000);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      formStatus.className = "form-status error";
      formStatus.innerHTML = '<i class="bx bx-error-circle"></i> Oops! Something went wrong. Please try again or email me directly.';
      formStatus.style.display = "flex";
    } finally {
      submitBtn.disabled = false;
      submitBtnIcon.className = originalIconClass;
      submitBtnText.textContent = originalText;
    }
  });
}

console.log(
  "%c🚀 Portfolio Loaded | Orazmämmet Annaýew",
  "color: #00f0ff; font-size: 16px; font-weight: bold;"
);
