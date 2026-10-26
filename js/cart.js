/* cart.js: the cart, checkout and the saved orders. */

const ORDERS_KEY = "unicalMallOrders";

let cart = [];                              // product positions, e.g. [0, 3, 3]
let orders = readStorage(ORDERS_KEY, []);   // every order ever placed on this device
let orderNotice = "";                       // message shown on the Orders screen

function showToast(text) {
  $("toast").textContent = text;
  $("toast").hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { $("toast").hidden = true; }, 1500);
}

function updateCartCount() {
  $("count").textContent = cart.length;
}

function addToCart(productIndex) {
  cart.push(productIndex);
  updateCartCount();
  showToast(products[productIndex][0] + " added to cart");
}

function removeFromCart(position) {
  cart.splice(position, 1);
  renderCart();
}

function renderCart() {
  updateCartCount();
  $("msg").textContent = "";

  if (!cart.length) {
    $("cart").innerHTML = `Your cart is empty. <a href="#/shop">Go to the shop</a>`;
    return;
  }

  const itemsTotal = cart.reduce((sum, i) => sum + products[i][1], 0);
  const rows = cart.map((productIndex, position) => {
    const [name, price, picture] = products[productIndex];
    return `<div class="line"><span>${picture} ${name}</span>
      <span>${naira(price)}<button class="link" onclick="removeFromCart(${position})">Remove</button></span></div>`;
  }).join("");

  $("cart").innerHTML = rows + `<div class="total">Total with delivery: ${naira(itemsTotal + Number($("method").value))}</div>`;
}

function placeOrder() {
  if (!cart.length) return ($("msg").textContent = "Your cart is empty.");

  const pickup = $("method").value === "0";
  if (!pickup && !$("room").value.trim()) return ($("msg").textContent = "Enter your class or room for delivery.");

  const itemsTotal = cart.reduce((sum, i) => sum + products[i][1], 0);
  orders.push({
    id: orders.length + 1,
    email: currentUser.email,
    date: new Date().toLocaleString(),
    items: cart.map(i => products[i][0]),
    total: itemsTotal + Number($("method").value),
    where: pickup ? "Pickup at the Mall" : $("place").value + " (" + $("room").value.trim() + ")"
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  cart = [];
  $("room").value = "";
  orderNotice = "Thank you, " + currentUser.name + "! Your order has been placed.";
  go("orders");
}

/* Orders screen: only this user's orders, newest first */
function myOrders() {
  return orders.filter(o => o.email === currentUser.email);
}

function renderOrders() {
  $("orderNotice").textContent = orderNotice;
  orderNotice = "";

  const list = myOrders().reverse();
  $("orderList").innerHTML = list.length
    ? list.map(o => `<div class="order"><b>Order #${o.id}</b> <small>${o.date}</small>
        <p>${o.items.join(", ")}</p><small>${o.where}</small>
        <div class="total">${naira(o.total)}</div></div>`).join("")
    : `<div class="card">No orders yet. <a href="#/shop">Start shopping</a></div>`;
}
