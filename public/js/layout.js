// Shared header/footer/floating WA button — dirender via JS supaya konsisten di semua halaman.

let COMPANY = null;

function renderHeader() {
  return `
  <div class="topbar">
    <div class="container">
      <span>📍 Melayani area Tangerang & sekitarnya</span>
      <span id="topbar-contact"></span>
    </div>
  </div>

  <header class="header">
    <div class="container">
      <a href="/" class="logo">
        <span class="mark">🛠️</span>
        RenovKita
      </a>
      <nav class="main-nav">
        <a href="/">Beranda</a>
        <a href="/layanan.html">Layanan</a>
        <a href="/portofolio.html">Portofolio</a>
        <a href="/tentang.html">Tentang Kami</a>
      </nav>
      <div class="header-cta">
        <a class="btn-header-estimasi" href="/estimasi.html">Estimasi Cepat</a>
      </div>
    </div>
  </header>
  `;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div>
        <h5>RenovKita</h5>
        <p id="footer-tagline"></p>
        <p id="footer-address"></p>
      </div>
      <div>
        <h5>Navigasi</h5>
        <a href="/">Beranda</a>
        <a href="/layanan.html">Layanan Kami</a>
        <a href="/portofolio.html">Portofolio</a>
        <a href="/tentang.html">Tentang Kami</a>
      </div>
      <div>
        <h5>Kontak</h5>
        <a id="footer-phone" href="#"></a>
        <a id="footer-email" href="#"></a>
        <a id="footer-wa" href="#">Chat via WhatsApp</a>
      </div>
    </div>
    <div class="footer-bottom">
      © 2026 RenovKita. Website perusahaan renovasi properti.
    </div>
  </footer>
  `;
}

function renderWaFloat() {
  return `<a id="wa-float" class="wa-float" href="#" target="_blank" rel="noopener">💬</a>`;
}

// ---------- Lightbox galeri foto portofolio ----------

let lightboxImages = [];
let lightboxIndex = 0;
let lightboxShareId = null;

function renderLightbox() {
  return `
  <div id="lightbox-overlay" class="lightbox-overlay" aria-hidden="true">
    <button class="lightbox-close" id="lightbox-close" aria-label="Tutup">&times;</button>
    <button class="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Foto sebelumnya">&#8249;</button>
    <div class="lightbox-content">
      <img id="lightbox-img" src="" alt="" />
      <div class="lightbox-caption">
        <span id="lightbox-title"></span>
        <span id="lightbox-counter" class="lightbox-counter"></span>
        <button id="lightbox-share" class="lightbox-share" style="display:none;">🔗 Salin Link Proyek Ini</button>
      </div>
    </div>
    <button class="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Foto berikutnya">&#8250;</button>
  </div>`;
}

function updateLightboxImage() {
  const img = document.getElementById("lightbox-img");
  const counter = document.getElementById("lightbox-counter");
  img.src = `images/services/${lightboxImages[lightboxIndex]}`;
  counter.textContent = lightboxImages.length > 1
    ? `${lightboxIndex + 1} / ${lightboxImages.length}`
    : "";
  const multi = lightboxImages.length > 1;
  document.getElementById("lightbox-prev").style.display = multi ? "flex" : "none";
  document.getElementById("lightbox-next").style.display = multi ? "flex" : "none";
}

function openLightbox(images, title, startIndex = 0, shareId = null) {
  lightboxImages = images;
  lightboxIndex = startIndex;
  lightboxShareId = shareId;
  document.getElementById("lightbox-title").textContent = title;
  updateLightboxImage();

  const shareBtn = document.getElementById("lightbox-share");
  if (shareId) {
    shareBtn.style.display = "inline-block";
    shareBtn.textContent = "🔗 Salin Link Proyek Ini";
    const url = new URL(window.location.href);
    url.searchParams.set("project", shareId);
    window.history.replaceState(null, "", url.toString());
  } else {
    shareBtn.style.display = "none";
  }

  const overlay = document.getElementById("lightbox-overlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-overlay");
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lightboxShareId) {
    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(null, "", url.toString());
    lightboxShareId = null;
  }
}

function lightboxNext() {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
}

function lightboxPrev() {
  lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}

function initLightbox() {
  document.body.insertAdjacentHTML("beforeend", renderLightbox());
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-next").addEventListener("click", lightboxNext);
  document.getElementById("lightbox-prev").addEventListener("click", lightboxPrev);
  document.getElementById("lightbox-overlay").addEventListener("click", (e) => {
    if (e.target.id === "lightbox-overlay") closeLightbox();
  });
  document.getElementById("lightbox-share").addEventListener("click", async () => {
    const btn = document.getElementById("lightbox-share");
    try {
      await navigator.clipboard.writeText(window.location.href);
      btn.textContent = "✅ Link tersalin!";
    } catch (e) {
      btn.textContent = window.location.href;
    }
    setTimeout(() => { btn.textContent = "🔗 Salin Link Proyek Ini"; }, 2000);
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox-overlay").classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lightboxNext();
    if (e.key === "ArrowLeft") lightboxPrev();
  });
}

// Dipanggil dari home.js / portofolio.js lewat event delegation di grid portofolio
function attachPortfolioLightbox(gridSelector) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-portfolio-images]");
    if (!card) return;
    const images = JSON.parse(card.getAttribute("data-portfolio-images"));
    const title = card.getAttribute("data-portfolio-title");
    const id = card.getAttribute("data-portfolio-id");
    openLightbox(images, title, 0, id || null);
  });
}

function formatRupiah(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function buildWaLink(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

async function mountLayout() {
  document.getElementById("app-header").innerHTML = renderHeader();
  document.getElementById("app-footer").innerHTML = renderFooter();
  document.body.insertAdjacentHTML("beforeend", renderWaFloat());
  initLightbox();

  try {
    const res = await fetch("/api/company");
    COMPANY = await res.json();

    document.getElementById("topbar-contact").innerHTML =
      `📞 ${COMPANY.phone} &nbsp;|&nbsp; ✉️ ${COMPANY.email}`;
    document.getElementById("footer-tagline").textContent = COMPANY.tagline;
    document.getElementById("footer-address").textContent = "📍 " + COMPANY.address;
    const phoneEl = document.getElementById("footer-phone");
    phoneEl.textContent = "📞 " + COMPANY.phone;
    phoneEl.href = "tel:+" + COMPANY.whatsapp;
    const emailEl = document.getElementById("footer-email");
    emailEl.textContent = "✉️ " + COMPANY.email;
    emailEl.href = "mailto:" + COMPANY.email;
    document.getElementById("footer-wa").href = buildWaLink(
      COMPANY.whatsapp,
      "Halo RenovKita, saya ingin tanya-tanya soal renovasi rumah."
    );
    document.getElementById("wa-float").href = buildWaLink(
      COMPANY.whatsapp,
      "Halo RenovKita, saya ingin tanya-tanya soal renovasi rumah."
    );
  } catch (e) {
    console.error("Gagal memuat data perusahaan", e);
  }
}

document.addEventListener("DOMContentLoaded", mountLayout);
