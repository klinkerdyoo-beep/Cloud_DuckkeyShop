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
const uploadDirs = ["uploads", "uploads/products", "uploads/slips", "uploads/custom_products/", "uploads/user_profiles/"];
uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const query_products = `
      SELECT 
        p.*,
        pi."imgURL",
        c."categoryName" AS "categoryName",
        COALESCE(array_agg(sc."subName") FILTER (WHERE sc."subName" IS NOT NULL), '{}') AS "subcategories"
      FROM main_productdetail p
      LEFT JOIN main_productcategory c ON p."category_id" = c.id
      LEFT JOIN main_productdetail_subcategories pd_sc ON pd_sc."productdetail_id" = p."productID"
      LEFT JOIN main_subcategory sc ON pd_sc."subcategory_id" = sc.id
      LEFT JOIN LATERAL (
        SELECT "imgURL"
        FROM main_productimage
        WHERE product_id = p."productID"
        LIMIT 1
      ) pi ON true
      GROUP BY p."productID", pi."imgURL", c."categoryName"
    `

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(query_products);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Products: Failed to fetch" });
  }
});

app.get("/api/products_random", async (req, res) => {
  try {
    const result = await pool.query(
      query_products + `
      ORDER BY RANDOM()
      LIMIT 10
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Products_rd: Failed to fetch" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT p.*, c."categoryName", s."subName", pi."imgURL"
      FROM main_productdetail p
      LEFT JOIN main_productcategory c ON p."category_id" = c.id
      LEFT JOIN main_productdetail_subcategories ps ON p."productID" = ps."productdetail_id"
      LEFT JOIN main_subcategory s ON ps."subcategory_id" = s.id
      LEFT JOIN LATERAL (
        SELECT "imgURL"
        FROM main_productimage
        WHERE product_id = p."productID"
        LIMIT 1
      ) pi ON true
      WHERE p."productID" = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Products/:id: Failed to fetch" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM main_productcategory
      `);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: " Categories: Failed to fetch" });
  }
});

// cart
app.post("/api/cart/add", async (req, res) => {
  try {
    const { email, productID, quantities = 1, customValue = "" } = req.body;
    const existing = await pool.query(
      `SELECT * FROM main_customercart WHERE email_id=$1 AND product_id=$2 AND "customValue"=$3`,
      [email, productID, customValue]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE main_customercart 
         SET quantities = quantities + $1 
         WHERE email_id=$2 AND product_id=$3 AND "customValue"=$4`,
        [quantities, email, productID, customValue]
      );
    } else {
      await pool.query(
        `INSERT INTO main_customercart (email_id, product_id, quantities, "customValue")
         VALUES ($1, $2, $3, $4)`,
        [email, productID, quantities, customValue]
      );
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// cart items for user
app.get("/api/cart/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query(
      `SELECT cc.*, p."productName", p.price, pi."imgURL"
       FROM main_customercart cc
       LEFT JOIN main_productdetail p ON cc.product_id = p."productID"
       LEFT JOIN LATERAL (
         SELECT "imgURL"
         FROM main_productimage
         WHERE product_id = p."productID"
         LIMIT 1
       ) pi ON true
       WHERE cc.email_id = $1`,
      [email]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Update cart
app.post("/api/cart/update", async (req, res) => {
  try {
    const { email, productID, customValue = "", quantities } = req.body;

    await pool.query(
      `UPDATE main_customercart
       SET quantities = $1
       WHERE email_id=$2 AND product_id=$3 AND "customValue"=$4`,
      [quantities, email, productID, customValue]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// Remove from cart
app.post("/api/cart/remove", async (req, res) => {
  try {
    const { email, productID, customValue = "" } = req.body;

    await pool.query(
      `DELETE FROM main_customercart
       WHERE email_id=$1 AND product_id=$2 AND "customValue"=$3`,
      [email, productID, customValue]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove from cart" });
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

