const params = new URLSearchParams(window.location.search);
let state = {
  q: params.get("q") || "",
  category: params.get("category") || "",
  sort: "rating",
  verifiedOnly: false,
};

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

async function loadFilterCategories() {
  const res = await fetch("/api/categories");
  const categories = await res.json();
  document.getElementById("filter-categories").innerHTML = categories
    .map(
      (c) => `
    <div class="filter-option">
      <input type="radio" name="cat" value="${c.id}" id="cat-${c.id}" ${state.category === c.id ? "checked" : ""} />
      <label for="cat-${c.id}">${c.icon} ${c.name}</label>
    </div>`
    )
    .join(
      `<div class="filter-option">
        <input type="radio" name="cat" value="" id="cat-all" ${!state.category ? "checked" : ""} />
        <label for="cat-all">Semua kategori</label>
      </div>`
    );

  document.querySelectorAll('input[name="cat"]').forEach((el) => {
    el.addEventListener("change", (e) => {
      state.category = e.target.value;
      loadResults();
    });
  });
}

async function loadResults() {
  const qs = new URLSearchParams();
  if (state.q) qs.set("q", state.q);
  if (state.category) qs.set("category", state.category);
  if (state.sort) qs.set("sort", state.sort);

  const res = await fetch("/api/vendors?" + qs.toString());
  let vendors = await res.json();

  if (state.verifiedOnly) {
    vendors = vendors.filter((v) => v.verified);
  }

  document.getElementById("result-count").textContent = `${vendors.length} vendor ditemukan`;
  document.getElementById("result-title").textContent = state.q
    ? `Hasil untuk "${state.q}"`
    : "Semua Vendor";

  document.getElementById("vendor-results").innerHTML = vendors.length
    ? vendors.map(vendorCardHtml).join("")
    : `<p style="color:var(--muted);">Tidak ada vendor yang cocok dengan filter ini.</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadFilterCategories();
  loadResults();

  document.querySelectorAll('input[name="sort"]').forEach((el) => {
    el.addEventListener("change", (e) => {
      state.sort = e.target.value;
      loadResults();
    });
  });

  document.getElementById("filter-verified").addEventListener("change", (e) => {
    state.verifiedOnly = e.target.checked;
    loadResults();
  });
});
