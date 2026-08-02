// Shared header/footer — dirender via JS supaya semua halaman konsisten
// tanpa perlu templating engine di sisi server.

function renderHeader(activePage) {
  return `
  <div class="topbar">
    <div class="container">
      <span>Untuk pemilik rumah & properti di Indonesia</span>
      <span><a href="/vendor-daftar.html">Daftar sebagai Vendor</a> &nbsp;|&nbsp; <a href="/bantuan.html">Bantuan</a></span>
    </div>
  </div>

  <header class="header">
    <div class="container">
      <a href="/" class="logo">
        <span class="mark">🛠️</span>
        RenovKita
      </a>
      <form class="search-wrap" onsubmit="event.preventDefault(); window.location.href='/cari.html?q=' + encodeURIComponent(this.q.value)">
        <input name="q" type="text" placeholder="Cari tukang, kontraktor, atau jasa renovasi..." />
        <button type="submit">Cari</button>
      </form>
      <div class="header-actions">
        <a class="item" href="/akun.html">
          <span class="ico">👤</span>
          Akun
        </a>
        <a class="item" href="/proyek.html">
          <span class="ico">📋</span>
          Proyek Saya
        </a>
      </div>
    </div>
  </header>

  <div class="locationbar">
    <div class="container">
      📍 Area layanan: <b>Tangerang, Banten</b> <span class="change">Ubah</span>
    </div>
  </div>

  <nav class="navstrip">
    <div class="container" id="navstrip-links"></div>
  </nav>
  `;
}

function renderFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div>
        <h5>RenovKita</h5>
        <a href="/tentang.html">Tentang Kami</a>
        <a href="/karir.html">Karir</a>
        <a href="/blog.html">Blog Renovasi</a>
      </div>
      <div>
        <h5>Untuk Pemilik Rumah</h5>
        <a href="/cari.html">Cari Vendor</a>
        <a href="/proyek.html">Lacak Proyek</a>
        <a href="/bantuan.html">Pusat Bantuan</a>
      </div>
      <div>
        <h5>Untuk Vendor</h5>
        <a href="/vendor-daftar.html">Gabung Jadi Vendor</a>
        <a href="/vendor-panduan.html">Panduan Vendor</a>
        <a href="/vendor-biaya.html">Struktur Komisi</a>
      </div>
      <div>
        <h5>Kebijakan</h5>
        <a href="/syarat.html">Syarat & Ketentuan</a>
        <a href="/privasi.html">Kebijakan Privasi</a>
        <a href="/escrow.html">Sistem Pembayaran Escrow</a>
      </div>
    </div>
    <div class="footer-bottom">
      © 2026 RenovKita. Contoh web app (MVP demo) — data bersifat simulasi.
    </div>
  </footer>
  `;
}

async function mountLayout() {
  document.getElementById("app-header").innerHTML = renderHeader();
  document.getElementById("app-footer").innerHTML = renderFooter();

  try {
    const res = await fetch("/api/categories");
    const categories = await res.json();
    const nav = document.getElementById("navstrip-links");
    nav.innerHTML = categories
      .slice(0, 6)
      .map((c) => `<a href="/cari.html?category=${c.id}">${c.icon} ${c.name}</a>`)
      .join("");
  } catch (e) {
    console.error("Gagal memuat kategori", e);
  }
}

function formatRupiah(n) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

document.addEventListener("DOMContentLoaded", mountLayout);
