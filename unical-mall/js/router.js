/* router.js: moves between screens using the page address (#/login, #/shop ...).
   Rules:
   - Not logged in -> only the login and register screens open.
   - Logged in     -> login and register send you to the dashboard. */

const publicScreens = ["login", "register"];
const privateScreens = ["dashboard", "shop", "cart", "orders", "profile"];

// What to draw when a screen opens
const screenRenderers = {
  dashboard: () => renderDashboard(),
  shop: () => renderShop(),
  cart: () => renderCart(),
  orders: () => renderOrders(),
  profile: () => renderProfile()
};

function go(name) {
  if (location.hash === "#/" + name) route();
  else location.hash = "#/" + name;
}

function route() {
  let name = location.hash.replace("#/", "");

  if (![...publicScreens, ...privateScreens].includes(name)) name = currentUser ? "dashboard" : "login";
  if (!currentUser && privateScreens.includes(name)) name = "login";
  if (currentUser && publicScreens.includes(name)) name = "dashboard";

  if (location.hash !== "#/" + name) history.replaceState(null, "", "#/" + name);

  const onAuthScreen = publicScreens.includes(name);
  document.querySelectorAll(".screen").forEach(s => { s.hidden = s.id !== "screen-" + name; });
  document.body.classList.toggle("auth-mode", onAuthScreen);
  $("appHeader").hidden = onAuthScreen;
  document.querySelectorAll("nav a").forEach(a => a.classList.toggle("on", a.dataset.route === name));

  if (name === "register") showMsg("registerMsg", "", false);
  if (currentUser) $("welcome").textContent = "Hi, " + currentUser.name;
  if (screenRenderers[name]) screenRenderers[name]();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
