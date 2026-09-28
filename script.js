const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const cursorGlow = document.querySelector(".cursor-glow");


// =========================
// Theme
// =========================

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  body.classList.add("light");
}


// Change About images depending on theme
function updateThemeImages() {
  const images = document.querySelectorAll(".about-gallery img[data-dark-src]");

  images.forEach((img) => {
    if (body.classList.contains("light")) {
      img.src = img.dataset.lightSrc;
    } else {
      img.src = img.dataset.darkSrc;
    }
  });
}


// Set correct images when page loads
updateThemeImages();


themeToggle.addEventListener("click", () => {

  body.classList.toggle("light");

  localStorage.setItem(
    "portfolio-theme",
    body.classList.contains("light") ? "light" : "dark"
  );

  updateThemeImages();

});


// =========================
// Mobile navigation
// =========================

menuToggle.addEventListener("click", () => {

  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", open);

});

navLinks.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});


// =========================
// Reveal-on-scroll
// =========================

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      observer.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((el) => {
  observer.observe(el);
});


// =========================
// Active navigation section
// =========================

const sections = [
  ...document.querySelectorAll("main section[id]")
];

const links = [
  ...document.querySelectorAll(".nav-links a")
];

const sectionObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      links.forEach((a) => {

        a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`
        );

      });

    }

  });

}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => {
  sectionObserver.observe(section);
});


// =========================
// Header shadow
// =========================

window.addEventListener("scroll", () => {

  navbar.style.boxShadow =
    window.scrollY > 20
      ? "0 12px 40px rgba(0,0,0,.16)"
      : "0 10px 40px rgba(0,0,0,.08)";

}, {
  passive: true
});


// =========================
// Cursor glow
// =========================

window.addEventListener("pointermove", (e) => {

  if (window.innerWidth > 800 && cursorGlow) {

    cursorGlow.style.left = `${e.clientX}px`;

    cursorGlow.style.top = `${e.clientY}px`;

  }

});


// =========================
// Project card tilt
// =========================

document.querySelectorAll(".project-card").forEach((card) => {

  card.addEventListener("pointermove", (e) => {

    if (window.innerWidth < 900) return;

    const r = card.getBoundingClientRect();

    const x = (e.clientX - r.left) / r.width - 0.5;

    const y = (e.clientY - r.top) / r.height - 0.5;

    card.style.transform =
      `perspective(700px)
       rotateX(${y * -3}deg)
       rotateY(${x * 3}deg)
       translateY(-6px)`;

  });

  card.addEventListener("pointerleave", () => {

    card.style.transform = "";

  });

});


// =========================
// Contact form
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const status = document.getElementById("formStatus");

    status.textContent =
      "Message ready — connect this form to your email service or backend.";

    e.target.reset();

  });

}


// =========================
// Dynamic year
// =========================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================
// Interactive planet
// =========================

const aboutArt = document.querySelector(".about-art");

if (aboutArt) {

  const planet = aboutArt.querySelector(".planet");

  const orbits = aboutArt.querySelectorAll(".orbit");

  const stars = aboutArt.querySelectorAll(".star");


  aboutArt.addEventListener("pointermove", (e) => {

    if (window.innerWidth < 900) return;

    const rect = aboutArt.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;


    // Planet

    planet.style.transform =
      `translate(${x * -12}px, ${y * -12}px)`;


    // Orbits

    orbits.forEach((orbit, index) => {

      const amount = index === 0 ? 8 : 14;

      orbit.style.transform =
        `translate(${x * amount}px, ${y * amount}px)`;

    });


    // Stars

    stars.forEach((star, index) => {

      const amount = 15 + index * 8;

      star.style.transform =
        `translate(${x * amount}px, ${y * amount}px)`;

    });

  });


  aboutArt.addEventListener("pointerleave", () => {

    planet.style.transform = "";

    orbits.forEach((orbit) => {
      orbit.style.transform = "";
    });

    stars.forEach((star) => {
      star.style.transform = "";
    });

  });

}


// =========================
// Interactive skill tags
// =========================

const skillTags =
  document.querySelectorAll(".about-tags span");

skillTags.forEach((skill) => {

  skill.addEventListener("pointermove", (e) => {

    if (window.innerWidth < 900) return;

    const rect = skill.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;


    skill.style.transform =
      `perspective(300px)
       rotateX(${y * -8}deg)
       rotateY(${x * 8}deg)
       translateY(-5px)`;

  });


  skill.addEventListener("pointerleave", () => {

    skill.style.transform = "";

  });

});


// =========================
// Clickable skill information
// =========================

const skillInfo =
  document.getElementById("skillInfo");

const skills =
  document.querySelectorAll(".about-tags span");


const skillDescriptions = {

  python:
    "Data analysis · Automation · Machine Learning · Problem Solving",

  sql:
    "Database queries · Data manipulation · Analysis · MySQL",

  ai:
    "Machine Learning · Model building · Data-driven systems",

  web:
    "HTML · CSS · JavaScript · Interactive interfaces",

  mongo:
    "NoSQL · Database management · Unstructured data",

  data:
    "EDA · Visualization · Statistics · Data-driven insights"

};


if (skillInfo) {

  skills.forEach((skill) => {

    skill.addEventListener("click", () => {

      const key = skill.dataset.skill;


      // Close if already open

      if (skill.classList.contains("active")) {

        skill.classList.remove("active");

        skillInfo.classList.remove("show");

        return;

      }


      // Close other skills

      skills.forEach((item) => {

        item.classList.remove("active");

      });


      // Activate selected skill

      skill.classList.add("active");


      // Update description

      skillInfo.querySelector("p").textContent =
        skillDescriptions[key];


      // Show information

      skillInfo.classList.add("show");

    });

  });

}


// =========================
// Expandable project cards
// =========================

const projectCards =
  document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

  card.addEventListener("click", (e) => {

    // Don't expand when clicking the project link

    if (e.target.closest(".project-link")) {
      return;
    }


    // Close other cards

    projectCards.forEach((otherCard) => {

      if (otherCard !== card) {

        otherCard.classList.remove("expanded");

      }

    });


    // Toggle clicked card

    card.classList.toggle("expanded");

  });

});


// =========================
// Scroll progress
// =========================

const scrollProgress =
  document.getElementById("scrollProgress");


if (scrollProgress) {

  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    if (documentHeight <= 0) {
      return;
    }


    const scrollPercentage =
      (scrollTop / documentHeight) * 100;


    scrollProgress.style.width =
      `${scrollPercentage}%`;

  }, {
    passive: true
  });

}