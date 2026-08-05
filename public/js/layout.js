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
