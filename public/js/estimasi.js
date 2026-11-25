const RATE_TABLE = {
  dapur: { standar: { material: 1800000, jasa: 700000 }, premium: { material: 3200000, jasa: 1200000 } },
  "kamar-mandi": { standar: { material: 1500000, jasa: 600000 }, premium: { material: 2800000, jasa: 1000000 } },
  atap: { standar: { material: 900000, jasa: 400000 }, premium: { material: 1600000, jasa: 700000 } },
  cat: { standar: { material: 45000, jasa: 35000 }, premium: { material: 90000, jasa: 60000 } },
  lantai: { standar: { material: 250000, jasa: 100000 }, premium: { material: 550000, jasa: 200000 } },
  taman: { standar: { material: 400000, jasa: 200000 }, premium: { material: 900000, jasa: 400000 } },
  listrik: { standar: { material: 150000, jasa: 100000 }, premium: { material: 300000, jasa: 180000 } },
  total: { standar: { material: 2200000, jasa: 1000000 }, premium: { material: 4000000, jasa: 1800000 } },
};
const DEFAULT_RATE = { standar: { material: 1200000, jasa: 500000 }, premium: { material: 2200000, jasa: 1000000 } };

function calcEstimate(areaM2, quality, service) {
  const q = quality === "premium" ? "premium" : "standar";
  const rates = (RATE_TABLE[service] || DEFAULT_RATE)[q];
  const material = Math.round(areaM2 * rates.material);
  const jasa = Math.round(areaM2 * rates.jasa);
  return { material, jasa, total: material + jasa };
}

const preselectedService = new URLSearchParams(window.location.search).get("service");
let servicesCache = [];
let lastEstimate = null;

async function loadServiceOptions() {
  const res = await fetch("/api/services.json");
  servicesCache = await res.json();
  const select = document.getElementById("f-service");
  select.innerHTML = servicesCache
    .map((s) => `<option value="${s.id}" ${s.id === preselectedService ? "selected" : ""}>${s.name}</option>`)
    .join("");
}

function getServiceName(id) {
  const s = servicesCache.find((sv) => sv.id === id);
  return s ? s.name : id;
}

document.getElementById("estimate-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const areaM2 = Number(document.getElementById("f-area").value) || 10;
  const quality = document.getElementById("f-quality").value;
  const serviceId = document.getElementById("f-service").value;

  const data = calcEstimate(areaM2, quality, serviceId);
  lastEstimate = data;

  document.getElementById("res-material").textContent = formatRupiah(data.material);
  document.getElementById("res-jasa").textContent = formatRupiah(data.jasa);
  document.getElementById("res-total").textContent = formatRupiah(data.total);
  document.getElementById("estimate-result").style.display = "block";

  // Susun pesan WhatsApp otomatis berisi semua data form + hasil estimasi
  const name = document.getElementById("f-name").value;
  const phone = document.getElementById("f-phone").value;
  const location = document.getElementById("f-location").value || "-";
  const notes = document.getElementById("f-notes").value || "-";

  const message =
    `Halo RenovBSD, saya ingin ajukan estimasi renovasi:\n\n` +
    `Nama: ${name}\n` +
    `No. HP: ${phone}\n` +
    `Jenis Layanan: ${getServiceName(serviceId)}\n` +
    `Luas Area: ${areaM2} m²\n` +
    `Kualitas Material: ${quality}\n` +
    `Lokasi: ${location}\n` +
    `Catatan: ${notes}\n\n` +
    `Estimasi awal dari web: ${formatRupiah(data.total)}\n` +
    `(Material: ${formatRupiah(data.material)}, Jasa: ${formatRupiah(data.jasa)})\n\n` +
    `Mohon info lebih lanjut, terima kasih.`;

  const companyRes = await fetch("/api/company.json");
  const company = await companyRes.json();
  document.getElementById("wa-submit").href = buildWaLink(company.whatsapp, message);

  document.getElementById("estimate-result").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.addEventListener("DOMContentLoaded", loadServiceOptions);
