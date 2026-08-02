async function loadHero() {
  const res = await fetch("/api/promos");
  const promos = await res.json();
  document.getElementById("hero-slides").innerHTML = promos
    .map(
      (p) => `
    <div class="hero-slide" style="background:${p.bg}">
      <h3>${p.title}</h3>
      <p>${p.subtitle}</p>
      <span class="cta">${p.cta} &rarr;</span>
    </div>`
    )
    .join("");
}

async function loadCategories() {
  const res = await fetch("/api/categories");
  const categories = await res.json();
  document.getElementById("category-grid").innerHTML = categories
    .map(
      (c) => `
    <a class="cat-card" href="/cari.html?category=${c.id}">
      <div class="emoji">${c.icon}</div>
      <div class="name">${c.name}</div>
      <div class="desc">${c.desc}</div>
    </a>`
    )
    .join("");
}

function vendorCardHtml(v) {
  return `
  <a class="vendor-card" href="/vendor.html?id=${v.id}">
    <div class="vendor-thumb">🏗️</div>
    <div class="vendor-body">
      <div class="vendor-name">
        ${v.name}
        ${v.verified ? '<span class="verified-badge">✓ Terverifikasi</span>' : ""}
      </div>
      <div class="vendor-tags">${v.tags.join(" · ")}</div>
      <div class="vendor-meta">
        <span class="stars">★ ${v.rating}</span>
        <span>${v.reviews} ulasan</span>
        <span>${v.distanceKm} km</span>
      </div>
      <div class="vendor-price">Mulai dari <b>${formatRupiah(v.priceFrom)}</b></div>
    </div>
  </a>`;
}

async function loadFeaturedVendors() {
  const res = await fetch("/api/vendors?sort=rating");
  const vendors = await res.json();
  document.getElementById("vendor-grid").innerHTML = vendors
    .slice(0, 6)
    .map(vendorCardHtml)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadHero();
  loadCategories();
  loadFeaturedVendors();
});
