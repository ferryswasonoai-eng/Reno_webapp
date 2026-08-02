const vendorId = new URLSearchParams(window.location.search).get("vendorId");

async function loadVendorTarget() {
  if (!vendorId) return;
  const res = await fetch(`/api/vendors/${vendorId}`);
  if (!res.ok) return;
  const v = await res.json();
  document.getElementById("vendor-target").textContent = `Untuk vendor: ${v.name}`;
  document.getElementById("back-link").href = `/vendor.html?id=${v.id}`;
}

document.getElementById("estimate-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const areaM2 = Number(document.getElementById("area").value) || 10;
  const quality = document.getElementById("quality").value;

  const res = await fetch("/api/estimate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ areaM2, quality }),
  });
  const data = await res.json();

  document.getElementById("res-material").textContent = formatRupiah(data.material);
  document.getElementById("res-jasa").textContent = formatRupiah(data.jasa);
  document.getElementById("res-total").textContent = formatRupiah(data.total);
  document.getElementById("estimate-result").style.display = "block";
});

document.addEventListener("DOMContentLoaded", loadVendorTarget);
