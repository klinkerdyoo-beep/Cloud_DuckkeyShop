import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productList");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => 
  console.log(`Backend running on http://localhost:${PORT}/api/products`)
);

