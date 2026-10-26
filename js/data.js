/* ==========================================================
   data.js: all the fixed information the shop uses.
   Edit this file to add products, categories or banners.
   ========================================================== */

// Each product is: [name, price, picture, category, rating, oldPrice]
// oldPrice is optional. If you add it, the product shows a discount
// badge and appears in Flash Sales. To add a product, copy a line.
const products = [
  ["Jollof rice & chicken", 2500,  "🍛", "Food",       5, 3000],
  ["Meat pie",              700,   "🥧", "Food",       4],
  ["Bottled water",         300,   "💧", "Drinks",     4],
  ["Chapman",               1200,  "🍹", "Drinks",     5, 1500],
  ["Notebook",              800,   "📓", "Stationery", 4],
  ["Pen pack",              1000,  "🖊️", "Stationery", 4, 1300],
  ["Calculator",            6500,  "🧮", "Gadgets",    5, 7500],
  ["Phone charger",         3000,  "🔌", "Gadgets",    4],
  ["Earphones",             4500,  "🎧", "Gadgets",    4, 6000],
  ["Power bank",            12000, "🔋", "Gadgets",    5, 15000],
  ["Campus hoodie",         9000,  "🧥", "Clothing",   5],
  ["Sneakers",              18000, "👟", "Clothing",   4, 22000],
  ["Textbook bundle",       7500,  "📚", "Books",      5],
  ["Past questions pack",   2000,  "📝", "Books",      5],
  ["Standing fan",          22000, "🌀", "Hostel",     5, 26000],
  ["Bedsheet",              6000,  "🛏️", "Hostel",     4, 7500]
];

const categories = ["All", "Food", "Drinks", "Stationery", "Gadgets", "Clothing", "Books", "Hostel"];

// Each banner is: [title, text, gradient colours]
const banners = [
  ["Flash Sales: up to 30% off",     "Great prices on food, gadgets and hostel items.", "#2f6f5e, #24584a"],
  ["We deliver to your lecture hall", "Choose Class Delivery at checkout.",              "#334e68, #243b53"],
  ["Free pickup at the Mall",         "Order online and collect at the counter.",        "#4a5568, #2d3748"]
];

// Short helpers used by every file
const $ = id => document.getElementById(id);
const naira = n => "₦" + n.toLocaleString();
