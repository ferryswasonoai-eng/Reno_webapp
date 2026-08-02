const statusIcon = {
  done: { bg: "#1F8A4C", icon: "✓" },
  active: { bg: "#E8600C", icon: "●" },
  pending: { bg: "#D9DCD7", icon: "○" },
};

function projectCardHtml(p) {
  const timelineHtml = p.steps
    .map((s, i) => {
      const style = statusIcon[s.status];
      const isLast = i === p.steps.length - 1;
      return `
      <div class="timeline-item">
        <div style="display:flex; flex-direction:column; align-items:center;">
          <div class="timeline-dot" style="background:${style.bg}; color:#fff;">${style.icon}</div>
          ${!isLast ? '<div class="timeline-line"></div>' : ""}
        </div>
        <div class="timeline-content">
          <div class="title" style="color:${s.status === "pending" ? "var(--muted)" : "var(--ink)"};">${s.label}</div>
          <div class="date">${s.date}</div>
        </div>
      </div>`;
    })
    .join("");

  return `
  <div class="project-card" style="margin-bottom:20px;">
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <h3 style="margin:0 0 4px;">${p.title}</h3>
        <div style="font-size:13px;color:var(--muted);">${p.address}</div>
        <div style="font-size:13px;color:var(--muted);">Vendor: <b style="color:var(--ink);">${p.vendorName}</b></div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:20px;font-weight:800;color:var(--accent);">${p.progress}%</div>
        <div style="font-size:11px;color:var(--muted);">${formatRupiah(p.total)}</div>
      </div>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width:${p.progress}%;"></div>
    </div>
    <div class="timeline">
      ${timelineHtml}
    </div>
    <a class="btn btn-outline btn-block" href="/vendor.html?id=${p.vendorId}">💬 Chat dengan Vendor</a>
  </div>`;
}

async function loadProjects() {
  const res = await fetch("/api/projects");
  const projects = await res.json();
  const container = document.getElementById("project-list");

  if (!projects.length) {
    container.innerHTML = `<p style="color:var(--muted);">Anda belum memiliki proyek berjalan. <a href="/cari.html" style="color:var(--brand);font-weight:700;">Cari vendor sekarang &rarr;</a></p>`;
    return;
  }

  container.innerHTML = projects.map(projectCardHtml).join("");
}

document.addEventListener("DOMContentLoaded", loadProjects);
