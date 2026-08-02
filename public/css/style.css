:root {
  --brand: #145A32;       /* dark forest green — header, trust color */
  --brand-dark: #0E4025;
  --accent: #E8600C;      /* construction-orange for CTAs */
  --accent-dark: #C24F09;
  --ink: #1E2323;
  --muted: #6B7370;
  --line: #E3E6E1;
  --bg: #F7F8F5;
  --card: #FFFFFF;
  --success: #1F8A4C;
  --radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button { font-family: inherit; cursor: pointer; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ---------- Top utility bar ---------- */
.topbar {
  background: var(--brand-dark);
  color: #cfe3d6;
  font-size: 12px;
}
.topbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
}
.topbar a { color: #cfe3d6; }
.topbar a:hover { color: #fff; }

/* ---------- Main header ---------- */
.header {
  background: var(--brand);
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.header .container {
  display: flex;
  align-items: center;
  gap: 20px;
  height: 68px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.logo .mark {
  width: 32px; height: 32px;
  background: var(--accent);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}
.search-wrap {
  flex: 1;
  display: flex;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.search-wrap input {
  flex: 1;
  border: none;
  padding: 11px 14px;
  font-size: 14px;
  outline: none;
}
.search-wrap button {
  background: var(--accent);
  border: none;
  color: #fff;
  padding: 0 18px;
  font-weight: 700;
  font-size: 13px;
}
.search-wrap button:hover { background: var(--accent-dark); }

.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
}
.header-actions .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 56px;
}
.header-actions .item .ico { font-size: 18px; }
.badge {
  background: var(--accent);
  color: #fff;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  padding: 0 5px;
  position: relative;
  top: -14px;
  right: -14px;
}

/* location bar */
.locationbar {
  background: #0f4a29;
  color: #fff;
  font-size: 13px;
}
.locationbar .container {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
}
.locationbar .change { color: #a9e8c0; font-weight: 700; margin-left: 4px; }

/* category nav strip */
.navstrip {
  background: #fff;
  border-bottom: 1px solid var(--line);
}
.navstrip .container {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  height: 44px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
}
.navstrip a:hover { color: var(--brand); }

/* ---------- Hero carousel ---------- */
.hero {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 18px 0;
  scroll-snap-type: x mandatory;
}
.hero-slide {
  min-width: 340px;
  scroll-snap-align: start;
  border-radius: var(--radius);
  padding: 26px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-end;
  min-height: 160px;
}
.hero-slide h3 { margin: 0; font-size: 20px; font-weight: 800; }
.hero-slide p { margin: 0; font-size: 13px; opacity: 0.9; max-width: 80%; }
.hero-slide .cta {
  align-self: flex-start;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.5);
  color: #fff;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  margin-top: 6px;
}

/* ---------- Section headers ---------- */
.section { padding: 28px 0; }
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
}
.section-head h2 {
  font-size: 20px;
  margin: 0;
  font-weight: 800;
}
.section-head .link { font-size: 13px; font-weight: 700; color: var(--brand); }

/* ---------- Category grid ---------- */
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.cat-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px 14px;
  text-align: center;
  transition: transform 0.15s, box-shadow 0.15s;
}
.cat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  border-color: var(--brand);
}
.cat-card .emoji { font-size: 28px; margin-bottom: 8px; }
.cat-card .name { font-weight: 700; font-size: 14px; }
.cat-card .desc { font-size: 11px; color: var(--muted); margin-top: 3px; }

/* ---------- Vendor cards ---------- */
.vendor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.vendor-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  transition: box-shadow 0.15s;
}
.vendor-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
.vendor-thumb {
  height: 120px;
  background: linear-gradient(135deg, #dce7de, #eef2ec);
  display: flex; align-items: center; justify-content: center;
  font-size: 34px;
}
.vendor-body { padding: 14px; }
.vendor-name {
  display: flex; align-items: center; gap: 6px;
  font-weight: 800; font-size: 15px;
}
.verified-badge {
  font-size: 10px;
  background: #E6F4EA;
  color: var(--success);
  padding: 1px 6px;
  border-radius: 999px;
  font-weight: 700;
}
.vendor-tags { font-size: 11px; color: var(--muted); margin-top: 3px; }
.vendor-meta {
  display: flex; align-items: center; gap: 10px;
  font-size: 12px; margin-top: 8px; color: var(--ink);
}
.vendor-meta .stars { color: #E8A20C; font-weight: 700; }
.vendor-price {
  margin-top: 10px;
  font-size: 12px;
  color: var(--muted);
}
.vendor-price b { color: var(--ink); font-size: 14px; }
.btn {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 9px 16px;
  border-radius: 7px;
  font-weight: 700;
  font-size: 13px;
}
.btn:hover { background: var(--accent-dark); }
.btn-outline {
  background: transparent;
  border: 1.5px solid var(--brand);
  color: var(--brand);
}
.btn-outline:hover { background: var(--brand); color: #fff; }
.btn-block { display: block; width: 100%; text-align: center; }

/* ---------- How it works ---------- */
.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.step-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
}
.step-num {
  width: 30px; height: 30px;
  background: var(--brand);
  color: #fff;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 13px;
  margin-bottom: 10px;
}
.step-card h4 { margin: 0 0 6px; font-size: 15px; }
.step-card p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.5; }

/* ---------- Filters / search page ---------- */
.search-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}
.filter-box {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 16px;
  align-self: start;
}
.filter-box h4 { font-size: 13px; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); }
.filter-option {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; padding: 5px 0; cursor: pointer;
}
.filter-option input { accent-color: var(--brand); }

/* ---------- Vendor detail ---------- */
.vendor-detail-head {
  display: flex; gap: 20px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
}
.vendor-detail-thumb {
  width: 96px; height: 96px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #dce7de, #eef2ec);
  display: flex; align-items: center; justify-content: center;
  font-size: 40px;
  flex-shrink: 0;
}
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.portfolio-item {
  aspect-ratio: 1;
  border-radius: 8px;
  background: linear-gradient(135deg, #e4e9e3, #f2f4f0);
  display: flex; align-items: center; justify-content: center;
  color: var(--muted);
  font-size: 22px;
}
.pill {
  display: inline-block;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 12px;
  margin: 0 6px 6px 0;
}
.review-item {
  border-left: 3px solid var(--accent);
  padding-left: 12px;
  margin-bottom: 12px;
}
.review-item .name { font-weight: 700; font-size: 13px; }
.review-item .text { font-size: 13px; color: var(--muted); }

/* ---------- Estimate form ---------- */
.form-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 22px;
  max-width: 560px;
}
.form-row { margin-bottom: 16px; }
.form-row label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.form-row select, .form-row input[type="number"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}
.form-row select:focus, .form-row input:focus { border-color: var(--brand); }
.upload-box {
  border: 2px dashed var(--line);
  border-radius: 8px;
  padding: 26px;
  text-align: center;
  color: var(--muted);
  font-size: 13px;
}
.estimate-result {
  background: #F2F7F3;
  border: 1px solid #CFE3D3;
  border-radius: var(--radius);
  padding: 18px;
  margin-top: 18px;
}
.estimate-row { display: flex; justify-content: space-between; font-size: 13px; color: var(--muted); padding: 3px 0; }
.estimate-total {
  display: flex; justify-content: space-between;
  font-size: 18px; font-weight: 800; color: var(--ink);
  border-top: 1px solid #CFE3D3;
  margin-top: 8px; padding-top: 8px;
}

/* ---------- Progress tracker ---------- */
.project-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 20px;
}
.progress-bar-track {
  background: var(--line);
  border-radius: 999px;
  height: 8px;
  margin-top: 8px;
}
.progress-bar-fill {
  background: var(--accent);
  height: 8px;
  border-radius: 999px;
}
.timeline { margin-top: 20px; }
.timeline-item {
  display: flex;
  gap: 14px;
}
.timeline-dot {
  width: 22px; height: 22px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}
.timeline-line {
  width: 2px;
  flex: 1;
  background: var(--line);
  margin: 4px 0;
}
.timeline-content { padding-bottom: 22px; }
.timeline-content .title { font-weight: 700; font-size: 14px; }
.timeline-content .date { font-size: 12px; color: var(--muted); }

/* ---------- Footer ---------- */
.footer {
  background: var(--brand-dark);
  color: #cfe3d6;
  margin-top: 40px;
}
.footer .container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 36px 20px;
}
.footer h5 { color: #fff; font-size: 13px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.04em; }
.footer a { display: block; font-size: 13px; color: #cfe3d6; margin-bottom: 8px; }
.footer a:hover { color: #fff; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.12);
  text-align: center;
  font-size: 12px;
  padding: 16px;
  color: #9fc2ac;
}

/* ---------- Breadcrumb / back ---------- */
.back-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700; color: var(--brand);
  margin: 18px 0 4px;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .vendor-grid { grid-template-columns: 1fr; }
  .search-layout { grid-template-columns: 1fr; }
  .steps { grid-template-columns: 1fr; }
  .footer .container { grid-template-columns: repeat(2, 1fr); }
  .header .container { flex-wrap: wrap; height: auto; padding: 10px 20px; }
  .search-wrap { order: 3; width: 100%; }
}
