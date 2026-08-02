const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function loadDb() {
  const raw = fs.readFileSync(path.join(__dirname, "data", "db.json"), "utf-8");
  return JSON.parse(raw);
}

// ---- API routes ----

app.get("/api/categories", (req, res) => {
  const db = loadDb();
  res.json(db.categories);
});

app.get("/api/promos", (req, res) => {
  const db = loadDb();
  res.json(db.promos);
});

app.get("/api/vendors", (req, res) => {
  const db = loadDb();
  const { category, q, sort } = req.query;
  let results = db.vendors;

  if (category) {
    results = results.filter((v) => v.category === category);
  }
  if (q) {
    const term = q.toLowerCase();
    results = results.filter(
      (v) =>
        v.name.toLowerCase().includes(term) ||
        v.tags.some((t) => t.toLowerCase().includes(term)) ||
        v.services.some((s) => s.toLowerCase().includes(term))
    );
  }
  if (sort === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating);
  } else if (sort === "distance") {
    results = [...results].sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sort === "price") {
    results = [...results].sort((a, b) => a.priceFrom - b.priceFrom);
  }

  res.json(results);
});

app.get("/api/vendors/:id", (req, res) => {
  const db = loadDb();
  const vendor = db.vendors.find((v) => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: "Vendor tidak ditemukan" });
  res.json(vendor);
});

app.get("/api/projects", (req, res) => {
  const db = loadDb();
  res.json(db.projects);
});

app.get("/api/projects/:id", (req, res) => {
  const db = loadDb();
  const project = db.projects.find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Proyek tidak ditemukan" });
  res.json(project);
});

// Simple estimate calculator (mock formula, easy to replace with real pricing logic)
app.post("/api/estimate", (req, res) => {
  const { areaM2 = 10, quality = "menengah" } = req.body;
  const materialRatePerM2 = { standar: 1200000, menengah: 1550000, premium: 2200000 };
  const laborRatePerM2 = { standar: 500000, menengah: 750000, premium: 1000000 };

  const rate = materialRatePerM2[quality] || materialRatePerM2.menengah;
  const labor = laborRatePerM2[quality] || laborRatePerM2.menengah;

  const material = Math.round(areaM2 * rate);
  const jasa = Math.round(areaM2 * labor);

  res.json({
    material,
    jasa,
    total: material + jasa,
  });
});

// Fallback: serve index.html for any non-API GET route (simple SPA-friendly fallback)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`RenovKita server running on port ${PORT}`);
});
