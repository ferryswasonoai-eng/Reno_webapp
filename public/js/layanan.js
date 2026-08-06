function serviceCardHtml(s, index) {
  return `
  <a class="service-card" id="${s.id}" href="/estimasi.html?service=${s.id}">
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

async function loadAllServices() {
  const res = await fetch("/api/services");
  const services = await res.json();
  document.getElementById("service-grid-full").innerHTML = services.map(serviceCardHtml).join("");
}

document.addEventListener("DOMContentLoaded", loadAllServices);
