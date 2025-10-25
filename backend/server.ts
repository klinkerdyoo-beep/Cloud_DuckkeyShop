import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// db from .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// dir setup
const uploadDirs = ["uploads", "uploads/products", "uploads/slips"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, pi."imgURL"
      FROM main_productdetail p
      LEFT JOIN LATERAL (
        SELECT "imgURL"
        FROM main_productimage
        WHERE product_id = p."productID"
        LIMIT 1
      ) pi ON true
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});


// Upload product
// app.post("/api/upload/product", uploadProduct.single("image"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded" });
//   }
//   const imageUrl = `/uploads/products/${req.file.filename}`;
//   res.json({ message: "Product image uploaded", imageUrl });
// });
// app.post("/api/upload/slip", uploadSlip.single("slip"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No slip uploaded" });
//   }
//   const slipUrl = `/uploads/slips/${req.file.filename}`;
//   res.json({ message: "Slip uploaded", slipUrl });
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
  console.log(`Backend running on http://localhost:${PORT}/api/products`)
);

