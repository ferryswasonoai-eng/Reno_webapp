let activeCategory = "";

function portfolioCardHtml(p) {
  return `
  <div class="portfolio-card" data-portfolio-id="${p.id}">
    <div class="portfolio-thumb">
      ${buildThumbnailHtml(p.media, p.title)}
      ${buildMediaBadge(p.media)}
    </div>
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
  attachPortfolioLightbox("#portfolio-grid-full", portfolio);
  openFromUrlIfPresent(portfolio);
}

// Kalau URL mengandung ?project=ID (link yang dibagikan dari tombol "Salin Link"),
// otomatis scroll ke kartu itu dan buka popup galerinya.
function openFromUrlIfPresent(portfolio) {
  const projectId = new URLSearchParams(window.location.search).get("project");
  if (!projectId) return;
  const item = portfolio.find((p) => p.id === projectId);
  if (!item) return;

  const card = document.querySelector(`[data-portfolio-id="${projectId}"]`);
  if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => openPortfolioItemLightbox(item), 300);
}

async function loadCategoryFilter() {
  const res = await fetch("/api/portfolio");
  const portfolio = await res.json();
  const categories = [...new Set(portfolio.map((p) => p.category))];

  const chip = (label, value) => `
    <span class="pill ${activeCategory === value ? "pill-active" : ""}" data-cat="${value}">${label}</span>`;

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
