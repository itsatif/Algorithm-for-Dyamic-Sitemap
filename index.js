import express from "express";
import cors from "cors";
import mysql from "mysql";
import fs from "fs";

const app = express();
const connection = mysql.createConnection({
  host: "139.59.30.154",
  user: "PPAHGTQWETT",
  password: "asDJ34Ajsj_^asd",
  database: "aldebaza_live_production",
});

connection.connect();
let db = [
  "https://www.aldebazaar.com/",
  "https://www.aldebazaar.com/privacy-policy",
  "https://www.aldebazaar.com/home",
  "https://www.aldebazaar.com/sweet-delight",
  "https://www.aldebazaar.com/product-list",
  "https://www.aldebazaar.com/product-review",
  "https://www.aldebazaar.com/dashboard",
  "https://www.aldebazaar.com/form",
  "https://www.aldebazaar.com/feature-product",
  "https://www.aldebazaar.com/seller",
  "https://www.aldebazaar.com/home/best-seller",
  "https://www.aldebazaar.com/home/top-deals",
  "https://www.aldebazaar.com/home/state-city",
  "https://www.aldebazaar.com/home/category",
  "https://www.aldebazaar.com/home/days-to-day",
  "https://www.aldebazaar.com/home/review-list",
  "https://www.aldebazaar.com/home/coupons",
  "https://www.aldebazaar.com/home/brands",
];
connection.query("SELECT slug  FROM products p", (err, results) => {
  if (results.length > 0) {
    const products = [];
    results.forEach((row, index) => {
      products[index] =
        "https://www.aldebazaar.com/home/product-view/" + row.slug;
    });
    db = [...db, ...products];
  }
});
connection.query("SELECT slug  FROM brands b", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] =
        "https://www.aldebazaar.com/product-list/by-brand/" + row.slug;
    });
    db = [...db, ...brand];
  }
});
connection.query("SELECT slug FROM home_categories hc", (err, results) => {
  const dayToDay = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      dayToDay[index] =
        "https://www.aldebazaar.com/product-list/by-daytoday/" + row.slug;
    });
    db = [...db, ...dayToDay];
  }
});
connection.query("SELECT slug FROM top_deals td", (err, results) => {
  const topDeals = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      topDeals[index] =
        "https://www.aldebazaar.com/product-list/by-deals/" + row.slug;
    });
    db = [...db, ...topDeals];
  }
});
connection.query("SELECT slug FROM categories c", (err, results) => {
  const topDeals = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      topDeals[index] =
        "https://www.aldebazaar.com/product-list/by-category/" + row.slug;
    });
    db = [...db, ...topDeals];
  }
});
connection.query("SELECT id FROM blog b", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] =
        "https://www.aldebazaar.com/product-review/blog-details/" + row.id;
    });
    db = [...db, ...brand];
  }
});
connection.query("SELECT url FROM links l", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] = "https://www.aldebazaar.com/product-review/" + row.url;
    });
    db = [...db, ...brand];
  }
});
connection.query("SELECT name FROM policies p", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] = "https://www.aldebazaar.com/product-review/" + row.name;
    });
    db = [...db, ...brand];
  }
});
connection.query("SELECT slug FROM sub_categories sc", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] =
        "https://www.aldebazaar.com/product-list/by-city/" + row.slug;
    });
    db = [...db, ...brand];
  }
});
connection.query("SELECT slug FROM  sub_sub_categories ssc", (err, results) => {
  const brand = [];
  if (results.length > 0) {
    results.forEach((row, index) => {
      brand[index] =
        "https://www.aldebazaar.com/product-list/by-subcategory/" + row.slug;
    });
    db = [...db, ...brand];
  }
});
app.use(cors());
app.get("/", (req, res) => {
  let xml =
    '<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  const slug = db.map((data) => {
    xml +=
      "\n" +
      `<url>
    <loc>${data}</loc>
    <lastmod>2022-08-25T19:53:51+00:00</lastmod>
    <priority>1.00</priority>
  </url>`;
    return data;
  });
  xml = xml + "\n" + "</urlset>";
  res.send(db);
  fs.writeFileSync("sitemap.xml", xml);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
