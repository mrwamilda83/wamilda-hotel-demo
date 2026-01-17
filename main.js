document.addEventListener("DOMContentLoaded", () => {
  // Loader
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(() => (loader.style.display = "none"), 400);
    }
  });

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Carousel (pure JS)
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  let current = 0;
  let timer = null;

  function setSlide(index) {
    if (!track) return;

    const items = track.querySelectorAll(".carousel-item");
    const total = items.length;

    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    if (dotsWrap) {
      dotsWrap.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("is-active", i === current);
      });
    }
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => setSlide(current + 1), 4500);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { setSlide(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { setSlide(current + 1); startAuto(); });

  if (dotsWrap) {
    dotsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".dot");
      if (!btn) return;

      const i = Number(btn.getAttribute("data-slide"));
      if (!Number.isNaN(i)) {
        setSlide(i);
        startAuto();
      }
    });
  }

  if (track) {
    track.addEventListener("mouseenter", stopAuto);
    track.addEventListener("mouseleave", startAuto);
    startAuto();
  }

  // Booking form demo
  const bookForm = document.getElementById("bookNowForm");
  const bookNote = document.getElementById("bookNote");

  if (bookForm && bookNote) {
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      bookNote.textContent =
        "✅ Booking request sent (demo). Connect this form to email or WhatsApp for real clients.";
      bookForm.reset();
    });
  }

  // Contact form demo
  const contactForm = document.getElementById("request");
  const formNote = document.getElementById("formNote");

  if (contactForm && formNote) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      formNote.textContent =
        "✅ Message sent (demo). Replace with real email/Messenger integration later.";
      contactForm.reset();
    });
  }

  // Newsletter demo
  const newsletterForm = document.getElementById("newsletterForm");
  const newsNote = document.getElementById("newsNote");

  if (newsletterForm && newsNote) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      newsNote.textContent = "✅ Subscribed (demo).";
      newsletterForm.reset();
    });
  }
});
