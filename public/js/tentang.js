async function loadAbout() {
  const res = await fetch("/api/company");
  const c = await res.json();

  document.getElementById("about-text").innerHTML = `
    <b>${c.name}</b> berdiri sejak tahun ${c.foundedYear}, telah menyelesaikan lebih dari
    ${c.projectsCompleted} proyek renovasi rumah dan properti di area ${c.address} dan sekitarnya.<br /><br />
    Kami fokus pada renovasi rumah tinggal skala kecil hingga menengah — mulai dari perbaikan
    ringan seperti atap bocor, sampai renovasi total. Setiap proyek dikerjakan tim tetap yang
    sudah berpengalaman, dengan sistem pembayaran bertahap sesuai progress supaya Anda merasa aman.
  `;

  document.getElementById("area-tags").innerHTML = c.serviceAreas
    .map((a) => `<span>📍 ${a}</span>`)
    .join("");
}

document.addEventListener("DOMContentLoaded", loadAbout);
