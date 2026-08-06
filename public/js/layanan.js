function serviceCardHtml(s) {
  return `
  <a class="service-card" id="${s.id}" href="/estimasi.html?service=${s.id}">
    <img class="emoji" src="images/icons/${s.icon}" alt="${s.name}" />
    <div class="name">${s.name}</div>
    <div class="desc">${s.desc}</div>
    <div class="price">Mulai dari <b>${formatRupiah(s.priceFrom)}</b></div>
  </a>`;
}

async function loadAllServices() {
  const res = await fetch("/api/services");
  const services = await res.json();
  document.getElementById("service-grid-full").innerHTML = services.map(serviceCardHtml).join("");
}

document.addEventListener("DOMContentLoaded", loadAllServices);
