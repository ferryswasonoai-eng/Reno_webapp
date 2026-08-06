let activeCategory = "";

function portfolioCardHtml(p) {
  return `
  <div class="portfolio-card">
    <div class="portfolio-thumb"><img src="images/icons/icon-camera.svg" alt="Foto proyek" /></div>
    <div class="portfolio-body">
      <span class="portfolio-cat">${p.category}</span>
      <div class="portfolio-title">${p.title}</div>
      <div class="portfolio-meta">📍 ${p.location} &middot; ⏱️ ${p.duration}</div>
      <div class="portfolio-desc">${p.desc}</div>
      <div class="portfolio-budget">Estimasi biaya: <b>${p.budget}</b></div>
    </div>
  </div>`;
}

async function loadPortfolio() {
  const qs = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : "";
  const res = await fetch("/api/portfolio" + qs);
  const portfolio = await res.json();
  document.getElementById("portfolio-grid-full").innerHTML = portfolio.length
    ? portfolio.map(portfolioCardHtml).join("")
    : `<p style="color:var(--muted);">Belum ada portofolio untuk kategori ini.</p>`;
}

async function loadCategoryFilter() {
  const res = await fetch("/api/portfolio");
  const portfolio = await res.json();
  const categories = [...new Set(portfolio.map((p) => p.category))];

  const chip = (label, value) => `
    <span class="pill" data-cat="${value}" style="cursor:pointer; ${
      activeCategory === value ? "background:var(--brand); color:#fff; border-color:var(--brand);" : ""
    }">${label}</span>`;

  document.getElementById("category-filter").innerHTML =
    chip("Semua", "") + categories.map((c) => chip(c, c)).join("");

  document.querySelectorAll("[data-cat]").forEach((el) => {
    el.addEventListener("click", () => {
      activeCategory = el.getAttribute("data-cat");
      loadCategoryFilter();
      loadPortfolio();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategoryFilter();
  loadPortfolio();
});
