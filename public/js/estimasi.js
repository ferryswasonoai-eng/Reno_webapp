const preselectedService = new URLSearchParams(window.location.search).get("service");
let servicesCache = [];
let lastEstimate = null;

async function loadServiceOptions() {
  const res = await fetch("/api/services");
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

  const res = await fetch("/api/estimate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ areaM2, quality }),
  });
  const data = await res.json();
  lastEstimate = data;

  document.getElementById("res-material").textContent = formatRupiah(data.material);
  document.getElementById("res-jasa").textContent = formatRupiah(data.jasa);
  document.getElementById("res-total").textContent = formatRupiah(data.total);
  document.getElementById("estimate-result").style.display = "block";

  // Susun pesan WhatsApp otomatis berisi semua data form + hasil estimasi
  const name = document.getElementById("f-name").value;
  const phone = document.getElementById("f-phone").value;
  const serviceId = document.getElementById("f-service").value;
  const location = document.getElementById("f-location").value || "-";
  const notes = document.getElementById("f-notes").value || "-";

  const message =
    `Halo RenovKita, saya ingin ajukan estimasi renovasi:\n\n` +
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

  const companyRes = await fetch("/api/company");
  const company = await companyRes.json();
  document.getElementById("wa-submit").href = buildWaLink(company.whatsapp, message);

  document.getElementById("estimate-result").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.addEventListener("DOMContentLoaded", loadServiceOptions);
