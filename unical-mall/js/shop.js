/* shop.js: product cards, the shop screen, banner and flash-sale countdown. */

let activeCategory = "All";
let bannerIndex = 0;

function productCard({ p, i }) {
  const [name, price, picture, , rating, oldPrice] = p;
  const badge = oldPrice ? `<span class="off">-${Math.round(100 - price / oldPrice * 100)}%</span>` : "";
  const oldPriceHtml = oldPrice ? `<s>${naira(oldPrice)}</s>` : "";
  return `
    <div class="item">
      <div class="pic">${badge}${picture}</div>
      <p>${name}</p>
      <div class="price">${naira(price)}${oldPriceHtml}</div>
      <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <button onclick="addToCart(${i})">Add to cart</button>
    </div>`;
}

function setCategory(category) {
  activeCategory = category;
  $("q").value = "";
  renderShop();
}

function renderShop() {
  const search = $("q").value.toLowerCase();

  $("cats").innerHTML = categories
    .map(c => `<button class="chip ${c === activeCategory ? "on" : ""}" onclick="setCategory('${c}')">${c}</button>`)
    .join("");

  const list = products
    .map((p, i) => ({ p, i }))
    .filter(x => (activeCategory === "All" || x.p[3] === activeCategory) && x.p[0].toLowerCase().includes(search));

  $("title").textContent = search ? "Search results" : (activeCategory === "All" ? "All products" : activeCategory);
  $("products").innerHTML = list.length ? list.map(productCard).join("") : "<p style='padding:14px'>No products found.</p>";
}

/* Flash sales = every product that has an old price */
function renderFlash() {
  $("flashgrid").innerHTML = products
    .map((p, i) => ({ p, i }))
    .filter(x => x.p[5])
    .map(productCard)
    .join("");
}

/* Banner on the dashboard (changes every few seconds) */
function showBanner() {
  const [title, text, colours] = banners[bannerIndex % banners.length];
  $("banner").style.background = `linear-gradient(120deg, ${colours})`;
  $("banner").innerHTML = `<div><h1>${title}</h1><p>${text}</p><a href="#/shop">Shop now</a></div>`;
}

/* Countdown to midnight */
function updateCountdown() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const left = Math.floor((midnight - now) / 1000);
  const pad = n => String(n).padStart(2, "0");
  $("cd").textContent = `${pad(Math.floor(left / 3600))}h ${pad(Math.floor(left % 3600 / 60))}m ${pad(left % 60)}s`;
}

function startTimers() {
  showBanner();
  updateCountdown();
  setInterval(() => { bannerIndex++; showBanner(); }, 4500);
  setInterval(updateCountdown, 1000);
}
