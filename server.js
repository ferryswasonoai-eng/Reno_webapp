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

app.get("/api/company", (req, res) => {
  res.json(loadDb().company);
});

app.get("/api/promos", (req, res) => {
  res.json(loadDb().promos);
});

app.get("/api/services", (req, res) => {
  res.json(loadDb().services);
});

app.get("/api/services/:id", (req, res) => {
  const db = loadDb();
  const service = db.services.find((s) => s.id === req.params.id);
  if (!service) return res.status(404).json({ error: "Layanan tidak ditemukan" });
  res.json(service);
});

app.get("/api/portfolio", (req, res) => {
  const db = loadDb();
  const { category } = req.query;
  let results = db.portfolio;
  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  res.json(results);
});

app.get("/api/testimonials", (req, res) => {
  res.json(loadDb().testimonials);
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

// Fallback: serve index.html for any non-API GET route
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`RenovBSD (company site) running on port ${PORT}`);
});
