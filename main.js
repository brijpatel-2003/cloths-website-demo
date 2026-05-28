/* ══════════════════════════════════════════════════════════════
   SHREE HARI TAILOR — main.js
   ══════════════════════════════════════════════════════════════ */

"use strict";

/* ─── Loader ─────────────────────────────────────────────────── */
(function initLoader() {
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 1400);
  });
  document.body.style.overflow = "hidden";
})();

/* ─── Custom Cursor ──────────────────────────────────────────── */
(function initCursor() {
  if (window.matchMedia("(max-width: 768px)").matches) return;
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursor-follower");
  if (!cursor || !follower) return;

  let mx = 0,
    my = 0,
    fx = 0,
    fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverEls = document.querySelectorAll(
    "a, button, .service-card, .gallery-item, .wedding-card",
  );
  hoverEls.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });
})();

/* ─── Scroll Progress ────────────────────────────────────────── */
(function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;
  window.addEventListener(
    "scroll",
    () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + "%";
    },
    { passive: true },
  );
})();

/* ─── Navbar ─────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    },
    { passive: true },
  );

  // Hamburger / mobile menu
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openMenu() {
    mobileMenu.classList.add("open");
    hamburger.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (mobileClose) mobileClose.addEventListener("click", closeMenu);
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((sec) => {
        if (window.scrollY >= sec.offsetTop - 120)
          current = sec.getAttribute("id");
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current)
          link.classList.add("active");
      });
    },
    { passive: true },
  );
})();

/* ─── Hero Particles ─────────────────────────────────────────── */
(function initParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;
  const count = window.matchMedia("(max-width: 768px)").matches ? 10 : 24;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const dur = Math.random() * 18 + 12;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 120;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}%; top:110%;
      animation-duration:${dur}s;
      animation-delay:-${delay}s;
      --drift:${drift}px;
    `;
    container.appendChild(p);
  }

  // Inject particle keyframe
  const style = document.createElement("style");
  style.textContent = `
    .particle {
      animation-name: particleFloat;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes particleFloat {
      0%   { transform: translateY(0) translateX(0); opacity: 0; }
      10%  { opacity: 0.8; }
      90%  { opacity: 0.4; }
      100% { transform: translateY(-120vh) translateX(var(--drift)); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* ─── Scroll Reveal ──────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right",
  );

  function onIntersect(entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0, 10);
      setTimeout(() => el.classList.add("visible"), delay);
      observer.unobserve(el);
    });
  }

  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  });
  els.forEach((el) => observer.observe(el));
})();

/* ─── Animated Counters ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  let started = false;

  function startCounters() {
    if (started) return;
    const section = document.querySelector(".stats-section");
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      started = true;
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current).toLocaleString();
        }, step);
      });
    }
  }

  window.addEventListener("scroll", startCounters, { passive: true });
  startCounters();
})();

/* ─── Gallery Lightbox ───────────────────────────────────────── */
(function initGallery() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCaption = document.getElementById("lightboxCaption");
  const lbClose = document.getElementById("lightboxClose");
  const lbPrev = document.getElementById("lightboxPrev");
  const lbNext = document.getElementById("lightboxNext");
  if (!lightbox) return;

  const images = [];
  items.forEach((item, i) => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-hover span");
    images.push({
      src: img ? img.src : "",
      caption: caption ? caption.textContent : "",
    });
    item.addEventListener("click", () => openLightbox(i));
  });

  let current = 0;

  function openLightbox(idx) {
    current = idx;
    showImage(current);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
  function showImage(idx) {
    lbImg.src = images[idx].src;
    lbImg.alt = images[idx].caption;
    lbCaption.textContent = images[idx].caption;
  }

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });
  lbNext.addEventListener("click", () => {
    current = (current + 1) % images.length;
    showImage(current);
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    }
    if (e.key === "ArrowRight") {
      current = (current + 1) % images.length;
      showImage(current);
    }
  });
})();

/* ─── Reviews Slider ─────────────────────────────────────────── */
(function initReviews() {
  const track = document.getElementById("reviewsTrack");
  const dotsContainer = document.getElementById("reviewsDots");
  if (!track) return;

  const cards = track.querySelectorAll(".review-card");
  const total = cards.length;
  let current = 0;
  let autoplayTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "reviews-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Review " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 360;
    const style = window.getComputedStyle(card);
    return card.offsetWidth + parseInt(style.marginRight || 0, 10) + 24;
  }

  function goTo(idx) {
    current = idx;
    const offset = idx * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
    document.querySelectorAll(".reviews-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === idx);
    });
  }

  function next() {
    goTo((current + 1) % total);
  }

  function startAutoplay() {
    autoplayTimer = setInterval(next, 4000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  startAutoplay();
  track.parentElement.addEventListener("mouseenter", stopAutoplay);
  track.parentElement.addEventListener("mouseleave", startAutoplay);

  // Touch support
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
      stopAutoplay();
    },
    { passive: true },
  );
  track.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0
          ? goTo((current + 1) % total)
          : goTo((current - 1 + total) % total);
      }
      startAutoplay();
    },
    { passive: true },
  );

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 200);
  });
})();

/* ─── Contact Form ───────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#fname").value.trim();
    const phone = form.querySelector("#fphone").value.trim();
    const service = form.querySelector("#fservice").value;
    const message = form.querySelector("#fmessage").value.trim();

    if (!name || !phone) {
      showToast("Please fill in your name and phone number.", "error");
      return;
    }

    // Build WhatsApp message
    const text = `Hello Shree Hari Tailor,\n\nName: ${name}\nPhone: ${phone}\nService: ${service || "Not specified"}\nMessage: ${message || "N/A"}\n\nPlease confirm my appointment.`;
    const encoded = encodeURIComponent(text);
    window.open(
      `https://wa.me/91XXXXXXXXXX?text=${encoded}`,
      "_blank",
      "noopener",
    );

    showToast("Redirecting to WhatsApp…", "success");
    form.reset();
  });

  function showToast(msg, type) {
    const existing = document.getElementById("toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "toast";
    toast.textContent = msg;
    toast.style.cssText = `
      position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
      background:${type === "success" ? "var(--gold)" : "#e53e3e"};
      color:${type === "success" ? "var(--black)" : "#fff"};
      padding:12px 28px; font-size:0.8rem; letter-spacing:0.15em;
      z-index:8000; font-family:var(--font-sans);
      box-shadow:0 8px 32px rgba(0,0,0,0.4);
      animation:fadeIn 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
})();

/* ─── Smooth Scroll for anchor links ────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById("navbar")?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();

/* ─── FAQ Accordion ──────────────────────────────────────────── */
(function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    if (!btn || !answer) return;
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      // Close all
      items.forEach((i) => {
        i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        i.querySelector(".faq-a").classList.remove("open");
      });
      // Toggle clicked
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        answer.classList.add("open");
      }
    });
  });
})();

/* ─── Navbar active link style injection ────────────────────── */
(function injectActiveStyle() {
  const s = document.createElement("style");
  s.textContent = `.nav-link.active { color: var(--gold); }
  .nav-link.active::after { left: 14px; right: 14px; }`;
  document.head.appendChild(s);
})();
