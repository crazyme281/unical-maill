/* dashboard.js: the dashboard and profile screens. */

function renderDashboard() {
  const mine = myOrders();
  const spent = mine.reduce((sum, o) => sum + o.total, 0);

  $("greeting").textContent = "Welcome, " + currentUser.name + " 👋";
  $("stats").innerHTML = `
    <div class="stat"><b>${cart.length}</b>Items in cart</div>
    <div class="stat"><b>${mine.length}</b>Orders placed</div>
    <div class="stat"><b>${naira(spent)}</b>Total spent</div>`;
  renderFlash();
}

function renderProfile() {
  const row = (label, value) => `<div class="info-row"><span>${label}</span>${value}</div>`;
  $("profileInfo").innerHTML =
    row("Full name", currentUser.name) +
    row("Matric number", currentUser.matric) +
    row("Email", currentUser.email) +
    row("Phone", currentUser.phone);
}
