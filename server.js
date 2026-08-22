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
// Tarif per m² per kategori layanan (material & jasa terpisah), disesuaikan
// dengan kisaran harga pasaran jasa renovasi di Indonesia. Tiap kategori
// pekerjaan punya karakter biaya yang beda jauh — dapur & renovasi total
// jauh lebih mahal per m² dibanding cat atau listrik, jadi tidak realistis
// kalau disamaratakan.
const RATE_TABLE = {
  dapur: {
    standar: { material: 1800000, jasa: 700000 },
    premium: { material: 3200000, jasa: 1200000 },
  },
  "kamar-mandi": {
    standar: { material: 1500000, jasa: 600000 },
    premium: { material: 2800000, jasa: 1000000 },
  },
  atap: {
    standar: { material: 900000, jasa: 400000 },
    premium: { material: 1600000, jasa: 700000 },
  },
  cat: {
    standar: { material: 45000, jasa: 35000 },
    premium: { material: 90000, jasa: 60000 },
  },
  lantai: {
    standar: { material: 250000, jasa: 100000 },
    premium: { material: 550000, jasa: 200000 },
  },
  taman: {
    standar: { material: 400000, jasa: 200000 },
    premium: { material: 900000, jasa: 400000 },
  },
  listrik: {
    standar: { material: 150000, jasa: 100000 },
    premium: { material: 300000, jasa: 180000 },
  },
  total: {
    standar: { material: 2200000, jasa: 1000000 },
    premium: { material: 4000000, jasa: 1800000 },
  },
};
// Fallback kalau kategori tidak dikenali (mis. request lama tanpa field service)
const DEFAULT_RATE = {
  standar: { material: 1200000, jasa: 500000 },
  premium: { material: 2200000, jasa: 1000000 },
};

app.post("/api/estimate", (req, res) => {
  const { areaM2 = 10, quality = "standar", service } = req.body;
  const safeQuality = quality === "premium" ? "premium" : "standar";

  const rates = (RATE_TABLE[service] || DEFAULT_RATE)[safeQuality];

  const material = Math.round(areaM2 * rates.material);
  const jasa = Math.round(areaM2 * rates.jasa);

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
