const vendorId = new URLSearchParams(window.location.search).get("id");

// Ulasan mock — di produksi ini akan datang dari API /api/vendors/:id/reviews
const mockReviews = [
  { name: "Dewi A.", text: "Rapi, tepat waktu, sesuai estimasi dari awal." },
  { name: "Budi H.", text: "Komunikasi jelas lewat fitur progress tracker, jadi tidak was-was." },
  { name: "Rina S.", text: "Hasil kabinet dapurnya rapi, harga sesuai kesepakatan." },
];

async function loadVendorDetail() {
  const container = document.getElementById("vendor-content");

  if (!vendorId) {
    container.innerHTML = `<p>Vendor tidak ditemukan.</p>`;
    return;
  }

  const res = await fetch(`/api/vendors/${vendorId}`);
  if (!res.ok) {
    container.innerHTML = `<p>Vendor tidak ditemukan.</p>`;
    return;
  }
  const v = await res.json();

  container.innerHTML = `
    <div class="vendor-detail-head">
      <div class="vendor-detail-thumb">🏗️</div>
      <div style="flex:1;">
        <div class="vendor-name" style="font-size:20px;">
          ${v.name}
          ${v.verified ? '<span class="verified-badge">✓ Terverifikasi</span>' : ""}
        </div>
        <div class="vendor-tags">${v.tags.join(" · ")} &middot; sejak ${v.since}</div>
        <div class="vendor-meta" style="margin-top:8px;">
          <span class="stars">★ ${v.rating}</span>
          <span>(${v.reviews} ulasan)</span>
          <span>${v.jobs} proyek selesai</span>
          <span>📍 ${v.location}</span>
        </div>
        <p style="font-size:13px;color:var(--muted);margin-top:10px;max-width:600px;">${v.bio}</p>
        <div style="display:flex; gap:10px; margin-top:14px;">
          <a class="btn" href="/estimasi.html?vendorId=${v.id}">Ajukan Estimasi</a>
          <a class="btn btn-outline" href="/proyek.html">💬 Chat Vendor</a>
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-head"><h2>Portofolio (${v.portfolio} proyek)</h2></div>
      <div class="portfolio-grid">
        ${Array.from({ length: 8 })
          .map(() => `<div class="portfolio-item">📷</div>`)
          .join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Cakupan Jasa</h2></div>
      <div>
        ${v.services.map((s) => `<span class="pill">${s}</span>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2>Ulasan Terbaru</h2></div>
      <div style="max-width:600px;">
        ${mockReviews
          .map(
            (r) => `
          <div class="review-item">
            <div class="name">${r.name}</div>
            <div class="text">${r.text}</div>
          </div>`
          )
          .join("")}
      </div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", loadVendorDetail);
