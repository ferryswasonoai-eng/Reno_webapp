async function loadHeroStats() {
  const res = await fetch("/api/company");
  const c = await res.json();
  document.getElementById("hero-stats").innerHTML = `
    <div class="hero-stat"><div class="num">${c.yearsExperience}+</div><div class="label">Tahun Pengalaman</div></div>
    <div class="hero-stat"><div class="num">${c.projectsCompleted}+</div><div class="label">Proyek Selesai</div></div>
    <div class="hero-stat"><div class="num">${c.serviceAreas.length}</div><div class="label">Area Layanan</div></div>
  `;
}

async function loadPromos() {
  const res = await fetch("/api/promos");
  const promos = await res.json();
  document.getElementById("promo-strip").innerHTML = promos
    .map(
      (p) => `
    <div class="promo-card" style="background:${p.bg}">
      <h4>${p.title}</h4>
      <p>${p.subtitle}</p>
      <span class="cta">${p.cta} &rarr;</span>
    </div>`
    )
    .join("");
}

function serviceCardHtml(s, index) {
  return `
  <a class="service-card" href="/estimasi.html?service=${s.id}">
    <div class="service-media">
      <span class="service-chip">${s.badge}</span>
      <img src="images/services/${s.image}" alt="${s.name}" />
    </div>
    <div class="service-body">
      <div class="service-num">0${index + 1}</div>
      <div class="name">${s.name}</div>
      <div class="desc">${s.desc}</div>
      <div class="price">Mulai dari <b>${formatRupiah(s.priceFrom)}</b></div>
    </div>
  </a>`;
}

async function loadServices() {
  const res = await fetch("/api/services");
  const services = await res.json();
  document.getElementById("service-grid").innerHTML = services.slice(0, 3).map(serviceCardHtml).join("");
}

function portfolioCardHtml(p) {
  return `
  <div class="portfolio-card">
    <div class="portfolio-thumb"><img src="images/services/${p.image}" alt="${p.title}" /></div>
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
  const res = await fetch("/api/portfolio");
  const portfolio = await res.json();
  document.getElementById("portfolio-grid").innerHTML = portfolio.slice(0, 3).map(portfolioCardHtml).join("");
}

function testiCardHtml(t) {
  return `
  <div class="testi-card">
    <div class="stars">★★★★★</div>
    <div class="text">"${t.text}"</div>
    <div class="name">${t.name}</div>
    <div class="loc">${t.location}</div>
  </div>`;
}

async function loadTestimonials() {
  const res = await fetch("/api/testimonials");
  const testimonials = await res.json();
  document.getElementById("testi-grid").innerHTML = testimonials.map(testiCardHtml).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeroStats();
  loadPromos();
  loadServices();
  loadPortfolio();
  loadTestimonials();
});
