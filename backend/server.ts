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

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  })
);

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
      WHERE p."productID" NOT LIKE '%CUSTOM%'
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


// Add product
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/products"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const uploadProduct = multer({ storage: productStorage });

app.post("/api/products", uploadProduct.single("image"), async (req, res) => {
  try {
    const { productName, price, description, size, material, category_id, stock, is_available } = req.body;

    const newId = `PROD_${Date.now()}`;
    const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;

    // Insert product
    await pool.query(
      `INSERT INTO main_productdetail (
        "productID", "productName", price, description, size, material, category_id, stock, is_available, "addedDate", "updatedDate"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
      [newId, productName, price, description, size, material, category_id, stock, is_available]
    );

    // Insert image
    if (imagePath) {
      await pool.query(
        `INSERT INTO main_productimage (product_id, "imgURL") VALUES ($1, $2)`,
        [newId, imagePath]
      );
    }

    res.json({ success: true, message: "Product added successfully", productID: newId });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Update product
const updateProductStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/products"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const uploadUpdateProduct = multer({ storage: updateProductStorage });

app.put("/api/products/:id", uploadUpdateProduct.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, price, description, size, material, category_id, stock, is_available } = req.body;

    // Check if product exists
    const existing = await pool.query(`SELECT * FROM main_productdetail WHERE "productID" = $1`, [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update product
    await pool.query(
      `UPDATE main_productdetail
       SET "productName" = $1,
           price = $2,
           description = $3,
           size = $4,
           material = $5,
           category_id = $6,
           stock = $7,
           is_available = $8,
           "updatedDate" = NOW()
       WHERE "productID" = $9`,
      [productName, price, description, size, material, category_id, stock, is_available === "true" || is_available === true, id]
    );

    // Update image if uploaded
    if (req.file) {
      const imagePath = `/uploads/products/${req.file.filename}`;

      // Check if product already has an image
      const imgExist = await pool.query(
        `SELECT * FROM main_productimage WHERE product_id = $1 LIMIT 1`,
        [id]
      );

      if (imgExist.rows.length > 0) {
        // Update existing image
        await pool.query(
          `UPDATE main_productimage SET "imgURL" = $1 WHERE product_id = $2`,
          [imagePath, id]
        );
      } else {
        // Insert new image
        await pool.query(
          `INSERT INTO main_productimage (product_id, "imgURL") VALUES ($1, $2)`,
          [id, imagePath]
        );
      }
    }

    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Delete image
    const imgRes = await pool.query(`SELECT "imgURL" FROM main_productimage WHERE product_id=$1`, [id]);
    if (imgRes.rows.length > 0) {
      const imgPath = imgRes.rows[0].imgURL;
      if (imgPath && fs.existsSync(path.join(__dirname, imgPath))) {
        fs.unlinkSync(path.join(__dirname, imgPath));
      }
      await pool.query(`DELETE FROM main_productimage WHERE product_id=$1`, [id]);
    }

    // Delete product
    await pool.query(`DELETE FROM main_productdetail WHERE "productID"=$1`, [id]);

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});




// add cart
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

// cart list for user
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

    let query: string;
    let params: any[];

    if (customValue) {
      // custom product
      query = `
        UPDATE main_customercart
        SET quantities = $1
        WHERE email_id=$2 AND custom_product_id=$3 AND "customValue"=$4
      `;
      params = [quantities, email, productID, customValue];
    } else {
      // normal product
      query = `
        UPDATE main_customercart
        SET quantities = $1
        WHERE email_id = $2 AND product_id = $3 AND ("customValue" IS NULL OR "customValue" = '')
      `;
      params = [quantities, email, productID];
    }

    await pool.query(query, params);
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

    let query: string;
    let params: any[];

    if (customValue) {
      // custom product
      query = `
        DELETE FROM main_customercart
        WHERE email_id=$1 AND custom_product_id=$2 AND "customValue"=$3
      `;
      params = [email, productID, customValue];
    } else {
      // normal product
      query = `
        DELETE FROM main_customercart
        WHERE email_id=$1 AND product_id=$2 AND ("customValue" IS NULL OR "customValue" = '')
      `;
      params = [email, productID];
    }

    await pool.query(query, params);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});



const customStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/custom_products"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`),
});
const uploadCustom = multer({ storage: customStorage });

app.post("/api/cart/add-custom", uploadCustom.single("customImage"), async (req, res) => {
  try {
    const { userEmail, profile, keyColor, textColor, customText, notes } = req.body;

    // Image, just in case na
    const imagePath = req.file ? `/uploads/custom_products/${req.file.filename}` : "";

    // Get price from main_productdetail
    const priceRes = await pool.query(
      `SELECT price FROM main_productdetail WHERE "productID"='KC_CUSTOM' LIMIT 1`
    );
    const customPrice = priceRes.rows[0]?.price ?? 0;

    // Insert to main_customproduct
    const result = await pool.query(
      `INSERT INTO main_customproduct 
        (user_id, profile, "keyColor", "textColor", "customText", notes, "customImage", price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [userEmail, profile, keyColor, textColor, customText, notes, imagePath, customPrice]
    );

    const newCustomId = result.rows[0].id;

    // Add to cart
    await pool.query(
      `INSERT INTO main_customercart 
        (email_id, product_id, quantities, custom_product_id, "customValue")
       VALUES ($1, $2, $3, $4, $5)`,
      [userEmail, "KC_CUSTOM", 1, newCustomId, `${profile}_${keyColor}_${textColor}_${customText}`]
    );

    res.json({
      success: true,
      id: newCustomId,
      imagePath,
      price: customPrice,
      product_id: "KC_CUSTOM",
      customValue: `${profile}-${keyColor}-${textColor}-${customText}`,
    });
  } catch (err) {
    console.error("Error in /api/cart/add-custom:", err);
    res.status(500).json({ error: "Failed to create custom keycap" });
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

const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => console.log(`BackEnd: ${BACKEND_URL}/api/products`));

